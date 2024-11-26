import { getRandomColor } from "../Maps/CalPolyModules";
import { getGraphic } from "../Maps/getFucntion";

/**
 * The function `changeGroupSymbol` takes an array of objects, `splicedArr`, and an integer,
 * `isMatrix`, and returns an array of graphics with a simple fill symbol applied to them.
 * @param {any[][]} splicedArr - An array of arrays, where each inner array represents a group of
 * elements. Each group can contain multiple elements.
 * @param {number} isMatrix - The `isMatrix` parameter is a number that indicates whether the
 * `splicedArr` is a matrix or not. A value of 1 indicates that `splicedArr` is a matrix, while any
 * other value indicates that it is not a matrix.
 * @returns an array of __esri.Graphic objects.
 */
export function changeGrpGraphicSymbolFill(splicedArr: any[][], isMatrix: number) {
    let graphics: __esri.Graphic[] = [];
    const c1 = Math.random() * (255 - 1) + 1;
    const c2 = Math.random() * (255 - 1) + 1;
    const c3 = Math.random() * (255 - 1) + 1;

    var simpleFillSymbol = {
        type: "simple-fill",
        color: [c1, c2, c3, 0.5], // orange, opacity 80%
        outline: {
            color: [c1, c2, c3],
            width: 1
        }
    };

    splicedArr.forEach((element, i) => {
        if(element){
            if(element.length){
                element[0].symbol = simpleFillSymbol
                const graph = getGraphic(element[0].geometry, simpleFillSymbol, { title: i + "roofPanel" })
                graphics.push(graph)
            }
        }
    })
    return graphics;
}