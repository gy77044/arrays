import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Troof1 } from "./roofTypes";
import { IRoof } from "../roofType";


const initialState: IRoof<Troof1> = {
    roofTab: {
        indexVal: 1,
        roofTypeval: "Select an option",
        roofCoveringval: "Select an option",
        solarLayoutval: "Select an option",
        roofshapeval: "Select an option",
    } as Troof1, 
} 

export const RooftopReducer = createSlice({
    name: "rooftop-1",
    initialState,
    reducers: {
        setRoofTypeInfo: (state, { payload }: PayloadAction<Troof1>) => {           
            state.roofTab = payload
        },
        setIndexVal: (state, { payload }: PayloadAction<number>) => {
          state.roofTab.indexVal = payload       
        }
    },
});

export const { setRoofTypeInfo, setIndexVal } = RooftopReducer.actions

export default RooftopReducer.reducer;
