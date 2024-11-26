import { IconInfo } from "../../../assests/icons/DrawerIcons";
import { setToolTipModal } from "../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch } from "../../../ReduxTool/store/hooks";
import { NewInputProps } from "../../../Utils/Const";
import Tooltip from "../Tooltip/Tooltip";


const NewInput = (props: NewInputProps) => {
  const dispatch = useAppDispatch()

  const handleopen = (e: any) => {
    dispatch(setToolTipModal({ state: true, title: props?.labelname!, content: props?.content! }))
  }
  const isLoging = props.isLoging || false;
  return (
    <>
      {!isLoging ? <div className={`input-main`}>
        <div className={`relative w-full  ${props.disabled ? "bg-primary-900" : ""}`} title={props.title}>
          <input onWheel={(e) => e.currentTarget.blur()} autoFocus={props.autoFocus} max={props.max} onBlur={props.onBlur} disabled={props.disabled} type={props.type} min={props.min} id={props.id} name={props.name} value={props.value} placeholder="" className={`truncate pr-1 input-box ${props.disabled ? "pt-0.7 " : ""}`} maxLength={props.maxLength || 255} autoComplete="off" onChange={props.onChange} onFocus={props.handlefocus} />
          <label className={`select-label`} htmlFor={props?.id}>{props?.labelname}&nbsp;{props?.star && <span className="text-red-100 font-normal">*</span>}
          { props.tooltipInfo ? <Tooltip position={props.tooltipPositon} msg={props.tooltipInfo}/>:""}
            </label>
          </div>
        {/* <div className={`${props?.hideIcon && 'hidden'} `} onClick={handleopen}>{props.icon}</div> */}
        </div>:
        <div className={`relative z-0 w-full mb-[1vh]`} title={props.title}>
          <div className={`${props.disabled ? "cursor-not-allowed" : ""} font-light absolute top-[0vh] left-[0vh] mt-[3vh] mr-[4vh] text-primary-600`}>{props.icon}</div>
          <input autoComplete='off' value={props.value} onChange={props.onChange} id={props.id} type={props.type} name={props.name} placeholder=" " disabled={props.disabled} onKeyUp={props.onKeyUp} maxLength={props.name === "mobile" ? 10 : 50} className={`${props.disabled ? "cursor-not-allowed" : ""} font-thin text-1.4xl pt-[3.4vh] pb-[1vh] pl-[3vh] block w-full px-[0vh] mt-[0vh] bg-transparent border-[0vh] border-b-[0.1vh] rounded-default appearance-none  focus:outline-none focus:ring-0 outline:[0vh] outline-offset:[0vh] focus:border-primary-200 border-primary-600`} /*pattern={props.name==='mobile'?"[789][0-9]{9}":""}*/ />
          <label htmlFor={props.id} className={`${props.disabled ? "cursor-not-allowed" : ""} absolute duration-300 top-[4.4vh] -z-1 origin-0 text-primary-600 pl-[3vh] text-1.6xl font-hairline`}>{props.labelname} <span className="text-red-100 font-normal">*</span></label>
        </div>}
      </>
  );
};

      export default NewInput;
