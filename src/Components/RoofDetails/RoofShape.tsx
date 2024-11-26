import { ChangeEvent, useEffect, useState } from 'react'
import { setRoofTypeInfo } from '../../ReduxTool/Slice/Roof/RoofType/RooftopReducer'
import { useAppDispatch, useAppSelector } from '../../ReduxTool/store/hooks'
import DataInputImage from '../Input/DataInputImage'

const RoofShape = () => {
  const dispatch = useAppDispatch()
  const defualt = useAppSelector(state => state.rooftopType.roofTab)
  const roofshape = useAppSelector(state => state.rooftopType.roofTab.roofshapeval)

  const [wordEntered, setWordEntered] = useState("Select an option");
  const [filteredData, setFilteredData] = useState<string[]>([]);

  const roofshapeoption = [
    { name: "Rectangle", img: require("../../assests/img/RoofDetailsImg/rectangle.png") },
    { name: "Polygon", img: require("../../assests/img/RoofDetailsImg/polygon.png") }
  ];

  // const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
  //   const { name } = event.target
  //   dispatch(setRoofTypeInfo({ ...defualt, roofshapeval: name }))
  // }

  const handleClick = (text: string) => {
    dispatch(setRoofTypeInfo({ ...defualt, roofshapeval: text }))
    setWordEntered(text)
    setFilteredData([])
  }

  useEffect(() => {
    setWordEntered(roofshape)
  }, [wordEntered])

  return (
    <>
      <div className="h2" ></div>
      <DataInputImage opt="mod" labelname="Roof Shape" data={roofshapeoption} wordEntered={wordEntered} setWordEntered={setWordEntered} filteredData={filteredData} setFilteredData={setFilteredData} handleClick={handleClick} />
    </>
  )
}

export default RoofShape
