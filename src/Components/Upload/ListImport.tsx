import React, { useState } from 'react';
import { CSVLink } from "react-csv";
import { uploadLeadsCsvData } from '../../Utils/Const';
import { IconClose } from '../../assests/icons/ModalIcons';
import DragNDrop from './DragNDrop';
const ListImport = ({ uploadedData, setUploadedData }: { uploadedData: File | null, setUploadedData: React.Dispatch<React.SetStateAction<File | null>> }) => {
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFileName(event.target.files[0].name!);
      setUploadedData(event.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setUploadedFileName('');
    setUploadedData(null);
  };

  return (<>
    <div className='overflow-hidden'>
      <div><DragNDrop onFileChange={handleFileChange} uploadTitle={"Drag files here or click here to import items."} subTitle='Supported file types are: .CSV, .DOCX' fileSize={"10MB"} acceptfile=".csv,.docx" /></div>
      {uploadedFileName && (
        <div className="mt-2 flex justify-center items-center text-primary-200 bg-primary-700/40 p-1 rounded-default w-fit">
          <div className="font-semibold text-1.4xl leading-[2.8vh] t">{uploadedFileName}</div>
          <button className="ml-2 text-red-500 hover:text-red-700" onClick={handleRemoveFile}>
            <IconClose />
          </button>
        </div>
      )}
      <div className="h2"></div>
      <div className='text-1.6xl leading-[3.2vh] font-medium text-yellow-100 '>Note :-</div>
      <ul className='space-y-[1vh]'>
        <li className='text-1.6xl leading-[1.2vh] font-medium text-primary-200/80 text-wrap'>• For an example of a properly formatted CSV file, download one of our CSV templates. </li>
        <li className='text-1.6xl leading-[1.2vh] font-medium text-primary-200/80'>• Please download csv template <CSVLink data={uploadLeadsCsvData} filename="pvNXT_Template.csv"><span className='text-blue-200 line-btn'>here</span></CSVLink></li>
      </ul>
    </div>
  </>

  )
}

export default ListImport