import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    openWarning: false as boolean,
    openWarningRemove: false as boolean,
    isOpenSelect: false as boolean,
    isOpenNewModal: false as boolean,
    isOpenUpload: false as boolean,
}

export const CardReducer = createSlice({
    name: "card",
    initialState,
    reducers: {
        setWarningOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.openWarning = payload
        },
        setWarningOpenRemove: (state, { payload }: PayloadAction<boolean>) => {
            state.openWarningRemove = payload
        },
        setIsOpenSelect: (state, { payload }: PayloadAction<boolean>) => {
            state.isOpenSelect = payload
        },
        setOpenNewModal: (state, { payload }: PayloadAction<boolean>) => {           
            state.isOpenNewModal = payload
        },        
        setOpenUpload: (state, { payload }: PayloadAction<boolean>) => {           
            state.isOpenUpload = payload
        },        
    },
});


export const { setWarningOpen, setWarningOpenRemove, setIsOpenSelect, setOpenNewModal, setOpenUpload } = CardReducer.actions
export default CardReducer.reducer;