import { AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL, requestUrl } from "../../Utils/baseUrls";
import { routeURL } from "../../Utils/AuthRedirections";
import { setUserProcess, setUserTypeMap, startReverification } from "../../ReduxTool/Slice/Auth/AuthReducer";
import { EPCResponseTy, user_mstr_modal } from "../../ReduxTool/Slice/Auth/types";
import { APIResponse, USER_TYPE_CONSUMER } from "../../Utils/Const";
import { AppDispatch } from "../../ReduxTool/store/store";
import { useAppSelector } from "../../ReduxTool/store/hooks";

export const handleProceed = async (body: {usertypeid: string;usersubtypeid?: string}, userid: string, dispatch: AppDispatch, navigate?: NavigateFunction,formData?:any) => {
    // this below will only run when the user is using the type selection for the first time 
    // if reverfication has started then the put request will be made on this baseURL.put(requestUrl.userTypeMap, body) and the user , 
    // will be redirected towards the verification waiting page 

    const res = await baseURL.post(requestUrl.userTypeMap, body)
    if (res.status === 200) {
    if (res.data.code === "200") {
            const { usertypemapid } = res.data.responseData
            //await loginwithuseridAndpkMasterid(usertypemapid,userid, body, dispatch, navigate!,formData)
        } else {
            console.log('error', res.data)
        }
    } else {
        console.log('error', res.data)
    }
};

export const handleProceedForPartner = async({formData,id}:{formData: any,id?:string})=>{
        try {
            let method="post" as "post"|"put",url=requestUrl.saveEPC;
            if(id){
                method="put";
                url=url+"/"+id;
            }
            const { data }:AxiosResponse<APIResponse<EPCResponseTy>> = await baseURL[method](url, formData);
            if (data.code === '200') {
                return data.responseData
            }
            return data;
        } catch (error:any) {
            toast.error(error.response?.data.message)
            return null
        }
    }

// export const loginwithuseridAndpkMasterid = async (usertypemapid: string, userid:string, body: any, dispatch: AppDispatch, navigate: NavigateFunction,formData?:any,epcid?:string) => {
//     try{
//         let url = `${requestUrl.userTypeMapId}/${usertypemapid}/${userid}`;
//         if(!userid){
//             url=`${requestUrl.userTypeMap}/${usertypemapid}`
//         };
//         const {data}:AxiosResponse<APIResponse<user_mstr_modal>> = await baseURL.put(url,body);
//         if (data.code === "200") {
//                 dispatch(setUserTypeMap(data.responseData.usertypemapid));
//                 let route = data.responseData.usertype_map?.usertype_mstr?.usertype.toLowerCase()===USER_TYPE_CONSUMER?data.responseData.usertype_map?.usertype_mstr?.usertype:'verifyUserType';
//                 // localStorage.setItem("userType",route)
//                 if(formData){
//                     const responsedata = await handleProceedForPartner({formData,id:epcid!});
//                     if(responsedata){
//                         routeURL(navigate)
//                         dispatch(setUserProcess(false))
//                         dispatch(startReverification(false))
//                     }
//                 }else{
//                     routeURL(navigate)
//                     dispatch(setUserProcess(false))
//                     dispatch(startReverification(false))
//                 }
//                 // localStorage.setItem("userType",res.data.responseData.usertypemapid ? res.data.responseData.usertype_map.usertype_mstr.usertype : "verifyUserType")
//                 // navigate(res.data.responseData.usertypemapid ? res.data.responseData.usertype_map.usertype_mstr.usertype : "verifyUserType")
//         }
//         else {
//             toast.error(data.message)
//         }
//     }
//     catch (e:any){
//         toast.error(e.response.data.message)
//         console.log(e)
//     }
// };

export const logoutuser = (dispatch:AppDispatch,navigate?:NavigateFunction) =>{
        document.cookie.split(";").forEach((c) => {
            document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/")
        });
        localStorage.clear();
        sessionStorage.clear();
        navigate?navigate('/'):window.location.href='/';
        // dispatch;
}