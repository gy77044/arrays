import { memo } from "react";
import { FormModalPropsType } from "../../../Utils/Const";
import { IconClose } from "../../../assests/icons/ModalIcons";
import { Button } from "../../AllButton/AllButtons.tsx";
import { useAppSelector } from "../../../ReduxTool/store/hooks";

const FormModal = ({headerTitle,modalSize,btnTitle,onSubmit,children,fontWeight,closeModal,name,subHeaderTitle,className,overflow,btnVisible=true}: FormModalPropsType) => {
  const { title, btnTxt,secondaryBtnTxt } = useAppSelector((state) => state.commonReducers.modal);
  return (
    <>
      <div className={`modal-backdrop1 ${className}`}>
        <div className={`main-modal2 ${modalSize + "-modal"}`}>
          <div className="modal-header1">
            <h3 className={`heading-md-semibold flex-1 ${fontWeight}`}>
              {title}
            </h3>
            <button onClick={() => closeModal(name)}>
              <IconClose />
            </button>
          </div>
          <form /*className="modal-body2 custom-scrollbar-css"*/  onSubmit={onSubmit}>
            <div style={{maxHeight:'54vh',overflow:'auto'}} className="custom-scrollbar-css m-2">
            {children}
            </div>
            <div className="modal-footer1">
             {btnVisible&& <button className="btn btn-md-primary" type="submit">
                {btnTxt}
              </button>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default memo(FormModal);
