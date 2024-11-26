import { useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "../../../../Components/AllInput/AllInput";
import ReactSelect from "../../../../Components/New/Select/ReactSelect";
import { ProjectTy } from "../../../../ReduxTool/Slice/Auth/types";
import { getStateDiscom, getTerrifData } from "../../../../ReduxTool/Slice/CommonReducers/CommonActions";
import { IallTypestate, ITariffType } from "../../../../ReduxTool/Slice/CommonReducers/types";
import { calcTariffRate, getCostBracket } from "../../../../ReduxTool/Slice/Consumer/ConsumerActions";
import { setCountryName, setFormProjectSetup, setProjectName, setRegionName, setRoofDetailsError } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";
import globalLayers from "../../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { fetchCountryNamefromLatLng, getStateFromCoordinates } from "../../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { filterKeyIncludeArr, formatReactSelectOptions, getElementByIndex, useDebounce } from "../../../../Utils/commonFunctions";
import ProjectDetailsTable from "./ProjectDetailsTable";
 
const CustomerProjectSetup = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.auth);
  const { roofAnalysis: { formDetails: { projectSetup, error }, selected_project } } = useAppSelector(state => state.consumerReducers);
  const { allDiscom, providertype } = useAppSelector((state) => state.commonReducers);
  const { user: { projects } } = useAppSelector(state => state.auth);
  useEffect(() => {
    !selected_project && bindInitalData()
  }, [projectSetup.lat, projectSetup.lng]);
  useEffect(() => {
    if (selected_project && selected_project.projectid) {
      bindProjectSetupData(selected_project);
      if (globalLayers.indiLayers) {
        globalLayers.indiLayers.removeAll()
        globalLayers.map?.remove(globalLayers.indiLayers);
      }
    }
  }, [selected_project]);
 
  const bindInitalData = async () => {
    const stName = await getStateFromCoordinates(projectSetup.lng, projectSetup.lat);
    const countryName = await fetchCountryNamefromLatLng(projectSetup.lat, projectSetup.lng);
    await dispatch(getStateDiscom(stName));
    dispatch(setCountryName(countryName!));
    dispatch(setRegionName(stName));
    dispatch(setProjectName(`PvNxtFP0${projects?.length ?? 0}`));
    bindMapInputAdress(projectSetup.address);
  };
  const bindProjectSetupData = async (projectDetails: ProjectTy) => {
    try {
      const stName = await getStateFromCoordinates(projectDetails.lng, projectDetails.lat);
      const countryName = await fetchCountryNamefromLatLng(projectDetails.lat, projectDetails.lng);
      dispatch(setCountryName(countryName!));
      dispatch(setRegionName(stName));
      bindMapInputAdress(projectDetails.address);
 
      const { payload: allDiscom } = await dispatch(getStateDiscom(stName));
      const { payload: providertype } = await dispatch(getTerrifData((projectDetails.providerid as any)))
      await updateFromDetails(projectDetails,allDiscom,providertype);
    } catch (err: any) {
      console.log(err);
      toast.error(err);
    };
  };
  const bindMapInputAdress = async (address: string) => {
    setTimeout(() => {
      const inp = globalLayers.searchWidgetInput;
      if (inp && inp.container.querySelector(".esri-search__input") && address) {
        inp.container.querySelector(".esri-search__input").value = address;
        if (selected_project?.iscompleted) {
          inp.container.querySelector(".esri-search__input").disabled = true;
        }
      }
    }, 2000);
  };
 
  const updateFromDetails = async (projectDetails: ProjectTy,discom:IallTypestate[],providertype:ITariffType[]) => {
    const providerid = projectDetails.providerid ? { label: getElementByIndex(filterKeyIncludeArr(discom, "providerid", (projectDetails.providerid as any)), 0, "providername"), value: (projectDetails.providerid as any) } : null;
    const consumercategoryid =  projectDetails.consumercategoryid ? { label: getElementByIndex(filterKeyIncludeArr(providertype, "consumercategoryid", (projectDetails.consumercategoryid as any)), 0, "consumercategoryname"), value: (projectDetails.consumercategoryid as any) } : null;
    dispatch(setFormProjectSetup({
      ...projectSetup,
      address: projectDetails.address,
      projectname: projectDetails.projectname,
      projectid: projectDetails.projectid,
      lat: projectDetails.lat,
      lng: projectDetails.lng,
      electricityrate: projectDetails?.electricityrate,
      sanctionload: projectDetails?.sanctionload,
      useablearea: projectDetails.projecttype?.value === "RCC Roof" ? projectDetails.useablearea : projectDetails.useablearea,
      totalroofarea: projectDetails.totalroofarea,
      providerid ,
      consumercategoryid,
      projecttype: {label:(projectDetails.projecttype as any),value:(projectDetails.projecttype as any)},
      plantcapacity: projectDetails.plantcapacity,
      monthlyunit: projectDetails.monthlyunit !== null ? projectDetails.monthlyunit : 0
     
    }));
  };
 
  const getElectricRate = async (providerid: string, sanctionload: number, consumercategoryid: string) => {
    if (providerid && sanctionload && consumercategoryid) {
      try {
        const reqBody = {sanctionload,providerid,consumercategoryid};
        await dispatch(calcTariffRate(reqBody));
      } catch (err: any) {
        console.log(err);
        toast.error("There was an issue to fetch electricity rate. Please try again later.");
      }
    }
  };
 
  const debouncedGetElecticRate = useDebounce((sanctionload, providerid, consumercategoryid) => (sanctionload && providerid && consumercategoryid) && getElectricRate(providerid, sanctionload, consumercategoryid),1000);
  const debouncedGetCostBracket = useDebounce((value: number) => dispatch(getCostBracket(value)),300);
 
  const updateErrorFields = (fieldNames: string[]) => {
    let updatedErrors = { ...error };
    for (let fieldName of fieldNames){
      if (updatedErrors[fieldName]) {
        delete updatedErrors[fieldName];
        updatedErrors = {...updatedErrors};
      };
    }
    dispatch(setRoofDetailsError(updatedErrors));
  };
 
  const handleChange = async (props: any, selectedOption?: any) => {
    let { name, value } = props?.target ?? props;
    if (selectedOption) {
      name = selectedOption.name;
      value = props;
    };
    if (name==="monthlyunit" && value.length>10){
          return
    }
    let projectsetup = { ...projectSetup, [name]: value ?? props! };
    let errorFields = [name];
    if (name === "projecttype") {
      let area = "0";
      if (projectSetup.totalroofarea) {
        if (value.value === "RCC Roof") {
          if (projectSetup.totalroofarea > 0) {
            area = (projectSetup.totalroofarea * 0.7).toString();
          }
        }
        if (value.value === "Metal/Other Roof") {
          if (projectSetup.totalroofarea > 0) {
            area = (projectSetup.totalroofarea * 0.9).toString();
          }
        }
        projectsetup.useablearea = parseFloat(area);
      };
    } else if (name === 'sanctionload' && value) {
      if (parseInt(value) <= (projectsetup.totalroofarea / 10)) {
        projectsetup.consumercategoryid = null;
        parseInt(value) > 1 && debouncedGetCostBracket(parseInt(value));
      } else {
        // dispatch(setRoofDetailsError({...error,'santionload':`Value should be less than ${parseInt((projectsetup?.totalroofarea / 10).toString())} as per total roof area.`}))
        // return
        return toast.error(`Sanction load should be less than ${parseInt((projectsetup?.totalroofarea / 10).toString())} as per total roof area.`, { toastId: "customID", autoClose: 2500 });
      }
    } else if (name === "providerid") {
      dispatch(getTerrifData(value.value));
      projectsetup.consumercategoryid = null;
      projectsetup.electricityrate = 0;
    } else if (name === "consumercategoryid") {
      if (projectSetup.sanctionload > 20 && value.label === "Domestic") {
        dispatch(setRoofDetailsError({...error,['sanctionload']:`sanction load must be less than 20 for domestic`}));
        dispatch(setFormProjectSetup(projectsetup));
      return; 
      }else if(projectSetup.sanctionload>0 && name === "consumercategoryid"){

        let electricalRender = ['providerid', 'sanctionload', 'consumercategoryid']
    if (electricalRender.includes(name)) {
      debouncedGetElecticRate(projectsetup.sanctionload, projectsetup.providerid?.value, projectsetup.consumercategoryid?.value);
    }
      }
      dispatch(setFormProjectSetup(projectsetup));
      updateErrorFields([name,'sanctionload']);
      return
    }
    let electricalRender = ['providerid', 'sanctionload', 'consumercategoryid']
    if (electricalRender.includes(name)) {
      debouncedGetElecticRate(projectsetup.sanctionload, projectsetup.providerid?.value, projectsetup.consumercategoryid?.value);
    }
    dispatch(setFormProjectSetup(projectsetup));
    updateErrorFields(errorFields);
  };

  
 
  return (
    <div className="lsb-body">
      <ProjectDetailsTable projectSetup={projectSetup} handleChange={handleChange} />
      <div className="main-section1 mt-4">
        <h4 className="para-lg">Discom Details <span className="text-red-500">*</span></h4>
        {allDiscom.length > 0 && <>
          <ReactSelect onChange={handleChange} options={formatReactSelectOptions(allDiscom, { labelKey: "providername", valueKey: "providerid" }, false)} value={projectSetup.providerid!} closeMenuOnSelect={true} key='providerid' labelname='Discom Provider' name='providerid' placeholder="Select an option .." disabled={selected_project?.iscompleted} error={error.providerid} />
          <ReactSelect onChange={handleChange} options={formatReactSelectOptions(providertype, { labelKey: "consumercategoryname", valueKey: "consumercategoryid" }, false)} value={projectSetup.consumercategoryid!} closeMenuOnSelect={true} key='consumercategoryid' labelname='Discom Provider Type' placeholder="Select an option .." name='consumercategoryid' disabled={selected_project?.iscompleted} error={error.consumercategoryid} />
        </>}
        <div className="grid grid-cols-2">
          {!selected_project?.iscompleted && <Input suftext="units" id={"monthlyUnit"} label={"Monthly Unit"} name={"monthlyunit"} value={projectSetup.monthlyunit!.toString()} type="number" onChange={handleChange} />}
          <Input id={"electricityrate"} suftext={`${user.country_mstr?.currancysymbol}`} label={`Per unit electricity rate`} name={"electricityrate"} value={projectSetup.electricityrate.toString()} type={"number"} onChange={handleChange} disabled={selected_project?.iscompleted} error={error.electricityrate} />
 
        </div>
      </div>
    </div>
  );
};
export default CustomerProjectSetup