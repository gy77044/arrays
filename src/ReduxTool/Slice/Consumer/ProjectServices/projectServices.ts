import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseURL, requestUrl } from "../../../../Utils/baseUrls";
import { ProjectTy } from "../../Auth/types";
import { APIResponse, AxioMethodType } from "../../../../Utils/Const";
import { AxiosResponse } from "axios";

export const getPrtojects = createAsyncThunk('projects/getProjectsByuserId', async (userid: string, { rejectWithValue }) => {
    try {
        const { data }: AxiosResponse<APIResponse<ProjectTy[]>> = await baseURL.get(`${requestUrl.project}/user/${userid}`);
        if (data.code !== "200") {
            return rejectWithValue(data.message);
        }
        return data.responseData;
    } catch (error: any) {
        const errorMessage = error.response?.data?.message || error.message || 'An unexpected error occurred';
        // console.log(errorMessage);
        return rejectWithValue(errorMessage);
    }
});


export const saveConsumerProjects = createAsyncThunk<ProjectTy, any, {}>("project/saveUpdate", async ({ reqBody, projectid }, { rejectWithValue }) => {
    try {
        let url = requestUrl.project, method: AxioMethodType = "post";
        if (projectid) {
            url = `${requestUrl.project}/${projectid}`;
            method = "put";
        }
        const { data }: AxiosResponse<APIResponse<ProjectTy>> = await baseURL[method](url, reqBody);
        if (data.code === "200") {
            return data.responseData;
        } else {
            return rejectWithValue(data.message)
        }
    } catch (err: any) {
        return rejectWithValue(err);
    };
});

export const updateOrderStatusCard = createAsyncThunk<
    any,
    { installationmode: string; projectid: string }
>("update/cardStatus", async (body, { rejectWithValue }) => {
    const resp = await baseURL.put(`${requestUrl.project}/${body.projectid}`, {
        installationmode: body.installationmode,
    });
    if (resp.status === 200) {
        if (resp.data.code === "200") {
            return resp.data.responseData;
        } else {
            return rejectWithValue(resp.data);
        }
    } else {
        return rejectWithValue(resp.data);
    }
});


export const getProjectsByProjectid = createAsyncThunk<ProjectTy, any, { rejectValue: string }>("getProjectsByProjectid/get", async (projectid, { rejectWithValue }) => {
    try {
        const { data }: AxiosResponse<APIResponse<ProjectTy>> = await baseURL.get(requestUrl.project + "/" + projectid);
        if (data.code !== "200") {
            return rejectWithValue(data.message!);
        }
        return data.responseData

    } catch (err: any) {
        return rejectWithValue(err.response?.data?.message ?? "There was an issue. Please try again later.")
    }
});

export const deleteProjectbyId = createAsyncThunk<string, string, {}>(
    "project/deletbyid",
    async (id, { rejectWithValue }) => {
        const response = await baseURL.delete(`${requestUrl.project}/${id}`)
        if (response.status !== 200) {
            return rejectWithValue(response.data);
        }
        if (response.status === 200) {
            if (response.data.code === "200") {
                return response.data.responseData
            }
        } else {
            return rejectWithValue(response.data.responseData.message)
        }
    }
)