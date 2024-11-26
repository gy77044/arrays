import { useState } from 'react';
import { IconInfo } from '../../assests/icons/DrawerIcons';

const IconPopup = ({ children }: { children: any }) => {

  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleIconHover = () => {
    setPopupOpen(true);
  };

  const handleIconLeave = () => {
    setPopupOpen(false);
  };

  return (
    <div className={`relative`} onMouseEnter={handleIconHover} onMouseLeave={handleIconLeave}>
      <IconInfo />
      {/* {isPopupOpen && <div className={`absolute bg-white 100 w-[10vh] h-[5vh] left-[4vh] top-[-1vh] px-1 border-[0.2vh] border-primary-200 rounded-default`}>{children}</div>} */}
    </div>
  );
};



export default IconPopup
