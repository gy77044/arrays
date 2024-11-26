import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { baseURL, requestUrl } from "../../../Utils/baseUrls";
import { toast } from "react-toastify";

// export interface ITariffType {
//   pktariffTypeId: string, type: string, activeStatus: boolean, createdat: string
// }
export interface IRoofRequestType {
//   typeofTariff: ITariffType[],
  loading: "loading" | "pending" | 'success' | 'failed' | "idle",
}

const initialState: IRoofRequestType = {
//   typeofTariff: [],
  loading: "idle",
}


export const orderRoofRequest = createAsyncThunk<any, any>(
    'post/roofRequest',
    async (data, { rejectWithValue }) => {
    
      const response: AxiosResponse = await baseURL.post(requestUrl.roofRequest, data)
      if (response.status === 200) {
        if (response.data.code === "200") {
                      
           return toast.success("Your request has been successfully raised");
        } else {
          return rejectWithValue(response.data)
        }
      }
      else if(response.status === 409){
        return toast.success("Your request allready raised");
      }
      return rejectWithValue(response.data)
    }
  )

export const RoofRequest = createSlice({
  name: "newroofrequest",
  initialState,
  reducers: {
   
  },

  extraReducers: (builder) => {
    builder.addCase(orderRoofRequest.fulfilled, (state, { payload }) => {
      state.loading = "success"
      // state.usertype_map=payload
      // console.log(payload)
    //   state.typeofTariff = payload
    })
    builder.addCase(orderRoofRequest.pending, (state, { payload }) => {
      state.loading = "loading"
    })
    builder.addCase(orderRoofRequest.rejected, (state, { payload }) => {
      state.loading = "failed"
    })
  }

});


export const { } = RoofRequest.actions

export default RoofRequest.reducer;
