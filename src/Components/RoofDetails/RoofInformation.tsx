import { ChangeEvent } from 'react'
import { setRoofInfo } from '../../ReduxTool/Slice/Roof/RoofInfo/RoofInfoReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import CustomInput from '../Input/CustomInput'


const RoofInformation = () => {
  const dispatch = useAppDispatch()
  const preval = useAppSelector(state => state.roofInfo.roofTab)
  const { buildingHeightval: bh, drainDirectionval: dd, roofpitchval: rp } = useAppSelector(state => state.roofInfo.roofTab)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(setRoofInfo({ ...preval, [name]: value }))
  }
  
  return (
    <>
    <div className="h2"></div>
      <CustomInput labelname={"Building Height (m)"} name="buildingHeightval" value={bh} type="number" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={"Roof Pitch"} name="roofpitchval" value={rp} type="number" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={"Drainage Direction"} name="drainDirectionval" value={dd} type="text" onChange={handleChange} />
    </>
  )
}

export default RoofInformation
