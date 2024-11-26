import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { btnTitleTypeCustomer, ConsumerRoofAnalysisRoutes, DrawerContainerCustomerListItems } from "../../../Containers/DefaultLayouts/AsideRouteLists"
import { fetchPANOND } from "../../../ReduxTool/Slice/Consumer/ConsumerActions"
import { resetRoofAnalisis, setOndFiles, setRoofDetailsError } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers"
import { setTitle, toggleDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer"
import { TtitlesCustomer } from "../../../ReduxTool/Slice/Drawer/DrawerTypes"
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks"
import { coverageFactor, defaultmoduleArea, defaultmoduleLength, defaultmodulePower, defaultmoduleWidth, MAXUSEABLEAREA, MINUSEABLEAREA, TDrawerContainer, voltagepermodule } from "../../../Utils/Const"
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap"
import { filterKeyIncludeArr, getElementByIndex, getIndexByValue } from "../../../Utils/commonFunctions"
import { pvHandleRoofTop } from "../../../Utils/CustomerMaps/GenerateRoof/GenrateRoof"
import { ProjectTy } from "../../../ReduxTool/Slice/Auth/types"
import { setModalHeaderFooter } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers"
import { NewModal } from "../../../Components/New/Modal/NewModal"
import { setCardTitle } from "../../../ReduxTool/Slice/Dashboard/DashboardReducer"
import ConfirmAction from "./ConfirmActionModal/ConfirmAction"
import { toogleTooltip } from "../../../ReduxTool/Slice/Map/MapReducer"
import { setUserProjects } from "../../../ReduxTool/Slice/Auth/AuthReducer"
import { Button } from "../../../Components/AllButton/AllButtons.tsx"
import Toast from "../../../Components/ErrorBoundry/Toast"
import { saveConsumerProjects } from "../../../ReduxTool/Slice/Consumer/ProjectServices/projectServices"

const CustomerDrawerContainer = () => {
    const urlPath = useLocation(), dispatch = useAppDispatch(), navigate = useNavigate();
    const { title } = useAppSelector(state => state.drawer);
    const { roofAnalysis: { obsArea, subsequentOption, selectedOption, formDetails: { projectSetup, quickplantAnalysis, projectSummary,error }, isWithRoof, selected_project }, projects, ondFiles } = useAppSelector(state => state.consumerReducers);
    const { allDiscom, providertype, modal: { title: modalTitle } } = useAppSelector(state => state.commonReducers);
    const [isConfimModal, setIsConfimModal] = useState(false);
    const { user } = useAppSelector(state => state.auth);
    const [Data, setData] = useState<TDrawerContainer>()
  
    useEffect(() => {
        if (urlPath.pathname && urlPath.pathname === '/Consumer/RoofAnalysis') {
            setData(DrawerContainerCustomerListItems[title as keyof object]);
        }
    }, [title, Data, urlPath.pathname]);

    /******************* Next btn handler ************************************************/
    const nextModal = () => {
        let titleInd = getIndexByValue(ConsumerRoofAnalysisRoutes, title);
        let nextpage = ConsumerRoofAnalysisRoutes[titleInd + 1]?.title as TtitlesCustomer;
        nextpage && dispatch(setTitle(nextpage));
    };
    // const forWithBoundry = async (plantcapacity:number,tableCount:number) => {
    //             globalLayers.lastDrawnRoofBoundry = globalLayers.selectedGraphic ?.geometry as any;
    //             if (globalLayers.indiLayers) {
    //               globalLayers.map?.remove(globalLayers.indiLayers!);
    //             }
    //             await pvHandleRoofTop(globalLayers.selectedGraphic?.geometry,globalLayers.elevationP,title).then((ele) => {
    //               console.log("completed Modules Generation");
    //             });
    //             let {inverter,module }=ondFiles!
    //             const formData = stringSizeObject({ inverter:ondFiles?.inverter!, module:ondFiles?.module! });                 
    //             const { lat, lng} = projectSetup;
    //             var obj = { data: { inverter, module }, plantcapacity, loadVal: false, lat, lng } as any;
    //             const rescountry = await fetchCountryNamefromLatLng(lat!, lng!);
    //             const res = await baseURL.post(requestUrl.getconvStringData, formData);
    //             if (res.status === 200) {
    //               obj.noOfString = Math.round(tableCount / res.data.responseData.stringCount);
    //               obj.modulePerString = res.data.responseData.stringCount;
    //               obj.india = rescountry === "india" || rescountry === "India" ? true : false;

    //               await dispatch(fetchpVAPIMonthly(obj));
    //             }   


    //     nextModal();
    //   };
    const saveProjectDetails = async (projectid?: string) => {
        
        try {
            let reqBody = {
                projectname: projectSetup.projectname,
                projecttype: projectSetup.projecttype?.value,
                address: projectSetup.address,
                userid: user.userid,
                sanctionload: projectSetup.sanctionload,
                electricityrate: projectSetup.electricityrate,
                useablearea: projectSetup.useablearea,
                lat: projectSetup.lat,
                lng: projectSetup.lng,
                totalroofarea: projectSetup.totalroofarea,
                providerid: projectSetup.providerid?.value/*getElementByIndex(filterKeyIncludeArr(allDiscom, "providername", projectSetup.providerid!), 0, "providerid")*/,
                consumercategoryid: projectSetup.consumercategoryid?.value/*getElementByIndex(filterKeyIncludeArr(providertype, "consumercategoryname", projectSetup.consumercategoryid!), 0, "consumercategoryid")*/,
                graphicLayer: isWithRoof ? JSON.stringify(globalLayers.selectedGraphic) : "",
                plantcapacity: 0,
                monthlyunit: projectSetup.monthlyunit ? Number(projectSetup.monthlyunit) : 0 as number
            };
            let tableCount = 0
            const { inverter, module } = await fetchPANOND();
            dispatch(setOndFiles({ inverter, module }));
           
            reqBody.plantcapacity = Math.round((reqBody.useablearea * coverageFactor * voltagepermodule) / ((defaultmoduleWidth * defaultmoduleLength) * 1000));
            globalLayers.plantcapacity = reqBody.plantcapacity;
            globalLayers.isSavedProject = true
            const { payload }: any = await dispatch(saveConsumerProjects({ reqBody, projectid }));
            if (typeof payload === "string") {
                throw new Error("Something went wrong to save or update projects")
            }
            if (payload) {

                if (payload.code && payload.code !== "200") {
                    toast.error(payload.response?.data.message ?? payload.message, { toastId: "customID" });
                    return;
                };
                globalLayers.selected_project = payload
                // console.log( globalLayers.selected_project, payload)
                toast.success(`The project setup has been successfully ${projectid ? "updated" : "saved"}`, { toastId: "customID" });
                if (!projectid) {
                    let projects: ProjectTy[] = []
                    if (user.projects?.length) {
                        projects = [...user.projects!, payload]
                    } else {
                        projects = [payload];
                    }
                    dispatch(setUserProjects(projects));
                }
                
                sessionStorage.setItem("projectid", payload.projectid);
                nextModal()
            }
        } catch (err) {
            console.log(err);
        }


        globalLayers.stopSketch()
    };
    const validateForm = (): boolean => {
        debugger
        let isValid = true;

        console.log("project setup",projectSetup)

        const errors: Record<string, string> = {};
        const isProjectNameExists = projects?.some((ele: any) => ele.projectname === projectSetup.projectname);
        const validations = [
            { field: "address", condition: !projectSetup.address, message: "Address is Required" },
            { field: "totalroofarea", condition: !projectSetup.totalroofarea, message: "Total Roof Area is Required" },
            { field: "totalroofarea", condition: projectSetup.totalroofarea !== undefined && (projectSetup.totalroofarea < MINUSEABLEAREA || projectSetup.totalroofarea > MAXUSEABLEAREA), message: `Total roof area must be between ${MINUSEABLEAREA} to ${MAXUSEABLEAREA} sq m` 
            },
            { field: "projectname", condition: !projectSetup.projectname, message: "Project name is Required" },
            { field: "projecttype", condition: !projectSetup.projecttype, message: "Project Type is Required" },
            { field: "sanctionload", condition: !projectSetup.sanctionload, message: "Sanction load is Required" }
        ];
        if (allDiscom.length > 0) {
            validations.push(
                { field: "providerid", condition: !projectSetup.providerid?.value, message: "Provider is Required" },
                { field: "consumercategoryid", condition: !projectSetup.consumercategoryid?.value, message: "Provider Type is Required" }
            );
        };
        for (const { field, condition, message } of validations) {
            if (condition) {
                errors[field] = message;
                isValid = false;
            }
        }
        if (Object.keys(errors).length > 0) {
            dispatch(setRoofDetailsError(errors));
        };
        if(Object.keys(error).length>0){
            isValid = false;
            Toast({messageText:"Information is missing or incorrect. Please update and try again.",messageType:"E",autoClose:3000,toastId:"formValidation"})
        }
        return isValid;
    };
    
    const handleFooterNxtBtn = async (btnTitle: btnTitleTypeCustomer) => {
        dispatch(toogleTooltip({ dipy: 0, istooltip: "", msg: "" }))
        switch (btnTitle) {
            case "Quick Plant Analysis": {
                if ((selected_project && selected_project.iscompleted === false) || selected_project === null) {
                    validateForm() && saveProjectDetails(selected_project?.projectid ?? "");
                } else {
                    const { inverter, module } = await fetchPANOND();
                    const { payload } = dispatch(setOndFiles({ inverter, module }));
                    if (payload) {
                        nextModal();
                    }
                }
                break;
            }
            /* case "Project Summary": {
                if (selected_project?.iscompleted) {
                    nextModal();
                    return;
                }
                try {
                    let reqBody = {
                        projectcost: quickplantAnalysis.costbracket.toString(),
                        yearlygensanctioned: quickplantAnalysis.electricityGenerated.toString(),
                        yearlygenusablearea: quickplantAnalysis.electricityGenerated2.toString(),
                        monthlyfinancialsavings: projectSummary.financial!.montlyFinancialSaving.toString(),
                        savingperiod: projectSummary.degradation!.savingperiod.toString(),
                        savingirr: projectSummary.degradation!.irr.toString(),
                        totaltreesplanted: Math.round(projectSummary.financial!.totalTrees).toString(),
                        carbonemission: Math.round(projectSummary.financial!.totalCarbonfootprint).toString(),
                        netsavings: Math.round(projectSummary.financial!.netsavings),
                        iscompleted: true
                    } as Pick<ProjectTy, 'projectcost' | 'yearlygensanctioned' | 'yearlygenusablearea' | 'monthlyfinancialsavings' | 'savingperiod' | 'savingirr' | 'totaltreesplanted' | 'carbonemission' | 'netsavings' | 'iscompleted'>;
                    const { payload } = await dispatch(saveConsumerProjects({ reqBody, projectid: selected_project?.projectid }));
                    if (typeof (payload) == 'object') {
                        nextModal();
                    }
                } catch (err: any) {
                    console.log(err, 'There was an issue. Please try again later.');
                    toast.error(err.response?.data.message ?? 'There was an issue. Please try again later.');
                }
                break;
            } */
            case "Project Summary": {
                if (selected_project?.installationmode) {
                    toast.info("An order has already been placed for this project.", { toastId: "" });
                    // toast.info("You have already placed an order for this existing Project.", { toastId: "" })
                    return;
                };
                dispatch(setModalHeaderFooter({ title: "Confirm The Action", btnTxt: "Proceed", secondaryBtnTxt: "" }));
                setIsConfimModal(true);
                break;
            };
            case "Proceed": {
                if (selected_project?.installationmode) {
                    toast.info("An order has already been placed for this project.", { toastId: "" });
                    // toast.info("You have already placed an order for this existing Project.", { toastId: "" })
                    navigate("/Consumer");  
                                   
                    return;
                };
                // validateForm() && saveProjectDetails(selected_project?.projectid ?? "");
                dispatch(setModalHeaderFooter({ title: "Confirm The Action", btnTxt: "Proceed", secondaryBtnTxt: "" }));
                setIsConfimModal(true);
                break;
            };
        };
    };

    const handleModalClick = async (title: string) => {

        if (modalTitle === "Confirm The Action" && title == "Confirm The Action") {
            if (selectedOption) {
                if(selectedOption === "Yes" && subsequentOption === undefined){
                    toast.error('Please select the Mode first',{ toastId: "customID"})
                    return;
                }
                if (selected_project) {
                    let reqBody = {
                        installationmode: subsequentOption === undefined ? null : subsequentOption,
                        iscompleted: true,
                        userid: user.userid,
                        carbonemission: projectSummary?.financial?.totalCarbonfootprint.toString(),
                        totaltreesplanted: projectSummary?.financial?.totalTrees.toString(),
                        projectcost: quickplantAnalysis.costbracket.toString(),
                        yearlygenusablearea: quickplantAnalysis.electricityGenerated?.toString(),
                        yearlygensanctioned: quickplantAnalysis.electricityGenerated2?.toString(),
                    } as any;
                    if(globalLayers.degradation){
                        reqBody.savingperiod = globalLayers.degradation.savingperiod.toString();
                        reqBody.savingirr = globalLayers.degradation.irr.toString();
                        reqBody.netsavings = globalLayers.degradation.netsavings;
                    }
                    if(globalLayers.financial){
                        reqBody.monthlyfinancialsavings = globalLayers.financial.montlyFinancialSaving.toString();
                    }
                    const { payload } = await dispatch(saveConsumerProjects({ reqBody, projectid: selected_project.projectid }));
                    if (payload) {
                        //  navigate("/Consumer");
                        window.location.href = '/Consumer'
                        dispatch(setCardTitle("My Projects"));
                        dispatch(toggleDrawer(false));
                        dispatch(setTitle(""));
                        dispatch(resetRoofAnalisis())
                    }
                }
            } else {
                // setIsConfimModal(false);
                toast.error("Please select an option for proceeding",{toastId:"abc"});
            }
        }
    };
    return (
        <>
            {isConfimModal && <NewModal name={"Big sun, big savings"} btnName={"Button Name"} onClick={handleModalClick} isAbleCLick={true} children={<ConfirmAction />} setIsCLose={setIsConfimModal} />}
            <div id="draweContainer" className="lsb-drawer">
                {Data && <Data.Component />}
                <div className="lsb-footer">
                    <Button id="nxtbtn" className="btn btn-md-primary w-full" name={Data?.btnTitle as btnTitleTypeCustomer} onClick={() => handleFooterNxtBtn(Data?.btnTitle as btnTitleTypeCustomer)} />
                </div>
            </div>
        </>
    )
}

export default CustomerDrawerContainer