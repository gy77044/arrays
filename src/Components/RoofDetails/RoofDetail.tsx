import { useEffect, useState } from "react"
import { IconInfo } from "../../assests/icons/DrawerIcons"
import RoofCovering from "./RoofCovering"
import RoofShape from "./RoofShape"
import RoofType from "./RoofType"
import SolarModuleLayout from "./SolarModuleLayout"
import RoofInformation from "./RoofInformation"
import SolarModuleObstruction from "./SolarModuleObstruction"
import YieldAnalysis from "./YieldAnalysis"
import { useAppDispatch, useAppSelector } from "../../ReduxTool/store/hooks"
import { setIndexVal } from "../../ReduxTool/Slice/Roof/RoofType/RooftopReducer"
import { setEditable } from "../../ReduxTool/Slice/Roof/RoofDetails/RoofDetailsReducer"
import { setMapToolsTitle } from "../../ReduxTool/Slice/MapTools/MapToolsReducer"

const RoofDetail = () => {

  const dispatch = useAppDispatch()
  const { indexVal } = useAppSelector(state => state.rooftopType.roofTab)
  const newMapToolstitle = useAppSelector(state=>state.mapToolsReducer.newMapToolstitle)
  // const [ToggleState, setToggleState] = useState(1);
  // const [editable, setEditable] = useState(false);
  const editable = useAppSelector(state => state.roofdetails.editable)
  const { roofTypeval: rt, roofCoveringval: rc, roofshapeval: rs, solarLayoutval: sl } = useAppSelector(state => state.rooftopType.roofTab)
  const { buildingHeightval: bh, drainDirectionval: dd, roofpitchval: rp } = useAppSelector(state => state.roofInfo.roofTab)
  const { inputType, riskCategory, snowFall, windExposure, windSpeed } = useAppSelector(state => state.yieldanalysis.roofTab)


  // const toggleTab = (index: number) => {
  //   dispatch(setIndexVal(index))
  // };

  const handleTab = () =>{
    dispatch(setIndexVal(3))
    if(newMapToolstitle==="Shadow"){
      dispatch(setMapToolsTitle(""))
    }
    else{
      dispatch(setMapToolsTitle("Shadow"))
    }
  }


  const getActiveClass = (index: number, className: string) =>
    indexVal === index ? className : "";


  useEffect(() => {
    if (indexVal) {
      // toggleTab(indexVal)
      dispatch(setIndexVal(indexVal))
    }
  }, [indexVal])

  return (
    <>
      <div className="h2"></div>
      <button className="light-sm-btn float-right" onClick={() => dispatch(setEditable(!editable))}>{!editable ? "Edit Details" : "Save Details"}</button>
      <div className="h2"></div>
      <div className="h2"></div>
      <div className="" >
        {!editable &&
          <>
            <div className="flex flex-col h-[70vh] overflow-y-auto custom-scrollbar-css">
              <div className="h2"></div>
              <table className="table">
                {/* <thead className="thead">
                <tr>
                  <th scope="col" className="table-heading">Name</th>
                  <th scope="col" className="table-heading">Value</th>
                </tr>
              </thead> */}
                <tbody>
                  <tr className="body-row" >
                    <td className="body-heading">Roof Type</td>
                    <td className="body-value">{rt === "" ? "Loading..." : rt}</td>
                  </tr>
                  <tr className="body-row" >
                    <td className="body-heading">Roof Covering</td>
                    <td className="body-value">{rc === "" ? "Loading..." : rc}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Solar Module Layout</td>
                    <td className="body-value">{sl === "" ? "Loading..." : sl}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Roof Shape</td>
                    <td className="body-value">{rs === "" ? "Loading..." : rs}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Buiding Height</td>
                    <td className="body-value">{bh === 0 ? "Loading..." : bh}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Roof Pitch</td>
                    <td className="body-value">{rp === 0 ? "Loading..." : rp}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Drainage Direction</td>
                    <td className="body-value">{dd === "" ? "Loading..." : dd}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Input Type</td>
                    <td className="body-value">{inputType === "" ? "Loading..." : inputType}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Risk Category</td>
                    <td className="body-value">{riskCategory === "" ? "Loading..." : riskCategory}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Snow Fall</td>
                    <td className="body-value">{snowFall === 0 ? "Loading..." : snowFall}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Wind Exposure</td>
                    <td className="body-value">{windExposure === "" ? "Loading..." : windExposure}</td>
                  </tr>
                  <tr className="body-row">
                    <td className="body-heading">Wind Speed (m/s)</td>
                    <td className="body-value">{windSpeed === 0 ? "Loading..." : windSpeed}</td>
                  </tr>
                </tbody>
              </table>
              <div className="h2"></div>
              <SolarModuleObstruction />
            </div>
          </>
        }

      </div>
      {editable &&
        <div className="bg-yellow-400/10">
          <div className='roofdetails-tabs'>
            <ul className="relative flex justify-between items-center"
            >
              <li className={`  tabs ${getActiveClass(1, "active-tabs")}  h-[4.1vh] `}
                onClick={() => {dispatch(setIndexVal(1))
                  dispatch(setMapToolsTitle(""))}
                }>
                Roof
              </li>
              <li className={`tabs ${getActiveClass(2, "active-tabs")}  h-[4.1vh]`}
                onClick={() => {dispatch(setIndexVal(2))
                  dispatch(setMapToolsTitle(""))}} id="nav-cost-tab" >
                Obstruction
              </li>
              <li className={`tabs ${getActiveClass(3, "active-tabs")}  h-[4.1vh]`}
                onClick={() => {
      handleTab()
                }} id="nav-finance-tab" >
                Weather
              </li>
            </ul>
            <div className="relative">
              <div className={`h-[65vh] content ${getActiveClass(1, "active-content")} overflow-auto custom-scrollbar-css`}>
                <div className="flex flex-col justify-between items-stretch ">
                  <RoofType />
                  <RoofCovering />
                  <SolarModuleLayout />
                  <RoofShape />
                  <RoofInformation />
                  {/* <div className="h2"></div>
                  <SolarModuleObstruction /> */}
                </div>
              </div>
              <div className={`h-[65vh] content ${getActiveClass(2, "active-content")} overflow-auto custom-scrollbar-css`}>
                <div className="flex flex-col justify-between items-stretch ">
                  <SolarModuleObstruction />
                </div>
              </div>
              <div className={`h-[65vh] content ${getActiveClass(3, "active-content")} overflow-auto custom-scrollbar-css`}>
                <div className="flex flex-col justify-between items-stretch ">
                  <YieldAnalysis />
                </div>
              </div>
            </div>
          </div>
        </div>
      }
      <div className="h1"></div>


    </>
  )
}
export default RoofDetail
