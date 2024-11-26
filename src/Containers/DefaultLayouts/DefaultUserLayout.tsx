import React, { PropsWithChildren } from "react";
import { AuthProps } from "../../Screen/User/types";
import "../../assests/scss/AllComponents.scss";

const DefaultUserLayout: React.FC<PropsWithChildren<AuthProps>> = ({children}) => {
  return (
    <div className="homepage-container flex relative h-[100vh] w-[100vw] lg:justify-center lg:items-center  lg:bg-primary-100">
      <div className="banner-left-container bg-white  flex flex-1 justify-center items-center lg:hidden">
        <div>
          <div className="text-center">
            <span className="text-[5.3vh] font-normal text-primary-200">
              pvNXT Portal
            </span>
            <div className="h2"></div>
            <p className="text-2.4xl font-normal text-primary-200">
              Your pv system designer.
            </p>
          </div>
          <div className="h4"></div>
          <div className="banner-image flex justify-center items-center ">
            <img
              // className="w-[40vw] lg:w-[50vw]"
              className="w-[40vw] "
              src={require("../../assests/svg/banner.png")}
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="banner-right-container bg-primary-100 w-[35vw] flex justify-center items-center ">
        {/* <span className="text-4.5xl font-medium text-white hidden ">
          pvNXT Portal
        </span> */}
        {children}
      </div>
    </div>
  );
};

export default DefaultUserLayout;
