import React from "react"



interface CheckboxType{
    id:string,
    onChange:(e:React.ChangeEvent<HTMLInputElement>)=>void,
    labelname:string,
    name:string,
    isChecked:boolean
    disabled?:boolean
}

const NewCheckbox:React.FC<CheckboxType>=({id,onChange,labelname,name,isChecked,disabled})=>{
    return (
        <div className="gap-5">
        <input disabled={disabled} id={id} name={name} onChange={onChange} checked={isChecked} type="checkbox" className="cursor-pointer text-blue-600 bg-gray-100 rounded-default border-gray-300  accent-primary-200 focus:ring-primary-200 dark:focus:ring-primary-200  dark:ring-offset-primary-800   border-[0.1vh] " />
        <label htmlFor={id} className="text-primary-200 leading-[2vh] text-1.6xl cursor-pointer pl-[1px] font-medium">
          {labelname}
        </label>
      </div>
    )
}




export default NewCheckbox