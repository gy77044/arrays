import { LocationMarker } from "../../Const";
import globalLayers from "./GlobaLMap";

export const removeSearchedGraphic = () => {
    globalLayers.graphicLayerLocation?.graphics.forEach((ele) => {
        if( ele.attributes && ele.getAttribute('name') === LocationMarker){
          globalLayers.graphicLayerLocation?.graphics.remove(ele);
        }
    })
}