import React, { useEffect, useState } from "react";

const Timer = ({
  handleIncrement,
  resendcount,
  countdown,
  setCountdown,
}: {
  handleIncrement: () => void;
  resendcount: number;
  setNumberCount: React.Dispatch<React.SetStateAction<number>>;
  timeRef: React.RefObject<HTMLAnchorElement>;
  setCountdown: React.Dispatch<React.SetStateAction<number>>;
  countdown: number;
}) => {
  const [resendAvailable, setResendAvailable] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setResendAvailable(false)
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
        setResendAvailable(true);
      }
    }, 1000);

    // Cleanup the interval on unmount
    return () => clearInterval(interval);
  }, [countdown]);

  

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
    // return `${formattedMinutes}:${formattedSeconds}`;
    return `Resend OTP in ${formattedSeconds} seconds`;
  };
  return (
    <>
      <div className="mt-14 text-center">
        {resendAvailable && resendcount < 3 ?(
           <>
           <span className="para-sm">Didn't recieve code? </span>
           <button className={"para-md underline"} id="resend-btn" disabled={countdown === 0 || resendcount===3? false : true} onClick={handleIncrement} >Resend OTP {resendcount}/3</button>
         
         </>
        ): <>
        <div className="flex justify-center items-center">
          <a href="#" id="timeLeft" className="para-sm" data-bs-toggle="tooltip" title="OTP Timer">
            {formatTime(countdown)}
          </a>
        </div>
      </>}
        {/* { countdown > 0 && 
        <>
          <div className="flex justify-center items-center">
            <a href="#" id="timeLeft" className="para-sm" data-bs-toggle="tooltip" title="OTP Timer">
              {formatTime(countdown)}
            </a>
          </div>
        </>
        }
        { resendAvailable && resendcount < 3 && (
          <>
            <span className="para-sm">Didn't recieve code? </span>
            <button className={"para-md underline"} id="resend-btn" disabled={countdown === 0 || resendcount===3? false : true} onClick={handleIncrement} >Resend OTP</button>
          
          </>
        ) } */}
      </div>
    </>
  );
};

export default Timer;
