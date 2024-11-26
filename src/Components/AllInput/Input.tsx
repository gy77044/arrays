import React from 'react'
import { IInpProps } from './types';

export const Input = (props: IInpProps) => {
    return (
      <>
        {/* Global input with focus outline & shadow */}
        <div className="main-box1 group">
          {props.label && (<label htmlFor={`${props.id}`} className={`label-box1  ${props.error && "label-error"} `}   >   {props.label}   {props?.isRequired && (<span className="text-rose-400 text-lg pl-0.5">* </span>)} </label>)}
          <div className="input-main1">
            <input onWheel={(e) => e.currentTarget.blur()} autoComplete="off" id={`${props.id}`} className={`input-box1 peer ${props.error && "input-error"} ${props.disabled === true ? "bg-gray-100/80 cursor-not-allowed" : ""}`} {...props} />
            {(props.suficon)&&<span className="suf-box1">{props.suficon }</span>}
            {(props.suftext)&&<span className="suf-box1">{props.suftext }</span>}
            {props.btntitle && (<button name={props.btntitle} disabled={props.btnDisabled} className={`suf-box1 btn btn-xs-primary  ${props.error && "border-rose-400 ring-rose-400 group-focus-within:bg-rose-400 group-focus-within:hover:bg-rose-400"}`} onClick={props.onBtnTitleClick} > {props.btntitle} </button>)}
          </div>
          {props.error ? (<span className={`helper-box1 opacity-100 ${props.error ? "text-rose-400" : ""}`} > {props.error} </span>)
            :
            <span className={`helper-box1`}>{props.helpertext && props.helpertext}</span>}
        </div>
      </>
    );
  };

export default Input