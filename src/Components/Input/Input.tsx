import { setToolTipModal } from "../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch } from "../../ReduxTool/store/hooks";
import { InputPropsTy } from "../../Utils/Const";

const Input: React.FC<InputPropsTy> = ({
  id,
  label,
  name,
  value,
  placeholder,
  type,
  onChange,
  required,
  icon,
  disabled,
  maxLength,
  content,
  hideIcon,
  max,
  min
}) => {
  const dispatch = useAppDispatch()

  const handleopen = (e: any) => {
    dispatch(setToolTipModal({ state: true, title: label!, content: content! }))
  }

  return (
      <div className='input-container'>
        <div className={`relative ${disabled ? "bg-primary-900" : ""}`}>
          <label className={`select-label`} htmlFor={id}>{label}&nbsp; {required && <span className="text-red-100 font-normal">*</span>}
          <input required={required} max={max} min={min} id={id} placeholder={placeholder} className={`select-input ${disabled ? "pt-0.7 " : ""}`} maxLength={255} autoComplete="off" />
          </label>
        </div>
        <div className={`${hideIcon && 'hidden'} `} onClick={handleopen}>{icon}</div>
      </div>
  );
};

export default Input;
