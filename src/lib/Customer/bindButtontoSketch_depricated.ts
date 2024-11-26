import { toast } from "react-toastify";
import { setOpenDraw } from "../../ReduxTool/Slice/Map/MapReducer";
import { AppDispatch } from "../../ReduxTool/store/store";
import { LocationMarker } from "../../Utils/Const";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { removeSearchedGraphic } from "../../Utils/CustomerMaps/Maps/removeSearchedLocationGraphic"; // Maps/removeSearchedLocationGraphic";

/**
 * The function binds various buttons to corresponding actions in a sketch object.
 */
export const bindButtontoSketchObject = async (dispatch?: AppDispatch) => {
    globalLayers.sketchButton.select = document.getElementById("selectButton");
    globalLayers.sketchButton.polygon = document.getElementById("polygon");
    globalLayers.sketchButton.rectangle = document.getElementById("rectangle");
    globalLayers.sketchButton.delete = document.getElementById("delete_layer");
    globalLayers.sketchButton.polyline = document.getElementById("bigPolyline");
    globalLayers.sketchButton.circle = document.getElementById("circle");
    globalLayers.sketchButton.refresh = document.getElementById("refreshButton");
    globalLayers.sketchButton.measurement = document.getElementById("measurement");
    globalLayers.sketchButton.featureAdd = document.getElementById("featureAdd");

    // zoom button's
    globalLayers.sketchButton.zoomIn = document.getElementById("zoomIn");
    globalLayers.sketchButton.zoomOut = document.getElementById("zoomOut");

    // bind footer lat and lng to global objecr
    globalLayers.footers.lat = document.getElementById('footer-lat')
    globalLayers.footers.lng = document.getElementById('footer-lng')


    // create polygon event 
    // globalLayers.sketchButton.polygon?.parentElement?.addEventListener("click", () => {
    globalLayers.sketchButton.polygon?.addEventListener("click", () => {
            globalLayers.graphicLayerLocation?.graphics.forEach(ele => {
            if(ele.layer.title === LocationMarker){
                globalLayers.graphicLayerLocation?.graphics.remove(ele)
            }
        })
        
        if (globalLayers.sketchVM.updateGraphics.length) {
            toast.info("Boundary already drawn", { toastId: 'boundryDrawn' });
            return
        }
        globalLayers.sketchLayers?.graphics.forEach(ele => {
            globalLayers.sketchLayers?.graphics.remove(ele)
        })
        if (dispatch) {                      
            dispatch(setOpenDraw(true))           
        }
        if (globalLayers.activeView === "3D") {
            return;
        }
        globalLayers.selectionTool = ''
        globalLayers.lastactiveTool = 'polygon'
        let name = 'poly' + globalLayers.polygonListCounts.length
        globalLayers.polygonListCounts.push(name)
        globalLayers.sketchVM.create("polygon");
        globalLayers.height = 0
        removeSearchedGraphic()


    })

    // create reactagne event
    globalLayers.sketchButton.rectangle?.addEventListener("click", () => {
        if (globalLayers.activeView === "3D") {
            return;
        }
        // truggerRect()
        globalLayers.lastactiveTool = 'rectangle'
        globalLayers.selectionTool = 'rectangle-selection'
        globalLayers.sketchVM.create("rectangle");

        // globalLayers.sketchVM.create('rectangle-selection')
    })

    globalLayers.sketchButton.circle?.addEventListener("click", () => {
        if (globalLayers.activeView === "3D") {
            return;
        }
        // truggerRect()
        globalLayers.selectionTool = ''
        globalLayers.lastactiveTool = 'circle'
        globalLayers.sketchVM.create("circle");
        let name = 'circle' + globalLayers.polygonListCounts.length
        globalLayers.polygonListCounts.push(name)
    })

    // create selection 
    globalLayers.sketchButton.select?.addEventListener("click", () => {
        if (globalLayers.activeView === "3D") {
            return;
        }
        globalLayers.sketchVM.create("rectangle");
        globalLayers.sketchVM.creationMode = 'update';
    })

    // refresh the layesr 
    globalLayers.sketchButton.refresh?.addEventListener("click", () => {
        if (globalLayers.activeView === "3D") {
            return;
        }

        globalLayers.selectionTool = ''
        globalLayers.sketchLayers?.graphics.removeAll()
        globalLayers?.map?.remove(globalLayers.featureLayers.buildingFeatureDhaka!)
        if (globalLayers.featureLayers.wfsLayers.length > 0) {
            globalLayers.featureLayers.wfsLayers.forEach(layer => {
                // globalLayers.map?.remove(layer)
            })
        }
    });

    // delete the layer 
    globalLayers.sketchButton.delete?.addEventListener("click", () => {
        if (globalLayers.activeView === "3D") {
            return;
        }
        var deleteTitles = [] as string[]
        if (globalLayers.sketchVM.updateGraphics.length > 0) {
            globalLayers.sketchVM.updateGraphics.forEach((ele: any) => {
                if (!deleteTitles.includes(ele.title)) {
                    deleteTitles.push(ele.title)
                }
            });
            globalLayers.deleteSelectedGraphics()
            globalLayers.selectedGraphic = null;

        } else {
            console.log("No selected layer found.");
        }


        if (deleteTitles.length > 0) {
            globalLayers.removeTitledGraphicsfromSkecth(deleteTitles)
        }
    });

    // enable measurement
    globalLayers.sketchButton.measurement?.addEventListener('click', () => {
        if (globalLayers.activeView === "3D") {
            return;
        }
        globalLayers.selectionTool = ''
        // console.log(globalLayers.measurement)
        if (globalLayers.measurement) {
            globalLayers.measurement.activeTool = "distance";
        }
    })

    // zoom in & out button's
    globalLayers.sketchButton.zoomIn?.addEventListener('click', () => {
        // globalLayers.zoomInButton()
try{
        if (globalLayers.view) {
            globalLayers.view.goTo({
                zoom: globalLayers.view.zoom + 1
            });
            globalLayers.currentZoomLevel = globalLayers.view.zoom + 1;
            (document.getElementById("zoomDiv") as HTMLSpanElement).innerText = globalLayers.currentZoomLevel.toFixed(2)
        }
             
    }
    catch(e){

    }
    })

    globalLayers.sketchButton.zoomOut?.addEventListener('click', () => {
try{
        if (globalLayers.view) {
            if (globalLayers.view.zoom <= 3) return;
            globalLayers.view!.goTo({
                zoom: globalLayers.view.zoom - 1
            });
            globalLayers.currentZoomLevel = globalLayers.view.zoom - 1;
            (document.getElementById("zoomDiv") as HTMLSpanElement).innerText = globalLayers.currentZoomLevel.toFixed(2)
        }
             
    }
    catch(e){

    }
    })

    // feature add button 
    globalLayers.sketchButton.featureAdd?.addEventListener('click', (e) => {
        globalLayers.featureAddState = 'active'
        globalLayers.sketchVM.complete()
    })


    document.getElementById("deleteGraphic")?.addEventListener('click', (e) => {
        globalLayers.featureAddState = 'delete';
    })
    document.getElementById("selectGraphic")?.addEventListener('click', (e) => {
        globalLayers.featureAddState = 'select';
        // console.log(globalLayers.featureAddState)
        globalLayers.sketchVM.complete();
    })

    globalLayers.removeButtonEvents()
}
