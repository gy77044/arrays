import { useAppSelector } from "../../../../ReduxTool/store/hooks";

export default function PlantDetailsTable() {
  const { roofAnalysis:{formDetails:{quickplantAnalysis,projectSetup},selected_project},isLoading } = useAppSelector((state) => state.consumerReducers);
  const {user} = useAppSelector(state=>state.auth);
  return (
    <div className="table-main">
      <table className="table">
        <thead className="thead">
          <tr><th className="hvalue">Name</th><th className="hvalue">Details</th></tr>
        </thead>
        <tbody>
          <tr className="trow">
            <td className="rheading"><span>Recommended Project Capacity</span><br /><span className="text-1xl">(based on sanctioned load)</span></td>
            <td className="rvalue">{`${projectSetup.sanctionload} kWp`}</td>
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Max Plant Capacity</span><br /><span className="text-1xl">(as per roof area)</span></td>
            <td className="rvalue">{`${projectSetup.plantcapacity} kWp`}</td>
          </tr>
          <tr className="trow">
            <td className="rheading">
              <span>Est. Total Cost of Project</span><br />
              <span className="text-1xl">(without subsidy as per sanctioned load)</span>
            </td>
            <td className="rvalue">{user.country_mstr?.currancysymbol} {quickplantAnalysis.costbracket}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
