import Collection from "@arcgis/core/core/Collection";
import Graphic from "@arcgis/core/Graphic";

export const getGroupByLng = (xs: __esri.Graphic[], sortbyProperty: string) => {
    var grouped = [] as Record<number, __esri.Graphic[]>;
    var xsarr: __esri.Graphic[] = xs;

    for (var i = 0; i < xs.length; i++) {
        var key = (xs[i].geometry as any).centroid.longitude;
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(xsarr[i]);
    }
    return grouped;
}
