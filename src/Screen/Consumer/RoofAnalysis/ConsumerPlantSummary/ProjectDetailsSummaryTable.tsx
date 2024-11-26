import { TableCheckBtn } from "../../../../Components/AllInput/AllInput";
import { useAppSelector } from "../../../../ReduxTool/store/hooks";

export default function ProjectDetailsSummaryTable() {
  const { obsArea, esriDraw } = useAppSelector(state => state.consumerReducers.roofAnalysis)
  const { selected_project, formDetails: { projectSetup: { createdId, totalroofarea, useablearea, lat, lng, address, projectname, electricityrate, sanctionload } } } = useAppSelector((state) => state.consumerReducers.roofAnalysis);
  const headersPD = ['Name', 'Details'];
  const dataPD = [
    { id: '1', Name: `Project Name`, Details: `${selected_project !== null ? selected_project.projectname : (projectname && projectname) || "-"}` },
    { id: '2', Name: `Project Address`, Details: `${selected_project !== null ? selected_project.address : (address && address) || "-"}` },
    { id: '3', Name: `Project Unique ID`, Details: `${selected_project !== null ? selected_project.projectid : (createdId && createdId) || "-"}` },
    { id: '4', Name: `Latitude`, Details: `${selected_project !== null ? selected_project.lat!.toFixed(7) : (lat && lat.toFixed(7)) || "-"}` },
    { id: '5', Name: `Longitude`, Details: `${selected_project !== null ? selected_project.lng!.toFixed(7) : (lng && lng.toFixed(7)) || "-"}` },
    { id: '6', Name: `Total Roof Area`, Details: `${selected_project !== null ? selected_project.totalroofarea!.toFixed(2) : (totalroofarea ? totalroofarea.toFixed(2) : (obsArea ? parseFloat(obsArea[0]).toFixed(2) : "-"))} sq m` },
    { id: '7', Name: `Usable Area`, Details: `${selected_project !== null ? selected_project.useablearea!.toFixed(2) : (useablearea ? useablearea.toFixed(2) : (obsArea ? parseFloat(obsArea[0]).toFixed(2) : "-"))} sq m` },
    { id: '8', Name: `Type of Roof`, Details: `${selected_project !== null ? selected_project.projecttype : "-"}` },
    { id: '9', Name: `Sanctioned Load`, Details: `${selected_project !== null ? selected_project.sanctionload : (sanctionload && sanctionload) || "-"} kVA` },
    { id: '10', Name: `Electricity Rate`, Details: `${selected_project !== null ? selected_project.electricityrate : (electricityrate && electricityrate) || "-"}` },
  ]
  return (

    <TableCheckBtn headers={headersPD} data={dataPD}
    // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
    />

    //      <div className="table-main">
    //   <div className="table-name">Project Details</div>
    //   <table className="table">
    //     <thead className="thead">
    //       <tr>
    //         <th className="hvalue">Name</th>
    //         <th className="hvalue">Details</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       <tr className="trow">
    //         <td className="rheading">Project Name</td>
    //         <td className="rvalue">{" "}
    //           {selected_project !== null
    //             ? selected_project.projectname
    //             : (projectname && projectname) || "-"}
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Project Address</td>
    //         <td className="rvalue">
    //           {selected_project !== null
    //             ? selected_project.address
    //             : (address && address) || "-"}
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Project Unique ID</td>
    //         <td className="rvalue">
    //           {" "}
    //           {selected_project !== null
    //             ? selected_project.projectid
    //             : (createdId && createdId) || "-"}
    //         </td>          
    //       </tr>         
    //       <tr className="trow">
    //         <td className="rheading">Latitude</td>
    //         <td className="rvalue">
    //           {" "}
    //           {selected_project !== null
    //             ? selected_project.lat!.toFixed(7)
    //             : (lat && lat.toFixed(7)) || "-"}
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Longitude</td>
    //         <td className="rvalue">
    //           {selected_project !== null
    //             ? selected_project.lng!.toFixed(7)
    //             : (lng && lng.toFixed(7)) || "-"}
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Total Roof Area</td>
    //         <td className="rvalue">            
    //             {selected_project !== null ? selected_project.totalroofarea!.toFixed(2): (totalroofarea ? totalroofarea.toFixed(2) : (obsArea ? parseFloat(obsArea[0]).toFixed(2) : "-"))} sq m
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Usable Area</td>
    //         <td className="rvalue">
    //             {selected_project !== null ? selected_project.useablearea!.toFixed(2) : (useablearea ? useablearea.toFixed(2) : (obsArea ? parseFloat(obsArea[0]).toFixed(2) : "-"))} sq m
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Type of Roof</td>
    //         <td className="rvalue">
    //         {selected_project !== null? selected_project.projecttype: "-"}
    //         </td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Sanctioned Load</td>
    //         <td className="rvalue">
    //           {selected_project !== null ? selected_project.sanctionload : (sanctionload && sanctionload) || "-"}{" "} kVA
    //         </td>
    //       </tr>
    //       {
    //         <tr className={`trow ${selected_project?.electricityrate === 0 || electricityrate === 0 ? "hidden" : ""} `}>
    //           <td className="rheading">Electricity Rate </td>
    //           <td className="rvalue">

    //             {selected_project !== null ? selected_project.electricityrate : (electricityrate && electricityrate) || "-"}
    //           </td>
    //         </tr>
    //       }         
    //     </tbody>
    //   </table>

    // </div>
  );
}
