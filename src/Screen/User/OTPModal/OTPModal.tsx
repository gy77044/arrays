import { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Timer } from "..";
import { Button } from "../../../Components/AllButton/AllButtons.tsx";
import Toast from "../../../Components/ErrorBoundry/Toast";
import { baseURL, requestUrl } from "../../../Utils/baseUrls";
import { OTPModalProps } from "./type";
import { OTP_COUNT, OTP_COUNTER } from "../../../Utils/Const";

const OTPModal: React.FC<OTPModalProps> = ({ text, setHide, setVerified, verified, setToggle,toggle}) => {
  const timeRef = useRef<HTMLAnchorElement>(null);
  const [sendOTP, setOtpSend] = useState<string>("");
  const [numbercount, setNumberCount] = useState(0);
  const [countdown, setCountdown] = useState(OTP_COUNTER);
  const specialChars = /[@]/;
  const handleValidate = (e: FormEvent) => {
    e.preventDefault();

    // check the otp is correct or not
    const first = (document.getElementById("first") as HTMLInputElement).value;
    const second = (document.getElementById("second") as HTMLInputElement).value;
    const third = (document.getElementById("third") as HTMLInputElement).value;
    const fourth = (document.getElementById("fourth") as HTMLInputElement).value;

    const resultOTP = first + second + third + fourth;
    if (timeRef.current?.innerHTML == "0's") {
      return toast.warn("Please send the OTP Again");
    }
    const body = { email: text, otp: resultOTP };
    baseURL
      .post(`${requestUrl.verifyEmailOtp}`, body)
      .then((res) => {
        if (res.status === 200) {
          toast.success("OTP Verified.");
          setVerified({ ...verified, email: true });
          setToggle({ ...toggle, emailVerify: true });  
                    
          setTimeout(() => {
            setHide(false);
          }, 1500);
        } else {
          toast.error("Enter correct OTP",{toastId:"customID"});
        }
      })
      .catch((e) => toast.error("OTP is invalid",{toastId:"customID"}));
  };

  const handleClose = () =>{
    setToggle({ ...toggle, emailVerify: false });  
      setHide(false);
  }

  const toastId = useRef<any | null>(null);

  const handleIncrement = () => {
    const count = numbercount;
    toastId.current = toast("Sending New OTP", {
      type: toast.TYPE.INFO,
      progress: 0.2,
    });
    setNumberCount(count + 1);
    if (count < OTP_COUNT) {
      setCountdown(OTP_COUNTER);
      baseURL.get(`${requestUrl.sendNewOtp}/${text}`).then((res: any) => {
        if (res.status === 200) {
          if (toastId.current !== null) {
            toast.dismiss(toastId.current);
          }
          Toast({messageText:"OTP send successfully.",messageType:"S",autoClose:1000})
        }
      });
      if (count>=2){
        setTimeout(()=>{
          Toast({messageText:"Resend limit reached.",messageType:"E",autoClose:1000})
          setHide(false);
          setVerified({email:false,mobile:false});
        },OTP_COUNTER*1000)
      }
    }
    // } else {
    //   if (toastId.current !== null) {
    //     toast.dismiss(toastId.current);
    //   }
    //   Toast({messageText:"Resend limit reached.",messageType:"E",autoClose:1000})
    //   setHide(false);
    //   setVerified({email:false,mobile:false});
    // }
  };


 

 

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
  
    // Allow only one character in each input
    if (target.value.length > 1) {
      target.value = target.value.charAt(0);
    }
  
    if (key === "Backspace") {
      // Move to previous input if Backspace is pressed and the current input is empty
      if (target.value === "" && currentIndex > 0) {
        inputs[currentIndex - 1].focus();
      }
    } else if (key.match(/^[0-9]$/)) {
      // Move to the next input when a digit is entered
      target.value = key; // Set the current input value to the entered key
      if (currentIndex < inputs.length - 1) {
        inputs[currentIndex + 1].focus();
      }
      event.preventDefault(); // Prevent the default behavior of typing the digit again
    }
  };
  

  

  useEffect(() => {
    const name = text.substring(0, text.lastIndexOf("@"));
    const domain = text.substring(text.lastIndexOf("@") + 1);
    if (specialChars.test(text)) {
      const len = text.length - 2;
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
    <div className={`flex flex-col justify-center ${verified.email?"p-0 md:p-0":"p-8 md:p-14"} `}>
        <span className="heading heading-lg text-center">Email Verification</span>
        <span className="para para-md text-center">We have sent a code to your email {sendOTP}</span>
        <div>
          <div className="flex flex-row items-center justify-between gap-2 mx-auto w-full max-w-full" id="otp" data-bs-toggle="tooltip" title="Enter otp here">
            <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="first" name="first" onKeyDown={handleOtpInput} />
            <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="second" name="second" onKeyDown={handleOtpInput} />
            <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="third" name="third" onKeyDown={handleOtpInput} />
            <input className="input-box1 w-24 h-16 text-xl text-center" type="number" maxLength={1} id="fourth" name="fourth" onKeyDown={handleOtpInput} />
          </div>
          <div className="flex gap-4 max-sm:flex-col mt-8">
            <Button className="btn btn-md-outlineprimary w-full" onClick={handleClose}  name="Back" />
            <Button className="btn btn-md-primary w-full" type="submit" id="btnsignin" name="Verify Email" onClick={(e) => handleValidate(e)} />
          </div>
        </div>
        {/* <Timer1/> */}
        <Timer handleIncrement={handleIncrement} resendcount={numbercount} setNumberCount={setNumberCount} timeRef={timeRef} countdown={countdown} setCountdown={setCountdown} />
      </div>
    
  );
};

export default OTPModal;
