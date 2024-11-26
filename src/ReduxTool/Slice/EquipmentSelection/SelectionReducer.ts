import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEquipmentprops, IMMS, ISelection, TModule } from "./selectionTypes";

const initialState: ISelection = {
    module: {} as TModule,
    inverter: {} as TModule,
    mms: {} as IMMS,
    openSolar: false,
    showModuleBox: false,
    showInverterBox: false,
    isSaveEquipmentData: false,
   inverterName:"",
   inverterManufacturer :"",
   moduleName:"",
   moduleManufacturer:"",
   moduleData:[]
}

export const RoofInfoReducer = createSlice({
    name: "rooftopinfo",
    initialState,
    reducers: {
        saveSelection: (state, { payload }: PayloadAction<{ module: TModule[], mms: IMMS }>) => {
            return state
        },
        // setmms: (state, { payload }: PayloadAction<IMMS>) => {
        //     state.mms = payload
        // },
        setSolarOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.openSolar = payload
        },
        setModuleOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.showModuleBox = payload
        },
        setModuleData: (state, { payload }: PayloadAction<any>) => {
            state.moduleData = payload
        },
        setInverterOpen: (state, { payload }: PayloadAction<boolean>) => {
            state.showInverterBox = payload
        },
        setSaveEquipmentData: (state, { payload }: PayloadAction<boolean>) => {
            state.isSaveEquipmentData = payload
        },
        setModManu: (state, { payload }: PayloadAction<string>) => {
            state.module.Manufactured = payload
        },
        setModName: (state, { payload }: PayloadAction<string>) => {
            state.module.Name = payload
        },
        setInvManu: (state, { payload }: PayloadAction<string>) => {
            state.inverter.Manufactured = payload
        },
        setInvName: (state, { payload }: PayloadAction<string>) => {
            state.inverter.Name = payload
        },
        setEquipmentData: (state, { payload }: PayloadAction<IEquipmentprops>) => {
            state.inverterName= payload.inverterName
            state.inverterManufacturer = payload.inverterManufacturer
            state.moduleName=payload.moduleName
            state.moduleManufacturer= payload.moduleManufacturer
        }
    },
});

export const { setSolarOpen, saveSelection, setModManu, setModName, setInvManu, setInvName, setModuleOpen, setInverterOpen, setSaveEquipmentData,setEquipmentData, setModuleData } = RoofInfoReducer.actions

export default RoofInfoReducer.reducer;
