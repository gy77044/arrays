import React from "react";
import { IconUpload } from "../../assests/icons/MapToolsIcons";

interface DragNDropProps {
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  uploadTitle?:string
  subTitle?:string
  fileSize?:string
  acceptfile?:string
}

const DragNDrop: React.FC<DragNDropProps> = ({ onFileChange,uploadTitle,subTitle,fileSize,acceptfile}) => {
  return (
    <div style={{ fontFamily: 'Roboto' }} className="w-full h-full flex flex-col items-center relative border-[0.2vh] border-primary-200 border-dashed rounded-[1.4vh] space-y-[1vh] p-[0.4vh]">
      <input
        type="file"
        accept={acceptfile?acceptfile:".csv"}
        style={{ cursor: 'pointer', width: '100%', height: '100%', opacity: 0, position: 'absolute' }}
        onChange={onFileChange}
      />
      <IconUpload />
      <div className="font-semibold text-1.6xl leading-[2.8vh] text-primary-200">
       {uploadTitle?uploadTitle:"Drag photo here or click here to import items."}
      </div>
      <div className="font-normal text-1.2xl leading-[2vh] py-0.4 text-grey-200">
        <i>{subTitle?subTitle:`Supported file types are: ${acceptfile}`}</i>
      </div>
      <div className="font-normal text-1.2xl leading-[2vh] pb-0.4 text-grey-200">
        <i>Maximum file size: {fileSize?fileSize:"1MB"}</i>
      </div>
    </div>
  );
};

export default DragNDrop;
