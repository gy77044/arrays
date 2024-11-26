import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";

/**
 * Generates an array of points spaced evenly within a given polygon.
 *
 * @param {Polygon} polygon - The polygon in which to generate points.
 * @param {number} spacing - The distance between each point, in the map's spatial units (e.g., meters).
 * @returns {Point[]} An array of points within the polygon.
 */
export const generatePointsWithinPolygon = (polygon: Polygon, spacing: number = 0.05): Point[] => {
    const points: Point[] = [];
    const extent = polygon.extent;
    const { xmin, ymin, xmax, ymax } = extent;

    // Iterate over the bounding box of the polygon with the specified spacing
    for (let x = xmin; x <= xmax; x += spacing) {
        for (let y = ymin; y <= ymax; y += spacing) {
            const point = new Point({ x, y, spatialReference: polygon.spatialReference });

            // Check if the point is inside the polygon
            if (geometryEngine.contains(polygon, point)) {
                points.push(point);
            }
        }
    }
    return points;
};
