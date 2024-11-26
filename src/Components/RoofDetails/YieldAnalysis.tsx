import React, { ChangeEvent, useState } from 'react'
import { IconInfo } from '../../assests/icons/DrawerIcons'

import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import { setAnalysis } from '../../ReduxTool/Slice/Roof/YieldAnalysis/YieldAnalysisReducer'
import CustomInput from '../Input/CustomInput'


const YieldAnalysis = () => {
  const dispatch = useAppDispatch()
  // const [roofInfoData, setRoofInfoData] = useState({inputType:"Automatic",windExp:"B - Urban and Suburban", riskCato:"|| - Normal", windSpeed:"10", snowfall:"120"})

  const preval = useAppSelector(state => state.yieldanalysis.roofTab)
  const { inputType:it,
    windExposure:we,
    riskCategory:rc,
    windSpeed:ws,
    snowFall:sf } = useAppSelector(state => state.yieldanalysis.roofTab)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // setRoofInfoData({...roofInfoData, [name]:value})
    dispatch(setAnalysis({...preval, [name]:value  }))
   
  }
  return (
    <>
      <CustomInput labelname={"InputType"} name="inputType" value={it} type="text" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={"Wind Exposure"} name="windExposure" value={we} type="text" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={"Risk Category"} name="riskCategory" value={rc} type="text" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={"Wind Speed (m/s)"} name="windSpeed" value={ws} type="number" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={`Snowfall (kN/sq-m )`} name="snowFall" value={sf} type="number" onChange={handleChange} />
      <div className="h3"></div>
    </>
  )
}

export default YieldAnalysis
