import { llFromDistance } from "./GetDistance_ll";
import { PvDrawClass } from "./PvDrawClass";


type TExtentKeys = "mapXMin" | "mapXMax" | "mapYMin" | "mapYMax"
type TPoints = { a: number; b: number; }
type TCollection = { row: number, col: number, totalCount: number }

export var PvDrawCalucation = {

    /**
     * Calculating the extent of the polygon
     * @param {Geometry} polygonGraphic - polygon geometry
     * @returns {Object}
     */
    calPolyExtent: function (polygonGraphic: { geometry: any; }) {
        const maparea = polygonGraphic.geometry;
        const polyExtent: Record<TExtentKeys, number> = {
            "mapXMin": parseFloat(maparea.extent.xmin),
            "mapXMax": parseFloat(maparea.extent.xmax),
            "mapYMin": parseFloat(maparea.extent.ymin),
            "mapYMax": parseFloat(maparea.extent.ymax)
        };
        return polyExtent;
    },

    /**
   * Creating a polygon from the given points.
   * @param {Number} point1 -  axis point
   * @param {Number} point2 - axis point
   * @param {Number} point3 - axis point
   * @param {Number} point4 - axis point
   * @returns {Polygon}
   */
    calPolyFromPoints: function (point1: TPoints, point2: TPoints, point3: TPoints, point4: TPoints) {
        return {
            type: "polygon",
            rings: [
                [point1.a, point1.b],
                [point2.a, point2.b],
                [point3.a, point3.b],
                [point4.a, point4.b],
                [point1.a, point1.b]]
        };
    },

    /**
     * Return the Polygon Geometry Collection for given boundry
     * @param {Number} containerXLength -  lenght along x axis
     * @param {Number} containerYLength - lenght along y axis
     * @param {Geometry} boundaryGeom - Polygon geometry
     * @param {Number} contentEWSpace - Structure to Structure to gap
     * @param {Number} Pitch - Pitch or horizontal distance b/w module
     * @param {boolean} isModule - deafult false
     * @returns {*}
     */

    drawPolyonInExtent: function (containerXLength: number, containerYLength: number, Pitch: number, contentEWSpace: number, boundaryGeom: any, isModule = false) {
        const polyExtent = this.calPolyExtent(boundaryGeom);
        const xNxt = llFromDistance(polyExtent.mapYMin, polyExtent.mapXMin, containerXLength / 1000, 0);
        const yNxt = llFromDistance(polyExtent.mapYMin, polyExtent.mapXMin, containerYLength / 1000, 90);

        const EWSpace = llFromDistance(polyExtent.mapYMin, polyExtent.mapXMin, contentEWSpace / 1000, 0);
        const NSSpace = llFromDistance(polyExtent.mapYMin, polyExtent.mapXMin, 0.2 / 1000, 90);

        const xDist = yNxt[1] - polyExtent.mapXMin; //Next Long - Previuous Long
        const yDist = xNxt[0] - polyExtent.mapYMin; //Next Long - Previuous Long

        const contentEW = NSSpace[1] - polyExtent.mapXMin;
        const contentNS = EWSpace[0] - polyExtent.mapYMin;

        const precisionx = typeof (yDist) === "string" ? parseFloat(yDist) : yDist;
        const precisiony = typeof (xDist) === "string" ? parseFloat(xDist) : xDist;

        const PolyColection = [];
        let counter = 0;
        for (let x = polyExtent.mapXMin; x < polyExtent.mapXMax; x = x + precisionx) {
            for (let y = polyExtent.mapYMin; y <= polyExtent.mapYMax; y = y + precisiony) {
                const py1 = { a: x, b: y };
                const py2 = { a: x, b: y + precisiony };
                const py3 = { a: x + precisionx, b: y + precisiony };
                const py4 = { a: x + precisionx, b: y };
                PolyColection.push(this.calPolyFromPoints(py1, py2, py3, py4));
                if (isModule) {
                    y = y + contentNS;

                } else {
                    y = y + contentEW;
                }
                counter = counter + 1;
            }
            x = x + contentNS
        }
        return PolyColection;
    }

}
