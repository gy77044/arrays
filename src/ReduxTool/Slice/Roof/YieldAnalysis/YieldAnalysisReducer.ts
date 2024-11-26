import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoof } from "../roofType";
import { IYield } from "./yieldTypes";


const initialState: IRoof<IYield> = {
    roofTab: {
        inputType: "",
        windExposure: "",
        riskCategory: "",
        windSpeed: 0,
        snowFall: 0,
    } as IYield
} 

export const YieldAnalysisReducer = createSlice({
    name: "yieldanalysis",
    initialState,
    reducers: {
        setAnalysis: (state, { payload }: PayloadAction<IYield>) => {
            state.roofTab = payload
        }
    },
});

export const { setAnalysis } = YieldAnalysisReducer.actions

export default YieldAnalysisReducer.reducer;
