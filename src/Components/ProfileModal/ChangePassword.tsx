import React, { useEffect, useState } from 'react'
import { signUPDetails } from '../../Screen/User/SignUp'
import { Input } from '../AllInput/AllInput'
import { IconInVisible, IconVisible } from '../../assests/icons/MapToolsIcons'

const ChangePassword = ({changePasswordIn,handleChange,error,passwordHide,setPasswordHide}:{changePasswordIn:signUPDetails[],handleChange:(e:any,i:number)=>void,error:any,passwordHide:any,setPasswordHide:React.Dispatch<React.SetStateAction<any>>})=>{
 console.log("error",error)

const handlePasswordView = (type:string)=>{
    setPasswordHide((prev:any)=>({...prev,[type]:!prev[type as keyof object]}))
  }


    useEffect(()=>{
        const handleMouseUp = () => setPasswordHide({oldpassword:false,newpassword: false, cpassword: false });          
        window.addEventListener("mouseup", handleMouseUp);
      
        return () => {
          window.removeEventListener("mouseup", handleMouseUp);
        };
      },[])

  return(
    <div className={`${passwordHide.oldpassword||passwordHide.newPassword||passwordHide.confirmPassword?"cursor-pointer":"cursor-default"} select-none`}>
        {changePasswordIn.map((el:any,i:number)=>(
         <Input error={error[el.name]} key={`changePassword${el.name}${i}`} label={el.label} id={`changePassword${el.name}${i}`} onChange={(e) => handleChange(e,i)} suficon={passwordHide[el.name as keyof object]?<IconVisible color={error[el.name]&&"#fb7185"}/>:<IconInVisible color={error[el.name]&&"#fb7185"}/>} handleSufIcon={()=>handlePasswordView(el.name)}  name={el.name}   type={passwordHide[el.name as keyof object]?"text":"password"} value={el.value??""}/>   
        ))}
    </div>
  )
}


export default ChangePassword
