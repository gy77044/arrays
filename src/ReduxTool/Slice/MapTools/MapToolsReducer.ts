import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TNewMapToolTitle = "" | 'Roof Design' | "Infra Design" | "Obstruction Details" | "Module Mounting Structure" | "Map Layer" | "Basemap" | "Shadow" | "Layers"

const initialState = {
    newMapToolstitle : "" as string,
}



export const MapToolsReducer = createSlice({
    name: "mapToolsReducer",
    initialState,
    reducers: {
       
        setMapToolsTitle: (state, { payload }: PayloadAction<TNewMapToolTitle>) => {
            state.newMapToolstitle = payload
        },
      
    },
});


export const { setMapToolsTitle } = MapToolsReducer.actions

export default MapToolsReducer.reducer;


