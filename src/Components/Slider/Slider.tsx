import { useEffect, useId, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./imageSlider.css";
import img1 from "../../assests/img/Dashboard/Banner.png";
import img2 from "../../assests/img/Dashboard/banner2.png";
import img3 from "../../assests/img/Dashboard/banner3.png";
import img4 from "../../assests/img/Dashboard/banner4.png";
import SliderButton from "./SliderButton";

const obj = { img: img1, text1: "Initial Investment", text2: "Investing in solar energy involves initial costs but leads to long-term financial savings.", btnName: "Let's Go Solar",};
const obj1 = { img: img2, text1: "Tax Benefits", text2: "Tax benefits are available for those who choose solar energy.", btnName: "Let's Go Solar",};
const obj2 = { img: img3, text1: "Ideal Timing", text2: "Advancements in technology and decreasing costs make now an ideal time to switch to solar power.", btnName: "Let's Go Solar",};
const obj3 = { img: img4, text1: "Economic Advantages", text2: "Solar energy provides significant economic advantages.", btnName: "Let's Go Solar",};
const imageArray1 = [obj, obj1, obj2, obj3];
const delay = 4000;
const Slider = () => {
  const newid = useId()
  const [index, setIndex] = useState(0);
  const [pauseSlider, setPauseSlider] = useState(false);
  let timeoutRef = useRef<any>(null);
  const {pathname} = useLocation()
  useEffect(() => {
    const resetTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    if (!pauseSlider) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setIndex((prevIndex) => (prevIndex === imageArray1.length - 1 ? 0 : prevIndex + 1));
      }, delay);
    }

    return () => {
      resetTimeout();
    };
  }, [index, pauseSlider]);

  const handleMouseEnter = () => {
    setPauseSlider(true);
  };

  const handleMouseLeave = () => {
    setPauseSlider(false);
  };

  return (
    <div className="relative slide-wrapper flex flex-inline space-x-[4vh]">
      <div className="slideshow">
        <div className="slideshowSlider relative  "   style={{ transform: `translate3d(${-index * 100}%, 0, 0)`, transition: pauseSlider ? 'none' : '1500ms infinite linear' }}   onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          {imageArray1.map((item, idx) => {          
            return (
              <>
                <div className=" slide relative " key={newid+idx} style={{ backgroundImage: `url(${item.img}) `, backgroundSize: 'cover', backgroundRepeat: 'no-repeat'  }}>
                  <>
                    <div className="relative flex flex-col justify-center items-center min-h-[100%]">
                      <div className="text-[4vh] font-semibold text-yellow-100 leading-[4.5vh] ">{item.text1}</div>
                      <div className="h3"></div>
                      <div className="text-2xl text-white font-medium leading-[2.1vh]">{item.text2}</div>
                      <div className="h4"></div>
                      <Link to={`${pathname}/RoofAnalysis`}>
                        <button className="dark-md-btn h-[5vh] w-[20vh] text-1.8xl border-none bg-yellow-100 hover:bg-white hover:text-yellow-100">{item.btnName}</button>
                      </Link>
                      <div className="h4"></div>
                    </div>
                  </>
                </div>
              </>
            )
          })}
        </div>
      </div>
      <SliderButton index={index} setIndex={setIndex}/>
    </div>
  );
};

export default Slider;
