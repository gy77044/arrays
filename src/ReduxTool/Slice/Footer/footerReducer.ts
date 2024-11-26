import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { coord } from "./types";


const initialState: coord = {
    lat: 0,
    long: 0
}

export const footerReducer = createSlice({
    name: "footer",
    initialState,
    reducers: {
        coords: (state, { payload }: PayloadAction<{ lat: number, lng: number }>) => {
            state.lat = payload.lat
            state.long = payload.lng
        },
    },
});


export const { coords } = footerReducer.actions

export default footerReducer.reducer;
