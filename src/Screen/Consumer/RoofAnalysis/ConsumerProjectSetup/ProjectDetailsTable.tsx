import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Input, TableCheckBtn } from "../../../../Components/AllInput/AllInput";
import ReactSelect from "../../../../Components/New/Select/ReactSelect";
import { setCreatedId, setFormProjectSetup } from "../../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { TProjectTypesNew } from "../../../../ReduxTool/Slice/Consumer/types";
import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";
import { formatReactSelectOptions, newgeneratedId } from "../../../../Utils/commonFunctions";
import globalLayers from "../../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { fetchCompleteAddress, getCityFromCoordinates } from "../../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { MAXUSEABLEAREA, MINUSEABLEAREA } from "../../../../Utils/Const";
const InfoIconData = {
  title1: "Total Roof Area",
  content1: `"Total roof area" refers to the entire surface area of a roof on a building. It is the measure of the entire topmost covering of a structure, including all the slopes and angles.`,
  title2: "Total Usable Area",
  content2: `"Usable roof area" is the portion of the roof that can be effectively utilized for installation of solar panels. It excludes areas that may be obstructed or unsuitable for certain uses.`,
};
export default function ProjectDetailsTable({ projectSetup, handleChange }: { projectSetup: TProjectTypesNew; handleChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
  const dispatch = useAppDispatch();
  const { roofAnalysis: { formDetails: { projectSetup: { address, lat, lng, useablearea, totalroofarea, createdId },error }, selected_project, isWithRoof, obsArea, esriDraw }, projects } = useAppSelector((state) => state.consumerReducers);
  const { polygonDrawn } = useAppSelector((state) => state.drawer);
  const [isEditAdd, setIsEdit] = useState<boolean>(false)
  const handleEdit = () => {
    const srchFocus = document.getElementById("newaddress");
    setIsEdit(pre => {
      if (srchFocus && !pre) {
        srchFocus.focus();
      }
      return !pre
    });
  };

  const handleChanges = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "totalroofarea") {
      if(value && parseFloat(value)>MAXUSEABLEAREA){
        return toast.error(`Total roof area must be between ${MINUSEABLEAREA} to ${MAXUSEABLEAREA} sq m`,{toastId:"formValidation"});
      }
      let area = '0';
      // if (name === "totalroofarea") {
      globalLayers.totalroofArea = parseFloat(value);
      if (projectSetup.projecttype?.value === 'RCC Roof') {
        area = (parseFloat(value) * 0.7).toString();
      }
      if (projectSetup.projecttype?.value === 'Metal/Other Roof') {
        area = (parseFloat(value) * 0.9).toString();
      }
      dispatch(setFormProjectSetup({ ...projectSetup, [name]: parseFloat(value), useablearea: parseFloat(area) }))
    } else {
      dispatch(setFormProjectSetup({ ...projectSetup, totalroofarea: parseFloat(value) }))
    }
  };

  useEffect(() => {
    if (selected_project !== null) return;
    if (obsArea) {
      dispatch(setFormProjectSetup({ ...projectSetup, useablearea: parseFloat(obsArea), totalroofarea: parseFloat(obsArea), projecttype: null }));
    };
    if (polygonDrawn.length && obsArea) {
      getCityFromCoordinates(lng!, lat!).then((city: string) => {
        dispatch(setCreatedId(newgeneratedId(city)));

        fetchCompleteAddress(lat, lng, true).then((ele: any) => {
          setTimeout(() => {
            const inp = globalLayers.searchWidgetInput;
            if (inp && inp.container.querySelector(".esri-search__input") && ele) {
              inp.container.querySelector(".esri-search__input").value = ele;
            }
          }, 2000);

          dispatch(setFormProjectSetup({ ...projectSetup, address: ele, useablearea: parseFloat(obsArea), totalroofarea: parseFloat(obsArea), projecttype: null }));
        })
        // getAddressFromPinDropCoordinates(lng!, lat!).then((res) => {
        // const inp = globalLayers.searchWidgetInput;
        // if (inp && inp.container.querySelector(".esri-search__input") && address) {
        //   inp.container.querySelector(".esri-search__input").value = address;             
        // }
        // });
      });
    }
  }, [polygonDrawn, address, obsArea]);



  const roofTypes = [{ label: "RCC Roof", value: "RCC Roof" }, { label: "Metal/Other Roof", value: "Metal/Other Roof" }];
  

  const tableCaption = ['1.1 Project details of consumer'];
  const headers = ['Name', 'Details'];
  const data = [
    { id: '1', Name: `Project Address`, Details: projectSetup.address },
    { id: '2', Name: `Latitude`, Details: parseFloat(projectSetup.lat.toFixed(4)) },
    { id: '3', Name: `Longitude`, Details: parseFloat(projectSetup.lng.toFixed(4)) },
  ]
  return (
    <>
      <TableCheckBtn headers={headers} data={data} tableCaption={'1.1 Project details of consumer'}
      // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
      />
      <div className="main-section1 mt-4">
        <h4 className="para-lg">Site Details <span className="text-red-500">*</span></h4>
        <Input id={"Project Name"} label={`Project Name`} name={"projectname"} error={error?.projectname} value={projectSetup.projectname} type={"text"} onChange={handleChange} disabled={selected_project?.iscompleted} />
        <div className="grid grid-cols-2">
          <Input id={"Estimated Total Roof Area"} label={`Total Roof Area`} name={"totalroofarea"} error={error?.totalroofarea} value={projectSetup.totalroofarea.toString()} type={"number"} onChange={handleChanges} disabled={isWithRoof || selected_project?.iscompleted} suftext="sq m" />
          <Input id={"Sanctioned Load"} label={"Sanctioned Load"} error={error?.sanctionload} name={"sanctionload"} value={projectSetup.sanctionload!.toString()} type="number" onChange={handleChange} disabled={selected_project?.iscompleted} suftext="kVA" />
          <ReactSelect error={error.projecttype} onChange={handleChange} options={formatReactSelectOptions(roofTypes, { labelKey: "label", valueKey: "value" }, false)} value={projectSetup.projecttype} closeMenuOnSelect={true} labelname='Roof Type' name='projecttype' placeholder='Select an option ..' disabled={selected_project?.iscompleted} infoDetails={"contentlist.content2"} />
          
          {/* <SelectPicker disabled={selected_project?.iscompleted} onClick={handleClick} onChange={handleChange} value={projectSetup.projecttype} isFilter={false} id="projecttype" name="projecttype" labelname="Select Roof Type" data={roofTypes} isUpload={false} /> */}
          <div className="relative top-[2px]">
          <Input id={"Estimated Total Usable Area"} label={"Roof Area for Solar"} name={"useablearea"} error={error?.useablearea} value={projectSetup?.useablearea?.toFixed(2)} type={"number"} onChange={handleChanges} disabled={true} suftext="sq m" />
          </div>
        </div>
      </div>


      {/* <NewInput id={"Project Name"} labelname={"Project Name"} name={"projectname"} value={projectSetup.projectname} type={"text"} onChange={handleChange} star={true} icon={<IconInfo />} content={contentlist.content1}  disabled={selected_project?.iscompleted}/> */}
      {/* <div className="table-main">
        <div className="table-name">Project Details</div>
        <table className="table">
          <thead className="thead">
            <tr>
              <th className="hvalue">Name</th>
              <th className="hvalue">Details</th>
            </tr>
          </thead>
          <tbody>
            <tr className="trow group">
              <td className="rheading">Project Address</td>
              <td className="rvalue group flex justify-between w-full border-none" title={projectSetup.address}>
                <input
                  type="text"
                  id={"newaddress"}
                  name={"address"}
                  value={projectSetup.address!}
                  disabled={!isEditAdd}
                  onChange={handleChange}
                  className="dinput w-[95%]"
                />              
              </td>
            </tr>
           
            <tr className="trow">
              <td className="rheading">Latitude</td>
              <td className="rvalue">{parseFloat(projectSetup.lat.toFixed(4))}</td>
            </tr>
            <tr className="trow">
              <td className="rheading">Longitude</td>
              <td className="rvalue">{parseFloat(projectSetup.lng.toFixed(4))}</td>
            </tr>           
          </tbody>
        </table>
      </div> */}

      {/* <div className="h2"></div> */}
      {/* <NewInput
        id={"Estimated Total Roof Area"}
        labelname={`Estimated Total Roof Area (sq m)`}
        name={"totalroofarea"}
        value={projectSetup.totalroofarea }
        type={"number"}
        min="100"
        maxLength={MAXUSEABLEAREA}
        onChange={handleChanges}
        star={false}
        icon={<IconInfo />}
        content={InfoIconData.content1}
        disabled={isWithRoof || selected_project?.iscompleted}
      /> */}
      {/* <div className="h2"></div> */}
      {/* <NewInput
        id={"Estimated Total Usable Area"}
        labelname={"Estimated Total Usable Area (sq m)"}
        name={"useablearea"}
        value={parseFloat(projectSetup?.useablearea?.toFixed(2))}
        type={"number"}
        onChange={handleChanges}
        star={false}
        icon={<IconInfo />}
        content={InfoIconData.content2}
        disabled={true}
      /> */}
    </>
  );
}
