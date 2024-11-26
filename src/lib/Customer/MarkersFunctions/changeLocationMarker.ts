import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { IUpdateEvent, LocationMarker } from "../../../Utils/Const";
import { markerSymbol } from "../../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";

export function changeLocationMarker(event: IUpdateEvent, markerType: Object ){
    if(event.state === "active" && event.toolEventInfo.type === "move-stop"){
        if(event.graphics[0]){
            globalLayers.graphicLayerLocation?.graphics.forEach(ele => {
                if( ele.attributes && ele.getAttribute('name') === LocationMarker){
                    globalLayers.graphicLayerLocation?.graphics.remove(ele)
                }
            })
        }
        event.graphics[0].symbol = markerType
        globalLayers.graphicLayerLocation?.graphics.add(event.graphics[0]);
        // globalLayers.sketchViewModel.cancel()
    }
}

export const confirmRoofLocationonClick = () => {
    let graphic = null as any;
    globalLayers.graphicLayerLocation?.graphics.forEach(ele => {
        if(ele.layer?.title && ele.layer.title === LocationMarker){
            graphic = ele;
        }
    })
    if(graphic){
        graphic.symbol = markerSymbol
        globalLayers.sketchViewModel.cancel()
    }
}



 