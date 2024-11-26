import { loadEsriModules } from "../../Utils/CustomerMaps/Maps/getEsriModules"

type OffsetUnit = "meters" | "feet" | "kilometers" | "miles" | "nautical-miles" | "yards"

/**
 * The function `getOffsetGeometry` takes a geometry or polyline and returns a new geometry that is
 * offset by a specified distance and unit.
 * @param {__esri.Geometry | __esri.Polyline} geometry - The `geometry` parameter is the input geometry
 * that you want to offset. It can be either a `__esri.Geometry` object or a `__esri.Polyline` object.
 * @param {number} offsetvalue - The offset value is the distance by which you want to offset the
 * geometry. It is a number that represents the distance in the units specified by the offsetUnit
 * parameter. For example, if you want to offset the geometry by 10 meters, you would pass 10 as the
 * offset value.
 * @param {OffsetUnit} [offsetUnit=meters] - The `offsetUnit` parameter is an optional parameter that
 * specifies the unit of measurement for the offset value. It can be one of the following values:
 * @returns the offset geometry, which is the result of applying an offset to the input geometry.
 */
 export const getOffsetGeometry = async (geometry: __esri.Geometry | __esri.Polyline, offsetvalue: number, offsetUnit: OffsetUnit = 'meters') => {
    try {
        const [geometryEngine] = await loadEsriModules(["esri/geometry/geometryEngine"]);
        const offsetGeometry = (geometryEngine as __esri.geometryEngine).offset(geometry, offsetvalue, offsetUnit)
        return offsetGeometry;
    } catch (e) {
        return null;
    }
}