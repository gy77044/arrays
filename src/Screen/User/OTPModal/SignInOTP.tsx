import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { baseURL } from "../../../Utils/baseUrls";
import { requestUrl } from "../../../Utils/baseUrls";
import { SignInOTPProps } from "./type";
import { getOTP } from "../../../Utils/AuthRedirections";
import { useAppDispatch } from "../../../ReduxTool/store/hooks";
import Timer from "../Timer";
import { Button } from "../../../Components/AllButton/AllButtons.tsx";
import { OTP_COUNT, OTP_COUNTER } from "../../../Utils/Const";
import Toast from "../../../Components/ErrorBoundry/Toast";

const SignInOTP: React.FC<SignInOTPProps> = ({ handleShow, text }) => {

  const dispatch = useAppDispatch();
  const navigation = useNavigate();

  const [numbercount, setNumberCount] = useState(0);
  const [countDown, setCountdown] = useState(OTP_COUNTER);

  const timeRef = useRef<HTMLAnchorElement>(null);
  const [sendOTP, setOtpSend] = useState<string>("");

  const specialChars = /[@]/;

  const handleValidate = (e: FormEvent) => {
    e.preventDefault();

    if (timeRef.current) {
      const rese = "0's";
      if (timeRef.current.innerHTML == rese) {
        toast.error("OTP expired, resend the OTP");
        return;
      }
    }
    // gettting the otp
    const first = (document.getElementById("first") as HTMLInputElement).value;
    const second = (document.getElementById("second") as HTMLInputElement)
      .value;
    const third = (document.getElementById("third") as HTMLInputElement).value;
    const fourth = (document.getElementById("fourth") as HTMLInputElement)
      .value;
    const resultOTP = parseInt(first + second + third + fourth, 10);
    if (!first || !second || !third || !fourth) {
      return toast.warn("Please Provide the OTP");
    }
    if (resultOTP == undefined || resultOTP === null) {
      return toast.warn("Please Provide the OTP");
    }
    getOTP({ text, resultOTP, navigation, dispatch });
  };

  const handleIncrement = () => {
    const count = numbercount;
    setNumberCount(count + 1);
    if (count < OTP_COUNT) {
      setCountdown(OTP_COUNTER);
      baseURL
        .get(`${requestUrl.sendNewOtp}/${text}`)
        .then((res) => {
          if (res.status === 200) {
            Toast({messageText:"code send successfully.",messageType:"S",autoClose:1000})
          }
        })
        .catch((e) => console.log(e));
        if (count>=2){
          setTimeout(()=>{
            Toast({messageText:"Resend limit reached.",messageType:"E",autoClose:1000})
            handleShow()
          },OTP_COUNTER*1000)
        }
       }
        // } else {
    //   toast.error("Resend limit Reached.", {
    //     toastId: Math.random() * 1000,
    //   });
    //   setNumberCount(3);
    //   setTimeout(() => {
    //     handleShow()
    //   }, 2500)
    // }
  };


  // const handleOtpInput = () => {
  //   const first = (document.getElementById("first") as HTMLInputElement).value;
  //   const second = (document.getElementById("second") as HTMLInputElement).value;
  //   const third = (document.getElementById("third") as HTMLInputElement).value;
  //   const fourth = (document.getElementById("fourth") as HTMLInputElement).value;
  //   if (first.length === 1) {
  //     (document.getElementById("second") as HTMLInputElement).focus();
  //   }
  //   if (second.length === 1) {
  //     (document.getElementById("third") as HTMLInputElement).focus();
  //   }
  //   if (third.length === 1) {
  //     (document.getElementById("fourth") as HTMLInputElement).focus();
  //   }
  // };

  const handleOtpInput = (event: React.KeyboardEvent<HTMLInputElement>) => {

    const inputs = [
      document.getElementById("first") as HTMLInputElement,
      document.getElementById("second") as HTMLInputElement,
      document.getElementById("third") as HTMLInputElement,
      document.getElementById("fourth") as HTMLInputElement,
    ];
    const target = event.target as HTMLInputElement;
    const key = event.key;
    const currentIndex = inputs.indexOf(target);
    
    if (!key.match(/^[0-9]$/) && key !== "Backspace") {
      event.preventDefault();
      return;
    }
    if (target.value.length > 1) {
      target.value = target.value.charAt(0);
    }
  
    if (key === "Backspace") {
      if (target.value === "" && currentIndex > 0) {
        inputs[currentIndex - 1].focus();
      }
    } else if (key.match(/^[0-9]$/)) {      
      target.value = key; 
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
      event.preventDefault(); 
    }  
   
  };




  useEffect(() => {
    const name = text.substring(0, text.lastIndexOf("@"));
    const domain = text.substring(text.lastIndexOf("@") + 1);
    if (specialChars.test(text)) {
      const arr = text.split("");
      const stars: string[] = [];
      arr.forEach((val, i) => {
        if (i > 1) {
          stars.push("*");
        }
      });
      const x = text.lastIndexOf("@") - 3;
      stars.length = x;
      setOtpSend(name.substring(0, 2) + "" + stars.join("") + "@" + domain);
    }
  }, []);

  return (
    <div className="flex flex-col justify-center p-8 md:p-14">
      <span className="heading heading-lg text-center">pvNXT Email OTP Signin</span>
      <span className="para para-md text-center">We have sent a code to your email {sendOTP}</span>
      <form>
        <div className="flex flex-row items-center justify-between gap-2 mx-auto w-full max-w-full" id="otp" data-bs-toggle="tooltip" title="Enter otp here">
          <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="first" name="first" onKeyDown={handleOtpInput} />
          <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="second" name="second" onKeyDown={handleOtpInput} />
          <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="third" name="third" onKeyDown={handleOtpInput} />
          <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="fourth" name="fourth" onKeyDown={handleOtpInput} />
        </div>
        <div className="flex gap-4 max-sm:flex-col mt-8">
          <Button className="btn btn-md-outlineprimary w-full" onClick={handleShow} id="butotp" name="Back" />
          <Button className="btn btn-md-primary w-full" type="submit" id="btnsignin" name="Sign in" onClick={(e) => handleValidate(e)} />
        </div>
      </form>
      <Timer handleIncrement={handleIncrement} resendcount={numbercount} setNumberCount={setNumberCount} timeRef={timeRef} countdown={countDown} setCountdown={setCountdown} />
    </div>


  );
};

export default SignInOTP;
