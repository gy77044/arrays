import { memo } from "react";
import { modalPropsType } from "../../../Utils/Const";
import { IconClose } from "../../../assests/icons/ModalIcons";

const Modal = ({headerTitle,modalSize,btnTitle,secBtnTitle,onClick,children,fontWeight,closeModal,name,subHeaderTitle,className,overflow}: modalPropsType) => {
  return (
    <>
      <div className={`modal-backdrop ${className}`}>
        <div className={`modal-wrapper  ${modalSize??+'-modal'??'sm-modal'}`}>
          <div className='modal-content'>
            <div className="modal-header">
            <div className={`header-title capitalize ${fontWeight}`}>{headerTitle}</div>
            <button onClick={()=>closeModal(name)}>
              <IconClose />
            </button>
          </div>
         {subHeaderTitle && <div className="modal-subHeader">
            {subHeaderTitle}
          </div>}
          <div className="modal-body custom-scrollbar-css"/*overflow-auto */ style={{overflow:overflow===undefined ?"auto":""}}>
            {children}
          </div>
          <div className="modal-footer">
            {btnTitle && <button className="dark-md-btn" type="button" onClick={()=>onClick()}>{btnTitle}</button>}
            {secBtnTitle &&  <button className="light-md-btn" type="button" onClick={()=>onClick(true)}>
              {secBtnTitle}
            </button>}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};
export default memo(Modal)