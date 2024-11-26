import React, { ChangeEvent, useEffect, useState } from 'react';
import { setInvManu, setInvName, setInverterOpen, setModManu, setModName, setModuleOpen } from '../../ReduxTool/Slice/EquipmentSelection/SelectionReducer';
import { IconInfo } from '../../assests/icons/DrawerIcons';
import { useAppDispatch } from '../../ReduxTool/store/hooks';
import Dropdown from '../../Components/DropDown/Dropdown';

const DataInput = ({ labelname, data, wordEntered, setWordEntered, opt }: { labelname: string, data: string[], wordEntered: string, setWordEntered: React.Dispatch<React.SetStateAction<string>>, opt: string }) => {

    const [filteredData, setFilteredData] = useState<string[]>([]);
    const dispatch = useAppDispatch()

    const [focus, setFocus] = useState(false)

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter);
        }
    };

    const handleClick = (text: string) => {
        setWordEntered(text)
        setFilteredData([])
        if (opt === "mod") {
            if (labelname === "Manufacturer") {
                dispatch(setModManu(text))
            }
        } else {
            if (labelname === "Manufacturer") {
                dispatch(setInvManu(text))
            }
        }
        if (opt === "inv") {
            if (labelname === "Name") {
                dispatch(setInvName(text))
                dispatch(setModuleOpen(false))
                dispatch(setInverterOpen(true))
            }
        } else {
            if (labelname === "Name") {
                dispatch(setModName(text))
                if(opt==="mod"){
                    dispatch(setModuleOpen(true))
                }                
            }
        }
    }

    const handleFocus = () => {
        setFocus(true)
        setFilteredData(data.map((value) => value))
    }
 
 

    return (
        <div className='relative flex justify-between items-center'>
            <input
                type="text"
                id='data-list'
                className='input-box text-primary-200 leading-[2vh]'
                value={wordEntered}
                onChange={handleFilter}
                onFocus={handleFocus}
                // onBlur={handleBlurr}
            />
            <label className={`label-box z-0`} htmlFor={"data-list"}>
                {labelname}&nbsp;
                <span className="text-red-100 font-normal">
                    *
                </span>
            </label>
            <div className="cursor-pointer">
                <IconInfo />
            </div>
            {/* {
                filteredData.length > 0 &&
                <Dropdown handleClick={handleClick} filteredData={filteredData} />
            } */} 
        </div>
    )
}

export default DataInput