import { NewInputProps } from "../../../Utils/Const";

const LoginInput = (props: NewInputProps) => {

  return (
    <>
      <div id={props.id} className={`input-main`}>
        <input  placeholder="" className={`input-box `} {...props} />
        <div className="font-hairline absolute top-[0vh] left-[0vh] mt-[0vh] mr-[4vh] text-primary-500">
          {props.icon}
        </div>
        <label className={`label-box `} htmlFor={props?.id}>
          {props?.labelname}&nbsp;
          {props?.star && <span className="text-red-100 font-normal">*</span>}
        </label>
      </div>
    </>
  );
};

export default LoginInput;
