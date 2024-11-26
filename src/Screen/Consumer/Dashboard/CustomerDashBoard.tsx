import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../Components/AllButton/AllButtons.tsx";
import { CardDesign } from "../../../Components/AllHeaders/AllHeaders";
import Toast from "../../../Components/ErrorBoundry/Toast";
import { NewModal } from "../../../Components/New/Modal/NewModal";
import Support from "../../../Components/ProfileModal/Support";
import { setAuthProjectDetails } from "../../../ReduxTool/Slice/Auth/AuthReducer";
import { ProjectTy } from "../../../ReduxTool/Slice/Auth/types";
import { setModalHeaderFooter } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { resetRoofAnalisis, resetSelected_project, setOrderStatusCardModal, setSelectedOption } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { getPrtojects, updateOrderStatusCard } from "../../../ReduxTool/Slice/Consumer/ProjectServices/projectServices";
import { setCardTitle } from "../../../ReduxTool/Slice/Dashboard/DashboardReducer";
import { resetDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { resetMapRef } from "../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { suportRequestTy } from "../../../Utils/Const.js";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { fetchCompleteAddress } from "../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { baseURL, requestUrl } from "../../../Utils/baseUrls";
import { getActiveClass } from "../../../Utils/commonFunctions";
import { IconErrorPage } from "../../../assests/icons/Icons";
import imggg from "../../../assests/img/Dashboard/FP_Image.png";
import UpdateOrder from "../RoofAnalysis/ConfirmActionModal/UpdateOrder";
import CustomerDashboardLanding from "./CustomerDashboardLanding";
import SelfSetupCC from "./SelfSetupCC";
import TerranxtSetupCC from "./TerranxtSetupCC";
import RingLoader from "../../../Components/Loaders/RingLoader.js";
import { SupportDTy } from "../../../Components/AllInput/types.js";

const content1 = `Thank you for trying pvNXT portal. Your trial period has expired. We trust you’ve had a valuable experience exploring the features & benefits that pvNXT has to offer.`;

const CustomerDashBoard = () => {
  const dispatch = useAppDispatch(), navigate = useNavigate();
  const { activeCard } = useAppSelector((state) => state.dashboard);
  const { user } = useAppSelector((state) => state.auth);
  const [isNotify, setShowInfoModal] = useState<boolean>(false)
  const { projects: newProject, isLoading: loading, orderModalOpen, orderstatusmodal } = useAppSelector((state) => state.consumerReducers);
  const [ordProject, setOrdProject] = useState<ProjectTy[]>([]);
  const [projectId, setProjectId] = useState<string>("");
  const [cardAdd, setcardAdd] = useState<{ city: string, state: string }[]>([]);
  const [supportModal,setSupportModal] = useState<boolean>(false)
  const [supportDetails,setSupportDetails] = useState<SupportDTy>({fname:"",lname:"",mobile:"",countrycode:"",subject:"",message:""})
  const [error,setError] = useState({});


  useEffect(() => {
    if (activeCard == 'My Projects' && newProject?.length) {
      let orderProject = newProject.filter(el => el.installationmode);
      if (orderProject.length > 0) {
        setOrdProject(orderProject);
      };
    };
  }, [activeCard, newProject]);

  // useEffect(() => {
  //   if (isNotify) {
  //     document.addEventListener("mousedown", handleCloseTrail);
  //   }
  //   return () => {
  //     document.removeEventListener("mousedown", handleCloseTrail);
  //   }
  // }, [isNotify]);

  const fetchProjectDetails = async (userid: string) => {
    try {
      dispatch(setCardTitle("Recent"));
      const { payload }: any = await dispatch(getPrtojects(userid));
      let addressList = await Promise.all(payload?.map(async (el: ProjectTy, i: number) => {
        let add = await fetchCompleteAddress(el.lat, el.lng);
        return { city: add.city, state: add.state };
      }));
      setcardAdd(addressList);
      dispatch(setAuthProjectDetails(payload as ProjectTy[]))
    } catch (err) {

    }
  }

  const handleCloseTrail = () => {
    setShowInfoModal(false);
  };
  const handleCreateNewProject = (title: string, btnTitle: string) => {
    if (newProject && newProject.length >= 2) {
      dispatch(setModalHeaderFooter({ title: "Trial Period Expired", btnTxt: "Contact Support", secondaryBtnTxt: "" }));
      setShowInfoModal(true);
    } else {
      navigate("/Consumer/RoofAnalysis");
    }
    dispatch(resetRoofAnalisis())
    dispatch(resetDrawer());
    dispatch(resetMapRef());
    sessionStorage.clear();
    if (globalLayers.selectedGraphic) {
      globalLayers.selectedGraphic = null;
    }
  };
  const handleOnClick1 = () => {
    let data = {
      installationmode: "PVNxt Mode",
      projectid: projectId,
      iscompleted: true,
    };
    dispatch(updateOrderStatusCard(data));
    dispatch(setOrderStatusCardModal(false));
  };

  const handleSelection = (data: ProjectTy) => {
    sessionStorage.setItem("projectid", data.projectid);
    navigate('/Consumer/RoofAnalysis');
  };


  // const handleMouseEnter = () => {
  //   if (slideshowRef.current) {
  //     slideshowRef.current.style.transition = 'none';
  //   }
  // };

  // const handleMouseLeave = () => {
  //   if (slideshowRef.current) {
  //     slideshowRef.current.style.transition = 'ease 1500ms';
  //   }
  // };
  // const handleSelection = (data: ProjectTy) => {
  //   sessionStorage.setItem("projectid", data.projectid);
  //   navigate('/Consumer/RoofAnalysis');
  // };
  const handleCloseModal = () => {
    dispatch(setOrderStatusCardModal(false))
    dispatch(setSelectedOption("No"));
  }

  const openSupportModal = ()=>{
    setShowInfoModal(false)
    dispatch(setModalHeaderFooter({ title: "Support", btnTxt: "Send", secondaryBtnTxt: "" }));
    setSupportModal(true)
  }



  // const BindProjectCard = () => (
  //   newProject?.length ? newProject.map((data: ProjectTy, i: number) => (
  //     <div key={i} className="card-main cursor-pointer">
  //       <div className="card-content" onClick={() => handleSelection(data)}>
  //         <CardDesign date={new Date(data.createddt)} city={cardAdd[i]?.city! ?? ""} state={cardAdd[i]?.state! ?? ""} capacity={data.sanctionload.toString()} draftbtnTxt="draft" pvnxtbtnTxt={data?.installationmode?.split(" ")[0].toLowerCase() ?? ""} name={data.projectname} imageUrl={imggg} />
  //       </div>
  //     </div>
  //   )) : null);

  const formValidation = ()=>{
    let isvalid = true 
    const errors: Record<string, string> = {};
    const validations = [
      { field: "fname", condition: !supportDetails.fname, message: "First name is Required" },
      { field: "lname", condition: !supportDetails.lname, message: "Last name is Required" },
      { field: "subject", condition: !supportDetails.subject, message: "Subject is Required" },
      { field: "message", condition: !supportDetails.message, message: "Message is Required" },
    ]

    for (const { field, condition, message } of validations) {
      if (condition) {
          errors[field] = message;
          isvalid = false;
      }
  }
  if (Object.keys(errors).length > 0) {
      setError(errors);
  };
  return isvalid;
  }

  const handleChange = (e:any)=>{
    const {name,value} = e.target;
    setSupportDetails({...supportDetails,[name]:value});
    if(error){
      setError({})
    }
  }

  const handleSupportClose = (e:any)=>{
    setSupportDetails({fname:user.fname,lname:user.lname??"",mobile:`${user.country_mstr?.countrycode??""}${user.mobile??""}`,countrycode:user.country_mstr?.countrycode??"",message:"",subject:""})
    setSupportModal(false)
    if (error){
      setError({})
    }
  }

  const handleSupportModal = async()=>{
    const isvalid = formValidation()
    if (isvalid){
      const reqbody ={
        fname:supportDetails.fname,
        lname:supportDetails.lname,
        message:supportDetails.message,
        mobile:supportDetails.mobile,
        subject:supportDetails.subject,
        userid:user.userid
      } as suportRequestTy;
      try{
        const {data} = await baseURL.post(requestUrl.SupportEmail,reqbody);
        if(data && data.code === "200"){
          Toast({messageText:"email send to terranxt team",autoClose:1000,messageType:"S",toastId:"suportMessage"});
          setSupportModal(false)
          setError({});
          setSupportDetails({fname:user.fname,lname:user.lname??"",mobile:user.mobile??"",countrycode:user.country_mstr?.countrycode??"",message:"",subject:""})
        };
      }catch(err:any){
        Toast({messageText:"",messageType:"E",toastId:"suportMessage",autoClose:1000})
      }
    }
  }


  useEffect(() => {
    globalLayers.selectedGraphic = null;
    if (user.usertypemapid) {
      setSupportDetails({fname:user.fname,lname:user.lname??"",mobile:`${user.country_mstr?.countrycode??""}${user.mobile??""}`,countrycode:user.country_mstr?.countrycode??"",message:"",subject:""})
      if (!user?.userid) return;
      fetchProjectDetails(user.userid);
      // dispatch(getPrtojects(user.userid));
      //   dispatch(setCardTitle(""));
    }
  }, [user.usertypemapid]);

  const OrderStatus = () => (
    <>
      {ordProject.length > 0 ? <div className="flex flex-row gap-5 flex-wrap cursor-pointer">
        {ordProject.map((item: any, i: number) => (
          <div className="card-main" key={i}>
            {item.installationmode === "Self Mode" ? <SelfSetupCC item={item} setProjectId={setProjectId} /> : <TerranxtSetupCC item={item} />}
          </div>  
        ))}
      </div>
        :
        <div className="grid place-content-center bg-white px-4">
          <div className="text-center">
            <IconErrorPage />
            <h1 className="heading-lg-bold mt-6 ">Uh-oh!</h1>
            <p className="para-lg text-gray-500 mt-4">We can't find any order yet.</p>
            <Button className="btn btn-md-primary mt-2"  onClick={() => handleCreateNewProject("Create New Project", "Save")} name="Create New Project" />
          </div>
        </div>        
      }
    </>
  )


  useEffect(() => {
    dispatch(resetSelected_project())
  }, [])

 
  return (
    <>
    {supportModal && <NewModal isAbleCLick={true} height="40vh" btnName="" setIsCLose={handleSupportClose} name="support" onClick={handleSupportModal} children={<Support isEditing={true}  profileState={supportDetails} error={error} handleChange={handleChange}/>}/>}
      {orderModalOpen && <NewModal isAbleCLick={true} name={"Model Name"} btnName={"Button Name"} onClick={handleOnClick1} children={<UpdateOrder />} setIsCLose={handleCloseModal} />}
      {/* {isNotify && <div className="info-main"> <InfoModal modaltitle="Trial Period Expired" content={content1} setClose={() => { setShowInfoModal(false) }} /></div>} */}
      {isNotify && <NewModal isAbleCLick={true} name={"Trial Period Expired"} btnName={"Button Name"} children={content1} setIsCLose={setShowInfoModal} onClick={openSupportModal} />}
      {(user && user.projects && user.projects.length > 0) ?
        <section className="mx-auto px-8 py-8 space-y-8">
          {/*  <h2 className="heading-lg-bold">Dashboard</h2> */}
          {newProject && newProject.length >= 1 &&
            <Button className="btn btn-md-primary" onClick={() => handleCreateNewProject("Create New Project", "Save")} name="Create New Project" />
          }

          <div className="relative">
            <div className="border-b border-gray-200">
              <ul className="-mb-px flex gap-6">
                <li className={`cursor-pointer ${getActiveClass(activeCard, "Recent", "tab-active")}`} onClick={() => { dispatch(setCardTitle("Recent")) }}>Project Dashboard</li>
                <li className={`cursor-pointer ${getActiveClass(activeCard, "My Projects", "tab-active")}`} onClick={() => { dispatch(setCardTitle("My Projects")) }}>Order Status</li>
              </ul>
            </div>
            <div className={`tabs-inactivebody ${getActiveClass(activeCard, "Recent", "tabs-activebody")} overflow-auto custom-scrollbar-css`}>
              <div className="flex flex-wrap gap-4">
                {newProject === null ? null : newProject.map((data: ProjectTy, i: number) => {
                  return (
                    <div key={i} className="card-main cursor-pointer">
                      <div className="card-content" onClick={() => handleSelection(data)}>
                        <CardDesign date={new Date(data.createddt)} city={cardAdd[i]?.city! ?? ""} state={cardAdd[i]?.state! ?? ""} capacity={data.sanctionload.toString()} draftbtnTxt="draft" pvnxtbtnTxt={data?.installationmode?.split(" ")[0].toLowerCase() ?? ""} name={data.projectname} imageUrl={imggg} />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div className={`tabs-inactivebody ${getActiveClass(activeCard, "My Projects", "tabs-activebody")} overflow-auto custom-scrollbar-css`}>
              <div className="overflow-auto">{OrderStatus()}</div>
            </div>
          </div>

        </section> : (user && (user.projects === undefined || user.projects.length === 0) && !loading) && <CustomerDashboardLanding />}
      {/* {(user && user.projects && user.projects.length > 0) ?
        <div className="main-container">
          <div className="flex justify-between items-center xl:w-full px-8 pt-4">
            {newProject && newProject.length >= 1 &&
              <Button className="btn btn-md-primary mt-2 py-2" onClick={() => handleCreateNewProject("Create New Project", "Save")} name="Create New Project" />
            }
          </div>
       

          <div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6">
                  <a
                    href="#"
                    className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Settings
                  </a>

                  <a
                    href="#"
                    className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Messages
                  </a>

                  <a
                    href="#"
                    className="shrink-0 border border-transparent p-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                  >
                    Archive
                  </a>

                  <a
                    href="#"
                    className="shrink-0 rounded-t-lg border border-gray-300 border-b-white p-3 text-sm font-medium text-sky-600"
                  >
                    Notifications
                  </a>
                </nav>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="xl:w-full px-8 py-4">
              <div className="border-b border-gray-200">
                <ul className="-mb-px flex gap-6">
                  <li className={`${getActiveClass(activeCard, "Recent", "tab-active")}`} onClick={() => { dispatch(setCardTitle("Recent")) }}>Project Dashboard</li>
                  <li className={`${getActiveClass(activeCard, "My Projects", "tab-active")}`} onClick={() => { dispatch(setCardTitle("My Projects")) }}>Order Status</li>
                  <div className="h2"></div>
                </ul>
              </div>
              <div className={`tabs-inactivebody ${getActiveClass(activeCard, "Recent", "tabs-activebody")} overflow-auto custom-scrollbar-css`}>
                <div className="flex flex-wrap gap-4">
                  {newProject === null ? null : newProject.map((data: ProjectTy, i: number) => {
                    return (
                      <div key={i} className="card-main cursor-pointer">
                        <div className="card-content" onClick={() => handleSelection(data)}>
                          <CardDesign date={new Date(data.createddt)} city={cardAdd[i]?.city! ?? ""} state={cardAdd[i]?.state! ?? ""} capacity={data.sanctionload.toString()} draftbtnTxt="draft" pvnxtbtnTxt={data?.installationmode?.split(" ")[0].toLowerCase() ?? ""} name={data.projectname} imageUrl={imggg} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className={`tabs-inactivebody ${getActiveClass(activeCard, "My Projects", "tabs-activebody")} overflow-auto custom-scrollbar-css`}>
                <div className="card-main overflow-auto custom-scrollbar-css h-[75vh] customerOrderCard">{OrderStatus()}</div>
              </div>
            </div>
          </div>
        </div> : (user && (user.projects === undefined || user.projects.length === 0) && !loading) && <CustomerDashboardLanding />} */}
    </>
  );
};

export default CustomerDashBoard;