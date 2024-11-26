import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommonExtraBuilders } from "./CommonBuilders";
import { IallTypestate, initialStateTy, modalTy } from "./types";
const initialState:initialStateTy={
    allDiscom:[],
    isopenProfile:false,
    providertype: [],
    loading: "idle",
    modal:{} as modalTy
};
const reducers ={
    setDiscomList:(state:initialStateTy, {payload}:PayloadAction<IallTypestate[]>)=>{
        state.allDiscom = payload
    },
    setOPenProfile: (state:initialStateTy, { payload }: PayloadAction<boolean>) => {
        state.isopenProfile = payload
    },
    setModalHeaderFooter: (state:initialStateTy, { payload }: PayloadAction<{ title: string, btnTxt: string,secondaryBtnTxt:string,modalData?:any }>) => {
        state.modal.title = payload.title
        state.modal.btnTxt = payload.btnTxt     
        state.modal.secondaryBtnTxt = payload.secondaryBtnTxt
        state.modal.modalData = payload.modalData!
    },
    toggleModalState: (state:initialStateTy, { payload }: PayloadAction<boolean>) => {
        state.modal.isOpen = payload
    },
};
const CommonReducers = createSlice({
    name:"commonReducers",
    initialState,
    reducers,
    extraReducers:CommonExtraBuilders
});

export const {setOPenProfile,setDiscomList,setModalHeaderFooter,toggleModalState} = CommonReducers.actions;
export default CommonReducers.reducer
