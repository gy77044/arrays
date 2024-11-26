import { TableCheckBtn } from "../../../../Components/AllInput/AllInput";
import {  useAppSelector } from "../../../../ReduxTool/store/hooks";
export default function FinancialDetailsTable() {
  const { user: { country_mstr } } = useAppSelector(state => state.auth);
  const { roofAnalysis: { formDetails: { projectSummary, quickplantAnalysis } }, isLoading } = useAppSelector((state) => state.consumerReducers);

  const headersFDT = ['Name', 'Details'];
  const dataFDT = [
    { id: '1', Name: `Monthly Gross Saving/Net Saving`, Details: `${isLoading ? '...loading' : `${country_mstr?.currancysymbol} ${((projectSummary?.financial?.montlyFinancialSaving??0 / country_mstr?.currencyrate!)?.toFixed(2))} / ${country_mstr?.currancysymbol} ${(projectSummary.financial?.netsavings??0 / country_mstr?.currencyrate!).toFixed(2)}`}` },
    { id: '2', Name: `Annual Savings`, Details: `${isLoading ? '...loading' : `${country_mstr?.currancysymbol} ${(((projectSummary?.financial?.montlyFinancialSaving??0) * 25) / country_mstr?.currencyrate!).toFixed(2)}`}` },
    { id: '3', Name: `Lifetime Savings (25yrs)`, Details: `${isLoading ? '...loading' : `${country_mstr?.currancysymbol} ${(((projectSummary?.financial?.montlyFinancialSaving??0) * 12) * 25 / country_mstr?.currencyrate!).toFixed(2)}`}` },
    { id: '4', Name: `Payback Period`, Details: `${isLoading ? "...loading" : `${Math.round(projectSummary?.degradation?.savingperiod??0)} years`}` },
    { id: '5', Name: `Pre-tax IRR`, Details: `${isLoading ? "...loading" : `${Math.round(projectSummary?.degradation?.irr??0)} %`}` },
  ]
  return (
    // <div className="table-main">
    //   <table className="table">
    //     <thead className="thead">
    //       <tr><th className="hvalue">Name</th><th className="hvalue">Details</th></tr>
    //     </thead>
    //     <tbody>
    //       <tr className="trow">
    //         <td className="rheading">Monthly Gross Saving/Net Saving</td>
    //         <td className="rvalue">{isLoading ? '...loading' : `${country_mstr?.currancysymbol} ${((projectSummary?.financial?.montlyFinancialSaving??0 / country_mstr?.currencyrate!)?.toFixed(2))} / ${country_mstr?.currancysymbol} ${(projectSummary.financial?.netsavings??0 / country_mstr?.currencyrate!).toFixed(2)}`}</td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Annual Savings</td>
    //         <td className="rvalue">{isLoading ? '...loading' : `${country_mstr?.currancysymbol} ${(((projectSummary?.financial?.montlyFinancialSaving??0) * 25) / country_mstr?.currencyrate!).toFixed(2)}`}</td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Lifetime Savings (25yrs)</td>
    //         <td className="rvalue">{isLoading ? '...loading' : `${country_mstr?.currancysymbol} ${(((projectSummary?.financial?.montlyFinancialSaving??0) * 12) * 25 / country_mstr?.currencyrate!).toFixed(2)}`}</td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Payback Period</td>
    //         <td className="rvalue">{isLoading ? "...loading" : `${Math.round(projectSummary?.degradation?.savingperiod??0)} years`}</td>
    //       </tr>
    //       <tr className="trow">
    //         <td className="rheading">Pre-tax IRR</td>
    //         <td className="rvalue">{isLoading ? "...loading" : `${Math.round(projectSummary?.degradation?.irr??0)} %`}</td>
    //       </tr>
    //     </tbody>
    //   </table>
    // </div>

<TableCheckBtn headers={headersFDT} data={dataFDT} 
// onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
/>
  );
}
