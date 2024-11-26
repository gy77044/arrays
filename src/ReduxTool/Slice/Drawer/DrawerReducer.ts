import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDrawer, TtitlesPartner, TtitlesCustomer } from "./DrawerTypes";

const initialState: IDrawer = {
    title: "",
    displayDrawer: false,
    accord: "Project Installation Report (Yearly)",
    accord1: "",
    openprofile: false,
    polygonDrawn: [] as string[],
    isbtnHide:false,
}

export const drawerReducer = createSlice({
    name: "drawer",
    initialState,
    reducers: {
        setTitle: (state, { payload }: PayloadAction<TtitlesCustomer | TtitlesPartner>) => {
            state.title = payload
        },
        resetDrawer: (state) => {
           return initialState;
        },
        toggleDrawer: (state, { payload }: PayloadAction<boolean>) => {
            state.displayDrawer = payload
        },
        setAccord: (state, { payload }: PayloadAction<string>) => {
            state.accord = payload
        },
        setAccord1: (state, { payload }: PayloadAction<string>) => {
            state.accord1 = payload
        },
        setOpenProfile: (state, { payload }: PayloadAction<boolean>) => {
            state.openprofile = payload
        },
        setPolygonDrawn: (state, { payload }: PayloadAction<string>) => {
            state.polygonDrawn.push(payload)
        },
        setPolygonDrawnRemove: (state, { payload }: PayloadAction<string>) => {
            state.polygonDrawn = []
        },
        setIsbtnHide: (state, { payload }: PayloadAction<boolean>) => {
            state.isbtnHide = payload
        },
    },
});


export const { setTitle, toggleDrawer, setAccord,setAccord1, setOpenProfile, setPolygonDrawn, setPolygonDrawnRemove, resetDrawer,setIsbtnHide } = drawerReducer.actions

export default drawerReducer.reducer;
