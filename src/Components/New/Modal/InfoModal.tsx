import { IconClose } from "../../../assests/icons/ModalIcons";

const InfoModal = ({ modaltitle, content, setClose }: { modaltitle: string, content: string, setClose: React.Dispatch<React.SetStateAction<boolean>> }) => {
  return (
    <div className="info-content">
      <div className="info-header">
        <div className="info-title">{modaltitle}</div>
        <div onClick={() => setClose(false)}>
          <IconClose />
        </div>
      </div>
      <div className="info-body">
        {content}
      </div>
    </div>

  );
};

export default InfoModal;
