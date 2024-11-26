import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { ProjectTy } from "../../../../ReduxTool/Slice/Auth/types";
import { fetchFinanceby, fetchPANOND, fetchpVAPIMonthly, fetchpVAPIMonthlyCase2, generationdegradation } from "../../../../ReduxTool/Slice/Consumer/ConsumerActions";
import { setFormQuickPlantAnalysisData, setFromProjectSummeryData, setOndFiles } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { FileUplad, ProjectSummaryType, quickplantAnalysisType } from "../../../../ReduxTool/Slice/Consumer/types";
import { toogleTooltip } from "../../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";
import { baseURL, requestUrl } from "../../../../Utils/baseUrls";
import { APIResponse, coverageFactor, defaultmoduleLength, defaultmoduleWidth, voltagepermodule } from "../../../../Utils/Const";
import globalLayers from "../../../../Utils/CustomerMaps/Maps/GlobaLMap";
// import { fetchCountryNamefromLatLng } from "../../../../Utils/EPCMaps/Maps/LazyloadMap";
import { TableCheckBtn } from "../../../../Components/AllInput/AllInput";
import { fetchCountryNamefromLatLng } from "../../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { stringSizeObject } from "../../../../Utils/generateFormData";
import FinancialDetailsTable from "./FinancialDetailsTable";

export const cos_tooltipcontent = {
  content1: `A solar plant reduces carbon dioxide emissions through clean energy production. On average, each unit of solar energy prevents 0.7 kg of CO2 emissions and is equivalent to planting of 2 trees.`,
  content2: `The "cost of project" refers to the total expenses associated with planning, designing, procuring materials, installing, and commissioning a solar energy system.`,
  content3: `Total Electricity Generation is the overall amount of electrical energy produced within a specific time period, typically measured in megawatt-hours, reflecting the aggregate output from various power sources.`,
  content4: `Financial savings refer to the surplus or leftover funds that result from reducing expenses or increasing income, leading to a positive difference between income earned and money spent over a specified period.`,
}
// export const cos_tooltipcontent = {
//   content1: `A solar plant reduces carbon dioxide emissions through clean energy production. On average, each unit of solar energy prevents 0.7 kg of CO2 emissions and is equivalent to planting of 2 trees.`,
//   content2: `The consumer enters the Recommended Project Capacity., Max Plant Capacity = useable area×coverage factor×voltage per module/(module width×module length)×1000, Total Project Cost is based on the Recommended Plant Capacity.`,
//   content3: `Total Electricity Generation is the overall amount of electrical energy produced within a specific time period, typically measured in megawatt-hours, reflecting the aggregate output from various power sources.`,
//   content4: `Financial savings refer to the surplus or leftover funds that result from reducing expenses or increasing income, leading to a positive difference between income earned and money spent over a specified period.`,
// }
const QuickPlantAnalysis = () => {
  const dispatch = useAppDispatch();
  const { roofAnalysis: { selected_project, formDetails: { quickplantAnalysis, projectSummary, projectSetup: { lat, lng, electricityrate, sanctionload, plantcapacity, useablearea } }, isWithRoof }, ondFiles } = useAppSelector((state) => state.consumerReducers);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { title } = useAppSelector(state => state.drawer)
  const { isToolTip } = useAppSelector((state) => state.mapref);
  const { user } = useAppSelector(state => state.auth);

  const headersCP = ['Name', 'Details'];
  const dataCP = [
    { id: '1', Name: `Recommended Project Capacity (based on sanctioned load)`, Details: `${sanctionload} kWp` },
    { id: '2', Name: `Max Plant Capacity (as per roof area)`, Details: `${plantcapacity} kWp` },
    { id: '3', Name: `Est. Total Cost of Project (without subsidy as per sanctioned load)`, Details: `${user.country_mstr?.currancysymbol} ${quickplantAnalysis.costbracket}` },
  ]
  const headersTEG = ['Name', 'Details'];
  const dataTEG = [
    { id: '1', Name: `Monthly Generation (as per usable roof area)`, Details: `${isLoading ? '...loading' : `${(quickplantAnalysis.electricityGenerated / 12)?.toFixed(2)} kWh`}` },
    { id: '2', Name: `Annual Generation (as per usable roof area)`, Details: `${isLoading ? '...loading' : `${quickplantAnalysis.electricityGenerated ? parseFloat(quickplantAnalysis.electricityGenerated)?.toFixed(2) : 0} kWh`}` },
    { id: '3', Name: `Monthly Generation (as per sanctioned load)`, Details: `${isLoading ? '...loading' : `${quickplantAnalysis.electricityGenerated2 ? (quickplantAnalysis.electricityGenerated2 / 12).toFixed(2) : 0} kWh`}` },
    { id: '4', Name: `Annual Generation (as per sanctioned load)`, Details: `${isLoading ? '...loading' : `${quickplantAnalysis.electricityGenerated2 ? parseFloat(quickplantAnalysis.electricityGenerated2)?.toFixed(2) : 0} kWh`}` },
  ]
  useEffect(() => {

    if (title === "quickplantanalysis") {
      if (selected_project && selected_project.iscompleted) {
        bindQuickPlantData(selected_project)
      } else {
        if (ondFiles) {
          getGenerationData(ondFiles)
        } else {
          fetchONDFiles();
        };
      }
    }
  }, [title]);
  const fetchONDFiles = async () => {
    try {
      const { inverter, module } = await fetchPANOND();
      const { payload } = dispatch(setOndFiles({ inverter, module }));
      if (payload) {
        getGenerationData(payload);
      }
    } catch (err) {
      console.log(err, "There was an issue in fetch ondLine. Please try again later.");
    }
  };
  const bindQuickPlantData = async (projectDetails: ProjectTy) => {
    try {
      const updatedQuickProject = {
        environmentalImpact: { carbonFootProint: projectDetails?.carbonemission, treesPlanted: projectDetails?.totaltreesplanted },
        costbracket: projectDetails!.projectcost,
        electricityGenerated: projectDetails?.yearlygensanctioned,
        electricityGenerated2: projectDetails?.yearlygenusablearea,
      } as quickplantAnalysisType;
      const updatedProjectSummaryProject: ProjectSummaryType = {
        financial: {
          montlyFinancialSaving: parseFloat(projectDetails?.monthlyfinancialsavings!),
          yearlyFinancialSaving: projectDetails?.yearlyelectricbill,
          totalTrees: parseFloat(projectDetails?.totaltreesplanted!),
          netsavings: projectDetails?.netsavings!,
          totalCarbonfootprint: parseFloat(projectDetails?.carbonemission!),
        },
        degradation: {
          irr: parseFloat(projectDetails?.savingirr!),
          savingperiod: parseFloat(projectDetails?.savingperiod!)
        }
      }
      dispatch(setFormQuickPlantAnalysisData(updatedQuickProject));
      dispatch(setFromProjectSummeryData(updatedProjectSummaryProject));
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  const getGenerationData = async (data: FileUplad) => {
    if (sanctionload === 0) {
      toast.error('Project is not selected.');
      return;
    }
    // console.log(new Date().getMilliseconds(), 'start')
     
    const btn = document.getElementById('nxtbtn')
    if(btn){
      (btn as HTMLButtonElement).disabled = true;
      // (btn as HTMLButtonElement).innerText = 'Loading'
    }
    if(document.getElementById("loading")){
      document.getElementById("loading")!.className = "loading active";
  }
    try {
      const { inverter, module } = data;
      const noOfModules = Math.round((sanctionload * 1000) / parseInt(module.electrical[4].value));
      const formData = stringSizeObject({ inverter, module });
      const promises = [
        fetchCountryNamefromLatLng(lat ?? 0, lng ?? 0),
        baseURL.post(requestUrl.getconvStringData, formData),
      ];
      const [countryNameResponse, apiResponse] = await Promise.all(promises);
      const { data: res }: AxiosResponse<APIResponse<any>> = apiResponse;
      if (res?.code === "200") {
        const modulePerString = res.responseData.stringCount;
        let plantCap = 0;
        if(selected_project){
          plantCap = selected_project.plantcapacity
        } else {
          plantCap = Math.round((useablearea * coverageFactor * voltagepermodule) / ((defaultmoduleWidth * defaultmoduleLength) * 1000));
        }
        const newObj = {
          data,
          noOfString: Math.round(noOfModules / modulePerString),
          totalSanctionLoad: plantCap,
          modulePerString,
          loadVal: true,
          lat,
          lng,
          india: countryNameResponse ? countryNameResponse.toUpperCase() === "INDIA" ? true : false : false
        };


        // Function to introduce a delay
        const delay = (ms: any) => new Promise(resolve => setTimeout(resolve, ms));

        const generationPromises = [
          await dispatch(fetchpVAPIMonthlyCase2({
            ...newObj,
            totalSanctionLoad: sanctionload,
            loadVal: false,
            noOfString: (globalLayers.totaltableCount! / modulePerString)
          }))
        ];

        // Adding a 2-second delay before the second fetch
        await delay(2000);

        generationPromises.push(await dispatch(fetchpVAPIMonthly(newObj)));

        const [genResponse, gen2Response] = await Promise.all(generationPromises);
        if (genResponse.payload) {
          await getFinanceby(JSON.parse(genResponse.payload)['Annual AC energy in Year 1']);
        }
      } else {
        throw new Error("There was an issue to fetch conventional. Please try again later.");
      }
    } catch (err: any) {
      // console.error(err);
      const errorMessage = err.response?.data?.message ?? err.message ?? "There was an issue to fetch generation. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      // console.log(new Date().getMilliseconds(), 'end')
      const btn = document.getElementById("nxtbtn");
      if (btn) {
        (btn as HTMLButtonElement).disabled = false;
        // (btn as HTMLButtonElement).innerText = 'Proceed'
      }
    }
  };

  const getFinanceby = async (yearly: number) => {
    const gb = globalLayers;
    let project: ProjectTy | null = selected_project;
    if(!project){
      project = globalLayers.selected_project;
    }
    try {
      const monthlyAverage = yearly / 12;
      const { payload } = await dispatch(fetchFinanceby({
        projectid: project?.projectid!,
        electricityrate: project?.electricityrate!,
        monthlyGeneration: monthlyAverage,
        sanctionLoad: project?.sanctionload!
      }));
      if (payload) {
        globalLayers.financial = payload

        return getdegradation(payload, yearly); // Return the promise from getdegradation
      }
      else globalLayers.financial = null
    } catch (err: any) {
      console.error(err);
      globalLayers.financial = null
    }
  };

  const getdegradation = async (financial: any, electricityGenerated2: any) => {
    try {
      if (financial.montlyFinancialSaving) {
        const degradeObj = {
          sanctionLoad: selected_project?.sanctionload,
          yearlyGeneration: electricityGenerated2,
          onm: 0.5,
          discountRate: 7,
          plantCapacity: selected_project?.sanctionload,
          totalplantCost: Number(quickplantAnalysis.costbracket) && Number(quickplantAnalysis.costbracket),
          debtPercentage: 70,
          debtTenor: 15,
          debtInterestRate: 9,
          equityReturn: 11,
          electicityRate: electricityrate,
        };
        const { payload } = await dispatch(generationdegradation(degradeObj)); // Ensure this returns a promise
        if(payload && typeof(payload) === 'object'){
          globalLayers.degradation = payload
        } else {
          globalLayers.degradation = null
        }
      }
    } catch (err: any) {
      console.error(err);
    }
  };

  const showTooltip = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, name: string, msg: number) => {
    // console.log("isToolTip.istooltip===name",isToolTip.istooltip===name,isToolTip.istooltip,name)
    if (isToolTip.istooltip === name) {
      dispatch(toogleTooltip({ dipy: 0, istooltip: "", msg: "" }))
    } else {

      dispatch(toogleTooltip({ dipy: event.clientY, istooltip: name, msg: cos_tooltipcontent[`content${msg}` as keyof object] }));
    }
  };






  return (
    <>
      {/* {isToolTip.istooltip&& <InfomationContent  displayDrawer={displayDrawer} isToolTip={isToolTip}/>} */}
      <div className="lsb-body">
        {/* Environmental Impact */}
        <div className="main-section1">
          <h4 className="heading heading-sm">Environmental Impact</h4>
          <div className="flex flex-col gap-4">
            <div className="flex items-stretch gap-4">
              <img src={require("../../../../assests/img/Customer/carbon-footprint-primary.png")} alt="" className="w-16 object-contain" />
              <div>
                <h3 className="para-lg">{isLoading ? '...loading' : Math.round(projectSummary?.financial?.totalCarbonfootprint ?? 0)}&nbsp;tons/year</h3>
                <p className="para-sm pt-1 text-gray-600">
                  Your solar system is a carbon-cutting champion! Keep up the good work, eco-warrior!
                </p>
              </div>
            </div>
            <div className="flex items-stretch gap-4">
              <img src={require("../../../../assests/img/Customer/plant-primary.png")} alt="" className="w-16 object-contain" />
              <div>
                <h3 className="para-lg">{isLoading ? '...loading' : Math.round(projectSummary?.financial?.totalTrees ?? 0)} Lifetime Planting</h3>
                <p className="para-sm pt-1 text-gray-600">
                  Your solar system is a tree-planting powerhouse! Keep up the good work, eco-friend!
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cost of Plant */}
        <div className="main-section1">
          <h4 className="heading heading-sm">Cost of Project</h4>
          <TableCheckBtn headers={headersCP} data={dataCP}
          // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
          />
        </div>

        {/* Total Electricity Generation */}
        <div className="main-section1">
          <h4 className="heading heading-sm">Total Electricity Generation</h4>
          <TableCheckBtn headers={headersTEG} data={dataTEG}
          // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
          />
        </div>


        {/* Financial Savings */}
        <div className="main-section1">
          <h4 className="heading heading-sm">Financial Savings</h4>
          <FinancialDetailsTable />
        </div>
        {/* <div className="drawer-main">
          <div className="drawer-section">
            <div className="w-full flex justify-between items-center ">
              Cost of Project
              <button className="cursor-pointer group relative" onClick={(e) => showTooltip(e, "Cost of Project", 2)} >
                <IconInfo />
              </button>
            </div>
          </div>
          <div className="section-body">
            <PlantDetailsTable />
          </div>
        </div> */}

        {/* <div className="drawer-main">
          <div className="drawer-section">
          <div className="w-full flex justify-between items-center ">
          Total Electricity Generation
          <button className="cursor-pointer" onClick={(e) => showTooltip(e, "Total Electricity Generation", 3)}><IconInfo /></button>
          </div>
          </div>
          <div className="section-body">
          <div className="table-main">
          <table className="table">
          <thead className="thead"><tr><th className="hvalue">Name</th><th className="hvalue">Details</th></tr></thead>
          <tbody>
          <tr className="trow">
          <td className="rheading"><span>Monthly Generation</span><br /><span className="text-1xl">(as per usable roof area)</span></td>
          <td className="rvalue">{isLoading ? '...loading' : `${(quickplantAnalysis.electricityGenerated / 12)?.toFixed(2)} kWh`}
          </td>
          </tr>
          <tr className="trow">
          <td className="rheading"><span>Annual Generation</span><br /><span className="text-1xl">(as per usable roof area)</span></td>
          <td className="rvalue">
          {isLoading ? '...loading' : `${quickplantAnalysis.electricityGenerated ? parseFloat(quickplantAnalysis.electricityGenerated)?.toFixed(2) : 0} kWh`}
          </td>
          </tr>
          <tr className="trow">
          <td className="rheading"><span>Monthly Generation</span><br /><span className="text-1xl">(as per sanctioned load)</span></td>
          <td className="rvalue">
          {isLoading ? '...loading' : `${quickplantAnalysis.electricityGenerated2 ? (quickplantAnalysis.electricityGenerated2 / 12).toFixed(2) : 0} kWh`}
          </td>
          </tr>
          <tr className="trow">
          <td className="rheading"><span>Annual Generation</span><br /><span className="text-1xl">(as per sanctioned load)</span></td>
          <td className="rvalue">
          {isLoading ? '...loading' : `${quickplantAnalysis.electricityGenerated2 ? parseFloat(quickplantAnalysis.electricityGenerated2)?.toFixed(2) : 0} kWh`}
          </td>
          </tr>
          </tbody>
          </table>
          </div>
          </div>
          </div> */}

        {/* <div className="drawer-main">
          <div className="drawer-section">
            <div className="w-full flex justify-between items-center ">Financial Savings
              <button className="cursor-pointer" onClick={(e) => showTooltip(e, "Financial Savings", 4)}><IconInfo /></button>
            </div>
          </div>
          <div className="section-body">
            <FinancialDetailsTable />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default QuickPlantAnalysis;
