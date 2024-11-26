import Graphic from "@arcgis/core/Graphic";
import * as geometryEngine from "@arcgis/core/geometry/geometryEngine.js";
import Polygon from "@arcgis/core/geometry/Polygon";
import Point from "@arcgis/core/geometry/Point";
// Function to rotate a graphic around its centroid
// export function rotateGraphicAroundCentroid(graphic: Graphic, angle: number): Graphic {
//   // Get the geometry of the graphic (assuming it's a polygon)
//   let originalGeometry = graphic.attributes.originalGeometry;
//   if (!originalGeometry) {
//     originalGeometry = graphic.geometry.clone();
//     graphic.setAttribute('originalGeometry', originalGeometry);
//   }
//   // Get the centroid of the geometry (this will be the rotation center)
//   const centroid = graphic.geometry.extent.center;
//   // Rotate the geometry around the centroid by the specified angle
//   graphic.geometry = geometryEngine.rotate(graphic.geometry, angle, centroid);
//   if (angle === 0) {
//     graphic.geometry = originalGeometry;
//   }
//   graphic.attributes = graphic.attributes;
//   return graphic;
// }


// Function to rotate a graphic around a given centroid point
export const rotateGraphicAroundCentroid = (graphic: Graphic, angle: number, centroid: any) => {
  const rotatedGeometry = geometryEngine.rotate(graphic.geometry, angle, centroid);
  graphic.geometry = rotatedGeometry;
};