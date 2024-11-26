import axios, { AxiosError, AxiosResponse } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { AppDispatch, store } from "../ReduxTool/store/store";
import { saveUser, setResetPasswordToken, startReverification, userlogin, userlogout, wrongLogin } from "../ReduxTool/Slice/Auth/AuthReducer";
import { setCardTitle } from "../ReduxTool/Slice/Dashboard/DashboardReducer";
import { APIResponse, authCheckResTy, AuthState, USER_TYPE_CONSUMER, userRole } from "./Const";
import { user_mstr_modal, userTypeMap } from "../ReduxTool/Slice/Auth/types";
import {jwtDecode} from 'jwt-decode';
import { isTrueSet, specialChars, validEmail } from "./Regex";
import { baseURL, requestUrl } from "./baseUrls";
import { ForgetOTPprops, GProps, Iprops, IUser, LoginProps, OTPprops } from "../Screen/User/types";
import { formDetails } from "../Screen/User/Login";
import { setusertype } from "../ReduxTool/Slice/Auth/UserVerifyReducer";
import { handleProceed } from "../Screen/User/UserApi";
import { removeSearchedGraphic } from "./CustomerMaps/Maps/removeSearchedLocationGraphic";
import Toast from "../Components/ErrorBoundry/Toast";
const customid = "new-toast";

export const getUserType = () => localStorage.getItem('userType') as userRole
export async function getIpAddress(): Promise<string> {
    try {
        const response = await axios.get('https://api.ipify.org?format=json');
        return response.data.ip;
    } catch (error) {
        console.error('Failed to fetch IP address:', error);
        return '';
    }
}

export const logUserActivity = (action: "login" | "logout", dispatch: AppDispatch) => {
    const timestamp = new Date();
    const log = `${timestamp}`;
    if (action === "login") {
        dispatch(userlogin(log))
    } else {
        removeSearchedGraphic()
        dispatch(userlogout(log))
    }
};

export const setLocalStorage = async(resData:user_mstr_modal)=>{
    try{
        baseURL.defaults.headers.Authorization = `bearer ${resData.token}`
        localStorage.setItem("token", resData.token);
        localStorage.setItem("userid", resData.userid);
        localStorage.setItem("user", JSON.stringify(resData.token));
    }catch(err){
        console.log(err);
        
    }
}
export const redirect = async(response: any, string: string, navigation: NavigateFunction, dispatch: AppDispatch) => {
    if (response && response.responseData !== null) {
        let resData: user_mstr_modal = response.responseData;

        let routeto = resData.usertype_map!.usertype_mstr!.usertype;

        if(routeto && !routeto.trim().toLowerCase().includes('consumer')){
            toast.error("Unauthorized User", { toastId: customid });
            return;
        } 
        await setLocalStorage(resData);
        let firsttimelogin = 'false'
        if (typeof resData.hassceenlandingpage === 'boolean') {
            if (resData.hassceenlandingpage) {
                firsttimelogin = 'true'
            }
        }
       
        localStorage.setItem("userType", routeto);
        localStorage.setItem("firsttimelogin", 'true');
    
        dispatch(saveUser(resData));
        if (routeto !== 'verifyUserType') {
            dispatch(setCardTitle(routeto))
        }
        toast.success("Login Successfull", { toastId: customid });
        logUserActivity('login', dispatch);
        setTimeout(()=>{
            routeURL(navigation);
        },500)

    } else {
        toast.error("OTP doesn't Match", { toastId: customid })
    }
}

export const redirectGoogle = (response: any, string: string, navigation: NavigateFunction, dispatch: any) => {
    localStorage.setItem("token", response?.data?.responseData.token);
    // dispatch(saveUser(response?.data?.responseData))
    localStorage.setItem("user", JSON.stringify(response?.data?.responseData.token));
    localStorage.setItem("userid", response?.data?.responseData.userid);
    toast.success("Login Successfull",{
        toastId: customid
      });
    setTimeout(() => {
        routeURL(navigation)
    }, 2000)
}

export const forgetCheckOTP = ({ text, resultOTP, setNewPassword }: ForgetOTPprops) => {
    const body = { email: text, otp: resultOTP }
    //check email otp here
    baseURL.post(requestUrl.verifyEmailOTP, body)
        .then((res: AxiosResponse) => {
            if (res.status === 200) {
                if (res.data.code === "200") {
                    Forgetredirect(res, text, setNewPassword)
                } else {
                    toast.error("Please enter correct OTP",{
                        toastId: customid
                      });
                }
            }
            else {
                toast.error("Please enter correct OTP",{
                    toastId: customid
                  });
            }
        })
        .catch((e: any) => toast.error("Please enter correct OTP",{
            toastId: customid
          }));

}

export const redirectHome = (response: AxiosResponse, email: string, handleShow: any) => {
    toast.success("Password Change Successfully",{
        toastId: customid
      });
    setTimeout(() => {
        handleShow()
    }, 1000)
}


export const Forgetredirect = (response: AxiosResponse, string: string, setNewPassword: React.Dispatch<React.SetStateAction<boolean>>) => {
    if (response?.data?.responseData !== null) {
        toast.success("OTP Confirmed.");
        setTimeout(() => {
            setNewPassword(true)
        }, 1500)
    } else {
        toast.error("OTP doesn't Match",{
            toastId: customid
          })
    }
}

const getuserTypeList = async (dispatch:any) => {
    try {
      const { data }: AxiosResponse<APIResponse<userTypeMap[]>> = await baseURL.get(requestUrl.getuserType);
      if (data.code === '200') {
        return data.responseData.filter(el=>el.usertype.toLowerCase() === USER_TYPE_CONSUMER);
      }
    } catch (err: any) {
      toast.error(err.response?.data.message ?? "There was an issue. Please try again later.", {
        toastId: customid
      })
      return []
    };
};
  
export const signupRedirect = ({ newData, navigate, dispatch }: Iprops) => {
    // need email from props
    baseURL.put(requestUrl.signup, { ...newData }).then(async(res: AxiosResponse<APIResponse<user_mstr_modal>>) => {
        if (res.data.code === "200") {
            setLocalStorage(res.data.responseData);
            localStorage.setItem("userType", res.data.responseData.usertypemapid ? res.data.responseData.usertype_map?.usertype_mstr?.usertype === undefined ? 'consumer' : res.data.responseData.usertype_map?.usertype_mstr?.usertype! : "verifyUserType");
                routeURL(navigate);
                dispatch(saveUser(res?.data?.responseData));
                toast.success("Signup Successful.", {
                    toastId: customid
                  })
            // if(getHostName(true)?.toLowerCase() === USER_TYPE_CONSUMER){
            //     let usertypeid  = await getuserTypeList(dispatch);
            //     baseURL.defaults.headers.Authorization = `bearer ${res.data.responseData.token}`;
            //     if(usertypeid && usertypeid.length>0){
            //         dispatch(saveUser(res?.data?.responseData));
            //         handleProceed({usertypeid:usertypeid[0].usertypeid}, res.data.responseData.userid, dispatch, navigate);
            //     }
            // }else{
            //     localStorage.setItem("userType", res.data.responseData.usertypemapid ? res.data.responseData.usertype_map?.usertype_mstr?.usertype === undefined ? 'consumer' : res.data.responseData.usertype_map?.usertype_mstr?.usertype! : "verifyUserType");
            //     routeURL(navigate);
            //     dispatch(saveUser(res?.data?.responseData));
            //     toast.success("Signup Successful.", {
            //         toastId: customid
            //       })
            // }
        }
    }).catch((err: AxiosError) => {
        if (err.request.status === 409) {
            return toast.error("Email already Exists.",{
                toastId: customid
              })
        }
        toast.error(err.message,{
            toastId: customid
          })
    })
}



export const getOTP = ({ text, resultOTP, navigation, dispatch }: OTPprops) => {
    const body = { email: text, otp: resultOTP };
    if (validEmail.test(text)) {
        // check email otp here
        baseURL.post(requestUrl.verifyEmailOTP, body)
            .then((res: AxiosResponse<APIResponse<user_mstr_modal>>) => {
                if (res.data.code === "200") {
                    // login the user here

                    redirect(res.data, text, navigation, dispatch)
                }
            })
            .catch(e => toast.error("Enter valid OTP",{
                toastId: customid
              }))
    } else {
        toast.error("Enter valid OTP",{
            toastId: customid
          });
    }

}


export const recieveOTP = async ({ newData }: { newData: IUser }) => {
    await baseURL.post(requestUrl.emailOTP, newData).then((res: AxiosResponse) => {
        if (res.status === 200) {
            const { message } = res.data
            toast.success(message,{
                toastId: customid
              })
        }
    }).catch(e => {
        toast.error(e.message,{
            toastId: customid
          })
    })
}



/**
 * It takes in an email, password, setLoading, and Navigate as props and then checks if the email
 * includes an @ symbol. If it does, it makes a post request to the login endpoint with the email and
 * password. If it doesn't, it makes a post request to the login endpoint with the mobile number and
 * password.
 * @param {LoginProps}  LoginProps
 */
export const loginHandlerRedirect = async ({ email, password, whichuser,  Navigate, dispatch, wrongAttempt, setFormDetails,formDetails }: LoginProps) => {
    try {
        const {data}: AxiosResponse<APIResponse<user_mstr_modal>> = await baseURL.post(requestUrl.login, { email, password,whichuser });
        if (data.code === "200") {
            redirect(data, email, Navigate, dispatch);
        } else {
            toast.error(data.message || "Login failed",{toastId: customid});
            dispatch(wrongLogin(wrongAttempt + 1));
        }
    } catch (err: any) {
        const updatedFormDetails = formDetails.map((item) =>
            item.name === "password"
              ? { ...item, error: err.response?.data?.message } 
              : item 
          );
          setFormDetails(updatedFormDetails); 
        dispatch(wrongLogin(wrongAttempt + 1));
    }
}


/**
 * It takes in an object with three properties, and then makes a post request to the server, and then
 * depending on the response, it either redirects the user or shows an error message.
 * @param {GProps}  - GProps
 */
export const handleGoogeLogin = async ({ newUser, Navigate, dispatch }: GProps) => {
    await baseURL.post(requestUrl.googleLogin, { ...newUser }).then((response: AxiosResponse) => {
        redirectGoogle(response, newUser.email, Navigate, dispatch)
    }).catch((error: any) => {
        if (error.message) {
            toast.error(error.message,{
                toastId: customid
              });
        }
    })
}

export const forgetPasswordCallback = async(toastId: React.MutableRefObject<any>, setShowForgetPass: (value: React.SetStateAction<boolean>) => void, showForgetPass: boolean, setFormDetails: React.Dispatch<React.SetStateAction<formDetails[]>>,formDetails:formDetails[]) => {
    try{
        const {data} :AxiosResponse<APIResponse<{message: string;token: string}>> = await baseURL.get(`${requestUrl.forgotPassword}/${formDetails[0].value}/${process.env.REACT_APP_USERTYPE}`);
        if(data.code === "200"){
            toast.success("OTP Send Successfully.",{toastId:customid});
            store.dispatch(setResetPasswordToken(data.responseData.token));
            setShowForgetPass(!showForgetPass);
        }else{
            // toast.error("Email does not exists",{toastId:customid})
            const updatedFormDetails = formDetails.map((detail) =>
                detail.name === "email"
                  ? { ...detail, error: "Email does not exist." } // Update error for email
                  : detail // Keep other fields unchanged
              );
              setFormDetails(updatedFormDetails); 
        }
    }catch(err:any){
        debugger
        const updatedFormDetails = formDetails.map((detail) =>
            detail.name === "email"
              ? { ...detail, error:err.response?.data?.message??"Email does not exist." } // Update error for email
              : detail // Keep other fields unchanged
          );
          setFormDetails(updatedFormDetails);   
    };
}

export const signwithOtp = (email: string, toastId: React.MutableRefObject<any>, setShow: (value: React.SetStateAction<boolean>) => void, show: boolean,setFormDetails: React.Dispatch<React.SetStateAction<formDetails[]>>,formDetails:formDetails[],navigate?:NavigateFunction) => {
    toast.update("verifying email",{toastId:customid})
    baseURL.get(`${requestUrl.emailExists}/${email}/${process.env.REACT_APP_USERTYPE}`)
        .then((res: { status: number;data:APIResponse<authCheckResTy> }) => {
            if (res.status === 200) {
                if(!res.data.responseData.issignupcomplete && navigate){
                    Toast({messageText:"Sign up is not completed",messageType:"E", toastId:"signupIncompleteToast"});
                    navigate('/signup',{ state: { userdata: res.data.responseData.userdetails} })
                    return;
                }
                baseURL.get(`${requestUrl.sendNewOtp}/${email}`)
                    .then((res: { status: number; }) => {
                        if (res.status === 200) {
                            // Dismiss previous toast (if any) before showing success message
                            toast.dismiss("signupIncompleteToast");
                            
                            toast.success("OTP Send Successfully.",{toastId:customid})
                            setShow(!show);
                        }
                    }).catch((e: any) => {
                        toast.update(toastId.current, {
                            render: "There was an issue. Please try again later.",
                            type: toast.TYPE.ERROR,
                            progress: 1
                        })
                    })
            } else {
                const updatedFormDetails = formDetails.map((detail) =>
                    detail.name === "email"
                      ? { ...detail, error: "Email does not exist." } // Update error for email
                      : detail // Keep other fields unchanged
                  );
                  setFormDetails(updatedFormDetails);   
            }
        })
        .catch((e: any) => {
            if (toastId.current !== null) {
                toast.dismiss(toastId.current);
            }
            const updatedFormDetails = formDetails.map((detail) =>
                detail.name === "email"
                  ? { ...detail, error:e.response?.data?.message??"Email does not exist." } // Update error for email
                  : detail // Keep other fields unchanged
              );
              setFormDetails(updatedFormDetails);           
        })
}

export const sendOTPtoMail = (email: string, toastId: any, calllBack: () => void) => {
    baseURL.get(`${requestUrl.sendNewOtp}/${email}`)
        .then((res: { status: number; }) => {
            if (res.status === 200) {
                toast.update(toastId.current, {
                    render: "OTP Send Successfully.",
                    type: toast.TYPE.SUCCESS,
                    progress: 1
                })
                calllBack()
            }
            else {
                console.log('There was an issue. Please try again later.')
            }
        })
}

const isTokenExpired = (token:string) => {
  if (!token) return true;
  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp! < currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};
// export const 
export const getAuthState = ():AuthState => {
    const queryParams = new URLSearchParams(window.location.search);    
    const tokens = queryParams.get('token'), userid = queryParams.get('userid'), projectid = queryParams.get('projectid');
    if (tokens) {
      localStorage.setItem('token', tokens);
      localStorage.setItem('userType', 'Admin');
      localStorage.setItem('userid', userid!);
      sessionStorage.setItem('projectid', projectid!);
    }
    const token = localStorage.getItem('token'),hasSceenLandingScreen = localStorage.getItem('firsttimelogin');
    let isAuthenticated = true,role = localStorage.getItem("userType") as userRole,hassceen = isTrueSet(hasSceenLandingScreen!);
    if (isTokenExpired(token!)) {
        localStorage.clear();isAuthenticated=false;role="";hassceen=false;
    }
    return {
      isAuthenticated,
      user: {
        role,
        hassceen
      }
    }
  }
  
export const routeURL = (navigation: NavigateFunction) => {
    let { user:{role,hassceen}} = getAuthState();
    if(!role){
        localStorage.clear();
        navigation('/');
        return;
    };
    if (role.toLowerCase().includes('admin')) {
        navigation('/')
    }
    else if (role && role.toLowerCase().includes('partner')) {
        navigation('/');
        // if (hassceen) {
        // } else {
        //     navigation(`/${role}`);
        // }
    } else {
        navigation(`/${role}`);
    }
};
export const getHostName = (isSubDomain?:boolean):string | undefined => {
    try{
        const fullHostname = window.location.hostname;
        if(!isSubDomain)return fullHostname;
        const hostnameParts = fullHostname.split('.');
        if (hostnameParts.length > 2) {
            return hostnameParts.slice(0, -2).join('.');
        }
    }catch(err:any){}
}
export const checkUserRoleAuth = (userType:string/*"Consumer"|"Partner"*/):boolean=>{
    let validUser = true;
    try{
        let subdomain = getHostName(true) || "";
        if(!subdomain) throw new Error("Sub domain not found!");
        if(subdomain.toLowerCase() == "epc"){subdomain = "partner"};
        if(userType.toLowerCase() !== subdomain.toLowerCase()){
            throw new Error(`${userType} is not allow on this site`);
        }
    }catch(err:any){
        toast.error(err.message,{toastId:'notallow'})
        validUser = false;        
    }
    return validUser;
};
export const logout = ()=>{
    try{
        localStorage.clear();
        sessionStorage.clear();
    }catch(err){

    }
}
