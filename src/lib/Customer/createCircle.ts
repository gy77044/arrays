import { TextSymbol } from "@arcgis/core/symbols";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { getSimpleLineSymboleMarker, getTextSymbolObject } from "../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";
import { calculateEndPoint } from "./GeometryCreate";
/**
 * The function creates a circle graphic based on the area of a given geometry and adds it to a
 * graphics layer.
 * @param {__esri.SketchCreateEvent} event - The `event` parameter is an object that represents the event that triggered the
 * creation of the circle. It typically contains information about the event, such as the graphic that
 * was created.
 * @param {__esri.SimpleFillSymbol} symbol - The `symbol` parameter is the symbol that will be used to represent the circle
 * on the map. It can be any valid symbol object that is compatible with the graphics layer being used.
 * @param geometryEngine - The `geometryEngine` parameter is an object that provides various geometric
 * operations, such as calculating areas, distances, intersections, and more. It is typically provided
 * by a GIS library or framework, such as the ArcGIS API for JavaScript. In this code snippet, the
 * `geometryEngine` is used to
 */
export const createCircle = (SketchEvent: __esri.SketchCreateEvent, symbol: __esri.SimpleFillSymbol, geometryEngine: __esri.geometryEngine) => {
    let event = SketchEvent as any
    const titleName = globalLayers.polygonListCounts[globalLayers.polygonListCounts.length - 1]
    let newGrpahic: any = event.graphic;
    const area = geometryEngine.geodesicArea(newGrpahic.geometry, 'square-meters')
    let radius = Math.sqrt(area / Math.PI);
    newGrpahic.attributes = { radius: radius, type: titleName };
    newGrpahic.symbol = symbol;
    newGrpahic.title = titleName;
    globalLayers.sketchLayers?.graphics.remove(event.graphic);
    globalLayers.sketchLayers?.graphics.add(newGrpahic);
    globalLayers.selectedGraphic = newGrpahic;
}

var graphic = {} as any
export const circleTrnaformationState = (event: __esri.SketchUpdateEvent, radius: number, Polyline: any, webMercatorUtils: any, Point: any, Graphic: any, geometryEngine: __esri.geometryEngine, SimpleLineSymbol: any) => {
    const klength = radius;
    if (event.state === "start") {
        graphic = event.graphics[0];
    }
    // console.log(event.graphics[0])
    if (event.state === "active" && event.tool === "transform" && event.toolEventInfo) {
        let startLat = (event.graphics[0] as any).geometry.centroid.latitude
        let startLng = (event.graphics[0] as any).geometry.centroid.longitude
        // centerPoint of circle in 4326 wkid
        var centerPointGeom = new Point({
            longitude: startLng,
            latitude: startLat
        });
        // get radius and and calculat the next point on the radius length 
        const { latitude, longitude } = calculateEndPoint(startLat, startLng, klength)
        // var polyline = new Polyline({
        //     paths: [
        //         [startLng, startLat],
        //         [longitude, latitude]
        //     ],
        //     spatialReference: { wkid: 4326 } // WGS 1984 (WKID 4326) - Use appropriate spatial reference
        // });
        // Get the extent of the circle geometry
        var circleExtent = graphic.geometry.extent;
        // Calculate the top, bottom, left, and right points
        var topLeftPointExtent = new Point({
            longitude: circleExtent.xmin,
            latitude: circleExtent.ymax
        });
        var bottomLeftPointExtent = new Point({
            longitude: circleExtent.xmin,
            latitude: circleExtent.ymin
        });
        var topRightPointExtent = new Point({
            longitude: circleExtent.xmax,
            latitude: circleExtent.ymax
        });

        // midpoint for the top of circle 
        const midPointTop = new Point({
            longitude: (topLeftPointExtent.longitude + topRightPointExtent.longitude) / 2,
            latitude: (topLeftPointExtent.latitude + topRightPointExtent.latitude) / 2,
            spatialReference: webMercatorUtils.spatialReference, // Assuming the coordinates are in WKID 4326 (WGS 1984)
        });
        // midpoint for the left side of circle 
        const midPointLeft = new Point({
            x: (topLeftPointExtent.longitude + bottomLeftPointExtent.longitude) / 2,
            y: (topLeftPointExtent.latitude + bottomLeftPointExtent.latitude) / 2,
            spatialReference: webMercatorUtils.spatialReference, // Assuming the coordinates are in WKID 4326 (WGS 1984)
        });
        // midpoint for the left side of circle with 4326 wkid
        const circleLeftMidPoint = convertGeometrySpatial_4326(midPointLeft, webMercatorUtils) as any;
        // midpoint for the top of circle with 4326 wkid
        const circleTopMidPoint = convertGeometrySpatial_4326(midPointTop, webMercatorUtils) as any;
        // center to top point line 'polyline'
        var topPolyline = new Polyline({
            paths: [
                [centerPointGeom.longitude, centerPointGeom.latitude],
                [circleTopMidPoint.longitude, circleTopMidPoint.latitude]
            ],
            spatialReference: { wkid: 4326 } // WGS 1984 (WKID 4326) - Use appropriate spatial reference
        });
        // center to left point line 'polyline'
        var leftPolyline = new Polyline({
            paths: [
                [centerPointGeom.longitude, centerPointGeom.latitude],
                [circleLeftMidPoint.longitude, circleLeftMidPoint.latitude]
            ],
            spatialReference: { wkid: 4326 } // WGS 1984 (WKID 4326) - Use appropriate spatial reference
        });
        // length from center to top point (topPolyline)
        var toplength = geometryEngine.geodesicLength(topPolyline, 'meters');
   
        // length from ceneter to left point (leftPolyline)
        var leftlength = geometryEngine.geodesicLength(leftPolyline, 'meters');
        // symbol with length of line
        const leftlengthGraphicSymbol = new TextSymbol(getTextSymbolObject(leftlength, [0, 0, 0]));
        const lineSymbolleft = getSimpleLineSymboleMarker()

        // polyline from center to left side 
        if (!globalLayers.leftLineCirclePolyGraphic) {
            globalLayers.leftLineCirclePolyGraphic = new Graphic({
                geometry: leftPolyline,
                symbol: lineSymbolleft,
                title: (event.graphics[0] as any).title
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.leftLineCirclePolyGraphic);
        } else {
            globalLayers.leftLineCirclePolyGraphic.geometry = leftPolyline;
        }
        const midPointforLeftPolyline = new Point({
            x: (centerPointGeom.longitude + circleLeftMidPoint.longitude) / 2,
            y: (centerPointGeom.latitude + circleLeftMidPoint.latitude) / 2,
            spatialReference: webMercatorUtils.spatialReference, // Assuming the coordinates are in WKID 4326 (WGS 1984)
        });
        // text symbol from left to center
        if (!globalLayers.circleTextGraphic) {
            globalLayers.circleTextGraphic = new Graphic({
                geometry: midPointforLeftPolyline,
                symbol: leftlengthGraphicSymbol,
                title: (event.graphics[0] as any).title
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.circleTextGraphic);
        } else {
            globalLayers.circleTextGraphic.geometry = midPointforLeftPolyline;
            globalLayers.circleTextGraphic.symbol = leftlengthGraphicSymbol;
        }

        // form center to top of circle 
        if (globalLayers.circleLineGraphic) {
            globalLayers.circleLineGraphic.geometry = topPolyline;
        }
        // console.log(toplength)
        const toplengthGraphicSymbol = new TextSymbol(getTextSymbolObject(toplength, [0, 0, 0]));
        const midPoint = new Point({
            x: (startLng + longitude) / 2,
            y: (startLat + latitude) / 2,
            spatialReference: webMercatorUtils.spatialReference, // Assuming the coordinates are in WKID 4326 (WGS 1984)
        });

        if (!globalLayers.circleTextGraphicTop) {
            // Create a graphic representing the text symbol
            // Calculate the midpoint of the line to place the text symbol
            globalLayers.circleTextGraphicTop = new Graphic({
                geometry: midPoint,
                symbol: toplengthGraphicSymbol,
                title: (event.graphics[0] as any).title
            });
            globalLayers.sketchLayers?.graphics.add(globalLayers.circleTextGraphicTop);

        } else {
            globalLayers.circleTextGraphicTop.geometry = midPoint;
            globalLayers.circleTextGraphicTop.symbol = toplengthGraphicSymbol;
        }
    }
}

/**
 * it calculates the radius of a circle based on its area and
 * updates the circle's curret graphic geometry with the updated geometry.
 * @param event - The event parameter is an object that contains information about the sketch update
 * event. It typically includes the graphics that were updated.
 * @param geometryEngine - The `geometryEngine` parameter is an object that provides various geometric
 * operations, such as calculating areas, distances, intersections, etc.
 * @param {any} Polyline - The `Polyline` parameter is a reference to the Polyline class in the ArcGIS
 * API for JavaScript. It is used for creating and manipulating polyline geometries.
 * @param webMercatorUtils - The `webMercatorUtils` parameter is an object that provides utility
 * functions for working with Web Mercator spatial reference. It is typically used for converting
 * geometries between Web Mercator and other spatial references.
 * @param {any} Point - The `Point` parameter is a class or object that represents a point geometry in
 * the Esri ArcGIS API. It is used to create and manipulate point geometries.
 */
export const updatingCircleGeometry = (event: __esri.SketchUpdateEvent, geometryEngine: __esri.geometryEngine, Polyline: any, webMercatorUtils: __esri.webMercatorUtils, Point: any, geodesicUtils: __esri.geodesicUtils, Graphic: any, SimpleLineSymbol: any) => {
    const graphic: any = event.graphics[0];
    let radius = 0
    if ((graphic.title as string).includes('circle')) {
     
        const area = geometryEngine.geodesicArea(graphic.geometry, 'square-meters')
        radius = Math.sqrt(area / Math.PI)
        circleTrnaformationState(event, radius, Polyline, webMercatorUtils, Point, Graphic, geometryEngine, SimpleLineSymbol)
    }
}

const convertGeometrySpatial_4326 = (currentPoint: any, webMercatorUtils: __esri.webMercatorUtils) => {
    return (webMercatorUtils as __esri.webMercatorUtils).webMercatorToGeographic(currentPoint);
}