import React, { ChangeEvent, useState } from 'react';
import { setInvManu, setInvName, setModManu, setModName } from '../../ReduxTool/Slice/EquipmentSelection/SelectionReducer';
import { IconInfo } from '../../assests/icons/DrawerIcons';
import { useAppDispatch } from '../../ReduxTool/store/hooks';
import Dropdown from '../../Components/DropDown/Dropdown';
import DropdownImage from '../../Components/DropDown/DropdownImage';

const DataInputImage = ({ labelname, data, wordEntered, setWordEntered, opt,handleClick,filteredData, setFilteredData }: { labelname: string, data: { name: string, img: string }[], wordEntered: string, setWordEntered: React.Dispatch<React.SetStateAction<string>>, opt: string, handleClick: (text: string) => void ,filteredData: string[],setFilteredData: React.Dispatch<React.SetStateAction<string[]>>}) => {

   
    const dispatch = useAppDispatch()

    const [focus, setFocus] = useState(false)

    const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setFilteredData([]);
        } else {
            setFilteredData(newFilter.map(ele => ele.name));
        }
    };

    const handleFocus = () => {
        setFocus(true)
        setFilteredData(data.map((value) => value.name))
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
            {
                filteredData.length > 0 &&
                <DropdownImage handleClick={handleClick} filteredData={data} />
            } 
        </div>
    )
}

export default DataInputImage