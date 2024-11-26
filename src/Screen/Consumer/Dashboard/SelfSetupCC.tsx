import React, { useState } from "react";
import { IconInfo, IconSelf } from "../../../assests/icons/Icons";
import { InputRadio } from "../../../Components/AllInput/AllInput";
import { setModalHeaderFooter } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { isCardIconOpen, setOrderStatusCardModal, setSelectedOption, setSubsequentOption } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { IOrderProjectType } from "../../../ReduxTool/Slice/Consumer/types";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { dcPowerBasedOnSanctionload } from "../../../Utils/commonFunctions";
import NewRadioButton from "../../../Components/New/RadioButton/NewRadioButton";
import { IconClose } from "../../../assests/icons/ModalIcons";

const SelfSetupCC = ({ item, setProjectId }: { item: IOrderProjectType, setProjectId: any }) => {
  const dispatch = useAppDispatch();
  const { roofAnalysis: { selectedOption,cardIconOpen } } = useAppSelector(state => state.consumerReducers);
  const [cardOrderId, setCardOrderId] = useState(item.projectid.substring(0, 8));
  const [initial, setInitial] = useState({ iTariff: "", isanctionload: 0 });
  const [showInfoContent, setShowInfoContent] = useState<Record<string, boolean>>({}); // Track each card's state
  
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
 
  // const ConfirmRadioList2 = [
  //   { label: "Yes", value: "Yes" },
  //   { label: "No", value: "No" },
  // ];
  const ConfirmRadioList = [
    { lablename: "Yes", name: "Yes" },
    { lablename: "No", name: "No" },
  ];

  const handleInnerRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (value === "Yes") {
      dispatch(setModalHeaderFooter({ title: "Update Order Details", btnTxt: "Update", secondaryBtnTxt: "", }));
      dispatch(setSubsequentOption("PVNxt Mode"));
      dispatch(setSelectedOption("Yes"));
      dispatch(setOrderStatusCardModal(true));
      setProjectId(item.projectid);
    } else {
      dispatch(setOrderStatusCardModal(false));
    }
  };
 
  return (
    <>

      <div className="flex flex-col md:flex-row max-w-md mx-auto bg-white border border-gray-200 border-t-4 border-t-gray-200 hover:border-t-custom-primary-default rounded-xl shadow-md overflow-hidden md:max-w-2xl m-4 transition-all duration-300 ease-in-out transform">
        {/* <div className="bg-custom-primary-default md:w-48 md:flex-shrink-0 flex items-center justify-center">
          <IconSelf />
        </div> */}
        <div className="p-6 w-full min-w-96">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center flex-row gap-2">
              <div className="btn btn-xs-outlineprimary">{item && item.installationmode}</div>
              {/* <div className="rounded-lg bg-orange-500 px-3 py-1.5 para-xs-semibold text-white uppercase tracking-wider hidden">In Progress</div> */}
            </div>
            {/* <div className="" onClick={contentHandler}><IconInfo /></div> */}
            <div onClick={() => contentHandler(cardOrderId)} style={{ cursor: 'pointer !important' }}>
              {!showInfoContent[cardOrderId] ? <IconInfo /> : <IconClose />}
            </div>
          </div>
          <div className="flex justify-start item-start flex-col mb-2">
            <h4 className="heading-sm">
              Order ID #{cardOrderId && cardOrderId}
            </h4>
            <p className="para-xs-semibold text-gray-600">
              {item && item.createddt.substring(0, 10)}  at 10:34 PM
            </p>
          </div>

          <ul className="para-sm text-slate-600 hidden">
            <li>Site Address: {item && (item.address.length > 75 ? item.address!.substring(0, 75) + "..." : item.address)}</li>
            <li>Project Type: {item && item.projecttype}</li>
            <li>AC/DC: {item && dcPowerBasedOnSanctionload(item.sanctionload)}/{item && (item.sanctionload)}kWp</li>
          </ul>

          <div className={`py-2`}>
            <label className="label-box1">Want pvNxt to handle your setup?</label>
            <div className="input-main2 p-0">
              {ConfirmRadioList.map((elm, ind) => {
                return (
                  <>
                    <NewRadioButton
                      value={elm.name}
                      name={item.projectname}
                      labelname={elm.lablename}
                      onClick={handleInnerRadioChange} selectedOption={"No"} />
                  </>
                );
              })}
            </div>
          </div>
          <div className={`${showInfoContent[cardOrderId] ? "block" : "hidden"}`}>
              <div className="max-w-xl h-px my-4 flex justify-center self-stretch bg-gradient-to-tr from-transparent via-neutral-600 to-transparent opacity-25 "></div>
            <h4 className="mb-2 para-md">
              Project Details
            </h4>
            <ul className="para-sm text-slate-600">
              <li> {item && (item.address.length > 44 ? item.address!.substring(0, 44) + "..." : item.address)}</li>
              <li>Project Type: {item && item.projecttype}</li>
              <li>AC/DC: {item && dcPowerBasedOnSanctionload(item.sanctionload)}/{item && (item.sanctionload)}kWp</li>
            </ul>
          </div>
        </div>
      </div>


      {/* <div className="card-content w-fit flex flex-col">
        <div className="card-body">
          <div className="flex flex-row space-x-[2vh]">
            <img src={require("../../../assests/img/Dashboard/rooftopimg.png")} className="header-img w-[6vh]" alt="..." />
            <div className="card-body w-full">
              <div className="body-title" data-bs-toggle="tooltip" title="Project name" > {item && item.projectname}</div>
              <div className="body-time">
                <div className="time-content" data-bs-toggle="tooltip" title="Created project date" > <IconClock /> Created On: {item && item.createddt.substring(0, 10)} </div>
                <button className="dark-sm-btn" data-bs-toggle="tooltip" title="Project status" > {item && item.installationmode} </button>
              </div>
              <div className="time-content" data-bs-toggle="tooltip" title={`${item&&item.address}`} ><div><IconPinDrop /></div> {item && (item.address.length>37?item.address!.substring(0, 37)+"...":item.address)}</div>
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
                  <td className="rvalue">{cardOrderId && cardOrderId}</td>
                  <td className="rvalue">{initial.iTariff || (item && item.projecttype)}</td>
                  <td className="rvalue">{item && dcPowerBasedOnSanctionload(item.sanctionload)}</td>
                  <td className="rvalue">  {item&&(item.sanctionload)} kWp</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="radio-main">
          <div className="section-label">Would you like to change the setup from Self to PVNxt?</div>
          <div className="radio-body">
            {ConfirmRadioList.map((elm,ind) => {
              return (
                <>
                  <NewRadioButton
                  value={elm.name}
                  name={item.projectname}
                  labelname={elm.lablename}
                  onClick={handleInnerRadioChange} selectedOption={"No"} />
                </>
              );
            })}
          </div>
        </div>
     <div className="h1"></div>      
      </div> */}
    </>
  );
};
 
export default SelfSetupCC;
