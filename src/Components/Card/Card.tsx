import { useEffect, useState } from "react";
 
const Card = ({
  content,
  btnTxt,
  CardIcon,
}: {
  content: string;
  btnTxt: string;
  CardIcon: JSX.Element;
}) => {
  const [isActive, setIsActive] = useState("");
  const handleMouseEnter = (btnTxt: string) => {    
    if(btnTxt){
      setIsActive(btnTxt);    
    }else{
      setIsActive("");
    }
  };
  const handleMouseLeave = () => {
    setIsActive("");
  };
  useEffect(() => {  
      setIsActive("Book Product Demo");    
  }, []);
 
  return (
    <div
      onMouseEnter={() => handleMouseEnter(btnTxt)}
      onMouseLeave={handleMouseLeave}
      className={`${
        isActive === btnTxt
          ? " scale-100 border-primary-200"
          : "scale-90 opacity-70 "
      }  epccard group w-[38.4vh] h-[54.1vh] duration-500 ease-in-out flex flex-col justify-center items-center border-t-[1.7vh] border-[0.1vh] rounded-[2.2vh]`}
    >
      <div className=" epc-card-content text-2.8xl leading-[3.3vh] text-center font-medium">
        {content}
      </div>
      <div className="h1"></div>
      <button className=" dark-md-btn text-2.4xl leading-[3.3vh] justify-between font-normal w-4/5">
        {CardIcon}
        {btnTxt}
      </button>
    </div>
  );
};
 
export default Card;