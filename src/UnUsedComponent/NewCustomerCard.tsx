import React from "react";
import { IconClock, IconPinDrop } from "../assests/icons/DrawerIcons";
import { formatDate } from "../Utils/commonFunctions";

const NewCustomerCard = () => {
  return (
    <>
      <div className="card-content flex flex-col  space-y-[2vh] w-[80vh] h-fit rounded-lg">
        <div className="flex flex-row ">
          <div className="flex flex-col">
            <div
              className="card-header px-2 "
              data-bs-toggle="tooltip"
              title="Map"
            >
              <img
                src={require("../../../assests/img/Dashboard/rooftopimg.png")}
                className="w-[10vh]"
                alt="..."
              />
              <div className="flex justify-between items-center text-1xl font-light">
                <div
                  className="flex items-center py-1"
                  data-bs-toggle="tooltip"
                  title="Created project date"
                >
                  <IconClock />
                  Created On: {formatDate(new Date())}
                </div>
              </div>
            </div>
            
            <div
              className="relative cursor-pointer flex justify-evenly items-center h-fit "
              title="Profile"
            >
              <div>
                <div className="relative h-[4vh] w-[4vh] font-normal text-1xl flex justify-center items-center  text-primary-200 bg-yellow-200 border-[0.1vh] border-primary-200 rounded-full pt-[0.2vh]">
                  8kW
                </div>
                <div className=" text-1.2xl flex justify-center items-center  text-primary-200 leading-[3vh]">
                  AC Cap
                </div>
              </div>
              <div>
                <div className="relative h-[4vh] w-[4vh] font-normal text-1xl flex justify-center items-center  text-primary-200 bg-yellow-200 border-[0.1vh] border-primary-200 rounded-full pt-[0.2vh]">
                  10kWp
                </div>
                <div className=" text-1.2xl flex justify-center items-center  text-primary-200 leading-[3vh]">
                  DC Cap
                </div>
              </div>
              {/* <div className="absolute w-[1vh] h-[1vh] bottom-[1vh] ml-2 bg-green-100 border-[0.2vh] border-white rounded-full"></div> */}
            </div>
          </div>
          <div className="flex-1 px-1 m-auto">
            <div>
            <span className="text-brown-300 text-1.4xl font-bold">Project Name: </span>
            <span className="text-brown-300 text-1.4xl font-light">Noida_Rooftop_Demo_Project2</span>
            </div>
            <div>
            <span className="text-brown-300 text-1.4xl font-bold">Location Name: </span>
            <span className="text-brown-300 text-1.4xl font-light">12/4, Sec 62, Noida, Uttar Padesh</span>
            </div>
            <div className="">
            <span className="text-brown-300 text-1.4xl font-bold">Location Coordinates: </span>
            <span className="text-brown-300 text-1.4xl font-light">Location Coordinates</span>
            </div>
            <div>
            <span className="text-brown-300 text-1.4xl font-bold">Est Annual Plant Generation: </span>
            <span className="text-brown-300 text-1.4xl font-light">Not calculated</span>
            </div>



          </div>
        </div>

        <div className="table-main">
          {/* <div className="table-name">Roof Details</div> */}
          <div>
            <span className="text-brown-300 text-1.4xl font-bold ">Project Status: </span>
            <span className="text-brown-300 text-1.4xl font-light">Terranxt Installation</span>
            </div>
          <table className="table border-none">
            <thead className="thead">
              <tr>
                <th className="hvalue">Stages</th>
                <th className="hvalue">Status Date</th>
                <th className="hvalue">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr className="trow">
                <td className="rheading">Contract Sign</td>
                <td className="rvalue">12 Nov, 2023</td>
                <td className="rvalue">Contract Copy Link</td>
              </tr>
              <tr className="trow">
                <td className="rheading">Preliminary Site Investigation</td>
                <td className="rvalue">13 Nov, 2023</td>
                <td className="rvalue">Site Investigation Report Link</td>
              </tr>
              <tr className="trow">
                <td className="rheading">Equipment Delivery</td>
                <td className="rvalue">14 Nov, 2023</td>
                <td className="rvalue">Delivery Report Link</td>
              </tr>
              <tr className="trow">
                <td className="rheading">Commercial Operation Date</td>
                <td className="rvalue">16 Nov, 2023</td>
                <td className="rvalue">Fat Report Link</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default NewCustomerCard;
