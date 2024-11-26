import * as geometryEngine from '@arcgis/core/geometry/geometryEngine';
import { getGraphic } from './getFucntion';
import { PvSymbols } from '../../CustomerMaps/MarkerSymbols/MarkerSymbols';

type TNextPointReturn = {
    x: number;
    y: number;
}
type TPolyRingPoint = {
    px: number;
    py: number;
}

export class PvDrawClass {
    constructor() {

    }
    drawObj(lenP: number, widP: number, startPX: number, startPY: number, xRows: number, yCols: number, spaceX: number, spaceY: number) {
        const d = {
            lenP: lenP,
            widP: widP,
            startPX: startPX,
            startPY: startPY,
            xRows: xRows,
            yCols: yCols,
            nxtStartPx: startPX,
            nxtStartPy: startPY
        };
        let nxtStartPx = startPX;
        let nxtStartPy = startPY;
        let nxtTempPy = startPY;
        const polyObjCol = [];
        for (let x = 0; x < yCols; x++) {
            nxtStartPx = startPX;

            for (let y = 0; y < xRows; y++) {
                if (y == 0) {
                    const nxtP = this.getNextPoint(nxtStartPx, nxtTempPy, d.lenP, d.widP, x, y, spaceX, xRows, yCols);
                    nxtTempPy = nxtP.y;
                }
                polyObjCol.push(this.drawPolygon(nxtStartPx, nxtTempPy, d.lenP, d.widP));
                const nxtP = this.getNextPoint(nxtStartPx, nxtTempPy, d.lenP, d.widP, x, y, spaceY, xRows, yCols);
                nxtStartPx = nxtP.x;
                nxtStartPy = nxtP.y;

            }
        }
        return polyObjCol;
    }
    drawObjWithHeight(lenP: number, widP: number, startPX: number, startPY: number, xRows: number, yCols: number, spaceX: number, spaceY: number, height: number) {
        const d = {
            lenP: lenP,
            widP: widP,
            startPX: startPX,
            startPY: startPY,
            xRows: xRows,
            yCols: yCols,
            nxtStartPx: startPX,
            nxtStartPy: startPY
        };
        let nxtStartPx = startPX;
        let nxtStartPy = startPY;
        let nxtTempPy = startPY;
        const polyObjCol = [];
        for (let x = 0; x < yCols; x++) {
            nxtStartPx = startPX;

            for (let y = 0; y < xRows; y++) {
                if (y == 0) {
                    const nxtP = this.getNextPoint(nxtStartPx, nxtTempPy, d.lenP, d.widP, x, y, spaceX, xRows, yCols);
                    nxtTempPy = nxtP.y;
                }
                polyObjCol.push(this.drawPolygon(nxtStartPx, nxtTempPy, d.lenP, d.widP, undefined, height));
                const nxtP = this.getNextPoint(nxtStartPx, nxtTempPy, d.lenP, d.widP, x, y, spaceY, xRows, yCols);
                nxtStartPx = nxtP.x;
                nxtStartPy = nxtP.y;

            }
        }
        return polyObjCol;
    }
    drawObjTemp(lenP: number, widP: number, startPX: number, startPY: number, xRows: number, yCols: number, spaceX: number, spaceY: number) {
        const d = {
            lenP: lenP,
            widP: widP,
            startPX: startPX,
            startPY: startPY,
            xRows: xRows,
            yCols: yCols,
            nxtStartPx: startPX,
            nxtStartPy: startPY
        };
        let nxtStartPx = startPX;
        let nxtStartPy = startPY;
        let nxtTempPy = startPY;
        const polyObjCol = [];
        const invArray = [];

        const simpleFillSymbol = PvSymbols.simpleFillNone([10, 40, 100, 0.5], [50, 70, 40], 3)

        invArray.push(getGraphic(this.getSamplePoly(), simpleFillSymbol, {}).geometry);
        for (let x = 0; x < yCols; x++) {

            nxtStartPx = startPX;

            for (let y = 0; y < xRows; y++) {
                let nxtP = {} as TNextPointReturn;
                let roadhorizontal = 0;
                let roadvertical = 0;
                if (Math.ceil(yCols / 2) == x) {
                    roadvertical = spaceX + spaceX;
                }
                else {
                    roadvertical = spaceX;
                }
                if (y == 0) {

                    nxtP = this.getNextPoint(nxtStartPx, nxtTempPy, d.lenP, d.widP, x, y, roadvertical, xRows, yCols);
                    nxtTempPy = nxtP.y;
                }
                if (Math.ceil(xRows / 2) == y) {
                    roadhorizontal = spaceY + spaceY;
                }
                else {
                    roadhorizontal = spaceY;
                }
                let poly = {};
                if (Math.ceil(xRows / 2) == y && Math.ceil(yCols / 2) == x) {
                    // console.log('InterSect Hori&Verti : ' + yCols + "::" + xRows);
                    poly = this.drawPolygon(nxtStartPx, nxtTempPy, d.lenP, d.widP);
                    // invArray.push(getGraphic(poly, simpleFillSymbol, {}).geometry);
                }
                else {
                    poly = this.drawPolygon(nxtStartPx, nxtTempPy, d.lenP, d.widP);
                }

                const p1 = getGraphic(poly, simpleFillSymbol, {}).geometry;
                const p2 = getGraphic(this.getSamplePoly(), simpleFillSymbol, {}).geometry;

                const isIntersecting = geometryEngine.intersect(invArray, p1) as any;
                if (isIntersecting.length >= 1 && isIntersecting[0] != null) {
                    console.log('InterSect : ' + yCols + "::" + xRows);
                    //polyObjCol.push(poly)
                }
                else {
                    polyObjCol.push(poly);
                }
                nxtP = this.getNextPoint(nxtStartPx, nxtTempPy, d.lenP, d.widP, x, y, roadhorizontal, xRows, yCols);
                nxtStartPx = nxtP.x;
                nxtStartPy = nxtP.y;
            }

        }
        return polyObjCol;
    }

    getSamplePoly(spatialRef: any = undefined) {
        const rings = [
            [
                71.98716402053833,
                27.532115620713576
            ],
            [
                71.98750734329224,
                27.532115620713576
            ],
            [
                71.98750734329224,
                27.53240103480712
            ],
            [
                71.98716402053833,
                27.53240103480712
            ],
            [
                71.98716402053833,
                27.532115620713576
            ]
        ]

        return {
            type: "polygon",
            rings: [rings],
            //spatialReference: spatialRef
        };
    }

    drawInvObj(invLeftPointCollection: any[], invRightPointCollection: any[], invDimentions: { InvLen: any; InvWid: any; }, mmsType: string) {
        const invLen = invDimentions.InvLen;
        const invWid = invDimentions.InvWid;
        const polyObjColl: { type: string; rings: any[][]; spatialReference: any; }[] = [];
        if (mmsType == "L") {
            invLeftPointCollection.forEach(element => {
                const PointA = { px: element.geometry.x - invLen / 2, py: element.geometry.y };
                const PointB = { px: element.geometry.x - invLen / 2, py: element.geometry.y - invWid };
                const PointC = { px: element.geometry.x + invLen / 2, py: element.geometry.y - invWid };
                const PointD = { px: element.geometry.x + invLen / 2, py: element.geometry.y };
                polyObjColl.push(this.createPolyRings(PointA, PointB, PointC, PointD));
            });

            invRightPointCollection.forEach(element => {

                const PointA = { px: element.geometry.x - invLen / 2, py: element.geometry.y };
                const PointB = { px: element.geometry.x - invLen / 2, py: element.geometry.y + invWid };
                const PointC = { px: element.geometry.x + invLen / 2, py: element.geometry.y + invWid };
                const PointD = { px: element.geometry.x + invLen / 2, py: element.geometry.y };
                polyObjColl.push(this.createPolyRings(PointA, PointB, PointC, PointD));

            });
        }
        else {
            invLeftPointCollection.forEach(element => {
                const PointA = { px: element.geometry.x, py: element.geometry.y - invLen / 2 };
                const PointB = { px: element.geometry.x, py: element.geometry.y + invLen / 2 };
                const PointC = { px: element.geometry.x - invWid, py: element.geometry.y + invLen / 2 };
                const PointD = { px: element.geometry.x - invWid, py: element.geometry.y - invLen / 2 };
                polyObjColl.push(this.createPolyRings(PointA, PointB, PointC, PointD));
            });

            invRightPointCollection.forEach(element => {

                const PointA = { px: element.geometry.x, py: element.geometry.y - invLen / 2 };
                const PointB = { px: element.geometry.x, py: element.geometry.y + invLen / 2 };
                const PointC = { px: element.geometry.x + invWid, py: element.geometry.y + invLen / 2 };
                const PointD = { px: element.geometry.x + invWid, py: element.geometry.y - invLen / 2 };
                polyObjColl.push(this.createPolyRings(PointA, PointB, PointC, PointD));

            });
        }
        return polyObjColl;

    }
    drawPolygon(pointX: number, pointY: number, lenP: number, widP: number, spatialRef: any = undefined, height = 0) {
        const lenPCord = lenP
        const widPCord = widP
        const PointA = {
            px: pointX,
            py: pointY
        };
        const PointB = {
            px: pointX + lenPCord,
            py: pointY
        };
        const PointC = {
            px: pointX + lenPCord,
            py: pointY - widPCord
        };
        const PointD = {
            px: pointX,
            py: pointY - widPCord
        };
        return (this.createPolyRings(PointA, PointB, PointC, PointD, spatialRef, height));
    }
    getNextPoint(lastPointX: number, lastPointY: number, lenP: number, widP: number, iX: number, iY: number, space: number, xRows: number, yCols: number): TNextPointReturn {
        const lenPCord = lenP;
        const widPCord = widP;
        let x = lastPointX + (lenPCord) + space;
        let y = lastPointY - (widPCord) - space;
        if (iX == 0) {
            x = lastPointX + (lenPCord) + space;
            y = lastPointY - space;
        }
        else {
            x = lastPointX + (lenPCord) + space;
            y = lastPointY - (widPCord) - space;

        }

        // console.log("X:" + x + "," + "Y:" + y + ",iX:" + iX);
        return { x: x, y: y }
    }
    createPolyRings(PointA: TPolyRingPoint, PointB: TPolyRingPoint, PointC: TPolyRingPoint, PointD: TPolyRingPoint, spatialRef: any = undefined, height = 0) {
        //spatialRef = getAppConfig().sceneView.spatialReference;
        if (height == 0) {
            return {
                type: "polygon",
                rings: [
                    [PointA.px, PointA.py],
                    [PointB.px, PointB.py],
                    [PointC.px, PointC.py],
                    [PointD.px, PointD.py],
                    [PointA.px, PointA.py]],
                spatialReference: spatialRef
            };
        }
        else {
            return {
                type: "polygon",
                rings: [
                    [PointA.px, PointA.py, height - 8],
                    [PointB.px, PointB.py, height - 4],
                    [PointC.px, PointC.py, height - 4],
                    [PointD.px, PointD.py, height - 8],
                    [PointA.px, PointA.py, height - 8]],
                spatialReference: spatialRef
            };
        }
    }
    createPolyRingsModule(PointA: TPolyRingPoint, PointB: TPolyRingPoint, PointC: TPolyRingPoint, PointD: TPolyRingPoint, spatialRef: any = undefined, height = 0, rownumber: number) {
        //spatialRef = getAppConfig().sceneView.spatialReference;
        if (rownumber == 2) {
            return {
                type: "polygon",
                rings: [
                    [PointA.px, PointA.py, height - 7],
                    [PointB.px, PointB.py, height - 5.8],
                    [PointC.px, PointC.py, height - 5.8],
                    [PointD.px, PointD.py, height - 7.8],
                    [PointA.px, PointA.py, height - 7.8]],
                spatialReference: spatialRef
            };
        }
        else {
            return {
                type: "polygon",
                rings: [
                    [PointA.px, PointA.py, height - 6],
                    [PointB.px, PointB.py, height - 3.8],
                    [PointC.px, PointC.py, height - 3.8],
                    [PointD.px, PointD.py, height - 5.7],
                    [PointA.px, PointA.py, height - 5.7]],
                spatialReference: spatialRef
            };
        }
    }
}