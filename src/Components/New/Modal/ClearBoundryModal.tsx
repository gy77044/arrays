import { Button } from "../../AllButton/AllButtons.tsx";


interface props {
    setClose: React.Dispatch<React.SetStateAction<boolean>>
    heading: string
    subheader: string,
    successBtnText: string,
    closeBtnText: string,
    onSubmit: () => void
}


const ClearBoundryModal: React.FC<props> = ({ setClose, heading, subheader, successBtnText, closeBtnText, onSubmit }) => {
  return (
    <>
      <div className="modal-backdrop1">
        <div className="main-modal2">
          <h4 className="heading heading-md-semibold">{heading}</h4>
           {/* Use dangerouslySetInnerHTML for subheader */}
           <p className="para para-md" dangerouslySetInnerHTML={{ __html: subheader }} />
          <div className="flex gap-4 max-sm:flex-col mt-4">
            <Button className="btn btn-sm-outlineprimary" name={closeBtnText} onClick={() => setClose(false)} />
            <Button className="btn btn-sm-primary" name={successBtnText} onClick={onSubmit} />
          </div>
        </div>
      </div>

    </>
  );
};

export default ClearBoundryModal;