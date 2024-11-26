import { changeGrpGraphicSymbolFill } from "./changeSymbol";

var groupedGraphics: any[] = [];
/**
 * The function sorts a collection of graphics into groups based on specified block sizes for rows and
 * columns.
 * @param {__esri.Graphic[][]} pcollection - An array of arrays of __esri.Graphic objects. Each inner
 * array represents a group of graphics.
 * @param {number} blockSizeRows - The parameter `blockSizeRows` represents the number of rows in each
 * block or group of graphics.
 * @param {number} blockSizeCols - The `blockSizeCols` parameter is the number of columns in each block
 * or group of graphics.
 * @returns the variable "groupedGraphics".
 */
export function sortGroupGraphicbyColRows(pcollection: __esri.Graphic[][], blockSizeRows: number, blockSizeCols: number, geometryEngine: __esri.geometryEngine, pointGraphicRotation: __esri.Graphic) {
    let remainingTables = 0;
    let tempPCol: any[][] = [];
    let monitorMaxTblRow = 0;
    let monitorMaxTblCol = 0;
    if (pcollection.length >= blockSizeCols) {
        for (let i = 0; i < blockSizeRows; i++) {
            for (let j = 0; j < blockSizeCols; j++) {
                if (pcollection[j].length > 0) {
                    tempPCol.push(pcollection[j].splice(0, 1));
                }
            }
        }

        monitorMaxTblRow = Math.ceil(remainingTables / blockSizeRows);
        monitorMaxTblCol = remainingTables % blockSizeCols;

        // const rotateelem = geometryEngine.rotate(element.geometry, 15, pointGraphic.geometry);
        //     let rotateelemGraphic = getGraphic(rotateelem, simpleFillSymbol, {});

        if (tempPCol.length > 0) {
            groupedGraphics.push(changeGrpGraphicSymbolFill(tempPCol, 1));
        }
        if (tempPCol.length > 0) {
            sortGroupGraphicbyColRows(pcollection, blockSizeRows, blockSizeCols, geometryEngine, pointGraphicRotation)
        }
        else {
            pcollection.splice(0, blockSizeCols)
            sortGroupGraphicbyColRows(pcollection, blockSizeRows, blockSizeCols, geometryEngine, pointGraphicRotation);
        }
    }

    return groupedGraphics;
}