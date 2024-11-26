import { ChangeEvent, useState } from 'react'
import { useAppDispatch } from '../../ReduxTool/store/hooks';
import { openOrderModal, openSucessModal } from '../../ReduxTool/Slice/Installer/InstallerReducer';
import CustomSelect from '../Select/CustomSelect';
import { IconClose, IconDownload, IconOrder } from '../../assests/icons/ModalIcons';

export const pantoptions = ["Ahead Renewable Energy ltd.",
    "Alternative Energiesysteme Holleis KG",
    "Anchor Electricals Pvt. Ltd.",
    "ANJI Technology Co. Ltd.",
    "JinkoSolar Holding Co. Ltd.",
    "Soventix Canada Inc.",
    "Adani Solar",
    "Surya Solar"];
const PlantSummarry = () => {
    const dispatch = useAppDispatch()
    const [pantData, setPantData] = useState({ enterAddress: "" })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setPantData({ ...pantData, [name]: value })
    }

    const handleClick = () => {
        dispatch(openOrderModal({ orderModal: false }))
        dispatch(openSucessModal(true))
    }

    const handlePdfReport = () => {
        // setTimeout(() => {
        //     window.open("pvNXT_Simulation_Data.pdf");
        // }, 500);
    }

    return (
        <>
            <div className='plant-summary-modal-container'>
                <div className='flex items-center '>
                    <div className='plant-summary-heading'>Project Summary</div>
                    <div className='mx-2 border-r-[0.3vh] h-[2.2vh] border-primary-600'></div>
                    <button className='light-thin-btn' onClick={handlePdfReport}><IconDownload />Download BOQ</button>
                </div>
                <div className='cursor-pointer' onClick={e => dispatch(openOrderModal({ orderModal: false }))}><IconClose /></div>
            </div>
            <div className="h2"></div>
            <div className='modal-body plant-summary-modal-container'>
                <div className='pr-4'>
                    <CustomSelect labelname="Enter Address" id={"Enter Address"} options={pantoptions} value={pantData.enterAddress} onChange={handleChange} />
                    <div className="h2"></div>
                    <CustomSelect labelname="Project Id" id={"Project Id"} options={pantoptions} value={pantData.enterAddress} onChange={handleChange} />
                </div>
                <div>
                    <CustomSelect labelname="Energy Consumption" id={"EnergyConsumption"} options={pantoptions} value={pantData.enterAddress} onChange={handleChange} />
                    <div className="h2"></div>
                    <CustomSelect labelname="Plant Capacity" id={"PlantCapacity"} options={pantoptions} value={pantData.enterAddress} onChange={handleChange} />
                </div>
            </div>
            <div className="h2"></div>
            <div className='modal-body plant-summary-modal-container'>
                <div className='pr-4'>
                    <div className="h4"></div>
                    <div className="drawer-heading">Basic Plant Data</div>
                    <div className="h2"></div>
                    <div className="table-horizontal-rule" />
                    <div className="h2"></div>
                    <table className="btable">
                        <thead className="bthead">
                            <tr>
                                <th className="btable-heading">Name</th>
                                <th className="btable-heading">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Name</td>
                                <td className="wbody-value">Building Solar 1</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Unique ID</td>
                                <td className="wbody-value">rm-buildingsolar1-07 ..</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Zip Code</td>
                                <td className="wbody-value">477001</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Latitude</td>
                                <td className="wbody-value">119.106605980420248</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Longitude</td>
                                <td className="wbody-value">72.88352608680727</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Daily Consumption</td>
                                <td className="wbody-value">4 kW</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="h4"></div>
                    <div className="drawer-heading">Civil Work</div>
                    <div className="h2"></div>
                    <div className="table-horizontal-rule" />
                    <div className="h2"></div>
                    <table className="btable">
                        <thead className="bthead">
                            <tr>
                                <th className="btable-heading">Name</th>
                                <th className="btable-heading">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Name</td>
                                <td className="wbody-value">Building Solar 1</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Unique ID</td>
                                <td className="wbody-value">rm-buildingsolar1-07 ..</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Zip Code</td>
                                <td className="wbody-value">477001</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Latitude</td>
                                <td className="wbody-value">119.106605980420248</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Longitude</td>
                                <td className="wbody-value">72.88352608680727</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Daily Consumption</td>
                                <td className="wbody-value">4 kW</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="h2"></div>
            <div className='modal-body plant-summary-modal-container'>
                <div className='pr-4'>
                    <div className="h4"></div>
                    <div className="drawer-heading">Miscellaneous  Work</div>
                    <div className="h2"></div>
                    <div className="table-horizontal-rule" />
                    <div className="h2"></div>

                    <table className="btable">
                        <thead className="bthead">
                            <tr>
                                <th className="btable-heading">Name</th>
                                <th className="btable-heading">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Name</td>
                                <td className="wbody-value">Building Solar 1</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Unique ID</td>
                                <td className="wbody-value">rm-buildingsolar1-07 ..</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Zip Code</td>
                                <td className="wbody-value">477001</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Latitude</td>
                                <td className="wbody-value">119.106605980420248</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Longitude</td>
                                <td className="wbody-value">72.88352608680727</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Daily Consumption</td>
                                <td className="wbody-value">4 kW</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div>
                    <div className="h4"></div>
                    <div className="drawer-heading">SiteTesting & Survey  Work</div>
                    <div className="h2"></div>
                    <div className="table-horizontal-rule" />
                    <div className="h2"></div>
                    <table className="btable">
                        <thead className="bthead">
                            <tr>
                                <th className="btable-heading">Name</th>
                                <th className="btable-heading">Detail</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Name</td>
                                <td className="wbody-value">Building Solar 1</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Project Unique ID</td>
                                <td className="wbody-value">rm-buildingsolar1-07 ..</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Zip Code</td>
                                <td className="wbody-value">477001</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Latitude</td>
                                <td className="wbody-value">119.106605980420248</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Longitude</td>
                                <td className="wbody-value">72.88352608680727</td>
                            </tr>
                            <tr className='wbody-row'>
                                <td className="wbody-heading">Daily Consumption</td>
                                <td className="wbody-value">4 kW</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="h2"></div>
            <div className="h2"></div>
            <div className=" modal-footer flex justify-center items-center">
                <button className="dark-md-btn mr-2" onClick={handleClick}><IconOrder />Order Now</button>
                <button className="light-md-btn" onClick={e => dispatch(openOrderModal(false))}>Back</button>
            </div>
        </>
    )
}

export default PlantSummarry
