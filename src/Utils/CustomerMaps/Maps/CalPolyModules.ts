import { loadModules } from "esri-loader";
import globalLayers from "./GlobaLMap";
import { loadMultipleModules } from "./LazyloadMap";

type TPoints = { a: number; b: number; }
type TExtentKeys = "mapXMin" | "mapXMax" | "mapYMin" | "mapYMax"

export const CalPolyRoofModules = async (data: { RoadWidth: number }, boundaryGeom: any, height = 0) => {
    const [webMercatorUtils] = await loadMultipleModules(["esri/geometry/support/webMercatorUtils"])
    const d = data;
    const blockLen = 0.000023;//tableLen * d.TableRows + (d.StructureGap * d.TableRows);
    const blockWid = 0.000010;// tableWid * d.TableCols + (d.StructureGap * d.TableCols);

    if (boundaryGeom.geometry.spatialReference.wkid === 102100) {
        const geometry_4326 = (webMercatorUtils as __esri.webMercatorUtils).webMercatorToGeographic(boundaryGeom.geometry);
        boundaryGeom.geometry = geometry_4326
    }

    const polyExtent = calPolyExtent(boundaryGeom);
    const precisionx = typeof (blockLen) === "string" ? parseFloat(blockLen) : blockLen;
    const precisiony = typeof (blockWid) === "string" ? parseFloat(blockWid) : blockWid;
    const blockPolyColection: any[] = [];
    let blockCounter = 0;
    for (let x = polyExtent.mapXMin; x < polyExtent.mapXMax; x = x + blockLen) {
        for (let y = polyExtent.mapYMin; y <= polyExtent.mapYMax; y = y + blockWid) {
            const py1 = { a: x, b: y };
            const py2 = { a: x, b: y + precisiony };
            const py3 = { a: x + precisionx, b: y + precisiony };
            const py4 = { a: x + precisionx, b: y };
            blockPolyColection.push(calPolyFromPointsRoofTop(py1, py2, py3, py4, height));
            y = y + d.RoadWidth / 300000;
            blockCounter = blockCounter + 1;
        }
        x = x + d.RoadWidth / 300000;//d.PathWidth;
    }

    return blockPolyColection; //polyGraphicCollection; //this.calFilterInside(polyGraphicCollection,d.BlockCount);
}

export const CalPolyRoofModules_3D = async (data: { RoadWidth: number }, boundaryGeom: any, height = 0) => {
    const d = data;
    const blockLen = 0.000023; //tableLen * d.TableRows + (d.StructureGap * d.TableRows);
    const blockWid = 0.000010; // tableWid * d.TableCols + (d.StructureGap * d.TableCols);
    const polyExtent = calPolyExtent(boundaryGeom);
    const precisionx = typeof (blockLen) === "string" ? parseFloat(blockLen) : blockLen;
    const precisiony = typeof (blockWid) === "string" ? parseFloat(blockWid) : blockWid;
    const blockPolyColection: any[] = [];
    let blockCounter = 0;
    for (let x = polyExtent.mapXMin; x < polyExtent.mapXMax; x = x + blockLen) {
        for (let y = polyExtent.mapYMin; y <= polyExtent.mapYMax; y = y + blockWid) {
            const py1 = { a: x, b: y };
            const py2 = { a: x, b: y + precisiony };
            const py3 = { a: x + precisionx, b: y + precisiony };
            const py4 = { a: x + precisionx, b: y };
            blockPolyColection.push(calPolyFromPointsRoofTop(py1, py2, py3, py4, height));
            //y = y + d.RoadWidth//d.PathWidth;
            y = y + d.RoadWidth / 300000; // + d.RoadWidth//d.PathWidth;
            blockCounter = blockCounter + 1;
        }
        x = x + d.RoadWidth / 300000;//d.PathWidth;
    }

    return blockPolyColection; //polyGraphicCollection; //this.calFilterInside(polyGraphicCollection,d.BlockCount);
}

export const calPolyFromPointsRoofTop = (point1: TPoints, point2: TPoints, point3: TPoints, point4: TPoints, height = 0) => {
    return {
        type: "polygon",
        rings: [
            [point1.a, point1.b, height],
            [point2.a, point2.b, height + 2],
            [point3.a, point3.b, height + 2],
            [point4.a, point4.b, height],
            [point1.a, point1.b, height]]
    };
}

const calPolyExtent = (polygonGraphic: { geometry: any; }) => {
    const maparea = polygonGraphic.geometry;
    const polyExtent: Record<TExtentKeys, number> = {
        "mapXMin": parseFloat(maparea.extent.xmin),
        "mapXMax": parseFloat(maparea.extent.xmax),
        "mapYMin": parseFloat(maparea.extent.ymin),
        "mapYMax": parseFloat(maparea.extent.ymax)
    };
    return polyExtent;
}

export const getRandomColor = () => {
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);

    return [red, green, blue];
}

export const genGeomCallBack_3dSymbols = (polyGraphicCollection: any[], symbol: any, title: string, zoommin = 0, zoommax = 0, exp = "$feature.OBJECTID") => {
    createLayerWithSymbol(polyGraphicCollection, symbol, title, exp).then(lyrPath => {
        if (zoommin != 0) {
            lyrPath.minScale = zoommin;
            lyrPath.maxScale = zoommax;
        }

        globalLayers.map?.layers.add(lyrPath)
        return lyrPath;
    })
}

export const genGeomCallBack_3D = (polyGraphicCollection: any[], symbol: any, title: string, zoommin = 0, zoommax = 0, exp = "$feature.OBJECTID") => {
    createLayerWithSymbol(polyGraphicCollection, symbol, title, exp).then(lyrPath => {
        if (zoommin != 0) {
            lyrPath.minScale = zoommin;
            lyrPath.maxScale = zoommax;
        }
        return lyrPath;
    })
}


export async function createLayerWithSymbol(graphics: any, symbol: { type: string; color: number[]; outline: { color: number[]; width: number; }; }, title: any, exp = "$feature.OBJECTID") {

    const [FeatureLayer, SimpleRenderer] = await loadModules(["esri/layers/FeatureLayer", "esri/renderers/SimpleRenderer"])
    const renderer = new SimpleRenderer({
        symbol: symbol,
    });
    return new FeatureLayer({
        source: graphics,
        objectIdField: "OBJECTID",
        fields: [
            {
                name: "OBJECTID",
                type: "oid"
            },
            {
                name: "url",
                type: "string"
            }
        ],
        id: "pnlModulesPolygon",
        title: title,
        renderer: renderer
    });
}