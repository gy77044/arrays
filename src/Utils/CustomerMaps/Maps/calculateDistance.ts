import { loadEsriModules } from "./getEsriModules";

/**
 * The function calculates the distance between two graphics using the geometryEngine module in the
 * ArcGIS API for JavaScript.
 * @param graphic1 - The first graphic object for which you want to calculate the distance.
 * @param graphic2 - The `graphic2` parameter is an instance of the `__esri.Graphic` class. It
 * represents a graphic object with a geometry that you want to calculate the distance to.
 * @param [spatialReference] - The `spatialReference` parameter is an optional parameter that specifies
 * the spatial reference system to use for the calculation. If not provided, the default spatial
 * reference of the graphics will be used.
 * @returns the distance between two graphics if they have valid geometries. If either of the graphics
 * does not have a geometry, it will return null. If there is an error during the calculation, it will
 * also return null.
 */
export async function calculateDistanceBetweenGraphics(graphic1: __esri.Graphic , graphic2: __esri.Graphic, spatialReference?: __esri.SpatialReference ) {
    try{
        const [geometryEngine] = await loadEsriModules(['esri/geometry/geometryEngine'])
        if (!graphic1.geometry || !graphic2.geometry) {
            return null; // Handle cases where graphics have no geometry
        }
        const distance = (geometryEngine as __esri.geometryEngine).distance(graphic1.geometry, graphic2.geometry);
        return distance;
    }
    catch(e){
        return null
    }
}


