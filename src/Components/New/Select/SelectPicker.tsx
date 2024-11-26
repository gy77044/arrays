import { memo, useCallback, useEffect, useState } from "react";
import { matchKeyIncludeArr, useDebounce } from "../../../Utils/commonFunctions";
import { IconArrow } from "../../../assests/icons/DrawerIcons";
import Dropdown from "../../DropDown/Dropdown";
import { selectPickerPropsType } from "./NewSelectType";
const SelectPicker = (props: selectPickerPropsType) => {
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);
  const [isValueFind,setIsValueFind] = useState(true);

  const updatefilterData = useCallback(useDebounce((value) => {
    setFilteredData(value.map((el: any) => el.label));
  }, 500), [props.value]);

  useEffect(() => {
   
    if (props.value && props.isFilter) {
      const filterData = matchKeyIncludeArr(props.data, "label", props.value);
      updatefilterData(filterData);
    }else{
      updatefilterData(props.data);
    }
  }, [props.value]);

  const handleFocus = (e: any) => {
    setFocus(true);
    setFilteredData(props.data.map(el => (el.label)));
  };
  const handleOnBlur = (e:any) => {
    if(!filteredData.includes(props.value)){
      props.onChange({target:{name:e.target.name,value:""}})
    }
    setTimeout(()=>{
      setFocus(false);
      if (props.setAutoFocus){
        props.setAutoFocus(false)
      }
    },500)
  }

  return (
    <div className="main-box1 group">
          <label className={`label-box1 ${(!focus && !props.value) ? 'select-label-focused' : ''}`} htmlFor={props.id}>
            {props.labelname}&nbsp;
            {props.star && <span className="text-red-400 font-normal">*</span>}
          </label>
      <div className={`input-main1`}>
        <div className={`relative w-full  ${props.disabled?"bg-primary-900":""}`}>
          <input autoFocus={props?.autofocus} disabled={props.disabled} value={props.value} name={props.name} onChange={props.onChange} onFocus={handleFocus} onBlur={handleOnBlur} type="text" id={props.id} autoComplete="off" className="input-box1 peer" />
          
        </div>
        {/* <div onClick={handleopen}>{props.icon}</div> */}
      </div>
      {focus && <Dropdown setState={props.setState} isRecomm={props.isRecomm} optionText={props.optionText} name={props.name!} handleClick={props.onClick} uploadBtnTxt={props.uploadBtnTxt} filteredData={filteredData} upload={props.isUpload!} handleChange={props.onChange} typeaccept={props.typeaccept} />}
    </div>
  );
};

export default memo(SelectPicker);
