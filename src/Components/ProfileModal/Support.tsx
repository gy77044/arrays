import React from 'react'
import { GTextareaCom, Input } from '../AllInput/AllInput'
import { ParsedCountry, PhoneInput } from 'react-international-phone'
import { SupportDTy } from '../AllInput/types'

const  Support=({isEditing,profileState,error,handleChange}:{isEditing:boolean,profileState:SupportDTy,error:any,handleChange:(e:any)=>void})=> {
    const handleMobileNumber = async (phone: string, country: ParsedCountry)=>{}
  return (
    <>
    <div className="grid grid-cols-2">
    <Input id={"name"} label={"First Name"} error={error?.fname} name={"fname"} value={profileState.fname} type="text" onChange={handleChange} isRequired={true} disabled={true}  />     
    <Input id={"name"} label={"Last Name"} name={"lname"} error={error.lname} value={profileState.lname} type="text" onChange={handleChange} isRequired={true} disabled={true}  />     
    {/* <Input id={"mobile"} label={"Mobile"} name={"mobile"} value={profileState.mobile??""} type="text" onChange={handleChange} isRequired={true} disabled={true}  />      */}
    <div className={`main-box1 group`} >
          <label htmlFor={"mobile"} className={`label-box1`}>Mobile<span className="text-rose-400 text-lg pl-0.5"> *</span></label>
          <PhoneInput  forceDialCode={true} hideDropdown={true} disabled={true}  inputProps={{name: 'mobile',required: true,autoComplete: 'off'}} defaultCountry="in" name="mobile" value={profileState?.mobile??""}
          onChange={(phone, { country }) => handleMobileNumber(phone, country)} placeholder=" "
          className={`signupmobile w-full`} />
          {error.mobile && <span className={`helper-box1 opacity-100 ${error.mobile ? "text-rose-400" : ""}`}>{error.message}</span>}
        </div>
    <Input id={"subject"} label={"Subject"} error={error.subject} name={"subject"} value={profileState.subject} type="text" onChange={handleChange} isRequired={true}  />     
    {/* <Input id={"units"} label={"Units"} name={"units"} value={"M"} type="text" onChange={handleChange} isRequired={true} disabled={isEditing}  />      */}
    </div>
    <div className='w-[100%] h-[10vh]'>
    <GTextareaCom error={error.message} placeholder='Write your messgae here ..' id={"message"} label={"Message"} name={"message"} value={profileState.message} type="text" onChange={handleChange} isRequired={true}  />     
    </div>
    </>
  )
}



export default Support
