import Polyline from "@arcgis/core/geometry/Polyline"
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js"
import Graphic from "@arcgis/core/Graphic"
import { SimpleLineSymbol, TextSymbol } from "@arcgis/core/symbols"
import { createStartEndPointGeometry } from "../createEndStartPointGeometry"
import { getOffsetGeometry } from "../getOffsetGeometry"
import * as geodesicUtils from "@arcgis/core/geometry/support/geodesicUtils.js";
import Point from "@arcgis/core/geometry/Point"
import { getSimpleLineSymboleMarker, getTextSymbolObject } from "../../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols"
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap"


let lastlineLength = 0 as any

/**
 * The function `createPolylinefromDbClick` creates a polyline graphic on a map based on the
 * coordinates of a double-click event and the last added verted coordinates, 
 * calculates the length of the polyline, and adds a text graphic
 * displaying the length.
 * @param geodesicUtils - The `geodesicUtils` parameter is an object that provides utility functions
 * for geodesic calculations, such as calculating distances between points on the Earth's surface.
 * @param {any} Point - The `Point` parameter is a reference to the `Point` class from the ArcGIS API
 * for JavaScript. It is used to create point geometries for calculations and graphics.
 * @param {number[]} lastAddedCoordinates - The `lastAddedCoordinates` parameter is an array containing
 * the coordinates of the last point that was added to the polyline. It should have two elements: the
 * latitude and longitude of the point.
 * @param {number[]} currentCoordinates - The `currentCoordinates` parameter is an array of two numbers
 * representing the latitude and longitude of the current point.
 * @param {string} titleName - The `titleName` parameter is a string that represents the title of the
 * polyline. It is used to set the `title` property of the `Graphic` objects representing the polyline
 * and the text symbol.
 * @returns The function does not explicitly return anything.
 */
export const createPolylinefromDbClick = async (lastAddedCoordinates: number[], currentCoordinates: number[], titleName: string) => {

    const { startPoint, endPoint } = await createStartEndPointGeometry(lastAddedCoordinates[1], lastAddedCoordinates[0], currentCoordinates[1], currentCoordinates[0])

    const PolyLineGeom = new Polyline({
        paths: [[currentCoordinates, lastAddedCoordinates]],
        spatialReference: { wkid: 102100 }
    })

    const lineGeom = await getOffsetGeometry(PolyLineGeom, 2, 'meters')
    if (lineGeom === null) return;

    const point1 = webMercatorUtils.webMercatorToGeographic(startPoint) as any;
    const point2 = webMercatorUtils.webMercatorToGeographic(endPoint) as any;

    const length = geodesicUtils.geodesicDistance(
        new Point({ x: point1.longitude, y: point1.latitude }),
        new Point({ x: point2.longitude, y: point2.latitude }),
        'meters'
    );

    lastlineLength = length.distance

    const lineSymbol = getSimpleLineSymboleMarker(SimpleLineSymbol)


    globalLayers.lineGraphic = new Graphic({
        geometry: lineGeom as any,
        symbol: lineSymbol
    });

    globalLayers.sketchLayers?.graphics.add(globalLayers.lineGraphic);
    // Create a graphic representing the text symbol
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

    globalLayers.textGraphic = new Graphic({
        geometry: midPointOffsetGeometry,
        symbol: textSymbol
    });

    globalLayers.sketchLayers?.graphics.add(globalLayers.textGraphic);
}