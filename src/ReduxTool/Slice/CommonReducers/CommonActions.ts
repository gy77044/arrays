import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL, requestUrl } from "../../../Utils/baseUrls"
import { AxiosResponse } from "axios"
import { APIResponse } from "../../../Utils/Const"

export const getStateDiscom = createAsyncThunk<any, any, {}>("statename/get",async (body, { rejectWithValue }) => {
    try{
        const {data}:AxiosResponse<APIResponse<any>> = await baseURL.get(`${requestUrl.discom}/${body.toLowerCase().trim()}`)
        if (data.code !== "200") {
            return rejectWithValue(data.message)
        }
        return data.responseData
    }catch(err:any){
        return rejectWithValue([]);
    };
})
export const getTerrifData = createAsyncThunk<any,string>("tariff",async (providerid) => {
    const res = await baseURL.get(`${requestUrl.consumercategory}/${providerid}`)
    if (res.data.code === "200") {
       return res.data.responseData
    }else{
        return [];
    }
  }
)