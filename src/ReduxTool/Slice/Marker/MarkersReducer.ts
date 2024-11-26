import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    searchedMarker: {} as {
        lat: number;
        lng: number;
    }
}

export const MarkersReducer = createSlice({
    name: "marker",
    initialState,
    reducers: {
        setLocationPinLatLng: (state, { payload }: PayloadAction<{ lat: number, lng: number}>) => {
            state.searchedMarker = payload
        }
    },
});


export const { setLocationPinLatLng } = MarkersReducer.actions

export default MarkersReducer.reducer;
