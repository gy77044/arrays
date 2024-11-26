import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { loadEsriModules } from "../../Utils/CustomerMaps/Maps/getEsriModules"
import { getSimpleLineSymboleMarker, getTextSymbolObject } from "../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols"
import { createStartEndPointGeometry } from "./createEndStartPointGeometry";

import { getOffsetGeometry } from "./getOffsetGeometry";

let lastlineLength = 0 as any

/**
 * The function `createPolylinewithCoordinates` creates a polyline with given coordinates and adds it
 * to a graphics layer, along with a text symbol displaying the length of the polyline.
 * @param geodesicUtils - The `geodesicUtils` parameter is an object that provides utility functions
 * for geodesic calculations, such as calculating distances between points on the Earth's surface.
 * @param {any} Point - The `Point` parameter is a class or object representing a point geometry in the
 * Esri API. It is used to create instances of points with specific coordinates and spatial references.
 * @param {number[]} lastAddedCoordinates - The `lastAddedCoordinates` parameter is an array of two
 * numbers representing the latitude and longitude of the last added point.
 * @param {number[]} currentCoordinates - The `currentCoordinates` parameter is an array of two numbers
 * representing the latitude and longitude of the current location.
 * @param {string} titleName - The `titleName` parameter is a string that represents the title or name
 * of the polyline.
 * @returns The function does not have a return statement.
 */
export const createPolylinewithCoordinates = async (geodesicUtils: __esri.geodesicUtils, Point: any, lastAddedCoordinates: number[], currentCoordinates: number[], titleName: string) => {
    const [Graphic, webMercatorUtils, SimpleLineSymbol, TextSymbol, Polyline] = await loadEsriModules(["esri/Graphic", "esri/geometry/support/webMercatorUtils", "esri/symbols/SimpleLineSymbol", "esri/symbols/TextSymbol", "esri/geometry/Polyline"])

    const { startPoint, endPoint } = await createStartEndPointGeometry(lastAddedCoordinates[1], lastAddedCoordinates[0], currentCoordinates[1], currentCoordinates[0])

    const isCircle = titleName.includes("circle")

    const PolyLineGeom = new Polyline({
        paths: [[currentCoordinates, lastAddedCoordinates]],
        spatialReference: { wkid: 102100 }
    })

    let lineGeom: any = null;

    if(isCircle){
        lineGeom = await getOffsetGeometry(PolyLineGeom, 0, 'meters')
    } else {
        lineGeom = await getOffsetGeometry(PolyLineGeom, 2, 'meters')
    }

    if (lineGeom === null) return

    const point1 = webMercatorUtils.webMercatorToGeographic(startPoint);
    const point2 = webMercatorUtils.webMercatorToGeographic(endPoint);

    const length = geodesicUtils.geodesicDistance(
        new Point({ x: point1.longitude, y: point1.latitude }),
        new Point({ x: point2.longitude, y: point2.latitude }),
        'meters'
    );

    lastlineLength = length.distance

    const lineSymbol = getSimpleLineSymboleMarker(SimpleLineSymbol)

    if(isCircle){
        if(!globalLayers.circleLineGraphic){
            globalLayers.circleLineGraphic = new Graphic({
                geometry: lineGeom,
                symbol: lineSymbol,
                title: titleName,
                attributes: {
                    name: titleName
                }
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.circleLineGraphic);
        } else {
            globalLayers.circleLineGraphic.geometry = lineGeom;
            globalLayers.circleLineGraphic.title =  titleName
            globalLayers.circleLineGraphic.attributes.name =  titleName
        }
    } else {

        if (!globalLayers.lineGraphic) {
            
            globalLayers.lineGraphic = new Graphic({
                geometry: lineGeom,
                symbol: lineSymbol,
                title: titleName,
                attributes: {
                    name: titleName
                }
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.lineGraphic);
        } else {
            globalLayers.lineGraphic.geometry = lineGeom;
            globalLayers.lineGraphic.title = titleName
            globalLayers.lineGraphic.attributes.name = titleName
        }
    }



    const textSymbol = new TextSymbol(getTextSymbolObject(lastlineLength, [225,225,225]));

    const newPointGeomOffset = await getOffsetGeometry(lineGeom as any, 1, 'meters') as any

    if (newPointGeomOffset === null) return;
    let last = newPointGeomOffset.paths[0][0]
    let current = newPointGeomOffset.paths[0][1]

    const midPointOffsetGeometry = new Point({
        x: (last[0] + current[0]) / 2,
        y: (last[1] + current[1]) / 2,
        spatialReference: { wkid: 102100 }, // Assuming the coordinates are in WKID 4326 (WGS 1984)
    });


    if(isCircle){
        if(!globalLayers.circleTextGraphicTop){
            globalLayers.circleTextGraphicTop = new Graphic({
                geometry: midPointOffsetGeometry,
                symbol: textSymbol,
                title: titleName,
                attributes: {
                    name: titleName
                }
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.circleTextGraphicTop);
        } else {
            globalLayers.circleTextGraphicTop.geometry = midPointOffsetGeometry;
            globalLayers.circleTextGraphicTop.symbol = textSymbol;
        }
    } else {
        if (!globalLayers.textGraphic) {
            globalLayers.textGraphic = new Graphic({
                geometry: midPointOffsetGeometry,
                symbol: textSymbol,
                title: titleName,
                attributes: {
                    name: titleName
                }
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.textGraphic);
        } else {
            globalLayers.textGraphic.geometry = midPointOffsetGeometry;
            globalLayers.textGraphic.symbol = textSymbol;
        }
    }

}
