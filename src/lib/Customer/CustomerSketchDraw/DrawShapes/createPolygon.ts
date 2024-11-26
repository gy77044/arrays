import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { toast } from "react-toastify";
import { setPolygonDrawn, setTitle, toggleDrawer } from "../../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setIsBuildingDrawn, setOpenDraw, setToolTipModal, toggleHeigthModal } from "../../../../ReduxTool/Slice/Map/MapReducer";
import { store } from "../../../../ReduxTool/store/store";
import { obstructionArea, setLatlng, showEsriDrawTool } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { getsimpleFillSymbol } from "../../../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";
import globalLayers from "../../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { MAXUSEABLEAREA, MINUSEABLEAREA } from "../../../../Utils/Const";

/**
 * The function `handlePolygonCreate` handles the creation of a polygon graphic on a map and calculates
 * its geodesic area.
 * @param {__esri.SketchCreateEvent} event - The `event` parameter is an object that represents the event that triggered the
 * function. It contains information about the event, such as the graphic that was created.
 * @param geometryEngine - The `geometryEngine` parameter is an object that provides various geometric
 * operations and calculations, such as measuring distances, areas, and performing spatial analysis. It
 * is typically provided by the ArcGIS API for JavaScript.
 * @param {string} titleName - The `titleName` parameter is a string that represents the title of the
 * graphic. It is used to set the `title` property of the `event.graphic` object.
 */
export const handlePolygonCreate = (sketchEvent: __esri.SketchCreateEvent, geometryEngine: __esri.geometryEngine, titleName: string) => {
    let event = sketchEvent as any
    store.dispatch(toggleHeigthModal('building'))
    store.dispatch(setOpenDraw(false))
    store.dispatch(setLatlng({ lat: event.graphic.geometry?.centroid.latitude, lng: event.graphic.geometry?.centroid.longitude }))
    if (event.graphic.geometry && geometryEngine) {
        const PolygonCentroid = (event.graphic.geometry as __esri.Polygon).centroid;
        event.graphic.title = titleName;
        event.graphic.symbol = new SimpleFillSymbol(
            getsimpleFillSymbol([173, 150, 50, 0.5], [150, 55, 0])
        )
  
        const geodesicArea = geometryEngine.geodesicArea(event.graphic.geometry, "square-meters");
        const area = geodesicArea.toFixed(2)
        // store.dispatch(obstructionArea(area))
        // store.dispatch(showEsriDrawTool(false))
        // store.dispatch(setPolygonDrawn('1'))
        //boundarycheck
        if(parseFloat(area)>MINUSEABLEAREA&&parseFloat(area)<MAXUSEABLEAREA){
            store.dispatch(setToolTipModal({ state: true, title: "Precise Analysis", content: "Let's work together to find the perfect solar solution for your home! To proceed, please fill out all details on the left." }))
            store.dispatch(setTitle("projectsetup"))
            store.dispatch(toggleDrawer(true))
            store.dispatch(obstructionArea(area))
            store.dispatch(showEsriDrawTool(false))
            store.dispatch(setPolygonDrawn('1'))
            store.dispatch(setIsBuildingDrawn(true))
        }
        else{
            toast.error(`The drawn area must be between ${MINUSEABLEAREA} sq m and ${MAXUSEABLEAREA} sq m.`,{toastId:"customID"})
            globalLayers.sketchLayers?.graphics.remove(event.graphic);
            setTimeout(()=>{
                let hndleDelete = document.getElementById("delete_layer") as HTMLElement;
                if (hndleDelete) {
                  hndleDelete.click();
                }             
                globalLayers.sketchVM.create('polygon');
            },1000)          
        }

    } else {
        console.error("Unable to calculate geodesic area. Invalid graphic geometry or missing geometryEngine.");
    }
}