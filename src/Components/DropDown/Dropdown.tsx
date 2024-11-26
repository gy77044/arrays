import { memo, useState } from "react";
import { EllipseIcon, ModuleIcon } from "../../assests/icons/Icons";
import { IconUpload } from "../../assests/icons/MapToolsIcons";
import { useAppDispatch } from "../../ReduxTool/store/hooks";
import { SelectPickerDropTypes } from "./dropTypes";

export interface FileData {
    name: string;
    icon: string;
    file: File;
  }
  

const Dropdown = ({ filteredData, handleClick, upload, uploadBtnTxt, handleChange, typeaccept, name,optionText,setState}: SelectPickerDropTypes) => {
    const [sel, setSel] = useState("false");
    const [ uploadfile,setUploadFile] = useState<any>(null)
    const dispatch = useAppDispatch()
    const selectOption = () => {
        let colorCode = ["rgba(40, 199, 111, 1)", "rgba(40, 199, 111, 0.8)", "rgba(40, 199, 111, 0.6)"]
        let options = <>
            <ul className="option-body overflow-auto custom-scrollbar-css" aria-labelledby="dropdownHoverButton">
                {filteredData.map((ele, i) => (<li className={` ${sel === ele ? "" : "option-list capitalize"} `} onClick={() => handleClick({ name: name, value: ele })} key={i}>
                    {ele}
                </li>
                ))}
            </ul></>
        if (name == "modulemanufacturer" || name === "modulecapacity" || name === "inveterManufacturer" || name === "inveterCapacity") {
            options = <>
                <ul className="option-body overflow-auto custom-scrollbar-css" aria-labelledby="dropdownHoverButton">
                    <span className="text-primary-200 text-1.4xl font-bold">Recommended by system</span>
                    {filteredData.map((ele, i) => {
                        return (
                            <>
                                {i == 3 && <hr color="rgba(183, 197, 200, 0.4)" />}
                                <li className={` ${sel === ele ? "" : "option-list capitalize"} `} onClick={() => handleClick({ name: name, value: ele })} key={i}>
                                    {i < 3 ?<div className="flex">
                                        <div className="w-[2vh]  pr-[0.6vh]">
                                        <EllipseIcon fill={colorCode[i]} />
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {ele}
                                        </div>
                                    </div>
                                        :
                                        <>

                                            <div className="flex items-center gap-2">
                                            {name == "modulemanufacturer" &&  <div className="w-[2vh] pr-[0.6vh]"><ModuleIcon /></div>}
                                                {ele}
                                            </div>
                                        </>
                                    }
                                </li>
                            </>
                        )
                    })}
                </ul>
            </>
        }
        return options
    }



    const handleFileUpload =()=>{
        if (setState){            
            setState(true)
        }   
     }
        
    return (
        <div id="dropdownHover" className={`select-option`}>
            {(filteredData && filteredData.length > 0) ? <>{selectOption()}
                {upload &&
                    <div className='option-footer'>
                        <button className="flex items-center" onClick={handleFileUpload} id="file_input" type="button">
                        <IconUpload height={22} width={22} />
                        <label className="footer-label" htmlFor="file_input">{uploadBtnTxt ? `${uploadBtnTxt}` : 'Upload Pan File (.pan)'}</label>
                        </button>
                        {/* <input className="footer-input" onChange={(e)=>handleFileUpload(e.target.files)} id="file_input" type="file" accept={typeaccept} /> */}
                    </div>
                }
            </> : <>
                <ul className="option-body overflow-auto custom-scrollbar-css bg-white" aria-labelledby="dropdownHoverButton">
                    <li className="option-list capitalize">{optionText?optionText:"Option not found"}</li>
                </ul>
            </>}
        </div>
    )
}

export default memo(Dropdown)
