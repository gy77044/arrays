import React, { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ForgetPassword } from ".";
import { Input } from "../../Components/AllInput/AllInput";
import { useAppDispatch, useAppSelector } from "../../ReduxTool/store/hooks";
import { forgetPasswordCallback, getAuthState, loginHandlerRedirect, routeURL, signwithOtp } from "../../Utils/AuthRedirections";
import { validEmail } from "../../Utils/Regex";
import { removeWideSpace } from "../../Utils/commonFunctions";
import "../../assests/scss/AllComponents.scss";
import SignInOTP from "./OTPModal/SignInOTP";
import { TinputType } from "../../Utils/Const";
import { Button } from "../../Components/AllButton/AllButtons.tsx";
import "../../assests/scss/Login.scss"
import { IconInVisible, IconVisible } from "../../assests/icons/MapToolsIcons";
export type formDetails = { name: string; value?: string; error?: string | null; type: TinputType; };

const Login = () => {
  const dispatch = useAppDispatch(), Navigate = useNavigate(), url = useLocation(), id = useId();
  const [show, setShow] = useState(true);
  const [showForgetPass, setShowForgetPass] = useState(false);
  const toastId = useRef<any | null>(null);
  const { logs } = useAppSelector((state) => state.auth);
  const [formDetails, setFormDetails] = useState<formDetails[]>([{ name: "email", value: "", error: "", type: "email" }, { name: "password", value: "", error: "", type: "password" }]);
  const [passwordHide,setPasswordHide] = useState(false)

  /**** Function handlers ****/
  const validateForm = (isPassword: boolean): boolean => {
    let isValid = true, msg = "", key = "";
    formDetails.forEach((el, ind) => {
      if (el.name == "email" && !removeWideSpace(el.value!)) {
        isValid = false;
        formDetails[0].error = "Email is required";
      } else if (el.name == "email" && !validEmail.test(el.value!)) {
        isValid = false;
        formDetails[0].error = "Valid email is required";
      } else if (
        el.name == "password" &&
        isPassword &&
        !removeWideSpace(el.value!)
      ) {
        isValid = false;
        formDetails[1].error = "Password is required";
      }
    });
    if (!isValid) {
      setFormDetails([...formDetails]);
    }
    return isValid;
  };

  /**** Event handlers ****/
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, indx: number) => {
    const { name, value } = e.target;
    setFormDetails((prev: any) => {
      prev[indx].value = value;
      removeErr(name);
      return [...prev];
    });
    // setState({ ...state, [name]: value });
  };
  const removeErr = async (key: string) => {
    const index = formDetails.findIndex((obj) => obj.name === key);
    if (index === -1) {
      console.log("Key 'b' not found in any object.");
    } else {
      formDetails[index].error = "";
    }
    setFormDetails([...formDetails]);
  };
  const handleShow = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    validateForm(false) &&
      signwithOtp(formDetails[0].value!, toastId, setShow, show, setFormDetails, formDetails,Navigate);
  };

  const loginHandler = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      if (validateForm(true)) {
        let state: any = {
          email: formDetails[0].value,
          password: formDetails[1].value,
          whichuser: 0
        };
        loginHandlerRedirect({ ...state,  Navigate, dispatch, wrongAttempt: logs.wrongPass, setFormDetails, formDetails });
      }
    } catch (err) {
      toast.error("There was an issue. Please try again later.");
    }
  };

  const handleForgetPass = async (e: any) => {
    e.preventDefault();
    try {
      validateForm(false) &&
        (await forgetPasswordCallback(toastId, setShowForgetPass, showForgetPass, setFormDetails, formDetails));
    } catch (err) {
      toast.error("There was an issue. Please try again later.");
    }
  };

  useEffect(() => {
    const userAuth = getAuthState();
    !userAuth.isAuthenticated ? Navigate("/") : routeURL(Navigate);
  }, []);

  const handlePasswordView = (e:any)=>{
    setPasswordHide(true)
  }

  
useEffect(()=>{
  const handleMouseUp = () => setPasswordHide(false);
    
  window.addEventListener("mouseup", handleMouseUp);

  return () => {
    window.removeEventListener("mouseup", handleMouseUp);
  };
},[])

  return (
    <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-custom-primary-default/40 to-white transition-all ${passwordHide?"cursor-pointer":"cursor-default-pointer"} select-none`}>
      <img src={require('../../assests/img/Logo/Terranxt_Logo_HD1.png')} className="w-64" />
      {/* <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl w-[28rem] justify-center z-50"> */}
      <div className={`relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl ${!show || showForgetPass ? "w-fit" : "w-[28rem]"} justify-center z-50`}>
        {/* <Modal4 msg="Changes saved" desc="Your product changes have been saved."/> */}
        {show && (
          <div className={`${showForgetPass ? "hidden" : "w-full"}`}>
            <div className="flex flex-col justify-center items-center p-8 md:p-14">
              <h3 className="heading heading-lg text-center">pvNXT Consumer Portal</h3>
              <span className="para para-sm text-center">Welcome Back! Please enter your details</span>
              <form onSubmit={loginHandler} className="w-full">
                {formDetails.map((el, idx) => (
                  <div className="grid grid-cols-1 gap-4" key={idx + "login"}>
                    {el.type==="password"?<Input handleSufIcon={handlePasswordView} suficon={passwordHide?<IconVisible color={el.error?"#fb7185":"#40656E"}/>:<IconInVisible color={el.error?"#fb7185":"#40656E"}/>} type={passwordHide?"text":"password"} name={el.name} label={el.name} onChange={(e) => handleChange(e, idx)}  value={el.value!} error={el.error} isRequired={true} />:
                    <Input autoComplete="on" name={el.name} label={el.name} onChange={(e) => handleChange(e, idx)} type={el.type} value={el.value!} error={el.error} isRequired={true} />}
                  </div>
                ))}
                <span onClick={handleForgetPass} className="para para-xs mr-2 float-right cursor-pointer" > Forgot password? </span>
                <Button className="btn btn-md-primary w-full" type="submit" id="btnsignin" name="Sign in" />
              </form>
              <Button className="btn btn-md-outlineprimary w-full mt-6" onClick={handleShow} id="butotp" name="Sign in with OTP" />
              <div className="mt-14 text-center">
                <span className="para-sm">Don't have an account? </span>
                <Link className="para-md underline " to="signup" data-bs-toggle="tooltip" title="Create new account" > Sign up for free</Link>
              </div>
            </div>
          </div>
        )}
        {!show && (<SignInOTP text={formDetails[0].value!} handleShow={() => setShow(!show)} />)}
        {showForgetPass && (<ForgetPassword text={formDetails[0].value!} handleShow={() => setShowForgetPass(!showForgetPass)} />)}
      </div>
      <div className="para para-xs z-50">© All Rights Reserved 2024. Created with <span className="text-rose-400">❤</span> by <a href="https://terranxt.com/">Team Terranxt</a></div>
      <img src={require('../../assests/img/Dashboard/FP_Image.png')} className="hidden md:block absolute w-3/12 bottom-0 right-0" />
    </div>
  );
};

export default Login;
