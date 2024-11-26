import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { districtNameResponseTy, stateNameResponseTy } from "./type";
import { APIResponse } from "../../../Utils/Const";
import { baseURL, requestUrl } from "../../../Utils/baseUrls";
const initialState ={
    statesList:[] as stateNameResponseTy[],
    districtsList:[] as districtNameResponseTy[]
};
export const getStateListByCountryID = createAsyncThunk<any,any,{}>("statename/get",async(CountryID,{rejectWithValue})=>{
    const {data}:AxiosResponse<APIResponse<stateNameResponseTy[]>> = await baseURL.get(requestUrl.getStateNamebyCountryID+"/"+CountryID);
    if(data.code !== '200') return rejectWithValue(data.responseData);
    return data.responseData;
});
export const getDistrictListByStateID = createAsyncThunk<any,any,{}>("districtname/get",async(stateLists,{rejectWithValue})=>{
    const {data}:AxiosResponse<APIResponse<districtNameResponseTy[]>> = await baseURL.post(requestUrl.getDistrictsNameByStateID,stateLists);
    if(data.code !== '200') return rejectWithValue(data.responseData);
    return data.responseData;
});

const CountrySlice = createSlice({
    name:"Country",
    initialState,
    reducers:{
        setStateNameByCountryID:(state,{payload}:PayloadAction<stateNameResponseTy[]>)=>{
            state.statesList=payload;
        },
        setDistrictNameByStateID:(state,{payload}:PayloadAction<districtNameResponseTy[]>)=>{
            state.districtsList=payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getStateListByCountryID.fulfilled,(state,{ payload } : PayloadAction<stateNameResponseTy[]>)=>{
            state.statesList=payload
        });
        builder.addCase(getStateListByCountryID.pending, (state) => {
            state.statesList = [];
        });
        builder.addCase(getStateListByCountryID.rejected, (state) => {
            state.statesList =[]
        });
        //district builders
        builder.addCase(getDistrictListByStateID.fulfilled,(state,{ payload } : PayloadAction<districtNameResponseTy[]>)=>{
            state.districtsList=payload
        });
        builder.addCase(getDistrictListByStateID.pending, (state) => {
            state.districtsList = [];
        });
        builder.addCase(getDistrictListByStateID.rejected, (state) => {
            state.districtsList =[]
        });
    }
});

export const { setStateNameByCountryID,setDistrictNameByStateID } = CountrySlice.actions;
export default CountrySlice.reducer;