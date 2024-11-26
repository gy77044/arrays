import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Point from "@arcgis/core/geometry/Point";
import Polygon from "@arcgis/core/geometry/Polygon";
import SceneView from "@arcgis/core/views/SceneView";

// Helper function to convert the extent to pixel area for screenshot
export function getScreenshotArea(view: SceneView, polygonExtent: __esri.Extent) {

    const bufferExtent = geometryEngine.buffer(polygonExtent, 50, "meters") as Polygon;

    if(!bufferExtent) return;

    const extent = bufferExtent.extent;
    const leftPoint = new Point({
        x: extent.xmin,
        y: extent.ymin,
        spatialReference: extent.spatialReference
    })
    const rightPoint = new Point({
        x: extent.xmax,
        y: extent.ymax,
        spatialReference: extent.spatialReference
    })
    
    const bottomLeft = view.toScreen(leftPoint);
    const topRight = view.toScreen(rightPoint);

    return {
        x: bottomLeft.x,
        y: topRight.y,
        width: topRight.x - bottomLeft.x,
        height: bottomLeft.y - topRight.y
    };
}