import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { getSimpleLineSymboleMarker, getTextSymbolObject } from "../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";
import { getRingsLengthPointsGeom } from "./getLineLengthfromRings";
import { getPointPairsFromRing } from "./getPointPairsFromRing";


export const getGeometryRingPolyline = (graphics: any, Point: any, geodesicUtils: __esri.geodesicUtils, webMercatorUtils: any, SimpleLineSymbol: any, Polyline: any, Graphic: any, SpatialReference: any, TextSymbol: any, geometryEngine: __esri.geometryEngine, titles: string[]) => {
    globalLayers.removePolyLineswithTitle(titles)

    globalLayers.sketchVM.updateGraphics.forEach((graphic: any) => {

        if ((graphic?.title as string)?.includes('circle')) {
            return;
        }

        const polygon = graphic.geometry;
        var similarTitledGraphic = [] as __esri.Graphic[];
        if(globalLayers.sketchLayers?.graphics.length === 0) return;
        globalLayers.sketchLayers?.graphics.forEach((ele: any) => {
            if( !ele.geometry  || !ele.geometry.type) return
            if (ele.geometry.type === "polygon") return;
            if (ele?.title === graphic?.title) {
                similarTitledGraphic.push(ele)
            }
        })

        globalLayers.sketchLayers?.graphics.forEach((el) => {
            if( !el.geometry  || !el.geometry.type) return
            if (el.geometry.type !== 'polygon') {
                // globalLayers.sketchLayers?.graphics.remove(el);
            }
        })


        globalLayers.convertSpatialSystem(polygon).then((geom: any) => {
            const pairs = getPointPairsFromRing(geom.rings[0] as any);
            const pairs_102100 = getPointPairsFromRing(polygon.rings[0] as any);
            const ringObj = getRingsLengthPointsGeom(pairs, geodesicUtils, Point, pairs_102100);

            if (Object.keys(ringObj).length) {
                Object.entries(ringObj).forEach((val: any[], i) => {

                    const start = [val[1].pointsArrya[0].longitude, val[1].pointsArrya[0].latitude]
                    const end = [val[1].pointsArrya[1].longitude, val[1].pointsArrya[1].latitude]

                    const PolyLineGeom = new Polyline({
                        paths: [[end, start]],
                        spatialReference: new SpatialReference({ wkid: 102100 })
                    })

                    const lineGeom = geometryEngine.offset(PolyLineGeom, 2, 'meters') as any
                    const lineSymbol = getSimpleLineSymboleMarker(SimpleLineSymbol);
                    const lineGraphic = new Graphic({
                        geometry: lineGeom,
                        symbol: lineSymbol,
                        title: graphic.title
                    });

                    globalLayers.sketchLayers?.graphics.add(lineGraphic);
                    const textSymbol = new TextSymbol(getTextSymbolObject(val[1].length, [0, 0, 0]));
                    const newPointGeomOffset = geometryEngine.offset(lineGeom, 2, 'meters') as any
                    let last = newPointGeomOffset.paths[0][0]
                    let current = newPointGeomOffset.paths[0][1]
                    const midPointOffsetGeometry = new Point({
                        x: (last[0] + current[0]) / 2,
                        y: (last[1] + current[1]) / 2,
                        spatialReference: { wkid: 102100 }, // Assuming the coordinates are in WKID 4326 (WGS 1984)
                    });
                    const textGraphic = new Graphic({
                        geometry: midPointOffsetGeometry,
                        symbol: textSymbol,
                        title: graphic.title
                    });

                    globalLayers.sketchLayers?.graphics.add(textGraphic);

                })
            }
        })
    })
}