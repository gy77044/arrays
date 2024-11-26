import { createAsyncThunk } from "@reduxjs/toolkit"
import { baseURL, requestUrl } from "../../../Utils/baseUrls"
import { AxiosResponse } from "axios"
import { APIResponse, AxioMethodType } from "../../../Utils/Const"
import { user_mstr_modal } from "./types"


export const getUserDetails = createAsyncThunk(
    "user/getUser",
    async (userid: string, { rejectWithValue }) => {
        const res = await baseURL.get(`${requestUrl.users}/${userid}`)
        if (res.status === 200) {
            if (res.data.code === "200") {
                return res.data.responseData
            }else{
            return rejectWithValue(res.data.responseData.message)
            }
        } else {
            return rejectWithValue(res.data.responseData.message)
        }
    }
)
export const UserDetailsAction = createAsyncThunk("user/handle",async({reqBody,userid}:{reqBody:any,userid?:string},{rejectWithValue})=>{
    try{
        let method:AxioMethodType = "post",url = requestUrl.users
        if(userid){
            method = "put";
            url = url+"/"+userid
        };
        const {data}:AxiosResponse<APIResponse<user_mstr_modal>> = await baseURL[method](url,reqBody);
        if(data.code!=="200"){
            throw new Error("Something went wrong");
        }
        return data.responseData;
    }catch(err:any){
        return rejectWithValue(err);
    }
})



