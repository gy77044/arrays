import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getUserDetails } from "./asyncHandlers";
import { logs, ProjectTy, user_mstr_modal } from "./types";
const initialState = {
    email: "", 
    user: {} as user_mstr_modal, 
    urlpath:"" as string,
    logs:{wrongPass:0} as logs , 
    isState: 'idle',
    passwordResetToken:null as string | null,
    load: 0,
    reverification: false as boolean,
    cacheData:{} as any
}

export const changehasSceenStatus = (userid: string, status: boolean) => {
    // await baseURL.put(`${requestUrl.auth}/hasscene/${userid}}/${status}`)
    return true;
}



export const authReducer = createSlice({
    name: "auth",
    initialState,
    reducers: {
        UserSignUp: (state, { payload }: PayloadAction<string>) => {
            state.email = payload
        },
        saveUser: (state, { payload }: PayloadAction<user_mstr_modal>) => {
            state.user = JSON.parse(JSON.stringify(payload))
        },
        logoutInfo: (state, { payload }: PayloadAction) => {
            return state
        },
        changefirstTimeuserScreen: (state, { payload }: PayloadAction<boolean>) => {
            state.user.hassceenlandingpage = payload
        },
        adminSave: (state, { payload }: PayloadAction) => {
            state.user.fname = "admin"
            state.user.emailid = "admin"
        },
        setUrl:(state, {payload}:PayloadAction<string>)=>{
            state.urlpath = payload
        },
        userlogin:(state, {payload}:PayloadAction<string>)=>{
           
           state.logs.logIn = payload
        },
        userlogout:(state, {payload}:PayloadAction<string>)=>{
           
           state.logs.logOut = payload
        },
        wrongLogin:(state, {payload}:PayloadAction<number>)=>{
           state.logs.wrongPass = payload
        },           
        setUserTypeMap:(state, {payload}:PayloadAction<any>)=>{
           state.user.usertypemapid = payload
        },
        setLoadSanction:(state, {payload}:PayloadAction<any>)=>{
           state.load = payload
        },
        startReverification:(state, {payload}:PayloadAction<boolean>)=>{
            state.reverification = payload
        },
        setUserProcess:(state, {payload}:PayloadAction<boolean>)=>{
            state.user.isapproved = payload
        },
        setCacheFormData:(state, {payload}:PayloadAction<any>)=>{
            state.cacheData = payload
        },
        setepcid:(state, {payload}:PayloadAction<any>)=>{
            state.user.epcid = payload
        },
        setAuthProjectDetails:(state,{payload}:PayloadAction<ProjectTy[]>)=>{
            state.user.projects = payload
        },
        setResetPasswordToken:(state,{payload}:PayloadAction<string|null>)=>{
            state.passwordResetToken = payload;
        },
        setUserProjects:(state,{payload}:PayloadAction<ProjectTy[]>)=>{
            state.user.projects = payload;
        }
    },
    extraReducers: (builder) => {
        // Add extraReducers for handling the async thunk lifecycle actions
        builder.addCase(getUserDetails.fulfilled, (state, { payload }) => {
            state.user = payload
            state.isState = 'successfull'       
        });
    
        builder.addCase(getUserDetails.pending, (state, action) => {
            state.isState = 'pending'
        });

        builder.addCase(getUserDetails.rejected, (state, { payload }) => {
           state.isState = 'failed'
        });
      }, 
});


export const { UserSignUp,setUserProjects,setResetPasswordToken,setAuthProjectDetails, setLoadSanction, saveUser,setepcid, changefirstTimeuserScreen, setUserTypeMap, startReverification,setUserProcess,  logoutInfo, adminSave, setUrl, userlogout, userlogin,wrongLogin,setCacheFormData } = authReducer.actions

export default authReducer.reducer;
