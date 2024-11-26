import React from 'react'
import { IconInfo } from '../../../assests/icons/DrawerIcons';

interface GIprops {
  id: string;
  labelname: string
  inputType: any
  inputName: string
  value: string | number
  onChange: (e: any) => void
}

const GlobalInput: React.FC<GIprops> = ({ id, labelname, inputType, inputName, onChange, value }) => {
  return (
    <>
      <div>
        {/* <div className="h4"></div> */}
        <div className="relative z-0 flex justify-between items-end  ">
          <input
            value={value}
            type={inputType}
            id={id}
            className="input-box font-normal text-1.4xl text-primary-400 pt-[3.4vh] pb-[1vh] pl-[1vh]
            block w-[30vh] px-[0vh] mt-[0vh] bg-transparent border-[0vh] border-b-[0.1vh] rounded-default appearance-none 
            focus:outline-none focus:ring-0 outline:[0vh] outline-offset:[0vh]
             focus:border-primary-200 border-primary-600 tracking-[0.04vh] "
            placeholder=" "
            name={inputName}
            onChange={e => onChange(e)} />
             {/* <span className="text-red-100 font-normal">*</span> */}
          <label
            htmlFor={id}
            className="label-box absolute duration-300 top-[3.8vh] -z-1 origin-0 text-brown-300 pl-[0.5vh] text-1.6xl font-normal tracking-[0.04vh]">
            {labelname}&nbsp;
            <span className=" text-red-200 pl-[0.4vh] text-1.6xl">*</span>
          </label>
        <div className='ml-1'>  <IconInfo /></div>
        </div>
      </div>
    </>
  )
}

export default GlobalInput

