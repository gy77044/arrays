import { useAppDispatch, useAppSelector } from "../../../../ReduxTool/store/hooks";

export default function GenerationDetailsTable() {
  const {isLoading,roofAnalysis:{formDetails:{quickplantAnalysis:{electricityGenerated, electricityGenerated2}}}} = useAppSelector((state) => state.consumerReducers);
  console.log(electricityGenerated,electricityGenerated2,`${(electricityGenerated / 12)?.toFixed(2)} kWh`);
  
  return (
    <div className="table-main">
      <table className="table">
        <thead className="thead"><tr><th className="hvalue">Name</th><th className="hvalue">Details</th></tr></thead>
        <tbody>
          <tr className="trow">
            <td className="rheading"><span>Monthly Generation</span><br /><span className="text-1xl">(as per usable roof area)</span></td>
            <td className="rvalue">{isLoading?'...loading':electricityGenerated !=='' ? `${(electricityGenerated / 12)?.toFixed(2)} kWh`:'-'}
              </td> 
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Annual Generation</span><br /><span className="text-1xl">(as per usable roof area)</span></td>
            <td className="rvalue">            
               {isLoading?'...loading':electricityGenerated?`${parseFloat(electricityGenerated).toFixed(2)} kWh`:'-'}
            </td> 
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Monthly Generation</span><br /><span className="text-1xl">(as per sanctioned load)</span></td>
            <td className="rvalue">             
              {isLoading?'...loading':electricityGenerated2?`${( electricityGenerated2 / 12)?.toFixed(2)} kWh`:'-'}
            </td> 
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Annual Generation</span><br /><span className="text-1xl">(as per sanctioned load)</span></td>
            <td className="rvalue">             
              {isLoading?'...loading':electricityGenerated2?`${parseFloat(electricityGenerated2).toFixed(2)} kWh`:'-'}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
