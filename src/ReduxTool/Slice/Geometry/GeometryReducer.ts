import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    height: 0 as number,
    toggle: 0 as number
}

export const GeometryReducer = createSlice({
    name: "geometryReducer",
    initialState,
    reducers: {
        setGeomHeigth: (state, { payload }: PayloadAction<number>) => {
            state.height = payload
            state.toggle = state.toggle + 1
        }
    },
});


export const { setGeomHeigth } = GeometryReducer.actions

export default GeometryReducer.reducer;
