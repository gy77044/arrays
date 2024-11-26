import * as webMercatorUtils  from "@arcgis/core/geometry/support/webMercatorUtils";

//define(['esri/geometry/webMercatorUtils'], 

// export const {

//   /**
//    * A set of helpful functions to streamline geospatial operations
//    * @namespace geoUtil
//    * @type {{}}
//    */
//   var geoUtil = {};

//   /**
//    * Move a geometry by a distance and angle
//    * @param {Geometry} geometry - The geometry to move
//    * @param {Number} distance - The distance to move the geometry in meters
//    * @param {Number} angle - The angle to move the geometry by
//    * @returns {*}
//    */
//   /**
//    * Created by t953468 on 2/8/2017.
//    */



/* `export function moveGeometry` is a function that takes in a geometry, a distance, and an angle as
parameters and moves the geometry by the specified distance and angle. It first checks if the
geometry is in Web Mercator projection, and if not, it converts it to Web Mercator projection. Then,
depending on the type of geometry (point, polyline, or polygon), it calls either `_movePoint` or
`_movePolygon` function to move the geometry. Finally, it converts the geometry back to its original
projection if it was not originally in Web Mercator projection. */
export function moveGeometry(geometry, distance, angle) {
  var isWebMercator = geometry.spatialReference.isWebMercator;
  var geometry = isWebMercator ? geometry : webMercatorUtils.geographicToWebMercator(geometry);
  var newGeometry;
  switch (geometry.type) {
    case "point":
      newGeometry = _movePoint(geometry, distance, angle);
      break;
    case "polyline":
      newGeometry = _movePolygon(geometry, geometry.paths, distance, angle);
      break;
    case "polygon":
      newGeometry = _movePolygon(geometry, geometry.rings, distance, angle);
      break;
  }
  return isWebMercator ? newGeometry : webMercatorUtils.webMercatorToGeographic(newGeometry);
}

// /**
//  * Move a point geometry by a distance and angle
//  * @param {Point} point - The Point geometry to move
//  * @param {Number} distance - The distance to move the geometry in meters
//  * @param {Number} angle - The angle to move the geometry by
//  * @returns {Point}
//  * @private
//  */
export function _movePoint(point, distance, angle) {
  var radians = angle * (Math.PI / 180); // Convert angle to radians
  var newX = point.x + distance * Math.cos(radians); // calc new X
  var newY = point.y + distance * Math.sin(radians); // calc new Y
  var deltaX = newX - point.x;
  var deltaY = newY - point.y;
  return point.offset(deltaX, deltaY);
}

/**
 * Move a polygon geometry by a distance and angle
 * @param {Polygon} polygon - The Polygon geometry to move
 * @param {Number[][][]} Rings An array of rings
 * @param {Number} distance - The distance to move the geometry in meters
 * @param {Number} angle - The angle to move the geometry by
 * @returns {Polygon}
 * @private
 */
export function _movePolygon(geometry, rings, distance, angle) {
  for (var ringIndex = 0; ringIndex < rings.length; ringIndex++) {
    var ring = rings[ringIndex];
    for (var pointIndex = 0; pointIndex < ring.length; pointIndex++) {
      var ringPoint = geometry.getPoint(ringIndex, pointIndex);
      geometry.setPoint(ringIndex, pointIndex, _movePoint(ringPoint, distance, angle));
    }
  }
  return geometry;
}


export function translatePolygon(startPoint, currPoint, polygon){
  let dx = currPoint.x - startPoint.x;
  let dy = currPoint.y - startPoint.y;
  return polygon.rings.forEach(ring => {
    if (Array.isArray(ring[0])){
      ring.forEach(coord => {
        coord[0] += dx;
        coord[1] += dy;
      });
    } else {
      ring[0] += dx;
      ring[1] += dy;
    }
  });
}

