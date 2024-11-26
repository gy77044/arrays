import { useAppSelector } from "../../../ReduxTool/store/hooks";

interface tootTipModalProps {
  modaltitle: string,
  content: JSX.Element | string,
  setClose: React.Dispatch<React.SetStateAction<boolean>>,
  isHandleBtn?: boolean
  handleBtn?: () => void, customCss?: string
}

const TooltipModal: React.FC<tootTipModalProps> = ({ isHandleBtn, modaltitle, content, setClose, handleBtn, customCss }) => {
  const { tooltipTitle, tooltipContent } = useAppSelector(state => state.mapref);

  return (
    <div className="modal-nobackdrop1">
      <div className="main-modal3">
        <h4 className="heading-sm-semibold">{tooltipTitle}</h4>
        <p className="para-md text-gray-600 pt-2">
          {tooltipContent}
        </p>
        <div className={`flex gap-4 max-sm:flex-col mt-4 ${!isHandleBtn && 'hidden'}`}>
          <button className={`btn btn-sm-primary`} onClick={handleBtn}>Button</button>
        </div>
      </div>
    </div>
  );
};

export default TooltipModal;
