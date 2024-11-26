import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Dboardtitles = "Project Dashboard" | "Rooftop Analytical Portal"


const initialState = {
    dboardTitle: "Project Dashboard",
    activeCard: "Recent",
    activeSupportTab: "Support",
    usertypeid: "" as string,
    usersubtypeid: "" as string,
    activeTab: "Lead board" as string,

}

export const DashboardReducer = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setDashboardTitle: (state, { payload }: PayloadAction<Dboardtitles>) => {
            state.dboardTitle = payload
        },
        setCardTitle: (state, { payload }: PayloadAction<string>) => {
            state.activeCard = payload;
        },
        setTab: (state, { payload }: PayloadAction<string>) => {
            state.activeTab = payload;
        },
        setActiveSupportTab: (state, { payload }: PayloadAction<string>) => {
            state.activeSupportTab = payload;
        },
        setMasterusertypeId: (state, { payload }: PayloadAction<string>) => {
            state.usertypeid = payload;
        },
        setsubid: (state, { payload }: PayloadAction<string>) => {
            state.usersubtypeid = payload;
        },
    },
});


export const { setDashboardTitle, setCardTitle, setMasterusertypeId, setsubid, setActiveSupportTab, setTab } = DashboardReducer.actions

export default DashboardReducer.reducer;
