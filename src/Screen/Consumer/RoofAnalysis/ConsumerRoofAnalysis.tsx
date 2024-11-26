import Polygon from "@arcgis/core/geometry/Polygon";
import Graphic from "@arcgis/core/Graphic";
import SimpleFillSymbol from "@arcgis/core/symbols/SimpleFillSymbol";
import { useEffect, useMemo, useState } from "react";
import { NewModal } from "../../../Components/New/Modal/NewModal";
import NoRoofModal from "../../../Components/New/Modal/NoRoofModal";
import TooltipModal from "../../../Components/New/Modal/ToolTipModal";
import {
  setTitle,
  toggleDrawer,
} from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { LocationMarker } from "../../../Utils/Const";
import { pvHandleRoofTop } from "../../../Utils/CustomerMaps/GenerateRoof/GenrateRoof";

//map import consument not working fine
import { IconRsbDelete, IconRsbMarker, IconRsbPolygon } from "../../../assests/icons/EPCIcons/Icons";
import {
  IconBigPolyline
} from "../../../assests/icons/MapToolsIcons";
import MapArea from "../../../Components/CustomerMap/Map/MapArea";
import MapToolbar from "../../../Components/CustomerMap/MapTools/MapToolbar";
import InfomationContent from "../../../Components/New/Modal/InfomationContent";
import { getGeolocation } from "../../../lib/getGeolocation";
import { ProjectTy } from "../../../ReduxTool/Slice/Auth/types";
import {
  getStateDiscom,
  getTerrifData,
} from "../../../ReduxTool/Slice/CommonReducers/CommonActions";
import { setDiscomList } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers";
import {
  getCostBracket
} from "../../../ReduxTool/Slice/Consumer/ConsumerActions";
import {
  obstructionArea,
  resetRoofAnalisisForm,
  setRegionName,
  toggleWithRoof,
} from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import {
  clearBoundryandDataModal,
  setIsBuildingDrawn,
  setNoRoofModal,
  setRightClick,
  setShowInfoModal,
  setToolTipModal,
  toogleTooltip
} from "../../../ReduxTool/Slice/Map/MapReducer";
import { getGraphic } from "../../../Utils/CustomerMaps/Maps/getFucntion";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import {
  addMarkerToMap,
  getStateFromCoordinates,
} from "../../../Utils/CustomerMaps/Maps/LazyloadMap";
import {
  getsimpleFillSymbol,
  markerSymbol,
} from "../../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols"; //fine
import ClearBoundryModal from "../../../Components/New/Modal/ClearBoundryModal";
import { deleteProjectbyId, getProjectsByProjectid } from "../../../ReduxTool/Slice/Consumer/ProjectServices/projectServices";
import { loadEsriModules } from "../../../Utils/CustomerMaps/Maps/getEsriModules";
import { bindButtontoSketchObject } from "../../../lib/Customer/bindButtontoSketch_depricated";

const innerContent = {
  locate: {
    content: `Please locate your roof by moving the marker to its exact position on the map. Your input will assist us in accurately identifying your roof.`,
    title: "Locate Roof",
  },
  confirm: {
    content: `Please click on the button "Confirm Roof Location" to confirm the location you've selected. Your confirmation is essential for accurate record-keeping.`,
    title: "Confirm Roof Location",
  },
} as Record<"locate" | "confirm", any>;
const CustomerRoofAnalysis = () => {
  const dispatch = useAppDispatch();
  const openDraw = useAppSelector((state) => state.mapref.openDraw);
  const { informationModal, isToolTip, tooltipModal, boundryandDataModal, isBuildingThere } = useAppSelector(
    (state) => state.mapref
  );
  const {
    roofAnalysis: { selected_project, esriDraw, isWithRoof },
    isLoading,
  } = useAppSelector((state) => state.consumerReducers);
  const { userid, projects } = useAppSelector((state) => state.auth.user);
  const { searchedMarker } = useAppSelector((state) => state.markers);
  const { openNoRoof } = useAppSelector((state) => state.mapref);
  const [isActive, setIsActive] = useState<string | null>(null);
  const { displayDrawer } = useAppSelector((state) => state.drawer);


  useEffect(() => {
    let projectid = sessionStorage.getItem("projectid");
    if (projectid) {
      bindInitialData(projectid);
    } else {
      if (globalLayers.sketchVM && globalLayers.sketchVM.destroy) {
        globalLayers.sketchVM?.destroy();
      }
      if (globalLayers.indiLayers) {
        globalLayers.indiLayers.visible = false;
        globalLayers.indiLayers?.removeAll();
        // globalLayers.deleteSelectedGraphics();
        globalLayers.sketchLayers?.removeAll();
      }
    }
  }, []);
  const bindInitialData = async (projectid: string) => {
    try {
      const { payload } = await dispatch(getProjectsByProjectid(projectid));
      if (typeof payload == "object") {
        const stName = await getStateFromCoordinates(payload.lng, payload.lat);
        dispatch(setRegionName(stName));
        await dispatch(getStateDiscom(stName)); // Assuming getStateDiscom returns a promise
        await dispatch(getTerrifData((payload.providerid as any)));
        await dispatch(getCostBracket(payload.sanctionload));
        await bindGraphicsLayer(payload as ProjectTy);
        dispatch(setTitle("projectsetup"));
        dispatch(toggleDrawer(true));
      } else {
        throw Error("There was an issue. Please try again later.");
      }
    } catch (err) {
      console.log(err);
    }
  };
  const bindGraphicsLayer = async (selectedProject: ProjectTy) => {
    if (selectedProject.graphicLayer === "") {
      dispatch(toggleWithRoof(false));

      const point = {
        type: "point",
        longitude: selectedProject.lng,
        latitude: selectedProject.lat,
      };
      let pointGraphic = new Graphic({
        geometry: point as any,
        symbol: markerSymbol as any,
        attributes: {
          name: LocationMarker,
        },
      });
      globalLayers.LocationMarkerPointGraphic = pointGraphic;
      // globalLayers.sketchVM.complete()
      globalLayers.graphicLayerLocation?.graphics.forEach((ele: Graphic) => {
        if (ele.attributes && ele.attributes.name === LocationMarker) {
          globalLayers.graphicLayerLocation?.graphics.remove(ele);
        }
      });

      globalLayers.graphicLayerLocation?.graphics.addMany([pointGraphic]);
      return;
    }
    try {
      const graphicLayer = JSON.parse(selectedProject.graphicLayer!);
      dispatch(toggleWithRoof(true));
      if (Object.keys(graphicLayer).includes("features")) {
        const rings = graphicLayer.features[0].geometry.coordinates;

        const selectedPolygon = new Polygon({
          rings: rings,
          spatialReference: { wkid: 4326 }, // Assuming the coordinate system is WGS84 (EPSG:4326)
        });
        const symbol = new SimpleFillSymbol(
          getsimpleFillSymbol([173, 150, 50, 0.5], [150, 55, 0])
        );
        const graphic = getGraphic(selectedPolygon, symbol, {
          title: "roofboundry",
        });

        globalLayers.selectedGraphic = graphic;

        setTimeout(() => {
          globalLayers.sketchLayers?.graphics.remove(
            globalLayers.selectedGraphic!
          );
          globalLayers.sketchLayers?.graphics.add(
            globalLayers.selectedGraphic!
          );

          try {
            globalLayers.zoomToGeometry(globalLayers.selectedGraphic!.geometry);
          } catch (error) {
            console.error(error);
          }

          if (globalLayers.selectedGraphic) {
            globalLayers.map?.layers.forEach((e) => {
              if (
                e.title &&
                (e.title as string).toLowerCase().includes("solar")
              ) {
                globalLayers.map?.layers.remove(e);
              }
              if (e.title && e.title === "RoofTop Module1") {
                globalLayers.map?.layers.remove(e);
              }
            });
            let title =
              globalLayers.roofTitlename +
              globalLayers.roofTopModuleCount.length;
            pvHandleRoofTop(
              globalLayers.selectedGraphic!.geometry,
              globalLayers.elevationP,
              title,
              selectedProject.projectid
            );
          } else {
            console.warn("No, polygon found, for this project.");
          }
        }, 1000);
      } else if (graphicLayer.geometry) {
        const selectedPolygon = new Polygon({
          rings: graphicLayer.geometry.rings,
          spatialReference: { wkid: 102100 },
        });
        const symbol = new SimpleFillSymbol(
          getsimpleFillSymbol([173, 150, 50, 0.5], [150, 55, 0])
        );
        const graphic = getGraphic(selectedPolygon, symbol, {
          title: "roofboundry",
        });
        globalLayers.selectedGraphic = graphic;

        setTimeout(() => {
          globalLayers.sketchLayers?.graphics.remove(
            globalLayers.selectedGraphic!
          );
          globalLayers.sketchLayers?.graphics.add(
            globalLayers.selectedGraphic!
          );

          if (
            globalLayers.selectedGraphic &&
            globalLayers.selectedGraphic.geometry
          ) {
            if (globalLayers.selectedGraphic!.geometry) {
              try {
                globalLayers?.zoomToGeometry(
                  globalLayers.selectedGraphic!.geometry
                );
              } catch (error) {
                console.error(error);
              }
            }
          }

          if (globalLayers.selectedGraphic) {
            globalLayers.map?.layers.forEach((e) => {
              if (
                e.title &&
                (e.title as string).toLowerCase().includes("solar")
              ) {
                globalLayers.map?.layers.remove(e);
              }
              if (e.title && e.title === "RoofTop Module1") {
                globalLayers.map?.layers.remove(e);
              }
            });
            let title =
              globalLayers.roofTitlename +
              globalLayers.roofTopModuleCount.length;
            //
            pvHandleRoofTop(
              globalLayers.selectedGraphic!.geometry,
              globalLayers.elevationP,
              title,
              selectedProject.projectid
            );
          } else {
            console.warn("No, polygon found, for this project.");
          }
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleRedraw = (e: any) => {
    dispatch(setDiscomList([]));
    globalLayers.graphicLayerLocation?.graphics.forEach((ele: Graphic) => {
      if (ele.attributes && ele.attributes.name === LocationMarker) {
        globalLayers.graphicLayerLocation?.graphics.remove(ele);
      }
    });
    if (globalLayers.sketchLayers?.graphics.length) {
      globalLayers.sketchLayers?.removeAll();
    }
    dispatch(setIsBuildingDrawn(false))
    setIsActive(globalLayers.sketchVM.activeTool);
    dispatch(obstructionArea(null));
    dispatch(setTitle(""));
    dispatch(toggleDrawer(false));
    dispatch(resetRoofAnalisisForm());
    if (e.key === "Delete") {
      let hndleDelete = document.getElementById("polygon") as HTMLElement;
      if (hndleDelete) {
        hndleDelete.click();
      }
    }
    let activeDraw = document.getElementById("polygon") as HTMLElement;
    if (activeDraw) {
      activeDraw.click();
    }
    // sketchVM.state
  };

  const handleNoRoofClick = () => {
    let newdata = {
      latitude: searchedMarker && searchedMarker.lat,
      longitude: searchedMarker && searchedMarker.lng,
      userid: userid && userid,
    };
  };

  const handleMapMarker = async () => {
    dispatch(setRightClick(""));
    setIsActive("mylocation");
    const { latitude, longitude } = await getGeolocation();
    globalLayers.userCurrentLocation = { lat: latitude, lng: longitude };
    // const { view, userCurrentLocation } = globalLayers;
    // const { lat, lng } = userCurrentLocation;
    if (globalLayers.sketchVM.activeTool === "polygon") {
      globalLayers.sketchVM.cancel();
    }
    // Add the marker to the map
    addMarkerToMap(dispatch);
  };
  const handleDrawClick = () => {
    setIsActive(globalLayers.sketchVM.activeTool);
    dispatch(setRightClick(""));
  };
  const setNewMarker = () => {
    if (globalLayers.sketchVM.activeTool) {
      globalLayers.sketchVM.cancel();
    }
    if (globalLayers.sketchLayers?.graphics.length) {
      globalLayers.sketchLayers?.graphics.removeAll();
    }
    const { view, userCurrentLocation } = globalLayers;
    const { lat, lng } = userCurrentLocation;
    if (!globalLayers.sketchLayers?.graphics.length) {
      // if(globalLayers.graphicLayerLocation){
      //   globalLayers.graphicLayerLocation?.graphics.remove(globalLayers.LocationMarkerPointGraphic!);
      // }
      globalLayers.trackMarker = true;
    } else {
      globalLayers.trackMarker = false;
    }
    // Add the marker to the map
  };

  const handleClosePopUp = () => {
    dispatch(toogleTooltip({ dipy: 0, istooltip: "", msg: "" }));
    dispatch(setToolTipModal({ state: false, title: "", content: "" }));
  };
  const handleClose = () => {
    dispatch(setShowInfoModal(false));
  };
  useEffect(() => {
    if (tooltipModal) {
      document.addEventListener("mousedown", handleClosePopUp);
    }
    document.addEventListener("mousedown", handleClose);
    if (globalLayers.sketchVM.activeTool === null) {
      setIsActive("");
    }
    if (globalLayers.sketchVM.activeTool === "polygon") {
      setIsActive("polygon");
    }
    if (informationModal) {
      document.addEventListener("mousedown", handleClosePopUp);
    }

    return () => {
      document.removeEventListener("mousedown", handleClosePopUp);
    };
  }, [tooltipModal, globalLayers.sketchVM.activeTool, informationModal]);

  const MemoMap = useMemo(() => MapArea, []);

  const handleClearMapData = async () => {
      if(!selected_project) return
      if(!selected_project.projectid) return;
      const [Sketch] = await loadEsriModules(["esri/widgets/Sketch"]);
      
      let sketchObject = {
        view: globalLayers.view,
        layer: globalLayers.activeView === "2D" ? globalLayers.sketchLayers : globalLayers.graphic3dLayers!,
        creationMode: "update",
        tooltipOptions: { enabled: true },
        labelOptions: { enabled: true },
        multipleSelectionEnabled: true,
        snapOptions: globalLayers.snapOptions,
        enableSnapping: true,
        defaultUpdateOptions: {
            polygonSymbol: new SimpleFillSymbol(
                getsimpleFillSymbol([173, 150, 50, 0.5], [150, 55, 0])
            )
        }
    }

      // call projetc delete api 
      // then remove 
      const data = await dispatch(deleteProjectbyId(selected_project.projectid))

      globalLayers.sketchLayers?.graphics.removeAll();
      if(globalLayers.sketchLayers?.graphics.destroyed){
        globalLayers.sketchLayers?.graphics.destroy()
      }
      
      globalLayers.skecthVMRefresh(Sketch, sketchObject);
      globalLayers.selectedGraphic = null;
      dispatch(setIsBuildingDrawn(false))
      dispatch(toggleDrawer(false));

      await bindButtontoSketchObject()

      setTimeout(() => {

        dispatch(setTitle(''))
        dispatch(
          setToolTipModal({
            state: true,
            title: "Search Location/Add Marker",
            content: `Search your address/Right click on the map to confirm the desired roof.`,
          })
        );

        dispatch(clearBoundryandDataModal(false))

        addMarkerToMap(dispatch)

        globalLayers.isSavedProject = false
        window.location.reload()

        

      },500)
  }

  const handleCloseClear = () =>{
    globalLayers.sketchVM.complete();
    globalLayers.stopSketch();
    dispatch(clearBoundryandDataModal(false))
  }
  return (
    <>
      {isToolTip.istooltip && (
        <InfomationContent
          displayDrawer={displayDrawer}
          isToolTip={isToolTip}
        />
      )}
      {openNoRoof && (
        <NewModal
          name={"Model Name"}
          btnName={"Button Name"}
          onClick={handleNoRoofClick}
          children={
            <NoRoofModal setClose={() => dispatch(setNoRoofModal(false))} />
          }
          setIsCLose={() => dispatch(setNoRoofModal(false))}
        />
      )}
      {boundryandDataModal && (
        <NewModal
          name={"Model Name"}
          btnName={"Button Name"}
          onClick={() => {}}
          children={ 
            <ClearBoundryModal 
              closeBtnText="No, Cancel" 
              successBtnText="Yes, let's redesign!" 
              onSubmit={() => handleClearMapData()} 
              setClose={() => handleCloseClear()} 
              heading={"Time for a Solar Makeover!"}
              subheader={`Want to tweak your solar design? No problem! Click <strong>"Yes"</strong> to start fresh and design your solar setup.`} 
            />
          }
          setIsCLose={() => dispatch(clearBoundryandDataModal(false))}
        />
      )}
      {tooltipModal && (
        <TooltipModal
          modaltitle={"title"}
          content={"content"}
          setClose={() =>
            dispatch(setToolTipModal({ state: false, title: "", content: "" }))
          }
        />
      )}
      <div className="map-container [@media(width:768px)]:">
        <div className="map-area relative">
          <MemoMap />
          <div className={`absolute flex justify-center top-[10vh] left-[50%] bg-white p-0.6 rounded-default  ${esriDraw ? "" : "hidden pointer-events-none"}`}        >
            <div id="bigPolyline" style={{ width: "inherit" }} title="Polygon" className="maptool-icons-container mapTool-icon-content text-yellow-100"  >
              <IconBigPolyline />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-6 h-[calc(100vh-8.5vh)]">
          <div className="mapTools flex flex-col justify-between h-[88lvh] my-4">
            <div className="flex flex-col justify-start gap-4">
              <div className={`${selected_project || globalLayers.selectedGraphic ? "" : "cursor-pointer flex flex-col p-3 gap-4 w-fit h-fit bg-white rounded-md"}`}>
                <div className="relative group">
                  <button style={{ width: "inherit" }} id="" className={`${isBuildingThere ? "hidden" : "cursor-pointer block"} ${isActive === "mylocation" ? "" : ""}  ${selected_project ? "hidden" : "cursor-pointer"} `} disabled={selected_project ? true : false} onClick={handleMapMarker}>
                    <IconRsbMarker />
                  </button>
                  <TTootip content="Current Location" dir={"right"}/>
                </div>
               { !selected_project?.iscompleted&&<div className="relative group">
                  <button style={{ width: "inherit" }} className={`${isBuildingThere ? "hidden" : "cursor-pointer block"} `} id="polygon" disabled={selected_project || isWithRoof === false ? true : false} onClick={handleDrawClick}>
                    <IconRsbPolygon />
                  </button>
                  <TTootip content="Draw Roof Area" dir={"right"}/>
                </div>}
              </div>
              <div className={`${selected_project || !globalLayers.sketchLayers?.graphics.length ? "hidden" : "cursor-pointer flex flex-col p-3 gap-4 w-fit h-fit bg-white rounded-md"}`}>
                <div className="relative group">
                  <button style={{ width: "inherit" }} id="delete_layer" className={`${isActive === "redrawarea" ? "" : ""} ${selected_project || !globalLayers.sketchLayers?.graphics.length ? "hidden" : "cursor-pointer"} `} disabled={selected_project || isWithRoof === false ? true : false} onClick={(e) => handleRedraw(e)}>
                    <IconRsbDelete />
                  </button>
                  <TTootip content="Redraw Roof Area" dir={"right"}/>
                </div>
              </div>
            </div>
            <MapToolbar />
          </div>
        </div>
        {/* <div className="absolute top-0 right-4 h-[calc(100vh-8.5vh)]">
          <div className={` flex justify-start space-y-4 flex-col `}>
            <button
              disabled={selected_project ? true : false}
              onClick={handleMapMarker}
              style={{ width: "fit", fontFamily: "sans-serif" }}
              title="Mark map center as my location"
              className={`${selected_project || globalLayers.selectedGraphic     ? "hidden"     : "cursor-pointer"     } ${isActive === "mylocation" ? "" : ""     } bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-2 rounded  ${selected_project ? "hidden" : "cursor-pointer"     } `} >
              <IconMarker />
              {/* <span className="mapBtn">My Location</span>
            </button>
            <button
              onClick={handleDrawClick}
              disabled={selected_project || isWithRoof === false ? true : false}
              style={{ width: "inherit" }}
              id="polygon"
              title="Draw Roof"
              className={`${isActive === "polygon" ? "" : ""     } bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-2 rounded ${selected_project || globalLayers.sketchLayers?.graphics.length       ? "hidden"       : "cursor-pointer"     } `} >
              <IconDrawPen />
              {/* <span className="mapBtn"> Draw Roof</span>
            </button>
            <button
              disabled={selected_project || isWithRoof === false ? true : false}
              onClick={(e) => handleRedraw(e)}
              style={{ width: "inherit" }}
              id="delete_layer"
              title="Redraw Roof"
              className={`${isActive === "redrawarea" ? "" : ""
                } bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-2 rounded ${selected_project || !globalLayers.sketchLayers?.graphics.length
                  ? "hidden"
                  : "cursor-pointer"
                } `}
            >
              <IconReDraw />
              {/* <span className="mapBtn"> Redraw Roof</span>
            </button>
          </div>
          <MapToolbar />
        </div>
        <div className="absolute top-0 right-0 h-[calc(100vh-8.5vh)]">
          <button
            title="3D View"
            onClick={() => dispatch(showBuildingToggle(!showBuilding))}
            className="hidden"
          >
            <Icon3D />
          </button>
          <button
            title="Location Marker"
            onClick={() => globalLayers.toggleLocationPin()}
            className="hidden"
          >
            <IconPin />
          </button>
        </div> */}
      </div>
      {/* <div className="footer-container bg-primary-600"><Footer /></div> */}
    </>
  );
};




export default CustomerRoofAnalysis;

interface itootip {
  content?: string,
  link?: string
  dir?:"right"|"left"
}
export const TTootip = ({ content = "Explore", link,dir="right" }: itootip) => {
  return (
    <>
      <div className={`hidden group-hover:block group-hover:transition p-2 para-md rounded-md group-hover:w-36 capitalize group-hover:bg-white ${dir==="right"&&"right-[4.2vh]"} ${dir==="left"&&"left-[4.2vh]"} `} style={{  position: "absolute", top: "-1vh", color:"#1f2937" }}>
      <span className=""> {content} <a href={"/"} className={"tt-link1"}> {link}</a> </span>
      <div className="tt-arrow3"></div>
    </div>

      {/* <div className="bg-custom-primary-default text-gray-200 p-3 right-[4.2vh] rounded-md group-hover:flex hidden absolute top-1/2 w-fit -translate-y-1/2 -left-36 translate-x-0">
        {content}
        <a href={"/"} className={"tt-link1"}>
            {link}
          </a>
        <div className="tt-arrow3"></div>
      </div> */}

    </>
  )
}