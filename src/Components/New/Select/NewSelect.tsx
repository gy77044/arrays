import { ChangeEvent, useEffect, useState } from "react";
import Dropdown from "../../DropDown/Dropdown";
import { setPositionForInfoModal } from "../../../ReduxTool/Slice/InfoModal/InfoModalReducer";
import { setToolTipModal } from "../../../ReduxTool/Slice/Map/MapReducer";
import { IconArrow } from "../../../assests/icons/DrawerIcons";
import { useAppDispatch } from "../../../ReduxTool/store/hooks";
import { NewSelectProps } from "./NewSelectType";
const NewSelect = (props: NewSelectProps) => {
  const dispatch = useAppDispatch();
  const [filteredData, setFilteredData] = useState<string[]>([]);
  const [focus, setFocus] = useState(false);
  const [state, setState] = useState(props.value as any);

  const handleFilter = (event: ChangeEvent<HTMLInputElement>) => {
    const searchWord = event.target.value;
    if (props.setWordEntered) {
      props.setWordEntered(searchWord);
    }
    const newFilter = (props.data as string[])?.filter((value) => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredData([]);
    } else if (newFilter?.length) {
      setFilteredData(newFilter);
    }
  };

  const handleClick = (text:string) => {
    if (props.setWordEntered) {
      props.setWordEntered(text);
      setState(text);
    }
    if (props?.changeValues) {
      if (props.name) {
        props.changeValues(text, props.name);
      }
    }
    setFilteredData([]);
  };

  const handleFocus = (e: any) => {
    setFocus(true);
    setFilteredData((props.data as string[]).map((value) => value));
  };
  const handleOnBlur = ()=>{
    setTimeout(()=>{
      setFilteredData([]);
    },200)
  }
  const handleopen = (e: any) => {
    dispatch(setPositionForInfoModal({ x: e.clientX, y: e.clientY }));
    dispatch(
      setToolTipModal({
        state: true,
        title: props?.labelname!,
        content: props?.content!,
      })
    );
  };

  const handlePropagate = (e: any) => {
    const className = "tariffselect";
    const element: any = document.querySelector("." + className);
    if (element) {
      element.focus(); // Trigger click event
    } else {
      console.log("Element with class", className, "not found");
    }
  };

  useEffect(() => {
    if (props.defaultVal) {
      setState(props.defaultVal);
    } else if (props.value) {
      setState(props.value);
    } else {
      setState("");
    }
  }, [props.value, props.defaultVal]);

  return (
    <div className="relative w-[100%]">
      <div className={`select-main flex  ${ props.disabled ? "hidden" : "inline-block"}`}>
        <div className="relative w-[100%]">
          <input type="text" id={props.id} className="select-input tariffselect w-[100%]" value={state} name={props.name} onChange={handleFilter} onFocus={(e) => handleFocus(e)} onBlur={handleOnBlur} placeholder="" autoComplete="off"/>
          <label className={`select-label`} htmlFor={props.id}>
            {props.labelname}&nbsp;
            {props?.star ?? <span className="text-red-100 font-normal">*</span>}
          </label>
          <div className="select-icon" onClick={handlePropagate}>
            <IconArrow />
          </div>
        </div>
        <div onClick={handleopen}>{props.icon}</div>
      </div>
      <div className={`select-main flex ${props.disabled ? "inline-block" : "hidden"}`}>
        <div className={`relative  ${props.disabled ? "bg-primary-900" : ""}`}>
          <input type="text" id={props.id} className={`input-box ${props.disabled ? "pt-0.6 text-primary-500 " : ""}`} value={state} name={props.name} placeholder="" disabled={true}/>
          <label className={`label-box`} htmlFor={props.id}>
            {props.labelname}&nbsp;
            {props?.star ?? <span className="text-red-100 font-normal">*</span>}
          </label>
        </div>
        <div onClick={handleopen}>{props.icon}</div>
      </div>
      {/* {filteredData.length > 0 && (
         <Dropdown handleClick={handleClick} uploadBtnTxt={props.uploadBtnTxt} filteredData={filteredData} upload={props.isUpload} handleChange={props.onChange} typeaccept={props.typeaccept}/>
      )} */}
    </div>
  );
};

export default NewSelect;
