import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export type markerStateType = 'move' | 'move-stop' | 'done' | ''

export type modalTypeHeight ='building'| 'roof' | "" | 'line'
export type TCopyState = "" | "start" | "end" | "completed" | "ongoing"


const initialState = {
    geom: "" as any,
    lat: "" as any,
    lng: "" as any,
    elevation: 0 as number,
    showBuilding: false,
    showInfoModal: false,
    showAddHeightModal: "" as modalTypeHeight,
    weatherStationRadius: 0,
    showConfirmBtn: false,
    position: { x: 0, y: 0 },
    rightClickposition: { x: 0, y: 0 },
    rightClickpositionMarker: { latitude: 0, longitude: 0 },
    isNotify:false as  boolean,
    isToolTip:{dipx:0,dipy:0,istooltip:"",msg:""} as {dipx?:number|undefined,dipy:number,istooltip:string,msg:string},
    markerState : '' as 'locate' | 'confirm' | '',
    tooltipModal : false as boolean,
    tooltipTitle : '' as any,
    tooltipContent : '' as string|JSX.Element,
   informationModal : false as boolean,
   informationTitle : '' as any,
   informationContent : '' as string|JSX.Element,
    openNoRoof : false as boolean,
    openInstruction : false as boolean,
    boundryandDataModal : false as boolean,
    openDraw : false as boolean,
    activeMapName:"" as string,
    copyState: '' as TCopyState,
    rightClick: '' as TCopyState,
    zoomlevel: 18 as number,
    isBuildingThere: false,
    is3DMap:false,
    scale: {
        meters: 0,
        feet: 0,
        unit: 'm'
    }
}

export const mapReducer = createSlice({
    name: "mapReducer",
    initialState,
    reducers: {
        resetMapRef:(state=> initialState),
        setMapVars: (state, { payload }: PayloadAction<{ geom: any, elevation: number }>) => {
            state.elevation = payload.elevation
            state.geom = payload.geom
        },
        setCopyState: (state, { payload }: PayloadAction<TCopyState>) => {
            state.copyState = payload
        },
        setInitialLatLongs: (state, { payload }: PayloadAction<{ lat: any, lng: any }>) => {
            state.lat = payload.lat
            state.lng = payload.lng
        },
        showBuildingToggle: (state,  { payload }: PayloadAction<boolean>) => {
            state.showBuilding = payload
        },
        toggleMapModal: (state,  { payload }: PayloadAction<boolean>) => {
            state.showInfoModal = payload
        },
        setIs3dMap:(state,{payload}:PayloadAction<boolean>)=>{
            state.is3DMap = payload;
        },
        toggleHeigthModal: (state,  { payload }: PayloadAction<modalTypeHeight>) => {
            state.showAddHeightModal = payload
        },
        toggleRoofConfirmBtn: (state,  { payload }: PayloadAction<boolean>) => {
            state.showConfirmBtn = payload
        },
        newPos: (state,  { payload }: PayloadAction<{ x: number, y: number }>) => {
            state.position = payload
        },
        newRightClickPos: (state,  { payload }: PayloadAction<{ position: { x: number, y : number }, markerPos : { latitude: number, longitude: number } }>) => {
            state.rightClickposition = payload.position
            state.rightClickpositionMarker = payload.markerPos
        },
        weatherStationRadiusChange: (state,  { payload }: PayloadAction<number>) => {
            state.weatherStationRadius = payload
        },
        setShowInfoModal: (state,  { payload }: PayloadAction<boolean>) => {
            state.isNotify = payload
        },
        toogleTooltip: (state,  { payload }: PayloadAction<{dipx?:number,dipy:number,istooltip:string,msg:string}>) => {
            state.isToolTip = payload
        },
        setToolTipModal: (state,  { payload }: PayloadAction<{ state: boolean, title: string, content: string|JSX.Element}>) => {
            state.tooltipModal = payload.state
            state.tooltipTitle = payload.title
            state.tooltipContent = payload.content
        },
        setInformationModal: (state,  { payload }: PayloadAction<{ state: boolean, title: string, content: string|JSX.Element}>) => {
            state.informationModal = payload.state
            state.informationTitle = payload.title
            state.informationContent = payload.content
        },
        setMarkerState: (state,  { payload }: PayloadAction<'locate' | 'confirm' | ''>) => {
            state.markerState = payload
        },
        setNoRoofModal: (state,  { payload }: PayloadAction<boolean>) => {
            state.openNoRoof = payload
        },
        setOpenDraw: (state,  { payload }: PayloadAction<boolean>) => {
            state.openDraw = payload
        },
        setInstructionOpen: (state,  { payload }: PayloadAction<boolean>) => {
            state.openInstruction = payload
        },
        setMapActive: (state,  { payload }: PayloadAction<string>) => {
            state.activeMapName = payload
        },
        setRightClick: (state,  { payload }: PayloadAction<TCopyState>) => {
            state.rightClick = payload
        },
        setMapZoomLevel: (state,  { payload }: PayloadAction<number>) => {
            state.zoomlevel = payload
        },
        setIsBuildingDrawn: (state,  { payload }: PayloadAction<boolean>) => {
            state.isBuildingThere = payload
        },
        setScale: (state,  { payload }: PayloadAction<{ m: number, f: number, unit?: string }>) => {
            state.scale.meters = payload.m;
            state.scale.feet = payload.f;
            if(payload.unit){
                state.scale.unit = payload.unit
            }
        },
        clearBoundryandDataModal: (state,  { payload }: PayloadAction<boolean>) => {
            state.boundryandDataModal = payload
        },
       
    },
});


export const { resetMapRef,setIs3dMap,setNoRoofModal, clearBoundryandDataModal, setScale, setIsBuildingDrawn, newRightClickPos, setOpenDraw,setMapVars, setCopyState, showBuildingToggle,newPos, setToolTipModal,toogleTooltip, toggleHeigthModal, weatherStationRadiusChange, toggleRoofConfirmBtn, setShowInfoModal, setMarkerState, setInstructionOpen, setInitialLatLongs,setMapActive, setRightClick,toggleMapModal, setMapZoomLevel,setInformationModal } = mapReducer.actions

export default mapReducer.reducer;
 