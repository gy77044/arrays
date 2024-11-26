import { useAppSelector } from "../../../ReduxTool/store/hooks";

interface informationModalProps {
  modaltitle: string;
  content: JSX.Element | string;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
  isHandleBtn?: boolean;
  handleBtn?: () => void;
  customCss?: string;
  btnTitle?: string
}

const InformationModal: React.FC<informationModalProps> = ({
  isHandleBtn,
  modaltitle,
  content,
  setClose,
  handleBtn,
  customCss,
  btnTitle
}) => {
  const { informationTitle, informationContent } = useAppSelector((state) => state.mapref);

  return (
    <div className="modal-nobackdrop1">
      <div className="main-modal3">
        <h4 className={`heading-sm-semibold ${customCss}`}>
          {informationTitle} :
        </h4>
        <p className="para-md text-gray-600 pt-2">{informationContent}</p>
      </div>
      <div className={`flex gap-4 max-sm:flex-col mt-4 ${!isHandleBtn && "hidden"}`}>
        <button className={`btn btn-sm-primary`} onClick={handleBtn}>
          {btnTitle&&btnTitle}
        </button>
      </div>
    </div>
  );
};

export default InformationModal;
