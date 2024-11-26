import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../ReduxTool/store/hooks'
import FinancialDetailsTable from '../QuickPlantAnalysis/FinancialDetailsTable'
import GenerationDetailsTable from '../QuickPlantAnalysis/GenerationDetailsTable'
import PlantDetailsTable from '../QuickPlantAnalysis/PlantDetailsTable'
import { IconInfo } from '../../../../assests/icons/DrawerIcons'
import { TableCheckBtn } from '../../../../Components/AllInput/AllInput'

const CustQuickPlantAnalysisSummary = () => {
  const { user: { country_mstr } } = useAppSelector(state => state.auth);
  const { roofAnalysis: { selected_project, formDetails: { quickplantAnalysis,projectSummary, projectSetup: { lat, lng,electricityrate,sanctionload,plantcapacity} }, isWithRoof},isLoading, ondFiles } = useAppSelector((state) => state.consumerReducers);
  const headers = ['Name', 'Details'];
  const dataCP2 = [
    { id: '1', Name: `Recommended Project Capacity (based on sanctioned load)`, Details: `${sanctionload} kWp` },
    { id: '2', Name: `Max Plant Capacity (as per roof area)`, Details: `${plantcapacity} kWp` },
    { id: '3', Name: `Est. Total Cost of Project (without subsidy as per sanctioned load)`, Details: `${country_mstr?.currancysymbol} ${quickplantAnalysis.costbracket}` },
  ]

  const dataTEG2 = [
    { id: '1', Name: `Monthly Generation (as per usable roof area)`, Details: `${(quickplantAnalysis.electricityGenerated / 12)?.toFixed(2)} kWh` },
    { id: '2', Name: `Annual Generation (as per usable roof area)`, Details: `${quickplantAnalysis.electricityGenerated?parseFloat(quickplantAnalysis.electricityGenerated)?.toFixed(2):0} kWh` },
    { id: '3', Name: `Monthly Generation (as per sanctioned load)`, Details: `${quickplantAnalysis.electricityGenerated2?( quickplantAnalysis.electricityGenerated2 / 12).toFixed(2):0} kWh` },
    { id: '4', Name: `Annual Generation (as per sanctioned load)`, Details: `${quickplantAnalysis.electricityGenerated2? parseFloat(quickplantAnalysis.electricityGenerated2)?.toFixed(2):0} kWh` },
  ]

  const dataFDT = [
    { id: '1', Name: `Monthly Gross Saving/Net Saving`, Details: `${country_mstr?.currancysymbol} ${((projectSummary.financial?.montlyFinancialSaving! / country_mstr?.currencyrate!)?.toFixed(2))} / ${country_mstr?.currancysymbol} ${(projectSummary.financial?.netsavings??0 / country_mstr?.currencyrate!).toFixed(2)}` },
    { id: '2', Name: `Annual Savings`, Details: `${country_mstr?.currancysymbol} ${((projectSummary.financial?.montlyFinancialSaving! * 25) / country_mstr?.currencyrate!).toFixed(2)}` },
    { id: '3', Name: `Lifetime Savings (25yrs)`, Details: `${country_mstr?.currancysymbol} ${((projectSummary.financial?.montlyFinancialSaving! * 12) * 25 / country_mstr?.currencyrate!).toFixed(2)}` },
    { id: '4', Name: `Payback Period`, Details: `${Math.round(projectSummary.degradation?.savingperiod!)} years` },
    { id: '5', Name: `Pre-tax IRR`, Details: `${Math.round(projectSummary.degradation?.irr!)} %` },
  ]
  return (
    <div className="">
      {/* Environmental Impact */}     
        <div className="">
          <h4 className="para-md mb-2">Environmental Impact</h4>
          <div className="section-body">
            <div className="flex justify-start items-center space-x-[1vh]">
              <img className="w-[6vh]" src={require("../../../../assests/img/Dashboard/COEmission.png")} alt="" />
              <p className="text-1.4xl text-primary-400 leading-[2vh]">Carbon footprint reduced by{" "}
                <span className="text-1.4xl text-primary-200 font-semibold">
                {Math.round(projectSummary?.financial?.totalCarbonfootprint??0)}
                &nbsp;tons / year
                </span>
              </p>
            </div>

            <div className="flex justify-start items-center space-x-[1vh]">
              <img className="w-[6vh]" src={require("../../../../assests/img/Dashboard/TeakTrees.png")} alt="" />
              <p className="text-1.4xl text-primary-400 leading-[2vh]">
                This installation will be equivalent to planting{" "}
                <span className="text-1.4xl text-primary-200 font-semibold">
                { Math.round(projectSummary?.financial?.totalTrees??0)}
                  &nbsp;Trees
                </span>{" "}
                over the lifetime.
              </p>
            </div>
          </div>
        </div>
     

      {/* Cost of Plant */}

      <div className="rounded-lg border border-gray-200 bg-gray-100 p-4">
          <h4 className="para-md mb-2">Cost of Project</h4>
          <TableCheckBtn headers={headers} data={dataCP2} 
          // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
          />
        </div>

      {/* <div className="">
        <div className="table-name">Cost of Plant</div>
        <div className="section-body pt-1">
          <PlantDetailsTable />
        </div>
      </div> */}

      {/* Total Electricity Generation */}
      <div className="rounded-lg border border-gray-200 bg-gray-100 p-4">
          <h4 className="para-md mb-2">Total Electricity Generation</h4>
          <TableCheckBtn headers={headers} data={dataTEG2} 
          // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
          />
        </div>
      <div className="rounded-lg border border-gray-200 bg-gray-100 p-4">
          <h4 className="para-md mb-2">Financial Savings</h4>
          <TableCheckBtn headers={headers} data={dataFDT} 
          // onRowSelect={handleRowSelect} onSelectAll={handleSelectAll} renderButtons={renderCustomButtons}
          />
        </div>
      {/* <div className="drawer-main">
        <div className="drawer-section">Total Electricity Generation</div>
        <div className="section-body">
          <GenerationDetailsTable />
        </div>
      </div> */}
        {/* <div className="">
          <div className="table-name">
              Total Electricity Generation
             
          </div>
          <div className="section-body pt-1">
          <div className="table-main">
      <table className="table">
        <thead className="thead"><tr><th className="hvalue">Name</th><th className="hvalue">Details</th></tr></thead>
        <tbody>
          <tr className="trow">
            <td className="rheading"><span>Monthly Generation</span><br /><span className="text-1xl">(as per usable roof area)</span></td>
            <td className="rvalue">{(quickplantAnalysis.electricityGenerated / 12)?.toFixed(2)} kWh
              </td> 
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Annual Generation</span><br /><span className="text-1xl">(as per usable roof area)</span></td>
            <td className="rvalue">
               {quickplantAnalysis.electricityGenerated?parseFloat(quickplantAnalysis.electricityGenerated)?.toFixed(2):0} kWh
            </td> 
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Monthly Generation</span><br /><span className="text-1xl">(as per sanctioned load)</span></td>
            <td className="rvalue">
              {quickplantAnalysis.electricityGenerated2?( quickplantAnalysis.electricityGenerated2 / 12).toFixed(2):0} kWh
            </td> 
          </tr>
          <tr className="trow">
            <td className="rheading"><span>Annual Generation</span><br /><span className="text-1xl">(as per sanctioned load)</span></td>
            <td className="rvalue">
              {quickplantAnalysis.electricityGenerated2? parseFloat(quickplantAnalysis.electricityGenerated2)?.toFixed(2):0} kWh
            </td>
          </tr>
        </tbody>
      </table>
    </div>
          </div>
        </div> */}
      
      {/* Financial Savings */}
      {/* <div className="">
        <div className="table-name">Financial Savings</div>
        <div className="section-body pt-1">
        <div className="table-main">
      <table className="table">
        <thead className="thead">
          <tr><th className="hvalue">Name</th><th className="hvalue">Details</th></tr>
        </thead>
        <tbody>
          <tr className="trow">
            <td className="rheading">Monthly Gross Saving/Net Saving</td>
            <td className="rvalue">{`${country_mstr?.currancysymbol} ${((projectSummary.financial?.montlyFinancialSaving! / country_mstr?.currencyrate!)?.toFixed(2))} / ${country_mstr?.currancysymbol} ${(projectSummary.financial?.netsavings??0 / country_mstr?.currencyrate!).toFixed(2)}`}</td>
          </tr>
          <tr className="trow">
            <td className="rheading">Annual Savings</td>
            <td className="rvalue">{`${country_mstr?.currancysymbol} ${((projectSummary.financial?.montlyFinancialSaving! * 25) / country_mstr?.currencyrate!).toFixed(2)}`}</td>
          </tr>
          <tr className="trow">
            <td className="rheading">Lifetime Savings (25yrs)</td>
            <td className="rvalue">{`${country_mstr?.currancysymbol} ${((projectSummary.financial?.montlyFinancialSaving! * 12) * 25 / country_mstr?.currencyrate!).toFixed(2)}`}</td>
          </tr>
          <tr className="trow">
            <td className="rheading">Payback Period</td>
            <td className="rvalue">{`${Math.round(projectSummary.degradation?.savingperiod!)} years`}</td>
          </tr>
          <tr className="trow">
            <td className="rheading">Pre-tax IRR</td>
            <td className="rvalue">{`${Math.round(projectSummary.degradation?.irr!)} %`}</td>
          </tr>
        </tbody>
      </table>
    </div>
        </div>
      </div> */}

    </div>
  )
}

export default CustQuickPlantAnalysisSummary
