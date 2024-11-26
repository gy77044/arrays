import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IInstaller } from "./InstallerTypes";

const initialState: IInstaller = {
    email: "",
    installationDate: {} as Date,
    orderModal: false,
    sucessModal: false,
    installerModal: false,
    installerAssignment:false

}
type TOrderModal = Omit<IInstaller, "installationDate" | "email" | "sucessModal" | "installerModal">


export const InstallerReducer = createSlice({
    name: "installer",
    initialState,
    reducers: {
        setInstallerInfo: (state, { payload }: PayloadAction<IInstaller>) => {
            state = payload
        },
        openOrderModal: (state, { payload }) => {
            state.orderModal = payload
        },
        openSucessModal: (state, { payload }: PayloadAction<boolean>) => {
            state.sucessModal = payload
        },
        openInstallerModal: (state, { payload }: PayloadAction<boolean>) => {
            state.installerModal = payload
        },
        toggleTheInstallerAssignment:(state,{payload})=>{
            state.installerAssignment = payload
        }
    },
});


export const { toggleTheInstallerAssignment,setInstallerInfo, openOrderModal, openSucessModal, openInstallerModal } = InstallerReducer.actions

export default InstallerReducer.reducer;


