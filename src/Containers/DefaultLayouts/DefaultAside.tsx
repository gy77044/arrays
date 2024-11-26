import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setTitle, toggleDrawer } from "../../ReduxTool/Slice/Drawer/DrawerReducer";
import { TtitlesPartner } from "../../ReduxTool/Slice/Drawer/DrawerTypes";
import { setInformationModal, setToolTipModal, toogleTooltip, } from "../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../ReduxTool/store/hooks";
import CustomerDrawerContainer from "../../Screen/Consumer/RoofAnalysis/ConsumerDrawerContainer";
import { getUserType } from "../../Utils/AuthRedirections";
import { getActivePageTitle } from "../../Utils/commonFunctions";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { DefaultAsideType } from "./AsideRouteLists";
import { useEffect } from "react";
import { TTootip } from "../../Screen/Consumer/RoofAnalysis/ConsumerRoofAnalysis";

const DefaultAside = ({ routeList }: { routeList: DefaultAsideType[] }) => {
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const Navigate = useNavigate();
  const userType = getUserType();
  let title = getActivePageTitle(pathname);
  const { selected_project} = useAppSelector((state) => state.consumerReducers.roofAnalysis);
  const { roofAnalysis: { formDetails, isWithRoof }, } = useAppSelector((state) => state.consumerReducers);
  let { displayDrawer, title: drawerTitle } = useAppSelector((state) => state.drawer);
  const { isBuildingThere, is3DMap } = useAppSelector((state) => state.mapref);
  if (pathname === "/Consumer/RoofAnalysis" || !title) {
    title = drawerTitle;
  }


  const handleClick = (item: any) => {
    dispatch(toogleTooltip({ dipy: 0, istooltip: "", msg: "" }));
    if (pathname.includes("/Consumer/RoofAnalysis")) {
      if(formDetails.quickplantAnalysis.environmentalImpact.carbonFootProint===""&&item.title==="projectsummary" && selected_project){
        toast.error("Please complete quick plant analysis",{toastId:"customerid"})
        return;
      }
    }
    if (
      pathname.includes("/Partner/RoofAnalysis") ||
      pathname.includes("/Admin/RoofAnalysis")
    ) {
      if (is3DMap) {
        toast.error("Please switch to 2D mode to enable editing", {toastId: "tab Error"});
        return;
      }
      if (!isBuildingThere) {
        dispatch(
          setToolTipModal({ state: false, title: "Locate your Roof", content: `Type your address or input the coordinates of your location in the search box.`})
        );
        return;
      }
      if (!sessionStorage.getItem("projectid")) {
        if (globalLayers.activeView === "3D") {
          dispatch(setInformationModal({ state: true, title: "Mode Switch", content: `You are currently in 3D mode. Please switch to 2D mode to enable editing.`}));
        } else {
          toast.error("Need to complete project setup.", {toastId: "customID",});
        }
        return;
      }
    } else {
     
    }
    if (item && item.path) {
      Navigate(item.path);
      return;
    }
    if (title === item.title) {
      dispatch(toggleDrawer(false));
      dispatch(setTitle(""));
    } else {
      if (!selected_project) {
        if ( isWithRoof !== null && formDetails.projectSetup.lat && item.title === "projectsetup") {
          dispatch(setTitle(item.title as TtitlesPartner));
          dispatch(toggleDrawer(true));
        }
        if (!formDetails.projectSetup.lat)
          dispatch(
            setToolTipModal({
              state: true,
              title: "Locate your Roof",
              content: `Type your address or input the coordinates of your location in the search box.`,
            })
          );
      } else {
        dispatch(setTitle(item.title as TtitlesPartner));
        dispatch(toggleDrawer(true));
      }
    }
  };

  return (
    <>
      {pathname == `/${userType}/RoofAnalysis` && displayDrawer && (
        <div className="absolute top-[3.8rem] left-[4.4rem]">
          <CustomerDrawerContainer />
        </div>
      )}
      <div className="bg-gradient-to-b from-custom-primary-default to-custom-primary-default/80 p-2 h-full">
        <div className="grow w-full h-full flex flex-col gap-8 justify-start items-center mt-4">
          {routeList.map((item: any) => (<>          
            <button onClick={() => { handleClick(item)}}  name="Logo" style={{ width: "inherit" }} title={item.title} className={`flex justify-center items-center hover:lls ${   title === item.title ? "lls lsbicons" : "" } ${   item.title === "summary" || item.title === "projectsetup"? "": ""}`}> <item.Icon /> </button>
          </>
          ))}
        </div>
      </div>
    </>
  );
};

export default DefaultAside;
