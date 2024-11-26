import { getGroupByLng } from "./groupByLng";
import { sortGroupGraphicbyColRows } from "./groupingGraphics";


/**
 * The function `groupGraphicbyDistance` takes an array of graphics, the number of columns, and the
 * number of rows, and groups the graphics based on their longitude values.
 * @param {__esri.Graphic[]} graphics - An array of __esri.Graphic objects representing graphics on a
 * map.
 * @param {number} columns - The `columns` parameter represents the number of columns in the grid.
 * @param {number} rows - The `rows` parameter represents the number of rows in which the graphics will
 * be grouped.
 * @returns a two-dimensional array of __esri.Graphic objects.
 */
export function groupGraphicbyDistance(
    graphics: __esri.Graphic[],
    columns: number,
    rows: number,
    geometryEngine: __esri.geometryEngine,
    pointGraphicRotation: __esri.Graphic
): __esri.Graphic[][] {
    // const { columns, rows } = getColsRowsCombination(groupSize)
    let midPoint = Math.round(columns / 2)
    const groupedLng = getGroupByLng(graphics, 'longitude');
    // console.log(groupedLng)
    let polyCollections: any[] = [];
    (Object.keys(groupedLng)).forEach(element => {
        let v = element;
        let lastSavedIndex = 0;
        let arrLng = (groupedLng[v as keyof object]); 
        arrLng.forEach((element: any) => {
            lastSavedIndex = lastSavedIndex + 1;
            if (lastSavedIndex >= midPoint) {
                element.roadindex = 1;
                if (lastSavedIndex == columns) {
                    lastSavedIndex = 0;
                }
            }
        });
        polyCollections.push(arrLng);
    });


    const graphicCollection = sortGroupGraphicbyColRows(polyCollections, rows, columns, geometryEngine, pointGraphicRotation);
    return graphicCollection;
}