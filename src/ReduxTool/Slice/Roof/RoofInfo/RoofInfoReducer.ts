import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRoof } from "../roofType";
import { Iroof2 } from "./infoTypes";


const initialState: IRoof<Iroof2> = {
    roofTab: {
        buildingHeightval: 0,
        roofpitchval: 0,
        drainDirectionval: ""
    } as Iroof2
}

export const RoofInfoReducer = createSlice({
    name: "rooftopinfo",
    initialState,
    reducers: {
        // setDrainDirection: (state, { payload }: PayloadAction<string>) => {
        //     state.roofTab.drainDirection = payload
        // },
        // setBuildingHeight: (state, { payload }: PayloadAction<number>) => {
        //     state.roofTab.buildingHeight = payload
        // },
        // setPitch: (state, { payload }: PayloadAction<number>) => {
        //     state.roofTab.roofpitch = payload
        // },
        // setRoof2Info: (state, { payload }: PayloadAction<Iroof2>) => {
        //     state.roofTab = payload
        // }
           setRoofInfo: (state, { payload }: PayloadAction<Iroof2>) => {      
            // console.log(payload)     
            state.roofTab = payload
        },
    },
});

export const { setRoofInfo } = RoofInfoReducer.actions

export default RoofInfoReducer.reducer;
