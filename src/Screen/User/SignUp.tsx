import { AxiosResponse } from "axios";
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { useEffect, useRef, useState } from "react";
import { ParsedCountry, PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { IconInVisible, IconVisible } from "../../assests/icons/MapToolsIcons";
import { Button } from "../../Components/AllButton/AllButtons.tsx";
import { Input, InputCheckbox } from "../../Components/AllInput/AllInput";
import { countryJsonType, user_mstr_modal } from "../../ReduxTool/Slice/Auth/types";
import { useAppDispatch } from "../../ReduxTool/store/hooks";
import { signupRedirect } from "../../Utils/AuthRedirections";
import { baseURL, requestUrl } from "../../Utils/baseUrls";
import { filterKeyIncludeArr, getElementByIndex, isValidName, removeWideSpace, testPassword, toTitleCase } from "../../Utils/commonFunctions";
import { APIResponse, TinputType } from "../../Utils/Const";
import { validEmail, validPassword } from "../../Utils/Regex";
import OTPModal from "./OTPModal/OTPModal";

export type signUPDetails = {
  name: string, label: string, value?: string, error?: string | null, type: TinputType, isMobileValid?: boolean, countrycode?: string, disabled?: boolean
};

const SignUp = () => {
  const location = useLocation()
  const customId = "customId-Toast", toastId = useRef<any | null>(null);
  const [toggle, setToggle] = useState({ emailVerify: false, mobileVerify: false, });
  const [verified, setVerified] = useState({ email: false, mobile: false });
  const [hide, setHide] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [otp, setOtp] = useState<string | number>("");
  const [countryCode, setContryCode] = useState<countryJsonType[]>([]);
  const [passwordHide, setPasswordHide] = useState({ password: false, cpassword: false })
  const [formDetails, setFormDetails] = useState<signUPDetails[]>([
    { name: "fname", label: "First Name", value: "", error: "", type: "text" },
    { name: "lname", label: "Last Name", value: "", error: "", type: "text" },
    { name: "mobile", label: "Mobile", value: "", error: "", type: "number", isMobileValid: false, countrycode: "", disabled: false },
    { name: "email", label: "Email", value: "", error: "", type: "email" },
    { name: "password", label: "Password", value: "", error: "", type: "password" },
    { name: "cpassword", label: "Confirm Password", value: "", error: "", type: "password" }]);
  const [isChk, setIsChk] = useState(false);
  const [checkBoxError, setCheckBoxError] = useState("");
useEffect(()=>{
  fetchCountryList();
},[])
  useEffect(() => {
    const handleMouseUp = () => setPasswordHide({ password: false, cpassword: false });
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const fetchCountryList = async () => {
    try {
      const { data } = await baseURL.get(requestUrl.getCountryCode + '?startRecordIndex=0&numberOfRecords=0');
      if (data) {
        if (location.state?.userdata) {
          let userData: user_mstr_modal = location.state.userdata;
          let countrycode = getElementByIndex(filterKeyIncludeArr(data.responseData, 'countryid', userData.countryid!), 0, 'countrycode');
          let formData = [...formDetails];
          formData[0].value = userData.fname;
          formData[1].value = userData.lname!;
          formData[2].value = `${countrycode} ${userData.mobile!}`;
          formData[2].isMobileValid = true;
          formData[2].countrycode = countrycode?.replace("+", "");
          formData[3].value = userData.emailid!;
          setFormDetails(formData);
        }
        setContryCode(data.responseData);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, indx: number) => {
    const { name, value } = e.target;
    let valueErr = false
    if (name === "fname" || name === "lname") {
      if (value.length > 20 || value === " " || !isValidName(value)) {
        valueErr = true
      }
      valueErr && e.preventDefault()
    };

    if (name==="password" ||  name==="cpassword"){
      if (!testPassword(value)){
        valueErr = true 
      }
    }
    if (value === "") {
      valueErr = false
    }
    if (!valueErr) {
      setFormDetails((prev: any) => {
        prev[indx].value = value;
        removeErr(name);
        return [...prev]
      });
    };
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

  const isPhoneNumberValid = (phoneNumber: any, countryCode: any) => {
    try {
      const parsedNumber = parsePhoneNumberFromString(phoneNumber, countryCode);
      return parsedNumber ? parsedNumber.isValid() : false;
    } catch (error) {
      return false;
    }
  };

  const handlePhoneChange = (value: string, country: ParsedCountry) => {
    const isCountryExists = countryCode.some(countrys => countrys.alpha2code.toLowerCase() === country.iso2);
    let updatedFormDetails = [...formDetails];
    if (countryCode.length > 0 && !isCountryExists) {
      updatedFormDetails[2].error = `Unfortunately, our services are not yet available in ${country.name}`;
      updatedFormDetails[2].disabled = true;
    } else {
      const isValid = isPhoneNumberValid(value, country.dialCode);
      // console.log(isValid);
      updatedFormDetails[2].value = value;
      updatedFormDetails[2].countrycode = country.dialCode;
      updatedFormDetails[2].isMobileValid = isValid;
      updatedFormDetails[2].disabled = false;
      removeErr('mobile');
    };
    setFormDetails([...updatedFormDetails]);
  };

  const validateForm = async (isPasswordValidate?: boolean): Promise<boolean> => {
    let isValid = true;
    formDetails.forEach(el => {
      if (!isPasswordValidate) {
        if (el.name == "fname" && !removeWideSpace(el.value!)) {
          isValid = false;
          el.error = "First Name is required";
        } else if (el.name == "lname" && !removeWideSpace(el.value!)) {
          isValid = false;
          el.error = "Last Name is required";
        } else if (el.name == "email" && !removeWideSpace(el.value!)) {
          isValid = false;
          el.error = "Email is required.";
        } else if (el.name == "email" && !validEmail.test(el.value!)) {
          isValid = false;
          el.error = "Valid email is required";
        } else if (el.name === "mobile") {
          if (el.disabled) {
            isValid = false;
          } else if (!removeWideSpace(el.value!?.replace(`+${el.countrycode}`, ''))) {
            isValid = false;
            el.error = "Mobile number is required"
          } else if (!el.isMobileValid) {
            isValid = false;
            el.error = "Valid Mobile number is required"
          };
        };
      } else {
        if (el.name === "password") {
          if (!removeWideSpace(el.value!)) {
            isValid = false;
            el.error = "Password is Required";
          } else if (!validPassword.test(el.value!)) {
            isValid = false;
            el.error = "Password must contain both numeric and string";
          };
        } else if (el.name === "cpassword") {
          if (!removeWideSpace(el.value!)) {
            isValid = false;
            el.error = "Confirm password is required";
          } else if (el.value !== formDetails[4].value) {
            isValid = false;
            el.error = "Confirm password doesn't match";
          }
        };
        if (!isChk) {
          setCheckBoxError("You must accept the terms and conditions to continue");
          isValid = false;
        };
      };
    });
    setFormDetails([...formDetails])
    return isValid;
  };

  const sendOtp = async (isEmailVarify?: boolean) => {
    let isValidForm = await validateForm();
    if (isValidForm) {
      if (!toggle.emailVerify && !isEmailVarify) {
        formDetails[3].error = "Email verification is required. Kindly verify your email."
        setFormDetails([...formDetails]);
        return;
      };
      let defaultSelectedCountry = countryCode?.filter(el => el.countrycode === '+91')[0]?.countryid ?? [];
      if (formDetails[2].countrycode && formDetails[2].countrycode !== null) {
        defaultSelectedCountry = countryCode.filter(el => el.countrycode === `+${formDetails[2].countrycode}`)[0]?.countryid ?? null;
      }
      if (!defaultSelectedCountry) {
        formDetails[2].error = "Unfortunately, our services are currently unavailable in your selected country."
        setFormDetails([...formDetails]);
        return
      };
      const newUser = { fname: formDetails[0].value, lname: formDetails[1].value, mobile: formDetails[2].value!.replace(`+${formDetails[2].countrycode}`, ""), email: formDetails[3].value!, countryid: defaultSelectedCountry };
      try {
        const { data }: AxiosResponse<APIResponse<any>> = await baseURL.post(requestUrl.signupIndi, newUser);
        if (data.code === "200") {
          toast.success("OTP send successfully.", { toastId: customId });
          setHide(!hide);
        }
      } catch (e: any) {
        toast.error(e.response.status === 409 ? "This email is already registered." : e.response.data, { toastId: customId });
      };
    };
  };

  const setSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let btn = (e.nativeEvent as SubmitEvent).submitter?.getAttribute('name');
    if (btn === "Verify email" || !toggle.emailVerify) {
      removeErr('email')
      sendOtp(btn === "Verify email" ? true : false);
    } else {
      let isValid = await validateForm(true);
      if (isValid) {
        const newData = { email: formDetails[3].value!, password: formDetails[4].value!, activestatus: true, ismobile: true };
        signupRedirect({ newData, navigate, dispatch });
      };
    };
  };

  const handlePasswordView = (type: string) => {
    setPasswordHide(prev => ({ ...prev, [type]: !prev[type as keyof object] }))
  };

  return (
    <>
      <div className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-custom-primary-default/40 to-white ${passwordHide.cpassword || passwordHide.password ? "cursor-pointer" : "cursor-default-pointer"} select-none`}>
        <img src={require('../../assests/img/Logo/Terranxt_Logo_HD1.png')} className="w-64" />
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0 z-50">
          <div className={`${(location.pathname === "/signup" && (hide && !verified.email)) ? "" : "flex flex-col justify-center p-8 md:p-14"}`}>
            {/*  <img src="./login-sun.gif" /> */}
            {!hide && <>
              <span className="heading heading-lg text-center">
                Connect, Compare, Choose. Your Solar Solution Awaits.
              </span>
              <span className="para para-sm text-center">
                pvNXT solutions, tailor-made just for you!, No sweat! Solar that works as hard as you do. <br />Big sun, big savings—what’s not to love?
              </span> </>}
            {hide ? toggle.emailVerify ? <OTPModal sendOtp={sendOtp} setVerified={setVerified} otp={otp} verified={verified} text={formDetails[3].value!} setHide={setHide} setToggle={setToggle} toggle={toggle} /> : <OTPModal sendOtp={sendOtp} otp={otp} setVerified={setVerified} verified={verified} text={formDetails[3].value!} setHide={setHide} setToggle={setToggle} toggle={toggle} />
              : <>
                <form onSubmit={setSubmit}>
                  <div className="form-container grid sm:grid-cols-2 grid-cols-1 gap-x-4">
                    {formDetails.map((el, idx) => (
                      <div key={idx + 'login'}>
                        {el.name !== "mobile" ?
                          <>
                            {el.type === "password" ? <Input handleSufIcon={() => handlePasswordView(el.name)} suficon={passwordHide[el.name as keyof object] ? <IconVisible color={el.error?"#fb7185":"#40656E"}/> : <IconInVisible color={el.error?"#fb7185":"#40656E"} />} name={el.name} label={el.label} onChange={(e) => handleChange(e, idx)} type={passwordHide[el.name as keyof object] ? "text" : "password"} value={el.name === "fname" || el.name === "lname" ? toTitleCase(el.value!) : el.value!} error={el.error} btntitle={el.name === "email" ? `${!toggle.emailVerify ? "Verify email" : "Verified"}` : ""} btnDisabled={toggle.emailVerify} isRequired={true} disabled={(el.type == "password" && toggle.emailVerify) ? false : (el.type !== "password" && toggle.emailVerify) ? true : el.type === "password" ? true : false} /> :
                              <Input name={el.name} autoComplete="off" label={el.label} onChange={(e) => handleChange(e, idx)} type={el.type} value={el.name === "fname" || el.name === "lname" ? toTitleCase(el.value!) : el.value!} error={el.error} btntitle={el.name === "email" ? `${!toggle.emailVerify ? "Verify email" : "Verified"}` : ""} btnDisabled={toggle.emailVerify} isRequired={true} disabled={toggle.emailVerify} />}
                          </>
                          :
                          <div className="main-box1 group">
                            <label htmlFor="input11" className={`label-box1  ${el.error && "label-error"} `}>{el.label}<span className="text-rose-400 text-lg pl-0.5">* </span></label>
                            <PhoneInput preferredCountries={countryCode.map(el => el?.alpha2code?.toLowerCase())} defaultCountry="in" name="mobile" required={true} disabled={toggle.emailVerify} value={formDetails[2].value} forceDialCode={true} inputProps={{ required: true, autoComplete: 'off', disabled: formDetails[2].disabled }} onChange={(phone, { country }) => handlePhoneChange(phone, country)} placeholder="mobile" className={`signupmobile ${el.error ? 'error' : ''} w-full`} />
                            {el.error && <span className={`helper-box1 opacity-100 ${el.error ? "text-rose-400" : ""}`}>{el.error}</span>}
                          </div>
                        }
                      </div>
                    ))}
                  </div>
                  <InputCheckbox labelname="By proceeding you agree to the Terms & Conditions and Privacy Policy" name="checkBox" isChecked={isChk} onChange={() => { setIsChk(!isChk); setCheckBoxError(""); }} error={checkBoxError} />
                  <Button className={"btn btn-md-primary w-full mt-4"} type="submit" id="btnsignup" name="Create Account" />
                </form>
              </>}
            {!hide && <div className="mt-6 text-center">
              <span className="para-sm">Already have an account? </span>
              <Link className="para-md underline" to="/" data-bs-toggle="tooltip" title="Login to account"   >
                Sign in
              </Link>
            </div>}
          </div>
        </div>
        <div className="para para-xs z-50">© All Rights Reserved 2024. Created with <span className="text-rose-400">❤</span> by <a href="https://terranxt.com/">Team Terranxt</a></div>
        <img src={require('../../assests/img/Dashboard/FP_Image.png')} className="hidden md:block absolute w-3/12 bottom-0 right-0" />
      </div>
    </>
  );
};
export default SignUp