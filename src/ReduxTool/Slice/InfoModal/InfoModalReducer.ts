import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    info: {} as { header: string, subText: string },
    position: {} as { x:  number, y: number}
}

export const InfoModalReducer = createSlice({
    name: "InfoModalReducer",
    initialState,
    reducers: {
        saveInfoModalData: (state, { payload }: PayloadAction<{ header: string, subText: string }>) => {
            state.info = payload
        },
        toggleInfoModal: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpen = payload
        },
        setPositionForInfoModal: (state, { payload }: PayloadAction<{ x: number, y: number}>) => {
            state.position = payload
        }


    },
});

export const { saveInfoModalData, toggleInfoModal, setPositionForInfoModal } = InfoModalReducer.actions

export default InfoModalReducer.reducer;
