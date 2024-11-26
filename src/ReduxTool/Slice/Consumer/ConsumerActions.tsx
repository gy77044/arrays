import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";
import { baseURL, requestUrl } from "../../../Utils/baseUrls";
import { APIResponse, AxioMethodType } from "../../../Utils/Const";
import { ProjectTy } from "../Auth/types";
import { Fin } from "./types";

  export const calcTariffRate = createAsyncThunk<any, any, {}>("tariffRate/post",async (body, { rejectWithValue }) => {
        const {sanctionload,providerid,consumercategoryid  } =body
        try {
            const {data}:AxiosResponse<APIResponse<any>> = await baseURL.get(`${requestUrl.tariffRate}/${sanctionload}/${providerid}/${consumercategoryid}`);
              if(data.code !== "200"){
                return 0
              }
              return data.responseData;
        } catch (error:any) {
            return 0
        }
    }
  );

  export const getCostBracket = createAsyncThunk<any, number, {}>(
    "project/getCostBracket",
    async (plantcapacity, { rejectWithValue }) => {
      const res: AxiosResponse<APIResponse<number>> = await baseURL.get(
        `${requestUrl.costbracket}/plantcosting/${plantcapacity}`
      );
      if (res.status === 409) {
        return rejectWithValue("Duplicate Record..");
      }
      if (res.status === 404) {
        return rejectWithValue("No Record Found..");
      }
      if (res.data.code === "200") {
        return res.data.responseData;
      }
      if (res.data.code !== "200") {
        return rejectWithValue(res.data.responseData);
      }
    }
  );

export const fetchpVAPIMonthly = createAsyncThunk<any, dataType>(
    'quickplantanalysis/electricitygeneration',
    async (body, { rejectWithValue }) => {
      const { modulePerString, totalSanctionLoad, lat, lng, india,} = body;
      try {
        if(totalSanctionLoad!==0){
          const postResponse1 = await baseURL.get(`${requestUrl.pvnxtapigeneration}/${totalSanctionLoad}/${lat}/${lng}/${india}`);
          if (postResponse1.status === 200) {
            const responseData = postResponse1.data.responseData;
            if (typeof responseData === 'string') {
              const parsedData = JSON.parse(responseData);
              return { generation: parsedData, stringPerModule: modulePerString };
            } else {
              return rejectWithValue(responseData);
            }
          } else {
            return rejectWithValue(postResponse1.data);
          }
  
        }
      } catch (error: any) {
  
        // toast.error(error.message);
        return rejectWithValue(error.message || 'API request failed');
      }
    }
  );
  export const fetchpVAPIMonthlyCase2 = createAsyncThunk<any, dataType>('quickplantanalysis/electricitygeneration_2',async (body,{rejectWithValue}) => {
      const { totalSanctionLoad, lat, lng, india } = body
      try {
        // console.log('2', `${requestUrl.pvnxtapigeneration}/${totalSanctionLoad}/${lat}/${lng}/${india}`)
        // const formData2 = getSAMAPIObject({ inverter, module, noOfString: noOfString, modulePerString, load: totalSanctionLoad, loadVal });
    
        const postResponse2 = await baseURL.get(`${requestUrl.pvnxtapigeneration}/${totalSanctionLoad}/${lat}/${lng}/${india}`);
        // const postResponse = await axios.post(requestUrl.samAPI, formData2);
  
  
        // console.log('postResponse2', postResponse2)
        if (postResponse2.status === 200) {
          if (typeof postResponse2.data.responseData === 'string' && typeof JSON.parse(postResponse2.data.responseData) === 'object') {
  
            return postResponse2.data.responseData
          } else {
            // console.log(postResponse2.data.responseData)
            return rejectWithValue(postResponse2.data.responseData)
          }
        }
        else {
          return rejectWithValue(postResponse2.data)
        }
      } catch (error) {
        throw error;
      }
    }
  );
  
  export const fetchFinanceby = createAsyncThunk<any, Fin>('finance/fetchFinance',async (body, thunkAPI) => {
        const {  electricityrate,monthlyGeneration,sanctionLoad } = body;
        let newbody = {electricityrate,monthlyGeneration,sanctionLoad};
        const postResponse = await baseURL.post(requestUrl.financial, newbody);
        if (postResponse.status === 200) {
            if (postResponse.data.code === '200') {
                await baseURL.get(`${requestUrl.project}/${body.projectid}/${postResponse.data.responseData.totalCarbonfootprint.toString()}/${postResponse.data.responseData.totalTrees.toString()}`)
                return postResponse.data.responseData
            } else {
                return thunkAPI.rejectWithValue(postResponse.data)
            }
        } else {
            return thunkAPI.rejectWithValue(postResponse.data)
        }
    }
);
  
export const generationdegradation = createAsyncThunk(
  "costbracket/genaration-degradation",
  async (body: any, { rejectWithValue }) => {
      const res = await baseURL.post(`${requestUrl.generationdegradation}`, body)
      if (res.status !== 200) {
          return rejectWithValue(res.data);
      }
      if (res.status === 200) {
          if (res.data.code === "200") {
              return res.data.responseData
          }
      } else {
          return rejectWithValue(res.data.responseData.message)
      }

  }

)

const headers = {
  'Content-Type': 'multipart/form-data'
}

type vals = { attribute: string, name: string, value: string }


export type commomRes = {
  efficiency: vals[]
  electrical: vals[]
  general: vals[]
  mechanicalCharacteristics: vals[],
  name: string,
  path: string,
  lat: number,
  lng: number,
}


type dataType = {
  data: { inverter: commomRes, module: commomRes },
  noOfString: number,
  totalSanctionLoad: number, 
  modulePerString?: number, 
  loadVal: boolean,
  lat: number,
  lng: number, 
  india: boolean
}
  export const fetchPANOND = async () => {
    const inverterResponse = await axios({url: '/inverter.OND',responseType: 'blob'})
    const moduleResponse = await axios({url: '/module.pan',responseType: 'blob'})
  
    const formDataInverter = new FormData();
    formDataInverter.append('file', inverterResponse.data)
  
    const formDataModule = new FormData();
    formDataModule.append('file', moduleResponse.data)
  
    const postResponseInverter = await baseURL.post(requestUrl.uploadInverter, formDataInverter, {
      headers: headers
    });
    
    const postResponseModule = await baseURL.post(requestUrl.uploadeModule, formDataModule, {
      headers: headers
    });
  
    return { inverter: postResponseInverter.data.responseData, module: postResponseModule.data.responseData }
  
  }

  