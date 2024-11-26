import { useState } from "react";
import { FileData, FileDataProps } from "../../ReduxTool/Slice/Dashboard/dashboardTypes";
import { EditableTableTy, ICheckboxType, IInfoProps, IInfoProps1, IInfoProps2, IInpProps, IInputProps, IInputPropsHlp, INewInputProps, IRadioProps, ITableProps, IToastProps, IToggle1Props, IToggle2Props, Modal5Ty, SubTableTy, Textareaty, } from "./types";
import { el } from "@faker-js/faker/.";
import { Progress } from "../Upload/Progress";
import { useAppDispatch, useAppSelector } from "../../ReduxTool/store/hooks";
import { setEpcFormData } from "../../ReduxTool/Slice/Auth/UserVerifyReducer";
import { toast } from "react-toastify";
import { IconErrorPage } from "../../assests/icons/Icons";
import { Button } from "../AllButton/AllButtons.tsx";
import { IconClose } from "../../assests/icons/ModalIcons";
import { toTitleCase } from "../../Utils/commonFunctions";
import { IconRSBEdit, IconRSBSave } from "../../assests/icons/MapToolsIcons";
import { NewModalProp } from "../New/Modal/NewModalType";
import { toogleTooltip } from "../../ReduxTool/Slice/Map/MapReducer";
import { toggleModalState } from "../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { useNavigate } from "react-router-dom";
import { setCardTitle } from "../../ReduxTool/Slice/Dashboard/DashboardReducer";

<div className="min-h-screen w-screen bg-gradient-to-tr from-gray-200 to-gray-300 py-16 px-2">
  <div className="grid w-full grid-cols-2 place-items-center space-y-12"></div>
</div>



export const LoadingSpinner = () => {
  return (
    <>
      {/* Global loader */}
      <div className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center z-[99999999]">
        <div className="loader ease-linear rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4" />
        <h2 className="text-center text-white text-xl font-semibold">Loading...</h2>
        <p className="w-1/3 text-center text-white">This may take a few seconds, please don't close this page.</p>
      </div>
    </>
  );
};

export const ErrorMessage = () => {
  const dispatch = useAppDispatch()
  const handleCLick = () => {
    dispatch(setCardTitle("Recent"))
  }
  return (
    <>
      {/* Global input with focus outline & shadow */}
      <div className="grid place-content-center bg-white px-4">
        <div className="text-center">
          <IconErrorPage />
          <h1 className="heading-lg-bold mt-6 ">Uh-oh!</h1>
          <p className="para-lg text-gray-500 mt-4">We can't find that page.</p>
          <Button className="btn btn-md-primary mt-2" id="but-otp" name="Go Back Home" onClick={handleCLick} />

        </div>
      </div>
    </>
  );
};

// const headers = ['Name', 'Details'];
// const data = [
//   { id: '1', name: 'John Doe', details: '24/05/1995' },
//   { id: '2', name: 'Jane Doe', details: '04/11/1980' },
//   { id: '3', name: 'Gary Barlow', details: '24/05/1995' },
// ]
// const handleRowSelect = (id: string) => {
// };

// const handleSelectAll = () => {
// };

// const renderCustomButtons = (id: string) => (
//   <>
//     <button className="btn btn-xs-primary">Custom View</button>
//     <button className="btn btn-xs-outlineprimary">Custom Delete</button>
//   </>
// );

export const TableCheckBtn: React.FC<ITableProps> = ({ headers, data, showCheckboxes = false, onRowSelect, onSelectAll, renderButtons, tableCaption }) => {
  return (
    <div className="overflow-x-auto m-auto">
      <table className="table-main1">
        <caption className="table-caption1">
          {tableCaption}
        </caption>
        <thead className="table-head1">
          <tr>
            {showCheckboxes && (
              <th className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                <label htmlFor="SelectAll" className="sr-only">Select All</label>
                <input
                  type="checkbox"
                  id="SelectAll"
                  className="size-2 rounded border-gray-300/60"
                  onChange={onSelectAll}
                />
              </th>
            )}
            {headers.map((header, index) => (
              <th key={index} className="table-headth1">
                {header}
              </th>
            ))}
            {/* <th className="px-4 py-2"></th> */}
          </tr>
        </thead>
        <tbody className="table-body1">
          {data.length > 0 ? data.map((row: any) => (
            <tr className="table-bodytr1" key={row.id}>
              {showCheckboxes && (
                <td className="sticky inset-y-0 start-0 bg-white px-4 py-2">
                  <label className="sr-only" htmlFor={`Row${row.id}`}>Row {row.id}</label>
                  <input
                    className="size-2 rounded border-gray-300/60"
                    type="checkbox"
                    id={`Row${row.id}`}
                    onChange={() => onRowSelect?.(row.id)}
                  />
                </td>
              )}
              {headers.map((col: string) => (
                <td className="table-bodytd1">{row[col as keyof object]}</td>
              ))}

              {/* <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{row.name}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.details}</td> */}
              {/* <td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.role}</td>
              <td className="whitespace-nowrap px-4 py-2 text-gray-700">{row.salary}</td> */}
              {/* {renderButtons && (
                <td className="whitespace-nowrap px-4 py-2">
                  <div className="mt-4 flex gap-2">
                    <>
                      <button className="btn btn-xs-primary">View</button>
                      <button className="btn btn-xs-outlineprimary">Delete</button>
                    </>
                  </div>
                </td>
              )} */}
            </tr>
          )) : <tr className="table-bodytr1"><td colSpan={headers.length} className="table-bodytd1 text-center">No Rows to Show</td></tr>}
        </tbody>
      </table>
    </div>
  );
};


/********editable table*********** */

export const EditableTable: React.FC<EditableTableTy> = ({ tableCaption, header, data, handleChange, handleEditClick, toggleContentEditable, editColName, isEditAble }) => {
  return (
    <div className="overflow-x-auto">
      <table className="table-main1">
        <caption className="table-caption1">
          {tableCaption}
        </caption>
        <thead className="table-head1">
          <tr>
            {header.map((header, index) => (
              <th key={index} className="table-headth1 whitespace-pre">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="table-body1">
          {data.length > 0 ? data.map((row: any, idx) => (
            <tr className="table-bodytr1" key={row.id}>
              {header.map((col: string, i: number) => {
                return <>{col === editColName ? <td contentEditable={toggleContentEditable} onBlur={(e) => handleChange(e, idx)} className="table-bodytd1">{row[col as keyof object]}</td> : <td className="table-bodytd1">{row[col as keyof object]}</td>}</>
              }
              )}
            </tr>
          )) : <tr className="table-bodytr1"><td colSpan={header.length} className="table-bodytd1 text-center">No Rows to Show</td></tr>}
        </tbody>
      </table>
      {isEditAble && <div className="flex flex-row justify-end items-center mt-2 gap-x-2">
        <button title="edit" onClick={handleEditClick} className={`btn-link`}>
          {toggleContentEditable ? "Save" : "Edit"}{/* <IconRSBEdit color={!toggleContentEditable ? '#1C1B1F' : '#ddd'} /> */}
        </button>
        <button title="save" disabled={true} onClick={handleEditClick} className="btn-link" >
          Delete{/* <IconRSBSave color={toggleContentEditable ? '#1C1B1F' : '#ddd'} /> */}
        </button>
      </div>}
    </div>
  );
};

//*************Sub table************** */

export const SubTable: React.FC<SubTableTy> = ({ headers, data, subTableNames }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="text-left">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        {subTableNames.map((subTable: string) =>
        (
          <>
            <thead className="text-left">
              <tr>
                <th colSpan={headers.length} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center">{subTable}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data[subTable as keyof object].length > 0 ?
                <>
                  {data[subTable as keyof object].map((row: any) => (
                    <tr>
                      {headers.map((col: string) => <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{row[col as keyof object]}</td>)}
                    </tr>
                  ))}
                </>
                :
                <tr className="table-bodytr1"><td colSpan={headers.length} className="table-bodytd1 text-center">No Rows to Show</td></tr>}
            </tbody>
          </>
        )
        )}
      </table>
    </div>
  );
};


//   <div className="main-box1 group">
//   {props.label &&<label className={`label-box1  ${props.error && "label-error"} `}  htmlFor={props.id}>{props.label}</label>}
//     <input autoComplete="off" id={props.id} className={`input-box1 peer ${props.error && "input-error"}`} {...props} />
//     {props.error && <span className={`helper-box1 opacity-100 ${props.error ? "text-rose-400" : ""}`}>{props.error}</span>}
//   </div>
export const TestingSufBtn = () => {
  return (
    <>
      {/* Global input with inline suffix button */}
      <div className="main-box1 group">
        <label className="label-box1">Label Name</label>
        <div className="input-main1">
          <input type="text" className="input-box1 suf-input1 peer" />
          <button className="suf-box1 btn btn-sm-primary">Submit</button>
        </div>
      </div>
    </>
  );
};

export const Breadcrumb = () => {
  return (
    <>
      {/* Global input with focus outline & shadow */}

      <ul className="flex items-center justify-center space-x-4 font-[sans-serif]">
        <li className="text-gray-500 text-base cursor-pointer">Home</li>
        <li className="text-gray-500 text-lg">/</li>
        <li className="text-gray-500 text-base cursor-pointer">Profile</li>
        <li className="text-gray-500 text-lg">/</li>
        <li className="text-gray-700 text-base font-bold cursor-pointer">Edit</li>
      </ul>
    </>
  );
};

export const Input = (props: IInpProps) => {
  return (
    <>
      {/* Global input with focus outline & shadow */}
      <div className="main-box1 group relative" key={props.key}>
        {props.label && (<label htmlFor={`${props.id}`} className={`label-box1  ${props.error && "label-error"} text-nowrap`}   >   {props.label}   {props?.isRequired && (<span className="text-rose-400 text-lg pl-0.5">* </span>)} </label>)}
        <div className="input-main1">
          <input onWheel={(e) => e.currentTarget.blur()} autoComplete={props.autoComplete??"off"} id={`${props.id}`} className={`input-box1 peer ${props.btntitle?"pr-[6.4rem]":""} ${props.error && "input-error"} ${props.disabled === true ? "bg-gray-100/80 cursor-not-allowed text-[#999999]" : ""}`} style={{paddingRight:`${props.suftext?`${props.suftext.length+30}px`:""}`}} {...props} />
          {(props.suficon && !props.handleSufIcon)&&<span className="suf-box1">{props.suficon }</span>}
          {(props.suficon&& props.handleSufIcon && props.value.length>0)&&<span className="suf-box1 cursor-pointer" onMouseDown={props.handleSufIcon}>{props.suficon }</span>}
          {(props.suftext)&&<span className={`suf-box1 ${props.error &&'label-error'} ${props.disabled?"text-[#999999]":""}`}>{props.suftext }</span>}
          {props.btntitle && (<button name={props.btntitle} disabled={props.btnDisabled} className={`suf-box1 btn btn-xs-primary  ${props.error ? "bg-gradient-to-tr from-rose-400 to-rose-400/80 border-none":""}`} onClick={props.onBtnTitleClick} > {props.btntitle} </button>)}
        </div>
        {props.error ? (<span className="label-box1 label-error" > {props.error} </span>)
          :
          <span className={`helper-box1`}>{props.helpertext && props.helpertext}</span>}
      </div>
    </>
  );
};
export const InputTooltip = (props: IInfoProps) => {
  return (
    <>
      {/* Global input with focus outline & shadow */}
      <div className="main-box1 group">
        <div className="flex-between">
          <label className={`label-box4  ${props.errors && "label-error"} `}>
            {props.labelname ? props.labelname : "Label Name"}
          </label>
          <div className="main-tt1 group">
            <span className="tt-icon1">
              {props.infoicon ? props.infoicon : "?"}
            </span>
            <div className="tt-modal1">
              <span className="tt-body1">
                {props.content
                  ? props.content
                  : `Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.`}
                <a href={props.link} className="tt-link1">
                  {props.linkbtnTxt ? props.linkbtnTxt : "Explore"}
                </a>
              </span>
              <div className="tt-arrow1"></div>
            </div>
          </div>
        </div>
        <input
          autoComplete="off"
          className={`input-box1 peer ${props.errors && "input-error"}`}
          {...props}
        />
        {props.errors ? (
          <span
            className={`helper-box1 ${props.errors ? "text-rose-400" : ""}`}
          >
            ERROR...
          </span>
        ) : (
          <span className={`helper-box1`}>
            {props.helpertext ? props.helpertext : "Helper text: format xx-xxx"}
          </span>
        )}
      </div>
    </>
  );
};
export const InputHelper = (props: IInputPropsHlp) => {
  return (
    <>
      {/* Global input with helper below */}
      <div className="main-box1 group">
        <label
          htmlFor={props?.id}
          className={`label-box1  ${props.errors && "label-error"}`}
        >{`${props.labelname ? props.labelname : "Label Name"}`}</label>
        <input
          autoComplete="off"
          className={`input-box1 peer ${props.errors && "input-error"}`}
          {...props}
        />
        {props.errors ? (
          <span
            className={`helper-box1 ${props.errors ? "text-rose-400" : ""}`}
          >
            ERROR...
          </span>
        ) : (
          <span className={`helper-box1`}>
            {props.helpertext ? props.helpertext : "Helper text: format xx-xxx"}
          </span>
        )}
      </div>
    </>
  );
};

// For Login page....
export const InputPreIcon = (props: IInputProps) => {
  return (
    <>
      {/* Global input with inline prefix icon */}
      <div className="main-box1 group">
        <label
          htmlFor={props?.id}
          className={`label-box1  ${props.errors && "label-error"}`}
        >{`${props.labelname ? props.labelname : "Label Name"}`}</label>
        <div className="input-main1">
          <input
            autoComplete="off"
            className={`input-box1 pre-input1 peer ${props.errors && "input-error"
              }`}
            {...props}
          />
          <span className="pre-box1">{props.icon ? props.icon : "mail"}</span>
        </div>
        {props.errors ? (
          <span
            className={`helper-box1 ${props.errors ? "text-rose-400" : ""}`}
          >
            ERROR...
          </span>
        ) : (
          <span className={`helper-box1`}>
            {props.helpertext ? props.helpertext : "Helper text: format xx-xxx"}
          </span>
        )}
      </div>
    </>
  );
};

export const InputBothIcon = () => {
  return (
    <>
      {/* Global input with both presuf */}
      <div className="main-box1 group">
        <label className="label-box1">Label Name</label>
        <div className="input-main1">
          <input type="text" className="input-box1 presuf-input1 peer" />
          <span className="pre-box1">mail</span>
          <span className="suf-box1">mail</span>
        </div>
      </div>
    </>
  );
};

// For Sign page....
export const InputSufIcon = (props: INewInputProps) => {
  return (
    <>
      {/* Global input with inline suffix button */}
      <div className="main-box1 group">
        <label className={`label-box1  ${props.errors && "label-error"}`}>{`${props.labelname ? props.labelname : "Label Name"
          }`}</label>
        <div className="input-main1">
          <input
            maxLength={255}
            autoComplete="off"
            max={props.max}
            onBlur={props.onBlur}
            min={props.min}
            id={props.id}
            placeholder=""
            className={`input-box1 suf-input1 peer  ${props.errors && "focus:border-rose-400 focus:ring-rose-400"
              }`}
            {...props}
          />
          <span className="suf-box1">{props.icon ? props.icon : "mails"}</span>
          <span
            className={` suf-box1  ${props.errors &&
              "border-rose-400 ring-rose-400 group-focus-within:bg-rose-400 group-focus-within:hover:bg-rose-400"
              }`}
          >
            {props.submitBtnTxt}
          </span>
        </div>
        {props.errors ? (
          <span
            className={`helper-box1 ${props.errors ? "text-rose-400" : ""}`}
          >
            ERROR...
          </span>
        ) : (
          <span className={`helper-box1`}>
            {props.helpertext ? props.helpertext : "Helper text: format xx-xxx"}
          </span>
        )}
      </div>
    </>
  );
};
// For Sign page....
export const InputSufBtn = (props: INewInputProps) => {
  return (
    <>
      {/* Global input with inline suffix button */}
      <div className="main-box1 group">
        <label className={`label-box1  ${props.errors && "text-rose-400 group-focus-within:text-rose-400"}`}        >
          {`${props.labelname ? props.labelname : "Label Name"}`}
        </label>
        <div className="input-main1">
          <input maxLength={255} autoComplete="off" max={props.max} onBlur={props.onBlur} min={props.min} id={props.id} placeholder="" className={`input-box1 suf-input1 peer  ${props.errors && "focus:border-rose-400 focus:ring-rose-400"}`}{...props} />
          {/* <span className="suf-box1">{props.icon ? props.icon : "mail"}</span> */}
          <button className={`suf-box1 btn btn-xs-primary  ${props.errors && "border-rose-400 ring-rose-400 group-focus-within:bg-rose-400 group-focus-within:hover:bg-rose-400"}`}          >
            {props.submitBtnTxt}
          </button>
        </div>
        {props.errors ? (
          <span className={`helper-box1 ${props.errors ? "text-rose-400" : ""}`}          >
            ERROR...
          </span>
        ) : (
          <span className={`helper-box1`}>
            {props.helpertext ? props.helpertext : "Helper text: format xx-xxx"}
          </span>
        )}
      </div>
    </>
  );
};

export const InputUpload = (props: FileDataProps) => {
  const dispatch = useAppDispatch();
  const handleClear = (name: string, keyName?: string) => {
    props.setFileNames((prev) => prev.filter((file) => file.name !== name));
    dispatch(setEpcFormData({ ...props.uploaded, [keyName!]: "" }))
  };
  const fileHandler = (files: FileList | null) => {
    if (files && files.length > 0) {
      const fNames: FileData[] = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        // uploaded=file
        if (props.uploaded && props.name) {
          dispatch(setEpcFormData({ ...props.uploaded, [props.name]: file }))
        }
        const fileExtension = "." + file.name.split(".").slice(1).join(".").toLowerCase().trim();
        if (fileExtension !== props.acceptType) {
          return toast.error("File not valid.", { toastId: "customID" });
        }
        if (file.size <= 10 * 1024 * 1024) {
          // Limit to 10MB
          fNames.push({
            name: file.name,
            icon: file.name.split(".")[1]?.toUpperCase().trim() || "",
            file: file,
          });
        } else {
          toast.error(`File ${file.name} exceeds the maximum size of 10MB and will not be uploaded.`, { toastId: "customID" });
        }
      }
      props.setFileNames((prev) => [...prev, ...fNames]);
    } else {
      toast.error("file type not supported", { toastId: "customID" });
    }
  };
  return (
    <>
      {/* Global input with upload */}
      <div className="main-box1 group">
        <label className="label-box1">{props.label}</label>
        <input type="file" className="upload-input1 peer" {...props} onChange={(e) => fileHandler(e.target.files)} />
        {props.errors ? (<span className={`helper-box1 ${props.errors ? "text-rose-400" : ""}`} >   ERROR... </span>) : (<span className={`helper-box1`}>   {props.helpertext && "accept" + props.acceptType + "only"} </span>)}
        <div className="progressContainer">
          {props.filenames?.map((file, i) => <Progress key={i} name={file.name} keyName={props.name} icon={file.icon} file={file.file} handleClear={handleClear} handlePreviewClick={props.handlePreviewClick} />)}
        </div>
      </div>
    </>
  );
};

{/* <div className="container">
{(isSingle && filenames.length !== 1) && <FileDrop onTargetClick={filePicker} onDrop={(f) => fileHandler(f)}>
  <label className="light-md-btn whitespace-nowrap" htmlFor="epcUpload">
    <IconCloudUpload /> Upload {btnLabel}
  </label>
  <input name={name} accept={acceptType} value="" style={{ visibility: "hidden", opacity: 0 }} ref={inputRef} multiple type="file" onChange={(e) => fileHandler(e.target.files)} />
</FileDrop>}
<div className="progressContainer">
  {filenames.map((file, i) => <Progress key={i} name={file.name} keyName={name} icon={file.icon} file={file.file} handleClear={handleClear} handlePreviewClick={handlePreviewClick} />)}
</div>
</div> */}

export const InputRadio = (props: IRadioProps<any>) => {
  return (
    <>
      {/* Global input with radio */}
      {props.options.map((option) => (
        <label key={option.value} className="label-box2">
          <input
            className="radio-input1"
            name={option.label}
            type="radio"
            checked={option.label === props.value}
            onChange={props.onChange}
            disabled={props.disabled}
          />
          <div className="radio-circle"></div>
          <span className="label-box3">{option.label}</span>
        </label>
      ))}
    </>
  );
};
export const InputRadio2 = (props: IRadioProps<any>) => {
  return (
    <>
      {/* Global input with radio */}
      {props.options.map((option) => (
        <label key={option.value} className="label-box2" style={{ cursor: props.disabled ? 'not-allowed !important' : '' }}>
          <input
            className="radio-input1"
            name={props.name}
            type="radio"
            checked={option.value === props.value}
            onChange={() => props.onChange!({ name: props.name, value: option.value } as any)}
            disabled={props.disabled}
          />
          <div className="radio-circle"></div>
          <span className="label-box3">{option.label}</span>
        </label>
      ))}
      
    </>
  );
};

export const InputCheckbox = (props: ICheckboxType) => {
  return (
    <>
      {/* Global input with checkbox */}
      <label className={`label-box2`}>
        <input className={`radio-input2 ${props.error ? "border-red-500" : ""}`} type="checkbox" {...props} />
        <span className={`label-box3 ${props.error ? "text-red-500" : ""}`}>{props.labelname}</span>
        <br />
      </label>
      {props.error && <span className={`label-box3 ${props.error ? "text-red-500" : ""}`}>* {props.error}</span>}
    </>
  );
};
export const InputInfo1 = (props: IInfoProps1) => {
  return (
    <>
      {/* Global input with info */}
      <div className="main-tt1 group">
        <span className="tt-icon1">
          {props.infoicon ? props.infoicon : "?"}
        </span>
        <div className="tt-modal1">
          <span className="tt-body1">
            {props.content
              ? props.content
              : `
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
            `}
            <a href={props.link} className="tt-link1">
              {props.linkbtnTxt ? props.linkbtnTxt : "Explore"}
            </a>
          </span>
          <div className="tt-arrow1"></div>
        </div>
      </div>
    </>
  );
};
export const InputInfo2 = (props: IInfoProps2) => {
  return (
    <>
      {/* Global input with info */}
      <div className="main-tt1 group">
        <span className="tt-icon1">
          {props.infoicon ? props.infoicon : "?"}
        </span>
        <div className="tt-modal2">
          <span className="tt-body1">
            {props.content
              ? props.content
              : `
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
            `}
            <a href={props.link} className="tt-link1">
              {props.linkbtnTxt ? props.linkbtnTxt : "Explore"}
            </a>
          </span>
          <div className="tt-arrow2"></div>
        </div>
      </div>
    </>
  );
};
export const Toogle1 = (props: IToggle1Props) => {
  const [checked, setChecked] = useState(props.isChecked);

  const handleToggle = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    if (props.onToggle) {
      props.onToggle(newChecked);
    }
  };
  return (
    <>
      {/* Toogle Icon */}
      <div className="input-main2">
        <label className="label-box5">
          <input className="sr-only peer" id="pvnxt-checkbox" type="checkbox" checked={checked} onChange={handleToggle} />
          <div className="main-toggle1 group peer"></div>
        </label>
      </div>
    </>
  );
};
export const Toogle2 = (props: IToggle2Props) => {
  const [checked, setChecked] = useState(props.defaultChecked);

  const handleChange = () => {
    const newChecked = !checked;
    setChecked(newChecked);
    props.onToggle(newChecked); // Call the parent callback
  };
  return (
    <>
      {/* Toogle Icon */}
      <div className="input-main2">
        <label className="label-box5">
          <input className="sr-only peer" id="pvnxt-checkbox" type="checkbox" checked={checked} onChange={handleChange} />
          <div className="main-toggle2 group peer"></div>
        </label>
      </div>
    </>
  );
};

export const InfoModal = (props: IToastProps) => {
  return (
    <>
      <div role="alert" className="rounded-xl border border-gray-100 bg-white p-4 absolute">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <strong className="block font-medium text-gray-900">{props.msg}</strong>

            <p className="mt-1 text-sm text-gray-700">{props.desc}</p>

            <div className="mt-4 flex gap-2">
              <Button className="btn btn-xs-primary" name="Locate Roof" />
              <Button className="btn btn-xs-outlineprimary" name="Revert" />
            </div>
          </div>

          <button className="text-gray-500 transition hover:text-gray-600">
            <span className="sr-only">Dismiss popup</span>
            <IconClose />
          </button>
        </div>
      </div>

    </>
  );
};


export const ConfirmationModal = (props: Modal5Ty) => {
  return (
    <div className="modal-backdrop1">
      <div className="main-modal2">

        <h4 className="heading heading-md-semibold">{props.modalName}</h4>
        <p className="para para-md">{props.description}</p>
        <div className="flex gap-4 max-sm:flex-col mt-4">
          <Button className="btn btn-sm-outlineprimary" name={props.cancelBtn} onClick={props.closeModal} />
          <Button className="btn btn-sm-primary" name={props.yesBtn} onClick={props.id ? props.updateModal : props.handleModal} />
        </div>
      </div>
    </div>

  )
}

export interface ViewProfileTy {
  name: string;
  modalSize?: 'lgx' | 'lg' | 'md' | 'sm' | 'sm-x' | 'small'
  btnName: string;
  isAbleCLick?: boolean;
  onClick: (actionType: string) => void
  children: JSX.Element,
  overflow?: boolean
  // setClose: (val:boolean) => void
  setIsCLose: () => void;
  height?: string;
  maxheight?: string
}


// export const ViewProFileModal = (props: ViewProfileTy) => {
//   const dispatch = useAppDispatch();

//   const openModal = () => {
//     dispatch(toggleModalState(false));
//   };

//   const { title, btnTxt, secondaryBtnTxt } = useAppSelector((state) => state.commonReducers.modal);

//   const user = useAppSelector((state) => state.auth.user);

//   return (
//     <>
//       <div className="modal-backdrop1">
//         <div className={`main-modal2 ${props.modalSize + "-modal"}`}>
//           <div className="modal-header1">
//             <div className="heading-md-semibold flex-1">{title === "Congratulation" ? `Congratulation ${user.fname} 😊 ` : title}</div>
//             <button onClick={props.setIsCLose}>
//               <IconClose />
//             </button>
//           </div>
//           <div className="modal-body2 custom-scrollbar-css m-2" style={{ overflow: props.overflow === undefined ? "auto" : "", maxHeight: props.maxheight ?? '54vh', height: props.height ?? "" }}>
//             {props.children}
//           </div>
//           <div className="modal-footer1">
//             {secondaryBtnTxt && <button className="btn btn-md-outlineprimary" type="button" onClick={() => props.onClick(secondaryBtnTxt)}>{secondaryBtnTxt}</button>}
//             {btnTxt && <button className={`${btnTxt === "" ? "hidden" : ""} btn btn-md-primary`} type="button" onClick={() => props.isAbleCLick && props.onClick(title)}>
//               {btnTxt}
//             </button>}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };



export const GTextareaCom = (props: Textareaty) => {
  return (
    <>
      <div className="main-box1 group" key={props.key}>
        {props.label && (<label htmlFor={`${props.id}`} className={`label-box1 capitalize  ${props.error && "label-error"} text-nowrap`}   >   {props.label}   {props?.isRequired && (<span className="text-rose-400 text-lg pl-0.5">* </span>)} </label>)}
        <div className="input-main1">
          <textarea /* style={{ height: '10vh', padding: "1rem" }}  */cols={20} rows={10} autoComplete="off" id={`${props.id}`} className={`input-box1 p-4 h-28 peer ${props.btntitle ? "pr-[6.4rem]" : ""} ${props.error && "input-error"} ${props.disabled === true ? "bg-gray-100/90 cursor-not-allowed" : ""}`} {...props} ></textarea>
          {(props.suficon) && <span className="suf-box1">{props.suficon}</span>}
          {(props.suftext) && <span className="suf-box1">{props.suftext}</span>}
          {props.btntitle && (<button name={props.btntitle} disabled={props.btnDisabled} className={`suf-box1 btn btn-xs-primary  ${props.error ? "bg-gradient-to-tr from-rose-400 to-rose-400/80 border-none" : ""}`} onClick={props.onBtnTitleClick} > {props.btntitle} </button>)}
        </div>
        {props.error ? (<span className={`helper-box1 opacity-100 ${props.error ? "text-rose-400" : ""}`} > {props.error} </span>)
          :
          <span className={`helper-box1`}>{props.helpertext && props.helpertext}</span>}
      </div>
    </>
  )
}