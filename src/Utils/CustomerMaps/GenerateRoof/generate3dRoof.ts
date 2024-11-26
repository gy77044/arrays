import { loadModules } from "esri-loader";
import globalLayers from "../Maps/GlobaLMap";
import { CalPolyRoofModules, genGeomCallBack_3dSymbols } from "../Maps/CalPolyModules";
import { getGraphic } from "../Maps/getFucntion";
import { PvSymbols } from "../MarkerSymbols/MarkerSymbols";

export const pvHandleRoofTop_3d = async (polygon2: any, elevation: number) => {
    const [geometryEngine, webMercatorUtils] = await loadModules(["esri/geometry/geometryEngine", "esri/geometry/support/webMercatorUtils"]);
    const lineSymbol = PvSymbols.lineSymbol([30, 50, 90], [80, 80, 80], 3)

    let polygon = {} as any
    if (polygon2 !== undefined && polygon2.spatialReference.wkid === 102100) {
        const geometry_4326 = (webMercatorUtils as __esri.webMercatorUtils).webMercatorToGeographic(polygon2);
        polygon = geometry_4326;
    };

    const simpleFillSymbol = {
        type: "polygon-3d",  // autocasts as new PointSymbol3D()
        symbolLayers: [{
            type: "object",  // autocasts as new ObjectSymbol3DLayer()
            resource: {
                href: "panel.glb"
            },
            height: 2.17,
            width: 1.13,
            heading: 270,
            material: {
                color: "#1c2a53"
            }
        }]
    };

    const polygonGraphic = getGraphic(polygon, simpleFillSymbol, {});
    const height_3d_object = globalLayers.height;
    const polyBlockCollection = await CalPolyRoofModules({ RoadWidth: 0.8 }, polygonGraphic, height_3d_object + globalLayers.altitude);
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
                grdLayerGraphicsArrFilter.push(element);
                const path1 = [
                    [element.geometry.rings[0][0][0], element.geometry.rings[0][0][1] + (0.665 / 100000), height_3d_object + globalLayers.altitude],
                    [element.geometry.rings[0][0][0], element.geometry.rings[0][0][1] + (0.665 / 100000), height_3d_object + globalLayers.altitude + 1.3]
                ]
                const path2 = [
                    [element.geometry.rings[0][3][0], element.geometry.rings[0][3][1] + (0.665 / 100000), height_3d_object + globalLayers.altitude],
                    [element.geometry.rings[0][3][0], element.geometry.rings[0][3][1] + (0.665 / 100000), height_3d_object + globalLayers.altitude + 1.3]
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

    genGeomCallBack_3dSymbols(grdLayerGraphicsArrFilter, simpleFillSymbol, "RoofTopModule_3d");
}