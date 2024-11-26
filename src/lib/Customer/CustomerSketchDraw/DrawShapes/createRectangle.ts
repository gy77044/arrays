// import globalLayers from "../../../../Utils/EPCMaps/Maps/GlobaLMap";
// import { simpleLineSymbol } from "../../../../Utils/EPCMaps/Markers/MarkerSymbols";

import globalLayers from "../../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { simpleLineSymbol } from "../../../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";

/**
 * The `createRectangle` function is used to create a rectangle graphic on a map using the provided
 * event, symbol, and geometry engine.
 * @param {__esri.SketchCreateEvent} event - The `event` parameter is an object that represents the event that triggered the
function. It typically contains information about the event, such as the type of event, the target
element, and any additional data associated with the event.
 * @param geometryEngine - The `geometryEngine` parameter is an object that provides various geometric
operations and calculations. It is typically used for tasks such as measuring distances, checking
for intersections, buffering geometries, etc.
 */
export const createRectangle = (SketchEvent: __esri.SketchCreateEvent, geometryEngine: __esri.geometryEngine) => {
    let event = SketchEvent as any;
    let newGraphic = event.graphic;
    newGraphic.symbol = simpleLineSymbol; // simple line with outline only 
    // newGraphic.symbol = symbol;
    newGraphic.title = "rectangle"

    globalLayers.sketchLayers?.graphics.remove(event.graphic)
    globalLayers.sketchLayers?.graphics.add(newGraphic)
    globalLayers.selectedGraphic = newGraphic

    if (globalLayers.selectionTool === 'rectangle-selection') {
        const currGraphic = newGraphic
        const inContainedGeometries = [] as __esri.Graphic[]
        globalLayers.sketchLayers?.graphics.forEach(ele => {
            if ((ele as any).title !== currGraphic.title) {
                if (ele.geometry.type === 'polygon') {
                    let isContained = geometryEngine.contains(currGraphic.geometry, ele.geometry);
                    if (isContained) {
                        inContainedGeometries.push(ele)
                    }
                }
            }
        })

        globalLayers.sketchVM.update(inContainedGeometries)
    }
}