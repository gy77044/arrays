export const rooftopGenrationObject = {} as TRoofTopObject


function GetTableCombination(totalTablesinBlock: number): any[] {
    const noTable = Math.ceil(totalTablesinBlock);
    const combDict = []

    let comnination = {
    };

    for (let i = 1; i <= noTable; i++) {
        const colArr = [];
        for (let j = noTable; j > 0; j--) {
            if (i * j <= noTable) {
                comnination = {
                    row: i,
                    col: j,
                    totalCount: i * j,
                    diff: Math.abs(i - j)
                }
                colArr.push(comnination);
            }
        }
        const res = GetClosest(colArr, noTable);
        combDict.push(res);
    }

    combDict.sort((a, b) => {
        return b.totalCount - a.totalCount;
    });
    let lastSmallestCombination = null;
    for (let limit = 0; limit < 10; limit++) {
        if (lastSmallestCombination == null) {
            lastSmallestCombination = combDict[limit];
        }
        else {
            if (combDict[limit].diff < lastSmallestCombination.diff) {
                lastSmallestCombination = combDict[limit];
            }
        }

    }

    return lastSmallestCombination;
}

function GetClosest(data: any[], target: number) {
    return data.reduce((acc, obj) =>
        Math.abs(target - obj.totalCount) < Math.abs(target - acc.totalCount) ? obj : acc
    );
}

export const swapDimensions = (orientation: string) => {
    if (orientation.toLowerCase() === "p") {
        const dimen: TDimensions = { xLength: rooftopGenrationObject.moduleDimensions.yLength, yLength: rooftopGenrationObject.moduleDimensions.xLength }
        rooftopGenrationObject.moduleDimensions = dimen
    }
}

type TDimensions = {
    xLength: number
    yLength: number
}

type TTableCombination = {
    rows: number
    columns: number
}

type TRoofTopObject = {
    tableCombination: TTableCombination
    moduleDimensions: TDimensions
    inverterDimensions: TDimensions,
    tableBlock: TDimensions
    orientation: string
    totalTablesinBlock: number
    structureToStructureGap: number
    stringPerInverter: number
    connectedInverter: number
    
    // roofinfo 
    rooftopType: string
    roofCovering: string
    roofShape: string
    
    buildingHeight: number
    pitch: number
    drainageDirection: "Left" | "Right" | "Up" | "Down"

    inputType: "Manual" | "Automatic"
    windExposure: string
    riskCategory: string
    windSpeed: number
    snowfall: number
}