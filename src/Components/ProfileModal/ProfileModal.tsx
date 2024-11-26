import { ParsedCountry, PhoneInput } from "react-international-phone";
import { isValidName } from "../../Utils/Const";
import NewImageUpload from "../ImageUpload/NewImageUpload";
import { isPhoneNumberValid, toTitleCase } from "../../Utils/commonFunctions";
import { Input } from "../AllInput/AllInput";
import React from "react";
import { Button } from "../AllButton/AllButtons.tsx";
import { ProfileTy } from "../AllInput/types";

 
const ProfileModal = ({isEditing,setProfileState,profileState,error,handleChange}:{isEditing:boolean,setProfileState:React.Dispatch<React.SetStateAction<ProfileTy>>,profileState:ProfileTy,error:any,handleChange:(e:any)=>void}) => {
  // const user = useAppSelector((state) => state.auth.user);
 
  // const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
  //   const {name,value} = e.target  
  //   if(value===""){
  //     setProfileState(prev=>({...prev,[name]:value}))
  //   }
  //   else if (isValidName(value)){
  //     setProfileState(prev=>({...prev,[name]:value}))
  //   }
   
  // };
 
 
  const handleMobileNumber = async (phone: string, country: ParsedCountry) => {   
    if (!phone.startsWith(profileState.countrycode)) {
      if (phone.startsWith('+')) {
        phone = phone.replace(/^\+\d*/, ''); 
      }
      phone = `${profileState.countrycode}${phone}`;
    }
    const isValid = await isPhoneNumberValid(phone, country.dialCode); 
    setProfileState(prev=>({...prev,userMobile:phone,valid:isValid}))
   }   
  return (
    <div className="relative flex flex-col"> 
          <div className="relative mt-8 ">
                <NewImageUpload isEditing={isEditing} setProfileState={setProfileState} profileState={profileState} />
          </div>
           <div className="grid grid-cols-2">
          <Input
              error={error?.fname}
              id={"fname"}
              label={"First Name"}
              name={"fname"}
              value={toTitleCase(profileState?.fname??"")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              disabled={isEditing}
            />          
             <Input
              error={error?.lname}
              id={"lname"}
              label={"Last Name"}
              name={"lname"}
              value={toTitleCase(profileState?.lname??"")}
              type="text"
              onChange={handleChange}
              isRequired={true}
              disabled={isEditing}
            />          
              <Input
              error={error?.userEmail}
              id={"userEmail"}
              label={"User Email"}
              name={"userEmail"}
              value={profileState?.userEmail??""}
              type="email"
              onChange={handleChange}
              isRequired={false}
              disabled={true}
            />
            <div className={`main-box1 group bottom-[12px]`} >
          <label htmlFor={"mobile"} className={`label-box1 ${error.userMobile && "label-error"} `}>Mobile<span className="text-rose-400 text-lg pl-0.5"> *</span></label>
          <PhoneInput  forceDialCode={true} hideDropdown={true} disabled={isEditing}  inputProps={{name: 'userMobile',required: true,autoComplete: 'off',className:`${isEditing?"cursor-not-allowed":""}`}} defaultCountry="in" name="userMobile" value={profileState?.userMobile??""}
          onChange={(phone, { country }) => handleMobileNumber(phone, country)} placeholder=" "
          className={`signupmobile w-full  ${error.userMobile ? 'error' : ''}`} />
          {error.userMobile&& <span className={`helper-box1 opacity-100 ${error.userMobile ? "text-rose-400" : ""}`}>{error?.userMobile}</span>}
        </div>
       
        </div>
    </div>
  );
};
 
export default ProfileModal;