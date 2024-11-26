import React, { useEffect, useId, useState } from "react";
import { useAppSelector } from "../../../ReduxTool/store/hooks";

const NewRadioButton = ({value,name,labelname,onClick,selectedOption,Content,disabled}:
   {disabled?:boolean,value:string,name: string;labelname: string;onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;selectedOption?: string;Content?: () => JSX.Element,id?: string}) => {

const cid=useId()
  return (
    <>
     
        <label htmlFor={cid} className={`label-box2 pointer-events-auto ${!disabled?'cursor-pointer':'cursor-not-allowed'}`}>
        <input
          className={`radio-input1 ${!disabled?'cursor-pointer':'cursor-not-allowed'}`}
          type="radio"
          id={cid}
          name={name}
          value={disabled?"":value}
          onChange={onClick}
          checked={labelname===selectedOption!}
          disabled={disabled}
          />
          <div className="radio-circle"></div>
          <span className="label-box3">{labelname}</span>
        </label>
   
    </>
  );
};

export default NewRadioButton;
