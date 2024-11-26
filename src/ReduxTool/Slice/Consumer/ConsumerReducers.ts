import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ConsumerBuilders } from "./ConsumerBuilders";
import { FileUplad, ILatLong, initialstateType, ProjectSummaryType, quickplantAnalysisType, roofAnalysisType, TProjectTypesNew } from "./types";
import { newgeneratedId } from "../../../Utils/commonFunctions";

export const initialProjectSetup: TProjectTypesNew = {plantcapacity:0, address: "", projectname: "", projectid: "", createdId: newgeneratedId(), lat: 0, lng: 0, electricityrate: 0, sanctionload: NaN, useablearea: 0, totalroofarea: 0, providerid: null, projecttype: null, consumercategoryid: null, monthlyunit: "" }
export const initialQuickSetup = {costbracket:'',currencyresdata:{basecurrency:'',createdat:'',pkcurrencyId:'',rate:0,symbol:'',updatedat:''},electricityGenerated:'',electricityGenerated2:'',environmentalImpact:{carbonFootProint:'',treesPlanted:''},performanceRatio:'',stringPerModule:''} as quickplantAnalysisType;
export const initialProjectSummary = {} as ProjectSummaryType;
export const initialState: initialstateType = {
  isLoading: false,
  error: null,
  projects: [],
  orderModalOpen: false,
  ondFiles: null,
  orderstatusmodal: false,
  roofAnalysis: {
    isSaveplantSummarydata: false,
    selected_project: null,
    esriDraw: false as boolean,
    obsArea: "" as string|null,
    isWithRoof:null,
    selectedOption:"",
    cardIconOpen:"" as string,
    formDetails: {
      projectSetup: initialProjectSetup,
      projectSummary: initialProjectSummary,
      quickplantAnalysis: initialQuickSetup,
      error:{}
    }
  } as roofAnalysisType
}


export const initailFromdata = {
  projectSetup: initialProjectSetup,
  projectSummary: initialProjectSummary,
  quickplantAnalysis: initialQuickSetup,
  error:{}
}

const reducers = {
  toggleWithRoof: (state:initialstateType, { payload }: PayloadAction<boolean>) => {
    state.roofAnalysis.isWithRoof = payload
},
  setFormProjectSetup: (state: initialstateType, { payload }: PayloadAction<TProjectTypesNew>) => {
    state.roofAnalysis.formDetails.projectSetup = payload;
  },
  setFormQuickPlantAnalysisData:(state:initialstateType,{payload}:PayloadAction<any>)=>{
    state.roofAnalysis.formDetails.quickplantAnalysis = payload;
  },
  setFromProjectSummeryData:(state:initialstateType,{payload}:PayloadAction<any>)=>{
    state.roofAnalysis.formDetails.projectSummary = payload;
  },
  resetTariff: (state: initialstateType, { payload }: PayloadAction<number>) => {
    state.roofAnalysis.formDetails.projectSetup.electricityrate = payload
  },
  setToInitials: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.formDetails.projectSetup.address = ""
  },
  isCardIconOpen: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.cardIconOpen = payload
  },
  
  resetRoofAnalisisForm: (state:initialstateType)=>{
    state.roofAnalysis.formDetails.projectSetup = initialProjectSetup;
    state.roofAnalysis.formDetails.projectSummary = initialProjectSummary;
    state.roofAnalysis.formDetails.quickplantAnalysis = initialQuickSetup;
  },
  
  resetRoofAnalisis: (state:initialstateType)=>{
    state.roofAnalysis = initialState.roofAnalysis;
  },
  resetProject: (state: initialstateType) => { return initialState },
  setSerachedLocation: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.formDetails.projectSetup.address = payload
  },
  setLatlng: (state: initialstateType, { payload }: PayloadAction<ILatLong>) => {
    state.roofAnalysis.formDetails.projectSetup.lat = payload.lat
    state.roofAnalysis.formDetails.projectSetup.lng = payload.lng
  },

  setProjectInfo: (state: initialstateType, { payload }: PayloadAction<TProjectTypesNew>) => {
    state.roofAnalysis.formDetails.projectSetup.lat = payload.lat
    state.roofAnalysis.formDetails.projectSetup.lng = payload.lng
    state.roofAnalysis.formDetails.projectSetup.address = payload.address
    state.roofAnalysis.formDetails.projectSetup.electricityrate = payload.electricityrate
    state.roofAnalysis.formDetails.projectSetup.useablearea = payload.useablearea
    state.roofAnalysis.formDetails.projectSetup.sanctionload = payload.sanctionload
    state.roofAnalysis.formDetails.projectSetup.projectname = payload.projectname
  },
  setProjectName:(state:initialstateType,{payload}:PayloadAction<string>)=>{
    state.roofAnalysis.formDetails.projectSetup.projectname = payload;
  },
  setArea: (state: initialstateType, { payload }: PayloadAction<number>) => {
    state.roofAnalysis.formDetails.projectSetup.useablearea = payload
  },
  showEsriDrawTool: (state: initialstateType, { payload }: PayloadAction<boolean>) => {
    state.roofAnalysis.esriDraw = payload
  },
  obstructionArea: (state: initialstateType, { payload }: PayloadAction<string | null>) => {
    if (payload === null) {
      state.roofAnalysis.obsArea = null
    } else {
      state.roofAnalysis.obsArea= payload
    }
  },
  setOrderStatusCardModal: (state: initialstateType, { payload }: PayloadAction<boolean>) => {
    state.orderModalOpen = payload
  },
  //projectReducers
  setOndFiles: (state: initialstateType, { payload }: PayloadAction<FileUplad>) => {
    state.ondFiles = payload
  },
  saveProjectId: (state: initialstateType, { payload, }: PayloadAction<{ id: string; totalRoofArea: number; useablearea: number; }>) => {
    state.roofAnalysis.formDetails.projectSetup.createdId = payload.id;
    state.roofAnalysis.formDetails.projectSetup.totalroofarea = payload.totalRoofArea;
    state.roofAnalysis.formDetails.projectSetup.useablearea = payload.useablearea;
  },
  setCreatedId: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.formDetails.projectSetup.createdId = payload
  },
  setOpenOrderStatusModal: (state: initialstateType, { payload }: PayloadAction<boolean>) => {
    state.orderstatusmodal = payload;
  },

  setCostBracketReset: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.formDetails.quickplantAnalysis.costbracket = payload;
  },
 
  setnewAddress: (state: initialstateType, { payload }: PayloadAction<string>) => {
    if (state.roofAnalysis.selected_project) {
      state.roofAnalysis.selected_project.address = payload;
    }
  },
  setRegionName: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.regionName = payload;
  },
  setCountryName: (state: initialstateType, { payload }: PayloadAction<string>) => {
    // if (state.selected_project.length) {
    state.roofAnalysis.countryName = payload;
    // }
  },
  setSelectedOption: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.selectedOption = payload
  },
  setSubsequentOption: (state: initialstateType, { payload }: PayloadAction<string>) => {
    state.roofAnalysis.subsequentOption = payload
  },
  saveAPIData: (state: initialstateType, { payload }: PayloadAction<any>) => {
    state.roofAnalysis.formDetails.quickplantAnalysis.electricityGenerated = payload
  },
  resetReducerAnalysis: (state: initialstateType) => {
    return initialState;
  },
  resetFinanceLoadings: (state: initialstateType) => {
    // state.fetching = 'idle'
    // state.fetching2 = 'idle'
    // state.fetchingFin = 'idle'
  },
  resetSelected_project: (state: initialstateType) => {
    state.roofAnalysis.selected_project = null
  },
  setRoofDetailsError:(state:initialstateType,{payload}:PayloadAction<any>)=>{
    state.roofAnalysis.formDetails['error'] = payload
  },
}

const ConsumerReducers = createSlice({ name: "consumerReducers", initialState, reducers, extraReducers: ConsumerBuilders });

export const { setRoofDetailsError,isCardIconOpen,setProjectName,resetRoofAnalisisForm,resetSelected_project, resetRoofAnalisis,setFromProjectSummeryData,setFormQuickPlantAnalysisData,saveAPIData, resetReducerAnalysis, resetFinanceLoadings,toggleWithRoof, setSubsequentOption, setSelectedOption, setOndFiles, saveProjectId, setOpenOrderStatusModal, setCostBracketReset, setnewAddress, setRegionName, setCountryName, setOrderStatusCardModal, showEsriDrawTool, obstructionArea, setFormProjectSetup, resetTariff, setSerachedLocation, setLatlng, resetProject, setCreatedId } = ConsumerReducers.actions;
export default ConsumerReducers.reducer;