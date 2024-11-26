import { ChangeEvent, useEffect, useState } from 'react'
import { setRoofTypeInfo } from '../../ReduxTool/Slice/Roof/RoofType/RooftopReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import DataInputImage from '../Input/DataInputImage'

const SolarModuleLayout = () => {
  const dispatch = useAppDispatch()
  const defualt = useAppSelector(state => state.rooftopType.roofTab)
  const solarLayout = useAppSelector(state => state.rooftopType.roofTab.solarLayoutval)

  const [wordEntered, setWordEntered] = useState("Select an option");
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const solarmodulelayoutoption = [
    { name: "Complete Module", img: require("../../assests/img/RoofDetailsImg/CompleteRoot.png") },
    { name: "Array Module", img: require("../../assests/img/RoofDetailsImg/ModuleArray.png") }
  ];

  // const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name } = e.target
  //   dispatch(setRoofTypeInfo({ ...defualt, solarLayoutval: name }))
  // }
  const handleClick = (text: string) => {
    dispatch(setRoofTypeInfo({ ...defualt, solarLayoutval: text }))
    setWordEntered(text)
    setFilteredData([])
  }

  useEffect(() => {
    setWordEntered(solarLayout)
  }, [wordEntered])


  return (
    <>
      <div className="h2" ></div>
      <DataInputImage opt="mod" labelname="Solar Module Layout" data={solarmodulelayoutoption} wordEntered={wordEntered} setWordEntered={setWordEntered} filteredData={filteredData} setFilteredData={setFilteredData} handleClick={handleClick} />
    </>
  )
}

export default SolarModuleLayout
