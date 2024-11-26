import { useEffect, useState } from "react";
import "../../assests/scss/epc/Progress.scss";
import Iconss from './IconsLib/Index';

interface ProgressProps {
  icon: string;
  name: string;
  file: File | string;
  handleClear: (name: string,keyName?:string) => void
  handlePreviewClick: (file: File | string) => void
  keyName?:string;
}

export function Progress({ icon, name, handleClear, handlePreviewClick, file,keyName}: ProgressProps) {
  const [complete, setComplete] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [color, setColor] = useState<string>("#ed665f");


  useEffect(() => {
    if (name) {
      let timeout = setInterval(() => {
        setWidth(prev => {
          if (prev !== 100) return prev + 1;

          setComplete(true);
          setColor("#6cc08a");
          return prev;
        });
      }, 10);
      return () => clearInterval(timeout);
    }
  }, [name]);

  return (
    <>
      <div className="progress bg-grey-400">
        <div className="flex items-center cursor-pointer flex-1" onClick={() => handlePreviewClick(file)}>
          <div className="progress__icon" >
            <Iconss name={icon} width="20px" height="20px" opacity={complete ? 1 : 0.5} />
          </div>
          <div className="progress__content">
            <div className="progress__content__1">
              <p className="progress__content__1__filename">{name}</p>
            </div>
            <div className="progress__content__2">
              <div className="progress__content__2__bar" style={{ width: `${width}%`, background: color }} />
            </div>
          </div>
        </div>
        <Iconss className={complete ? "check cursor-pointer" : "close cursor-pointer"} name={complete ? "CLOSE" : "CLOSE"} width="20px" height="20px" onClick={() => handleClear(name,keyName)} />
      </div>
    </>
  );
}
