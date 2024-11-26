import { ChangeEvent, useEffect, useState } from 'react'
import { setRoofTypeInfo } from '../../ReduxTool/Slice/Roof/RoofType/RooftopReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import DataInputImage from '../Input/DataInputImage'

const RoofType = () => {
  const dispatch = useAppDispatch()
  const defualt = useAppSelector(state => state.rooftopType.roofTab)
  const roofType = useAppSelector(state => state.rooftopType.roofTab.roofTypeval)

  const [wordEntered, setWordEntered] = useState("Select an option");
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const rooftypeoption = [
    { name: "Pitched Roof", img: require("../../assests/img/RoofDetailsImg/pitchedRoof.png") },
    { name: "Flat Roof", img: require("../../assests/img/RoofDetailsImg/flatRoot.png") },
    { name: "Pent Roof", img: require("../../assests/img/RoofDetailsImg/pentRoot.png") },
  ];


  // const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
  //   const { name } = e.target
  //   dispatch(setRoofTypeInfo({ ...defualt, roofTypeval: name }))
  // }

  const handleClick = (text: string) => {
    dispatch(setRoofTypeInfo({ ...defualt, roofTypeval: text }))
    setWordEntered(text)
    setFilteredData([])
  }
  useEffect(() => {
    setWordEntered(roofType)
  }, [wordEntered])

  return (
    <>
      <DataInputImage opt="mod" labelname="Roof Type" data={rooftypeoption} wordEntered={wordEntered} setWordEntered={setWordEntered} filteredData={filteredData} setFilteredData={setFilteredData} handleClick={handleClick} />
    </>
  )
}

export default RoofType
