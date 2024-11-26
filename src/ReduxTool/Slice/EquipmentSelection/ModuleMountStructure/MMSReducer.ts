import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEquipe, IMMSelect } from "./mmsTypes";


const initialState: IEquipe<IMMSelect> = {
    mmsTab: {
        moduleOrientation: "",
    minRoofEdgeDistance: 0,
    modulesSSD: 0
    } as IMMSelect
}

export const MMSReducer = createSlice({
    name: "mmsReducer",
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
        setMMS: (state, { payload }: PayloadAction<IMMSelect>) => {  
            state.mmsTab=payload                
        },
    },
});

export const { setMMS } = MMSReducer.actions

export default MMSReducer.reducer;
