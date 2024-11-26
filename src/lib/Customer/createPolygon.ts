import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { toast } from "react-toastify";
import { obstructionArea, setLatlng, showEsriDrawTool } from "../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setPolygonDrawn, setTitle, toggleDrawer } from "../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setIsBuildingDrawn, setOpenDraw, setToolTipModal, toggleMapModal } from "../../ReduxTool/Slice/Map/MapReducer";
import { store } from "../../ReduxTool/store/store";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { getsimpleFillSymbol } from "../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";
import Graphic from "@arcgis/core/Graphic";
import { MAXUSEABLEAREA, MINUSEABLEAREA } from "../../Utils/Const";

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
export const handlePolygonCreate = (event:any /*__esri.SketchCreateEvent | __esri.SketchUpdateEvent*/, geometryEngine: __esri.geometryEngine, titleName: string) => {
    store.dispatch(toggleMapModal(true))
    store.dispatch(setOpenDraw(false))
    
    let geometry = event.graphic ? event.graphic : (event.graphics && event.graphics.length>0)?event.graphics[0] : {};
    if(!geometry) return;
    store.dispatch(setLatlng({ lat: geometry.geometry?.centroid.latitude, lng: geometry.geometry?.centroid.longitude }))
    if (geometry.geometry && geometryEngine) {
        const PolygonCentroid = (geometry.geometry as __esri.Polygon).centroid;
        geometry.title = titleName;
        (geometry as Graphic).setAttribute('name', titleName + 'building')
        geometry.symbol = new SimpleFillSymbol(
            getsimpleFillSymbol([173, 150, 50, 0.5], [150, 55, 0])
        )
  
        const geodesicArea = geometryEngine.geodesicArea(geometry.geometry, "square-meters");
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
            toast.error(`The drawn area must be between ${MINUSEABLEAREA} sq m and ${MAXUSEABLEAREA} sq m.`,{toastId:"customID"});
            // if(event.graphics){
            //     console.log(globalLayers.prevsketchLayers);
            //     globalLayers.sketchLayers?.graphics.removeAll()
            //     globalLayers.sketchLayers?.graphics.add(globalLayers.prevsketchLayers!)
            //     return;
            // }
            globalLayers.sketchLayers?.graphics.remove(event.graphic);
            setTimeout(()=>{
                let hndleDelete = document.getElementById("delete_layer") as HTMLElement;
                if (hndleDelete) {
                  hndleDelete.click();
                }             
                globalLayers.sketchVM.create('polygon');
            },1000) 
            // store.dispatch(setIsBuildingDrawn(false))         
        }

    } else {
        console.error("Unable to calculate geodesic area. Invalid graphic geometry or missing geometryEngine.");
        store.dispatch(setIsBuildingDrawn(false))
    }
}