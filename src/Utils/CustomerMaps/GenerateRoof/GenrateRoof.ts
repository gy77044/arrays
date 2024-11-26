import { loadModules } from "esri-loader";
import globalLayers from "../Maps/GlobaLMap";
import { CalPolyRoofModules } from '../Maps/CalPolyModules';
import { getGraphic } from "../Maps/getFucntion";
import { generateRoofBlocks } from "./generateRoofBlocks";
import { PvSymbols, simpleFillSymbol_2d } from "../MarkerSymbols/MarkerSymbols";
// import { removeSearchedGraphic } from "../MapHelpers/removeaddressGraphic";

export const getAltitude = (z: number) => {
    return Math.round((z + Number.EPSILON) * 100) / 100
}

/**
 * The function `pvHandleRoofTop` handles the rooftop polygons, calculates the elevation, and generates
 * graphics for the roof blocks.
 * @param {any} polygon2 - The `polygon2` parameter is an object representing a polygon geometry. It is
 * used to define the shape of the rooftop.
 * @param {number} elevation - The `elevation` parameter is a number that represents the elevation of 
 * the rooftop. It is used in calculations and graphics generation within the `pvHandleRoofTop`
 * function.
 * @param {string} title - The `title` parameter is a string that represents the title or name of the
 * roof.
 */
export const pvHandleRoofTop = async (polygon2: any, elevation: number, title: string, selected_id?: string) => {
    const [geometryEngine, webMercatorUtils, GraphicsLayer] = await loadModules(["esri/geometry/geometryEngine", "esri/geometry/support/webMercatorUtils", "esri/layers/GraphicsLayer"]);
    const lineSymbol = PvSymbols.lineSymbol([30, 50, 90], [80, 80, 80], 3)
    const simpleFillSymbol = simpleFillSymbol_2d();
    let polygon = {} as any
    
    if (polygon2?.spatialReference?.wkid === 102100) {
        const geometry_4326 = (webMercatorUtils as __esri.webMercatorUtils).webMercatorToGeographic(polygon2);
        polygon = geometry_4326
    }

    if(polygon.rings === undefined) return;
    if(polygon.rings.length === 0) return;
    const lowerLeftPoints = findLowerLeftPointOfPolygon(polygon.rings[0]);

    const point = { //Create a point
        type: "point",
        longitude: lowerLeftPoints.x,
        latitude: lowerLeftPoints.y
    };
    const simpleMarkerSymbol = {
        type: "simple-marker",
        color: [226, 119, 40],  // Orange
        outline: {
            color: [255, 255, 255], // White
            width: 1
        }
    };

    let azimuthAngle = globalLayers.azimuth;

    let pointGraphic = getGraphic(point, simpleMarkerSymbol, {});
    //const pointGeometry_4326 = (webMercatorUtils as __esri.webMercatorUtils).webMercatorToGeographic(pointGraphic.geometry);
    polygon = geometryEngine.rotate(polygon, -azimuthAngle, pointGraphic.geometry);

    let polygonGraphic = getGraphic(polygon, simpleFillSymbol, {});
    const polyBlockCollection = await CalPolyRoofModules({ RoadWidth: 0.8 }, polygonGraphic, globalLayers.elevationP + globalLayers.altitude);
    const grdLayerGraphicsArr: any[] = [];
    const grdLayerGraphicsArrAngles: any[] = [];
    polyBlockCollection.forEach((element: any) => {
        const pGraphic = getGraphic(element, simpleFillSymbol, {});
        grdLayerGraphicsArr.push(pGraphic);
    });

    const grdLayerGraphicsArrFilter: any[] = [];
    grdLayerGraphicsArr.forEach(element => {
        if (polygon != null) {
            if (geometryEngine.contains(polygon, element.geometry)) {

                let symb = {
                    type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                    color: [0, 0, 75, 0.4],
                    outline: { 
                      color: [128, 128, 128, 0.5],
                      width: "0.5px"
                    }
                  };

                const rotateelem = geometryEngine.rotate(element.geometry, azimuthAngle, pointGraphic.geometry);
                let rotateelemGraphic = getGraphic(rotateelem, symb, {});

                grdLayerGraphicsArrFilter.push(rotateelemGraphic);

                const path1 = [
                    [element.geometry.rings[0][0][0], element.geometry.rings[0][0][1] + (0.665 / 100000), globalLayers.elevationP + globalLayers.altitude],
                    [element.geometry.rings[0][0][0], element.geometry.rings[0][0][1] + (0.665 / 100000), globalLayers.elevationP + globalLayers.altitude + 1.3]
                ]
                
                const path2 = [
                    [element.geometry.rings[0][3][0], element.geometry.rings[0][3][1] + (0.665 / 100000), globalLayers.elevationP + globalLayers.altitude],
                    [element.geometry.rings[0][3][0], element.geometry.rings[0][3][1] + (0.665 / 100000), globalLayers.elevationP + globalLayers.altitude + 1.3]
                ]

                const polyline1 = PvSymbols.polyLine("polyline", path1)
                const polyline2 = PvSymbols.polyLine("polyline", path2)
                const polylineGraphic1 = getGraphic(polyline1, lineSymbol, {});
                const polylineGraphic2 = getGraphic(polyline2, lineSymbol, {});
                grdLayerGraphicsArrAngles.push(polylineGraphic1);
                grdLayerGraphicsArrAngles.push(polylineGraphic2);
            }
        }
        else {
            alert('Contact Administrator for Help');
            return;
        }
    });

    globalLayers.RemoveLayer(title);
    globalLayers.RemoveLayer("ModuleAngles");

    if (globalLayers.roofModuleGraphicLayer) {
        globalLayers.roofModuleGraphicLayer.id = title;
        globalLayers.roofModuleGraphicLayer.title = title;
    }
    generateRoofBlocks(grdLayerGraphicsArrFilter, simpleFillSymbol, title, pointGraphic);
    // removeSearchedGraphic()
}

const findLowerLeftPointOfPolygon = (polygonRing: any) => {
    var lowerLeftPoint = {
        x: Number.MAX_VALUE,
        y: Number.MAX_VALUE,
    };

    for (var i = 0; i < polygonRing.length; i++) {
        if (polygonRing[i][0] < lowerLeftPoint.x) {
            lowerLeftPoint.x = polygonRing[i][0];
        }

        if (polygonRing[i][1] < lowerLeftPoint.y) {
            lowerLeftPoint.y = polygonRing[i][1];
        }
    }

    return lowerLeftPoint;
}