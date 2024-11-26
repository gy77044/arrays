import IconPopup from '../../Components/IconPopUp/IconPopup'
import { IInputProps } from '../../Utils/Const'



const CustomInput = (props: IInputProps) => {
  return (
    <>
      <div id={props.id} className="custom-select-container">
        <input placeholder='' disabled={props.name ==="projectId" || props.name==="lat" || props.name==="lng" || props.name==="inputType" || props.name==="windSpeed" || props.name==="snowFall"} 
        className={`input-box ${props.name ==="projectId" || props.name==="lat" || props.name==="lng" || props.name==="inputType" || props.name==="windSpeed" || props.name==="snowFall"?"bg-primary-900/60 ":""}`} {...props} />
        <label className={`label-box`} htmlFor={props?.id}>
          {props?.labelname}&nbsp;
          {props?.star ??
            (
              <span className="text-red-100 font-normal">
                *
              </span>
            )
          }
        </label>
        <div className="cursor-pointer">
          <IconPopup>
            {props.labelname}          
          </IconPopup>
        </div>       
      </div>

    </>

  )
}

export default CustomInput
