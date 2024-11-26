import { IconInfo } from '../../assests/icons/DrawerIcons'
import { CustomSelectProps } from './SelectType'


const CustomSelect = (props: CustomSelectProps) => {
    return (
        <div className='custom-select-container'>
            <select className='input-box text-primary-200 leading-[2vh]' name={props?.id} value={props.value} onChange={props.onChange}>
                <option disabled value="">Select an option</option>
                {props.options.map((option, i) => (
                    <option className='yellow-200 ' key={i} value={option as string}>
                        {`${i + 1}. ${option}`}
                    </option>
                ))}
            </select>
            <label className={`label-box`} htmlFor={props?.id}>
                {props?.labelname}
                {props?.star ??
                    (
                        <span className="text-red-100 font-normal">
                            *
                        </span>
                    )
                }
            </label>
            <div className="cursor-pointer">
                <IconInfo />
            </div>
        </div>
    )
}

export default CustomSelect
