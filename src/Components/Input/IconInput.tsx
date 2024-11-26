import { IInputProps } from "../../Utils/Const"

const IconInput = (props: IInputProps) => {
  return (
    <div className='relative'>
      <input autoComplete="off"  autoFocus={props?.autoFocus??false} className="text-1.6xl text-primary-200 pt-[3.4vh] pb-[0.6vh] pl-[3.5vh]  font-normal    block w-full px-[0vh] mt-[0vh] bg-transparent border-[0vh] border-b-[0.1vh] rounded-default appearance-none  focus:outline-none focus:ring-0 outline:[0vh] outline-offset:[0vh] focus:border-primary-200 border-primary-600 tracking-[0.02vh] " {...props}  placeholder=""/>
      <div className="font-hairline absolute top-[0vh] left-[0vh] mt-[3vh] mr-[4vh] text-primary-500">{props.icon}</div>
      <label className="absolute duration-300 top-[4.4vh] -z-1 origin-0 text-primary-500 pl-[3vh] text-1.6xl font-normal" htmlFor={props?.id}>{props?.labelname}{props?.star && ( <span className="text-red-200 pl-[0.4vh] text-1.6xl">   * </span> ) }</label>
    </div>


  )
}

export default IconInput
