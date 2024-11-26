import { useEffect, useState } from "react";
import { IconCheck, IconInfo, IconWaiting } from "../../../assests/icons/Icons";
import { setModalHeaderFooter } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { isCardIconOpen, setOpenOrderStatusModal } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { IOrderProjectType } from "../../../ReduxTool/Slice/Consumer/types";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { dcPowerBasedOnSanctionload, newformatDate } from "../../../Utils/commonFunctions";
import { IconClose } from "../../../assests/icons/ModalIcons";
 
const TerranxtSetupCC = ({ item }: { item: IOrderProjectType }) => {
  const dispatch = useAppDispatch();
  const [cardTime, setCardTime] = useState("");
  const [cardOrderId, setCardOrderId] = useState(item.projectid.substring(0, 8));
  // const [showInfoContent, setShowInfoContent] = useState(false)
  const [showInfoContent, setShowInfoContent] = useState<Record<string, boolean>>({}); // Track each card's state
  const { roofAnalysis: { selectedOption,cardIconOpen } } = useAppSelector(state => state.consumerReducers);
  const handleOpenModal = () => {
    dispatch(setModalHeaderFooter({ title: "Order Details", btnTxt: "Ok", secondaryBtnTxt: "" }));
    dispatch(setOpenOrderStatusModal(true));
  };
 
  useEffect(() => {
    setCardTime(newformatDate(new Date()));
  }, []);
 
  const contentHandler = (id: string) =>{
    // if(cardIconOpen){
    //   dispatch(isCardIconOpen(""));
    // }else{
    //   dispatch(isCardIconOpen("second"));
    // }
    setShowInfoContent((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle the specific card's status
    }));
  }
 
  return (
    <>
      <div className="flex flex-col md:flex-row max-w-md mx-auto bg-white border border-gray-200 border-t-4 border-t-gray-200 hover:border-t-custom-primary-default rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition-all duration-300 ease-in-out transform">
        {/* <div className="bg-custom-primary-default md:w-48 md:flex-shrink-0 flex items-center justify-center">
          <IconModule />
        </div> */}
        <div className="p-6 w-full min-w-96">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center flex-row gap-2">
              <div className="btn btn-xs-outlineprimary">{item && item.installationmode}</div>
              {/* <div className="py-1 px-2 text-orange-500 text-xs rounded-md font-medium uppercase hover:text-white hover:bg-orange-500">In Progress</div> */}
              <div className="py-1 px-2 border border-orange-500 text-orange-500 text-xs rounded-md font-medium uppercase hover:text-white hover:bg-orange-500">In Progress</div>
            </div>
            {/* <div onClick={contentHandler} style={{cursor:'pointer !important'}}>{!cardIconOpen ? <IconInfo /> : <IconClose/>}</div> */}
            <div onClick={() => contentHandler(cardOrderId)} style={{ cursor: 'pointer !important' }}>
              {!showInfoContent[cardOrderId] ? <IconInfo /> : <IconClose />}
            </div>
          </div>
          <div className="flex justify-start item-start flex-col mb-2">
            <h4 className="heading-sm">
              Order ID #{cardOrderId && cardOrderId}
            </h4>
            <p className="para-xs-semibold text-gray-600">
              {cardTime && cardTime} at 10:34 PM
            </p>
          </div>
 
          <ul className="para-sm text-slate-600">
            <li> {item && (item.address.length > 44 ? item.address!.substring(0, 44) + "..." : item.address)}</li>
            <li>Project Type: {item && item.projecttype}</li>
            <li>AC/DC: {item && dcPowerBasedOnSanctionload(item.sanctionload)}/{item && (item.sanctionload)}kWp</li>
          </ul>
          {/* <div className={`${cardIconOpen==="second"?"block":"hidden"}`}> */}
          <div className={`${showInfoContent[cardOrderId] ? "block" : "hidden"}`}>
            <div className="max-w-xl h-px my-4 flex justify-center self-stretch bg-gradient-to-tr from-transparent via-neutral-600 to-transparent opacity-25 "></div>
            <h4 className="mb-2 para-md">
              Order Status
            </h4>
            <ul className="para-sm text-slate-600">
              <li className="flex justify-between items-center pb-1">
                <div className="flex justify-between items-center font-semibold">
                  <IconCheck />Proposal Received
                </div>
                {cardTime && cardTime}
              </li>
              <li className="flex justify-between items-center pb-1">
                <div className="flex justify-between items-center font-semibold">
                  <IconWaiting />Contract Negotiation
                </div>
                Yet to start
              </li>
              <li className="flex justify-between items-center pb-1">
                <div className="flex justify-between items-center font-semibold">
                  <IconWaiting />Equipment Arriving Soon
                </div>
                Yet to start
              </li>
              <li className="flex justify-between items-center pb-1">
                <div className="flex justify-between items-center font-semibold">
                  <IconWaiting />Installation in Progress
                </div>
                Yet to start
              </li>
              <li className="flex justify-between items-center pb-1">
                <div className="flex justify-between items-center font-semibold">
                  <IconWaiting />Project Completion
                </div>
                Yet to start
              </li>
              <li className="flex justify-between items-center pb-1">
                <div className="flex justify-between items-center font-semibold">
                  <IconWaiting />Ongoing Care
                </div>
                Yet to start
              </li>
 
            </ul>
          </div>
          {/*  <div>
            <a href="#" className="text-slate-800 font-semibold text-sm hover:underline flex items-center">
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>
      {/* <div className="flex space-x-8">
        <div className="card2">
          <div className="flex flex-row space-x-[2vh]">
            {/* <img
             className="h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" src={`https://terranxt.com/wp-content/uploads/2023/09/Post-1.jpg`} loading="lazy"  alt={`Terranxt`}
            />
            <div className="card-body w-full">
              <div
                className="body-title"
                data-bs-toggle="tooltip"
                title="Project name"
              >
                {item && item.projectname}
              </div>
              <div className="body-time">
                <div
                  className="time-content"
                  data-bs-toggle="tooltip"
                  title="Project created date"
                >
                  <IconClock />
                  Created On: {item && newformatDate(new Date(item.createddt))}
                </div>
                <button
                  className="dark-sm-btn"
                  data-bs-toggle="tooltip"
                  title="Project mode type"
                >
 
                </button>
              </div>
              <div
                className="time-content"
                data-bs-toggle="tooltip"
                title={`${item && item.address}`}
              >
                <div> <IconPinDrop /></div>
                {item && (item.address.length > 75 ? item.address!.substring(0, 75) + "..." : item.address)}
              </div>
            </div>
          </div>
          {/* <div className="h1"></div>
          <div className=" flex justify-between items-center space-x-[2vh]">
            <div className="flex flex-col justify-center items-center space-y-[1.4vh]">
              <IconGift />
              <p className="text-1xl font-semibold text-yellow-100 whitespace-nowrap">
                RFP Bid
              </p>
              <p className="text-1xl font-semibold text-yellow-100 whitespace-nowrap">
                {cardTime && cardTime}
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-[1.4vh]">
              <IconContract />
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Contract Signing
              </p>
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Yet to start
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-[1.4vh]">
              <IconOrders />
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Equipment Delivery
              </p>
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Yet to start
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-[1.4vh]">
              <IconEngineering2 />
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Construction Status
              </p>
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Yet to start
              </p>
            </div>
            <div className="flex flex-col justify-center items-center space-y-[1.4vh]">
              <IconAssest />
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Assest Management
              </p>
              <p className="text-1xl font-normal text-primary-200 whitespace-nowrap">
                Yet to start
              </p>
            </div>
          </div>
          <div className="h1"></div>
          <div className="table-main">
            <table className="table">
              <thead className="thead">
                <tr>
                  <th className="hvalue">Order ID</th>
                  <th className="hvalue">Project Type</th>
                  <th className="hvalue">AC</th>
                  <th className="hvalue">DC</th>
                </tr>
              </thead>
              <tbody>
                <tr className="trow">
                  <td className="rvalue"></td>
                  <td className="rvalue">{item && item.projecttype}</td>
                  <td className="rvalue">
                    {item && dcPowerBasedOnSanctionload(item.sanctionload)}
                  </td>
                  <td className="rvalue">
                    {item && (item.sanctionload)} kWp
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="card-footer hidden" onClick={handleOpenModal}>
          <button className="light-btn">Order Details</button>
        </div>
      </div> */}
 
    </>
  );
};
 
export default TerranxtSetupCC;