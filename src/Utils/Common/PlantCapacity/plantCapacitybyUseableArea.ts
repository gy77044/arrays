import { defaultmoduleLength, defaultmoduleWidth } from "../../Const";

const coverageFactor= 0.8;
export const plantCapacitybyUseableArea = (useableArea: number, modulePower: number) => {
    return Math.round((useableArea * coverageFactor * modulePower) /((defaultmoduleWidth*defaultmoduleLength)*1000))
}