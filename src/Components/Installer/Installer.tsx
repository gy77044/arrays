import { ChangeEvent, useEffect, useState } from 'react';
import { useAppSelector } from '../../ReduxTool/store/hooks';
import Card from './Card';
import CustomInput from '../Input/CustomInput';

const Installer = () => {
  const [installerData, setInstallerData] = useState({ installerAddress: "", installerDate: "" })
  const installeroptions = ["University of Dhaka,Nikhet Rd."];
  const [smmryData, setSmmryData] = useState("")
  // const { address } = useAppSelector(state => state.projectsetup)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInstallerData({ ...installerData, [name]: value })
  }

  // useEffect(() => {
  //   if (address) {
  //     setSmmryData(address)
  //   }
  // }, [address])

  return (
    <>
      <div className="h2"></div>
      <CustomInput id="projectInput_searchloaction" labelname={"Enter Or Search Address"} name="address" value={smmryData} type="text" onChange={handleChange} />
      <div className="h2"></div>
      <CustomInput labelname={"Installer Data & Time"} name="installerDate" value={installerData.installerDate} type="date" onChange={handleChange} />
      <div className="h4"></div>
      <div className="drawer-heading">Installer Details</div>
      <div className="h2"></div>
      <div className="w-full border-b-[0.1vh] border-primary-700/40" />
      <div className="h2"></div>
      <Card cardName='Tata Solar Solution' />
      <div className="h2"></div>
      <Card cardName='Tata Solar Solution' />
    </>
  )
}

export default Installer
