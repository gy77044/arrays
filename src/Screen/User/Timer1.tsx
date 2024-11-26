import React, { useRef, useEffect } from 'react';
 
const OtpTimer: React.FC = () => {
  const timeLeftRef = useRef<number>(120); // 2 minutes in seconds
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const displayRef = useRef<HTMLHeadingElement>(null); // Reference to the display element
 
  const startTimer = () => {
    // if (timerRef.current) return; // Avoid starting multiple timers
 
    timerRef.current = setInterval(() => {
      if (timeLeftRef.current <= 1) {
        clearInterval(timerRef.current!);
        timerRef.current = null;
        alert("OTP expired! Please request a new one.");
      } else {
        timeLeftRef.current -= 1;
        updateDisplay();
      }
    }, 1000);
  };
 
  const updateDisplay = () => {
    if (displayRef.current) {
      const minutes = Math.floor(timeLeftRef.current / 60);
      const seconds = timeLeftRef.current % 60;
      displayRef.current.textContent = `OTP expires in: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  };
 
  useEffect(() => {
    startTimer();
    return () => clearInterval(timerRef.current!); // Cleanup on unmount
  }, []);
 console.log('dd');
 
  return (
<div>
<h1 ref={displayRef}>OTP expires in: 02:00</h1>
</div>
  );
};
 
export default OtpTimer;