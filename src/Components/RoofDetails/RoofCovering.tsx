import { ChangeEvent, useEffect, useState } from 'react'
import { setRoofTypeInfo } from '../../ReduxTool/Slice/Roof/RoofType/RooftopReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import DataInputImage from '../Input/DataInputImage'

const RoofCovering = () => {
  const dispatch = useAppDispatch()
  const defualt = useAppSelector(state => state.rooftopType.roofTab)
  const roofCovering = useAppSelector(state => state.rooftopType.roofTab.roofCoveringval)

  const [wordEntered, setWordEntered] = useState("Select an option");
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const roofcoveringoption = [
   { name:"None", img:require("../../assests/img/RoofDetailsImg/none.png")},
   { name:"Tile",img:require("../../assests/img/RoofDetailsImg/tile.png")},
   { name:"Trapezoidal",img:require("../../assests/img/RoofDetailsImg/Trapezoidal.png")}
  ];


  // const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name } = e.target
  //   dispatch(setRoofTypeInfo({ ...defualt, roofCoveringval: name }))
  // }
  const handleClick = (text: string) => {
    dispatch(setRoofTypeInfo({ ...defualt, roofCoveringval: text }))
    setWordEntered(text)
    setFilteredData([])
}

useEffect(()=>{  
  setWordEntered(roofCovering)
},[wordEntered])


  return (
    <>
      {/* <div className="flex justify-center items-center text-brown-100 text-1.8xl font-semibold">
        <div className="drawer-heading">Roof Covering</div>
      </div>
      <div className="h2"></div>
      <div className="w-full border-b-[0.1vh] border-primary-700/40" /> */}
      <div className="h2"></div>
      <DataInputImage opt="mod" labelname="Roof Covering" data={roofcoveringoption} wordEntered={wordEntered} setWordEntered={setWordEntered} filteredData={filteredData} setFilteredData={setFilteredData} handleClick={handleClick} />
    </>
  )
}

export default RoofCovering
