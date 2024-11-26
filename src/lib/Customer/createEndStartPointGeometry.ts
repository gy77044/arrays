import Point from "@arcgis/core/geometry/Point";
import { loadMultipleModules } from "../../Utils/CustomerMaps/Maps/LazyloadMap";

/**
 * The function creates start and end points for a geometry using latitude and longitude coordinates.
 * @param {number} startLat - The start latitude of the geometry.
 * @param {number} startLng - The startLng parameter represents the longitude coordinate of the
 * starting point. It is a number value.
 * @param {number} endLat - The `endLat` parameter represents the latitude of the end point of the
 * geometry.
 * @param {number} endLng - The `endLng` parameter represents the longitude coordinate of the end
 * point.
 * @returns an object with two properties: startPoint and endPoint.
 */
export const createStartEndPointGeometry = async (startLat: number, startLng: number, endLat: number, endLng: number): Promise<{ startPoint: Point, endPoint: Point }> => {
    const [Point, webMercatorUtils] = await loadMultipleModules(["esri/geometry/Point", "esri/geometry/support/webMercatorUtils"])

    const startPoint = new Point({
        x: startLng,
        y: startLat,
        spatialReference: webMercatorUtils.spatialReference
    })

    const endPoint = new Point({
        x: endLng,
        y: endLat,
        spatialReference: webMercatorUtils.spatialReference
    });

    return { startPoint, endPoint }
}