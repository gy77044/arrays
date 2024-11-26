import globalLayers from "./GlobaLMap";
import { PvSymbols } from "../MarkerSymbols/MarkerSymbols";
import { genGeomCallBack_3D } from "./CalPolyModules";
import { loadMultipleModules } from "./LazyloadMap";
import { PvDrawCalucation } from "./PvDrawCalculation";
import { PvDrawClass } from "./PvDrawClass";
import { getGraphic } from "./getFucntion";
import { rooftopGenrationObject } from "./getRooftopObject";

export async function pvGenerate3D() {

    const portraitLen = rooftopGenrationObject.orientation.toLowerCase() === "p" ? 194 : 196
    const tablesGeometry = globalLayers.view?.map.layers.filter((item: { title: string; }) => item.title === "Project Layers");
    let tables: any = null
    if (tablesGeometry?.length) {
        tables = tablesGeometry
    }

    const simpleFillSymbol = PvSymbols.simpleFillSymbol([92, 108, 130, 0.8], [229, 229, 237, 0.9]);
    const simpleFillSymbolModule = PvSymbols.simpleFillSymbol([30, 50, 90, 0.5], [80, 80, 80])
    const lineSymbol = PvSymbols.lineSymbol([30, 50, 90], [80, 80, 80])

    const grdLayerGraphicsArr: any[] = [];
    const grdLayerGraphicsArrMdule: any[] = [];
    const grdLayerGraphicsArrAngles: any[] = [];
    tables.source._items.forEach((element: { geometry: { rings: number[][][]; }; }) => {
        const PointA = { px: element.geometry.rings[0][0][0], py: element.geometry.rings[0][0][1] };
        const PointB = { px: element.geometry.rings[0][1][0], py: element.geometry.rings[0][1][1] };
        const PointC = { px: element.geometry.rings[0][2][0], py: element.geometry.rings[0][2][1] };
        const PointD = { px: element.geometry.rings[0][3][0], py: element.geometry.rings[0][3][1] };
        const v = new PvDrawClass();
        const polygon = v.createPolyRings(PointA, PointB, PointC, PointD, undefined, 200);
        const polyGraphic = getGraphic(polygon, simpleFillSymbol, {});
        grdLayerGraphicsArr.push(polyGraphic);
        const polyline1 = {
            type: "polyline", // autocasts as new Polyline()
            paths: [
                [PointA.px, PointA.py + (2.27 / 100000 + 0.25 / 100000), 0],
                [PointA.px, PointA.py + (2.27 / 100000 + 0.25 / 100000), portraitLen]
            ]
        };
        const polyline2 = {
            type: "polyline", // autocasts as new Polyline()
            paths: [
                [PointD.px, PointD.py + (2.27 / 100000 + 0.25 / 100000), 0],
                [PointD.px, PointD.py + (2.27 / 100000 + 0.25 / 100000), portraitLen]
            ]
        };
        const polylineGraphic1 = getGraphic(polyline1, lineSymbol, {});
        const polylineGraphic2 = getGraphic(polyline2, lineSymbol, {});
        grdLayerGraphicsArrAngles.push(polylineGraphic1);
        grdLayerGraphicsArrAngles.push(polylineGraphic2);
        let lastLat = 0;
        let rownumber = 1;
        const grdLayerGraphics = PvDrawCalucation.drawPolyonInExtent(rooftopGenrationObject.moduleDimensions.xLength, rooftopGenrationObject.moduleDimensions.yLength, rooftopGenrationObject.pitch, rooftopGenrationObject.structureToStructureGap, element, true);
        grdLayerGraphics.forEach((polygon: any) => {
            const PointA = { px: polygon.rings[0][0], py: polygon.rings[0][1] };
            const PointB = { px: polygon.rings[1][0], py: polygon.rings[1][1] };
            const PointC = { px: polygon.rings[2][0], py: polygon.rings[2][1] };
            const PointD = { px: polygon.rings[3][0], py: polygon.rings[3][1] };
            const v = new PvDrawClass();
            if (lastLat == 0 || lastLat == PointA.py) {
                lastLat = PointA.py;
                rownumber = 2;
            }
            else if (lastLat != PointA.py) {
                rownumber = 0;
            }

            polygon = v.createPolyRingsModule(PointA, PointB, PointC, PointD, undefined, 200, rownumber);
            const polyGraphic = getGraphic(polygon, simpleFillSymbolModule, {});
            grdLayerGraphicsArrMdule.push(polyGraphic);
        });
        const geom = element.geometry;
        const polygonGraphic = getGraphic(geom, simpleFillSymbol, {});
        grdLayerGraphicsArr.push(polygonGraphic);
    });

    const layer1 = genGeomCallBack_3D(grdLayerGraphicsArr, simpleFillSymbol, "MMS Table");
    const layer2 = genGeomCallBack_3D(grdLayerGraphicsArrMdule, simpleFillSymbolModule, "3D Module");
    const layer3 = genGeomCallBack_3D(grdLayerGraphicsArrAngles, lineSymbol, "Legs");

    loadMultipleModules(["esri/layers/GroupLayer"])
        .then(([GroupLayer]) => {
            globalLayers.view?.map.add(new GroupLayer({
                layers: [layer1, layer2, layer3],
                title: "3D Module"
            }));
        })
}