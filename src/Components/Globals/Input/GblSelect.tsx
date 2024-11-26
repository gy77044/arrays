import React, { useEffect, useRef, useState } from 'react';
import Select, { components, GroupBase, PlaceholderProps } from 'react-select';
import { IconInfo } from '../../../assests/icons/DrawerIcons';

interface GlbSelProps {
    handleChange: (e: any) => void
    defaultVal?: { value: string, label: string }
    value: string | number
    list: { value: string, label: string }[]
    name: string
    labelname: string
}
export const GblSelect: React.FC<GlbSelProps> = ({ handleChange, value, list, name, labelname, defaultVal }) => {
    const SelRef = useRef<any>(null)
    const [defaultInput , setDefaultVal] = useState<{ label: string, value: string }>({ label: '', value: '' })

    const Placeholder = (props: JSX.IntrinsicAttributes & PlaceholderProps<unknown, boolean, GroupBase<unknown>>) => {
        return <components.Placeholder {...props} />;
    };

    useEffect(() => {
        if(defaultVal){
            const defaultValue = { value: defaultVal.value, label: defaultVal.label };
            if (SelRef.current != null) {
                let elem = SelRef.current as any;
                elem.selectOption(defaultValue)
            }
        }
    }, [defaultVal?.label])

    return (<div className='relative'>
              <label
            htmlFor={name}
            className="label-box  absolute  top-auto -z-1 origin-0 text-brown-300 pl-[0.5vh] text-1.6xl font-normal tracking-[0.04vh]">
            {labelname}&nbsp;
            <span className=" text-red-200 pl-[0.4vh] text-1.6xl">*</span>
          </label>
          <div className="h1"></div>
        <div className="relative z-50 flex flex-1 justify-between items-end">
          
                <Select
                    className="rselect-option-global font-normal border-b-[0.1vh]
                        rounded-default appearance-none outline-0 border-primary-600 
                        border-t-transparent w-[30vh] leading-[1.5vh] font-hairline z-50  text-1.4xl text-primary-400"
                   
                    isSearchable
                    name={name}
                    options={list}
                    onChange={handleChange}
                    classNamePrefix='filter'
                    placeholder={"Select option"}
                    isClearable={false}
                    ref ={SelRef}

                />
                 <div className='ml-1'>  <IconInfo /></div>
               
        </div>
        </div>
    )
}
