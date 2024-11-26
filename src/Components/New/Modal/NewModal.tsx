import { useEffect } from "react";
import { toggleModalState } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { IconClose } from "../../../assests/icons/ModalIcons";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { NewModalProp } from "./NewModalType";
import { toogleTooltip } from "../../../ReduxTool/Slice/Map/MapReducer";

export const NewModal = (props: NewModalProp) => {
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(toogleTooltip({dipy:0,istooltip:"",msg:""}))
    props.setIsCLose(false);
  };

  const openModal = () => {
    dispatch(toggleModalState(false));
  };

  const { title, btnTxt,secondaryBtnTxt } = useAppSelector((state) => state.commonReducers.modal);
 
  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <div className="modal-backdrop1">
        <div className={`main-modal2 ${props.modalSize+'-modal'}`}>
          <div className="modal-header1">
            <div className="heading-md-semibold flex-1 capitalize">{title === "Congratulation" ? `Congratulation ${user.fname} 😊 ` : title}</div>
            <button onClick={closeModal}>
              <IconClose />
            </button>
          </div>
          <div className="modal-body2 custom-scrollbar-css" /*overflow-auto */ style={{overflow:props.overflow===undefined ?"auto":"",height:props.height??"",maxHeight:props.maxheight??"54vh"}}>
            {props.children}
          </div>
          <div className="modal-footer1">
         {/* {title==="Trial Period Expired" &&<a  title="Support Center" className="cursor-pointer btn btn-md-primary" target="_blank" href="mailto:support@terranxt.com">Contact Support</a>} */}
            {secondaryBtnTxt &&  <button className="btn btn-md-outlineprimary" type="button" onClick={()=>props.onClick(secondaryBtnTxt)}>{secondaryBtnTxt}</button>}
            {btnTxt && <button className={`${btnTxt===""?"hidden":""} btn btn-md-primary`} type="button" onClick={() =>props.isAbleCLick&& props.onClick(title)}>
              {btnTxt}
            </button>}
          </div>
        </div>
      </div>
    </>
  );
};
