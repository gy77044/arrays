import React from 'react'
import { Input } from '../AllInput/AllInput'
import SelectPicker from '../New/Select/SelectPicker'
import { languages } from 'country-data'
import { IconInfo } from '../../assests/icons/DrawerIcons'
import ReactSelect from '../New/Select/ReactSelect'
import { formatReactSelectOptions } from '../../Utils/commonFunctions'

 const SettingModal = ({isEditing,setProfileState,profileState,error,handleChange}:{isEditing:boolean,setProfileState:React.Dispatch<React.SetStateAction<any>>,profileState:any,error:any,handleChange:(e:any)=>void}) => {
    const languageList = [{label:"English",value:"English"},{label:"Spanish",value:"Spanish"},{label:"Arab",value:"Arab"}]
    const currencyList = [{label:"INR",value:"INR"},{label:"USD",value:"USD"},{label:"Euro",value:"Euro"}]

    const handleInputField =()=>{}
    const handleClick = (e:any)=>{}
  return (
    <>
    <div className="grid grid-cols-2">
    {/* <ReactSelect onChange={handleChange} options={formatReactSelectOptions(allDiscom, { labelKey: "providername", valueKey: "providerid" }, false)} value={formDetails.projectsetup.providerid!} closeMenuOnSelect={true} key='providerid' labelname='Discom Provider' name='providerid' placeholder="Select an option .." disabled={selectedprojectDetails.isepccomplete || is3DMap} /> */}

    <ReactSelect error={error.language} handleInputChange={handleClick} options={formatReactSelectOptions(languageList, { labelKey: "label", valueKey: "value" }, false)}  onChange={handleChange} value={profileState.language} id={"language"} name={"language"} labelname="Select Language" closeMenuOnSelect={true}  isUpload={false} isRequired={true} icon={<IconInfo />}  disabled={isEditing} />
    <ReactSelect error={error.currency}  handleInputChange={handleClick} options={formatReactSelectOptions(currencyList, { labelKey: "label", valueKey: "value" }, false)} onChange={handleChange} value={profileState.currency} id={"currency "} name={"currency"} labelname="Select Currency"  closeMenuOnSelect={true}  isUpload={false} isRequired={true} icon={<IconInfo />} disabled={isEditing}/>
    <Input error={error.units} id={"units"} label={"Units"} name={"units"} value={profileState.units} type="text" onChange={handleChange} isRequired={true} disabled={isEditing}  />     
    </div>
  </>
  )
}



export default SettingModal