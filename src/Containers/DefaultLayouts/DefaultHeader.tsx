import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getUserDetails, UserDetailsAction } from "../../ReduxTool/Slice/Auth/asyncHandlers";
import { resetReducerAnalysis } from "../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setCardTitle } from "../../ReduxTool/Slice/Dashboard/DashboardReducer";
import { resetDrawer, setTitle, toggleDrawer, } from "../../ReduxTool/Slice/Drawer/DrawerReducer";
import { toogleTooltip } from "../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../ReduxTool/store/hooks";
import { logoutuser } from "../../Screen/User/UserApi";
import { getAuthState, getUserType, logUserActivity, } from "../../Utils/AuthRedirections";

import fp_logo from "../../assests/img/Dashboard/FP_Logo.png";
import { convertImageToBase64, getActivePageTitle, handleBase64ToImage, isValidName, testPassword, toTitleCase } from "../../Utils/commonFunctions";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { removeSearchedGraphic } from "../../Utils/CustomerMaps/Maps/removeSearchedLocationGraphic";
import FormModal from "../../Components/New/Modal/FormModal";
import ProfileModal from "../../Components/ProfileModal/ProfileModal";
import { setModalHeaderFooter } from "../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { toast } from "react-toastify";
import SettingModal from "../../Components/ProfileModal/SettingModal";
import Support from "../../Components/ProfileModal/Support";
import { baseURL, requestUrl } from "../../Utils/baseUrls";
import { APIResponse, suportRequestTy } from "../../Utils/Const";
import Toast from "../../Components/ErrorBoundry/Toast";
import { signUPDetails } from "../../Screen/User/SignUp";
import ChangePassword from "../../Components/ProfileModal/ChangePassword";
import { NewModal } from "../../Components/New/Modal/NewModal";
import { ProfileTy, SupportDTy } from "../../Components/AllInput/types";
import { validPassword } from "../../Utils/Regex";



const DefaultHeader = () => {
  const dispatch = useAppDispatch(), Navigate = useNavigate();
  const { pathname } = useLocation();
  const { title, displayDrawer } = useAppSelector((state) => state.drawer);
  const { user: username } = useAppSelector((state) => state.auth);
  const [uname, setUname] = useState({ fname: "", lname: "" });
  const userType = getUserType();
  const headerTitle = getActivePageTitle(pathname, pathname == `/${userType}/RoofAnalysis` ? title : "");
  const user = useAppSelector((state) => state.auth.user);
  const [openProfile, setOpenProfile] = useState(false)
  const [viewProfileDetails, setViewProfileDetails] = useState<ProfileTy>({ fname: "", lname: "", userEmail: "", userMobile: "", countrycode: "", isvalid: true, profileimage: "" })
  const [supportDetails, setSupportDetails] = useState<SupportDTy>({ fname: "", lname: "", mobile: "", countrycode: "", subject: "", message: "" })
  const [settings, setSettings] = useState({ language: { label: "English", value: "English" }, units: "Meters", currency: { label: "INR", value: "INR" } })
  const [profileModals, setProfileModals] = useState({ view: false, setting: false, support: false, password: false })
  const imageFile = handleBase64ToImage(username?.image ?? "")
  const [isEditing, setIsEditing] = useState({ view: false, setting: false, support: true, password: false })
  const [passwordHide,setPasswordHide] = useState({oldpassword:false,newpassword:false,cpassword:false})
  const profileModalRef = useRef<HTMLDivElement>(null)
  const headerProfile = useRef<HTMLDivElement>(null);
  const [error, setError] = useState({});
 
  const [changePasswordIn,setChangePasswordIn] = useState<signUPDetails[]>([
    { name: "oldpassword", label: "Old Password", value: "", error: "", type: "password" },
    { name: "newpassword", label: "New Password", value: "", error: "", type: "password" },
    { name: "cpassword", label: "Confirm Password", value: "", error: "", type: "password" }
])


  useEffect(() => {
    const userid = localStorage.getItem("userid");
    if (!userid) {
      logoutuser(dispatch, Navigate);
    }
    if (globalLayers.indiLayers?.graphics.length) {
      globalLayers.map?.layers.remove(globalLayers.indiLayers);
    }
    if (Object.keys(user).length) return;
    const fetchUserDetails = async (userid: string) => {
      try {
        const { payload } = await dispatch(getUserDetails(userid));
        if (pathname === "/Consumer/RoofAnalysis" && payload.projects?.length === 2 && !sessionStorage.getItem("projectid")) {
          Navigate("/Consumer");
        }
        if (!payload) {
          logoutuser(dispatch, Navigate);
        }
      } catch (err: any) { }
    };
    fetchUserDetails(userid!);
    // dispatch(getUserDetails(userid));
    // dispatch(getPrtojects(userid));
    // removeSearchedGraphic();
    //need to check handling
    // navigate(localStorage.getItem('url')!)
  }, []);
  useEffect(() => {
    if (user) {
      const img = handleBase64ToImage(user?.image ?? "")
      setUname({
        fname: user?.fname?.split("")[0]??"",
        lname: user?.lname!?.split("")[0] ?? "",
      });
      setViewProfileDetails({ fname: user.fname??"", lname: user.lname??"", userEmail: user.emailid, userMobile: `${user.country_mstr?.countrycode}${user.mobile}`, countrycode: user.country_mstr?.countrycode ?? "", isvalid: true, profileimage: img??"" })
    }
  }, [user]);

  useEffect(() => {
    if (title) {
      const dd = document.getElementById("searchDiv-suggest-menu") as HTMLElement;
      if (dd) {
        dd.style.marginLeft = "7rem";
      }
    } else {
      const dd = document.getElementById("searchDiv-suggest-menu") as HTMLElement;
      if (dd) {
        dd.style.marginLeft = "0rem";
      }

    }
  }, [title]);



  const logout = async (e: { preventDefault: () => void }) => {
    setOpenProfile(false)
    dispatch(toogleTooltip({ dipy: 0, istooltip: "", msg: "" }));
    removeSearchedGraphic();
    e.preventDefault();
    localStorage.clear();
    sessionStorage.clear();
    dispatch(setTitle(""));
    dispatch(toggleDrawer(false));
    dispatch(resetDrawer());
    dispatch(resetReducerAnalysis());
    if (globalLayers.selectedGraphic) {
      globalLayers.selectedGraphic = null;
    }
    Navigate("/");
    logUserActivity("logout", dispatch);
    dispatch(setCardTitle("Recent"));
    return false;
  };

  const handleClickLogo = () => {
    dispatch(toggleDrawer)
    dispatch(setTitle(""));
    let {
      user: { role, hassceen },
    } = getAuthState(),
      location = "/";
    if (!role) localStorage.clear();
    sessionStorage.clear();
    if (globalLayers.selectedGraphic) {
      globalLayers.selectedGraphic = null;
    }
    if (role && role.toLowerCase().includes("admin")) {
      location = `/`;
    } else if (role && role.toLowerCase().includes("partner")) {
      location = `/`;
    } else {
      location = `/${role}`;
    }
    window.location.href = location;
  };




  const profileHandler = () => {
    setOpenProfile((prev) => !prev);
  };


  const openViewProfileModal = (modalTy: string) => {
    let modalHeaderFooter = { title: "", btnTxt: "", secondaryBtnTxt: "" }
    switch (modalTy) {
      case "view":
        modalHeaderFooter = { title: "Profile", btnTxt: "Edit", secondaryBtnTxt: "" }
        break
      case "support":
        setSupportDetails({ fname: user.fname, lname: user.lname ?? "", mobile: user.mobile ? `${user.country_mstr?.countrycode ?? ""}${user.mobile}` : "", countrycode: user.country_mstr?.countrycode ?? "", subject: "", message: "" })
        modalHeaderFooter = { title: "Support", btnTxt: "Send", secondaryBtnTxt: "" }
        break
      case "setting":
        modalHeaderFooter = { title: "Settings", btnTxt: "Edit", secondaryBtnTxt: "" }
        break
      case "password":
        modalHeaderFooter = {title:"Change Password",btnTxt:"Update",secondaryBtnTxt:""}
        break;
      default:
        break

    }
    dispatch(setModalHeaderFooter(modalHeaderFooter))
    setProfileModals(prev => ({ ...prev, [modalTy as keyof object]: true }))
  }


  const updateUserProfile = async () => {
    const isValid = validateForm("profile")
    let imageString;
    if (viewProfileDetails.profileimage) {
      imageString = await convertImageToBase64(viewProfileDetails.profileimage)
    }

    if (isValid) {
      const reqbody = {
        fname: viewProfileDetails.fname,
        lname: viewProfileDetails.lname,
        emailid: viewProfileDetails.userEmail,
        mobile: viewProfileDetails?.userMobile?.replace(user.country_mstr?.countrycode!, ""),
        image: imageString,
      }
      await dispatch(UserDetailsAction({ reqBody: reqbody, userid: user.userid }))
      dispatch(setModalHeaderFooter({ title: "", btnTxt: "", secondaryBtnTxt: "" }));
      setIsEditing(prev => ({ ...prev, view: false }))
      setProfileModals(prev => ({ ...prev, view: false }))
      setError({});

    }

  }

  const updateSettings = () => {
    const isvalid = validateForm("setting")
    if (isvalid){
      setIsEditing(prev => ({ ...prev, setting: false }))
      setError({})
      setProfileModals(prev=>({...prev,setting:false}))
    }
  }

  const handleViewProfileUpdate = (title: string) => {
    if (isEditing.view === false && title === "Profile") {
      dispatch(setModalHeaderFooter({ title: "Profile", btnTxt: "Save", secondaryBtnTxt: "Cancel" }));
      setIsEditing(prev => ({ ...prev, view: true }))
    }
    else {
      switch (title) {
        case "Profile":
          updateUserProfile()
          break;
        case "Cancel":
          setViewProfileDetails({ fname: user.fname, lname: user.lname, userEmail: user.emailid, userMobile: `${user.country_mstr?.countrycode}${user.mobile}`, isvalid: true, countrycode: user.country_mstr?.countrycode ?? "", profileimage: imageFile })
          dispatch(setModalHeaderFooter({ title: "Profile", btnTxt: "Edit", secondaryBtnTxt: "" }));
          setIsEditing(prev => ({ ...prev, view: false }))
          setError({})
          break;
      }
    }

  }

  const handleSettingsUpdate = (title: string) => {
    if (isEditing.setting === false && title === "Settings") {
      dispatch(setModalHeaderFooter({ title: "Settings", btnTxt: "Save", secondaryBtnTxt: "Cancel" }));
      setIsEditing(prev => ({ ...prev, setting: true }))
    }
    else {
      switch (title) {
        case "Settings":
          updateSettings()
          break;
        case "Cancel":
          // setViewProfileDetails({fname:user.fname ,lname: user.lname,userEmail:user.emailid,userMobile:`${user.country_mstr?.countrycode}${user.mobile}`,isvalid:true,countrycode:user.country_mstr?.countrycode??"",profileimage:imageFile})
          dispatch(setModalHeaderFooter({ title: "Settings", btnTxt: "Edit", secondaryBtnTxt: "" }));
          setIsEditing(prev => ({ ...prev, setting: false }))
          setError({})
          break;
      }
    }
  }

 
  const handleViewProfileModalClose = (modalTy:string)=>{
    if (modalTy==="view"){
      setViewProfileDetails({fname:user.fname ,lname: user.lname,userEmail:user.emailid,userMobile:`${user.country_mstr?.countrycode}${user.mobile}`,isvalid:true,countrycode:user.country_mstr?.countrycode??"",profileimage:imageFile})
    }
    else if (modalTy==="setting"){
    setSettings({language:{label:"English",value:"English"},units:"Meters",currency:{label:"INR",value:"INR"}})
    }
    else if (modalTy==="support"){
      setSupportDetails({fname:user.fname,lname:user.lname??"",mobile:user.mobile?`${user.country_mstr?.countrycode??""}${user.mobile}`:"",countrycode:user.country_mstr?.countrycode??"",subject:"",message:""})
    }
    else if (modalTy==="password"){
      const resetPasswordValues = changePasswordIn.map(each=>({...each,value:""}))
      setChangePasswordIn(resetPasswordValues)
    }
    setProfileModals(prev=>({...prev,[modalTy]:false,}))
    setIsEditing(prev=>({...prev,[modalTy]:false}))
    setError({});
 
  }

  const validateForm = (name: string) => {
    let isValid = true;
    const errors: Record<string, string> = {};
    const validations = {
      "support": [
        { field: "fname", condition: !supportDetails.fname, message: "First name is Required" },
        { field: "lname", condition: !supportDetails.lname, message: "Last name is Required" },
        { field: "subject", condition: !supportDetails.subject, message: "Subject is Required" },
        { field: "message", condition: !supportDetails.message, message: "Message is Required" },
      ],
      "profile": [
        { field: "fname", condition: !viewProfileDetails.fname, message: "First name is Required" },
        { field: "lname", condition: !viewProfileDetails.lname, message: "Last name is Required" },
        { field: "userMobile", condition: viewProfileDetails?.userMobile?.replace(user.country_mstr?.countrycode!, "")?.length! < 10, message: "Mobile No. is Required" },
        { field: "userEmail", condition: !viewProfileDetails.userEmail, message: "Emailid is Required" },
      ],
      "setting": [
        { field: "language", condition: !settings.language, message: "Language name is Required" },
        { field: "units", condition: !settings.units, message: "Units is Required" },
        { field: "currrency", condition: !settings.currency, message: "Currency is Required" },
      ],
    "password":[
        { field: "oldpassword", condition: !changePasswordIn[0].value , message: `${"Old password is Required"}` },    
        { field: "newpassword", condition: !changePasswordIn[1].value || changePasswordIn[0].value===changePasswordIn[1].value || !validPassword.test(changePasswordIn[1].value!), message: `${!validPassword.test(changePasswordIn[1].value!)?"Password must contain both numeric and string":changePasswordIn[0].value===changePasswordIn[1].value?"New password cannot be same as old password.":"New password is Required"}` },
        { field: "cpassword", condition: changePasswordIn[1].value!==changePasswordIn[2].value || !changePasswordIn[2].value, message: `${!changePasswordIn[2].value ? "Confirm password is required":"Confirm password must match new password"}` },
      ]
    };

    for (const { field, condition, message } of validations[name as keyof object] as any) {
      if (condition) {
        errors[field] = message;
        isValid = false;
      }
      else if (error){
        delete error[field as keyof object];
        setError(error);
      }
    }
    if (Object.keys(errors).length > 0) {
      setError(errors);
    };
    return isValid;
  };

  const handleSupport = async () => {
    const isFormValid = validateForm("support");
    if (!isFormValid) return;
    const reqbody = {
      fname: supportDetails.fname,
      lname: supportDetails.lname,
      message: supportDetails.message,
      mobile: supportDetails.mobile,
      subject: supportDetails.subject,
      userid: user.userid
    } as suportRequestTy;
    try {
      const { data } = await baseURL.post(requestUrl.SupportEmail, reqbody);
      if (data && data.code === "200") {
        Toast({ messageText: "email send to terranxt team", autoClose: 1000, messageType: "S", toastId: "suportMessage" });
        setProfileModals({ ...profileModals, support: false });
        setError({});
      };
    } catch (err: any) {
      Toast({ messageText: "", messageType: "E", toastId: "suportMessage", autoClose: 1000 })
    }
  }


  const changePassword = async()=>{
    const isFormValid = validateForm("password");
    if(isFormValid) {
      const reqbody ={
      oldpassword: changePasswordIn[0].value,
      newpassword: changePasswordIn[2].value    
    } ;
      try{
        const {data} = await baseURL.put(`${requestUrl.changeUserPassword}/${user.userid}`,reqbody);
        if(data && data.code === "200"){
          Toast({messageText:"Password update successfully.",messageType:"S",autoClose:1000,toastId:"UpdatedPasseord"});
          setProfileModals({...profileModals,password:false});
          const resetPasswordValues = changePasswordIn.map(each=>({...each,value:""}))
          setChangePasswordIn(resetPasswordValues)
          setError({});
        };
      }catch(err:any){
        console.log(err)
        setError(prev=>({...prev,oldpassword:err.response.data.message}))
      }
    }
  }
 
 
  const handleChangePasswordClick = (title:string)=>{
 
    switch(title){
      case "Change Password":
            changePassword()
        break;
      case "back":
        const resetPasswordValues = changePasswordIn.map(each=>({...each,value:""}))
        setChangePasswordIn(resetPasswordValues)
        setProfileModals(prev=>({...prev,password:false}))
        setError({})
        break;  
      default:
        break;      
   }
  }

  const handlePasswordChangeEl = (e:any,index:number)=>{
    const {name,value} = e.target
   if(!testPassword(value) && value!==""){
     return false;
    }
    

    setChangePasswordIn((prev:any)=>{
        prev[index].value = value
        return [...prev]
    })
    if (error){
      setError((prev:any)=>({...prev,oldpassword:!prev.oldpassword?null:prev.oldpassword,[name]:null}));
    }
  }
   
 
  const handleChange = (e: any, statename: string) => {
    const { name, value } = e.target;
    let valueErr = false
    if (name === "fname" || name === "lname") {
      if (value.length > 20 || value === " " || !isValidName(value)) {
        valueErr = true
      }
      valueErr && e.preventDefault()
    }
    if (value === "") {
      valueErr = false
    }
    if (!valueErr){
      if (statename === "support") {
        setSupportDetails({ ...supportDetails, [name]: value });
      } else if (statename === "setting") {
        setSettings(prev => ({ ...prev, [name]: value }))
      } else if (statename === "profile") {
        setViewProfileDetails(prev => ({ ...prev, [name]: value }))
      }
      if (error && error[name as keyof object]) {
        delete error[name as keyof object];
        setError(error);
      }
    }

  }

  const handleSettings = async (props: any, selectedOption?: any) => {
    let { name, value } = props?.target ?? props;
    if (selectedOption) {
      name = selectedOption.name;
      value = props;
    };

    setSettings(prev => ({ ...prev, [name]: value }))

  }


  
 
useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      profileModalRef.current && headerProfile.current &&!profileModalRef.current.contains(event.target as Node) &&!headerProfile.current.contains(event.target as Node)) {
      setOpenProfile(false);
    }
  };
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  return (<>
    {profileModals.support && <NewModal height="44vh" isAbleCLick onClick={handleSupport} setIsCLose={() => handleViewProfileModalClose('support')} name={"Support"} children={<Support isEditing={!isEditing.support} profileState={supportDetails} error={error} handleChange={(e: any) => handleChange(e, "support")} />} modalSize="lg" btnName="support" />}
    {profileModals.setting && <NewModal height="26vh" isAbleCLick onClick={handleSettingsUpdate} setIsCLose={() => handleViewProfileModalClose('setting')} name={"Settings"} children={<SettingModal isEditing={!isEditing.setting} setProfileState={setSettings} profileState={settings} error={error} handleChange={handleSettings} />} modalSize="lg" btnName="setting" />}
    {profileModals.view && <NewModal isAbleCLick onClick={handleViewProfileUpdate} setIsCLose={() => handleViewProfileModalClose('view')} name={"Profile Details"} children={<ProfileModal isEditing={!isEditing.view} setProfileState={setViewProfileDetails} error={error} profileState={viewProfileDetails} handleChange={(e: any) => handleChange(e, "profile")} />} modalSize="lg" btnName="profile" />}
    {profileModals.password && <NewModal maxheight="70vh" isAbleCLick onClick={handleChangePasswordClick} setIsCLose={()=>handleViewProfileModalClose('password')} name={"Profile Details"} children={<ChangePassword setPasswordHide={setPasswordHide}  passwordHide={passwordHide} changePasswordIn={changePasswordIn} handleChange={(e:any,i:number)=>handlePasswordChangeEl(e,i)} error={error}  />} modalSize="lg" btnName="profile"  />}
    <div className="flex flex-wrap items-center px-4 py-0.5 h-[60px] relative bg-white border-b gap-4">
      {/* <InfoModal /> */}
      <a href="javascript:void(0)" className="hidden max-lg:block cursor-pointer">
        <img src={fp_logo} alt="logo" className="w-36" />
      </a>

      <div id="collapseMenu" className="w-full max-lg:hidden lg:!block max-lg:fixed max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
        <button id="toggleClose" className="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white p-3"        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 fill-black"
            viewBox="0 0 320.591 320.591"
          >
            <path
              d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
              data-original="#000000"
            ></path>
            <path
              d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
              data-original="#000000"
            ></path>
          </svg>
        </button>

        <div className="lg:flex items-center max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
          <ul className="lg:flex lg:gap-x-4 max-lg:space-y-2 items-center">
            <div className="flex justify-start items-center gap-3">
              <div className="m-auto max-lg:hidden cursor-pointer" onClick={handleClickLogo}> <img src={fp_logo} alt="logo" className="w-36" /> </div>
              {headerTitle && (
                <div className="max-h-9 w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-600 to-transparent opacity-25 "></div>
              )}
              <div className="para-md text-gray-700">{headerTitle}</div>
            </div>

            {userType === "Consumer" &&
              pathname === "/Consumer/RoofAnalysis" && (<>
                <div className="max-h-9 w-px self-stretch bg-gradient-to-tr from-transparent via-neutral-600 to-transparent opacity-25 "></div>
                <div className="searchInHeader" id="searchDiv"></div>
              </>
              )}
          </ul>

          <div className="lg:flex lg:space-x-4 max-lg:space-y-2 max-lg:mt-2 ml-auto">
            <div  onClick={profileHandler}>
              {viewProfileDetails.profileimage.size !== 0 && viewProfileDetails.profileimage !== "" && viewProfileDetails.profileimage!==undefined? (
                <div ref={headerProfile} className="cursor-pointer  rounded-full border-[0.4vh] border-custom-primary-default">
                  <img
                    src={URL.createObjectURL(viewProfileDetails.profileimage)}
                    alt="Selected"
                    style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "4vh", height: "4vh", borderRadius: "100%" }}
                  />
                </div>
              ) : <span ref={headerProfile} className="inline-flex items-center justify-center size-10 para-sm-semibold rounded-full  border-[0.3vh] border-custom-primary-default text-custom-primary-default shadow-sm uppercase cursor-pointer"> {uname && uname.fname + uname.lname} </span>}
              {/* <span className="inline-flex items-center justify-center size-10 para-sm-semibold rounded-full border border-custom-primary-default text-custom-primary-default shadow-sm uppercase cursor-pointer"> {uname && uname.fname + uname.lname} </span> */}
              {openProfile &&
                <div ref={profileModalRef} className={`absolute right-0 top-full w-60 border border-gray-300 divide-y divide-stroke overflow-hidden rounded-lg bg-white cursor-pointer select-none`} >
                  <div className="flex items-center gap-3 px-4 py-3">
                    {viewProfileDetails.profileimage.size !== 0 && viewProfileDetails.profileimage !== "" ? (
                      <div>
                        <img
                          src={URL.createObjectURL(viewProfileDetails.profileimage)}
                          alt="Selected"
                          style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "5vh", height: "5vh", borderRadius: "100%" }}
                        />
                      </div>
                    ) : <span className="inline-flex items-center justify-center size-10 para-sm-semibold rounded-full border-[0.3vh] border-custom-primary-default text-custom-primary-default shadow-sm uppercase "> {uname && uname.fname + uname.lname} </span>}
                    {/* <span className="inline-flex items-center justify-center size-10 para-sm-semibold rounded-full border border-custom-primary-default text-custom-primary-default shadow-sm uppercase "> {uname && uname.fname + uname.lname} </span> */}
                    <div>
                      <p className="para-sm text-gray-700">{toTitleCase(user.fname) + " " + toTitleCase(user.lname)}</p>
                      <p className="para-xs text-gray-700">{user.emailid}</p>
                    </div>
                  </div>
                  <div>
                    <span onClick={() => openViewProfileModal("password")} className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer" > Change Password </span>
                    <span onClick={() => openViewProfileModal("view")} className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer"> User Profile </span>
                    {/* <span className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer" > Company profile </span> */}
                    <span onClick={() => openViewProfileModal("setting")} className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer" > Settings </span>
                    <span onClick={() => openViewProfileModal("support")} className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer"  > Support </span>
                  </div>
                  {/* <div>
                    <a href="#0" className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer"  > Changelog </a>
                    <span onClick={() => openViewProfileModal("support")} className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer"  > Support </span>
                    <a href="#0" className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer"   > API </a>
                  </div> */}
                  <div>
                    <button className="flex w-full items-center justify-between px-4 py-2.5 para-sm text-gray-700 hover:bg-gray-200/60 cursor-pointer" onClick={logout}> Log out </button>
                  </div>
                </div>}
              {/* {openProfile && <div className={`absolute top-[6.7vh] w-fit h-fit right-20 border-[0.2vh] border-gray-400 p-1 rounded-sm bg-white`}  >

                  <ul className=" text-sm text-gray-700 dark:text-gray-200">
                    <li className="flex gap-2">
                      <span className="inline-flex items-center justify-center size-10 para-sm-semibold rounded-full border border-custom-primary-default text-custom-primary-default shadow-sm uppercase " onClick={profileHandler}>
                        {uname && uname.fname + uname.lname}
                      </span>
                      <div>
                        <div className="para-sm text-gray-700">{user.fname + " " + user.lname}</div>
                        <div className="para-xs text-gray-700">{user.emailid}</div>
                      </div>
                    </li>
                    <li>
                      <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> {user.fname + " " + user.lname}</p>
                    </li>
                    <li>
                      <div onClick={logout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</div>
                    </li>
                  </ul>
                </div>} */}
            </div>
          </div>
        </div>
      </div>
      <div className="flex ml-auto lg:hidden" onClick={profileHandler}>
        <button id="toggleOpen">
          <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" > <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd" ></path></svg>
        </button>
        {openProfile && <div className={`absolute top-[6.7vh] w-fit h-fit right-4 border-[0.2vh] border-gray-400 p-1 rounded-sm bg-white`} >
          <ul className=" text-sm text-gray-700 dark:text-gray-200">
            <li className="flex gap-2">
              <span className="inline-flex items-center justify-center size-10 para-sm-semibold rounded-full border border-custom-primary-default text-custom-primary-default shadow-sm uppercase " onClick={profileHandler}>{uname && uname.fname + uname.lname}</span>
              <div>
                <div className="para-sm text-gray-700">{user.fname + " " + user.lname}</div>
                <div className="para-xs text-gray-700">{user.emailid}</div>
              </div>
            </li>
            <li>
              <p className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> {user.fname + " " + user.lname}</p>
            </li>
            <li>
              <div onClick={logout} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sign out</div>
            </li>
          </ul>
        </div>}
      </div>
    </div>


  </>

    /*  <div className={`grid ${(pathname==="/Partner/RoofAnalysis"||pathname==="/Admin/RoofAnalysis"||pathname==="/Consumer/RoofAnalysis")?"grid-cols-3":"grid-cols-2"} gap-4 content-center h-[7vh]`}>
      <div className="flex justify-start items-center ">
        <div className=" text-1.8xl text-yellow-200 font-medium px-2 leading-[2vh]">pvNXT</div>
        {headerTitle&&<div className="h-[2.6vh] border-r-[0.2vh] border-yellow-200/40"></div>}
        <div className="flex flex-col justify-between px-2">
          <div className="text-1.8xl text-yellow-200 font-medium">
            {headerTitle}
            {/* {pathname.includes("Projects")?"Project Dashboard":titleActive!="" ? HeaderListItems[titleActive as keyof typeof HeaderListItems]?.headerName:"Rooftop Analytical Portal"}
            {/* {titleActive!=""? titleActive:"Rooftop Analytical Portal"}           
          </div>
        </div>
      </div>
      {(userType==="Partner"&&pathname==="/Partner/RoofAnalysis")&&<div className="searchInHeader" id="searchDiv"></div>}
      {(userType==="Admin"&&pathname==="/Admin/RoofAnalysis")&&<div className="searchInHeader" id="searchDiv"></div>}
      {(userType==="Consumer"&&pathname==="/Consumer/RoofAnalysis")&&<div className="searchInHeader" id="searchDiv"></div>}
      <div className="flex justify-end items-center px-0.8">
        <div title="Language" className="text-1.6xl font-medium text-white cursor-pointer">EN</div>
        <div className="h-[2.6vh] border-r-[0.2vh] border-yellow-200/40 mx-1 cursor-pointer"></div>
        <div title="Support Center" className="cursor-pointer" onClick={handleSupport}> *
        <a title="Support Center" className="cursor-pointer" target="_blank" href="mailto:support@terranxt.com"><IconHelp /></a>
        {/* </div> 
    </>*/
  )
};

export default DefaultHeader;
