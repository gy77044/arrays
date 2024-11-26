import { useEffect, useRef } from "react";
import { setModalHeaderFooter } from "../../../ReduxTool/Slice/CommonReducers/CommonReducers";
import { saveProjectId, setProjectName, setRegionName, toggleWithRoof, } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setTitle, toggleDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setMarkerState, setNoRoofModal, setOpenDraw, setShowInfoModal, setToolTipModal, toggleRoofConfirmBtn, } from "../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { LocationMarker } from "../../../Utils/Const";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { fetchCompleteAddress, getStateFromCoordinates, loadMultipleModules, } from "../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { fetchKeepOutsRoofsByParentId, fetchRooffromCoordinates, } from "../../../Utils/CustomerMaps/Maps/fetchRoofFromCoordinates";
import { confirmRoofLocationonClick } from "../../../lib/Customer/MarkersFunctions/changeLocationMarker";
import { generateTheUniqueIdforProject } from "../../../Utils/commonFunctions";

const RoofConfirmBtn = () => {
  const { showConfirmBtn, position } = useAppSelector((state) => state.mapref);
  const { user } = useAppSelector((state) => state.auth);
  const { searchedMarker } = useAppSelector((state) => state.markers);
  const { projects } = useAppSelector((state) => state.consumerReducers);
 
  const dispatch = useAppDispatch();
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        dispatch(toggleRoofConfirmBtn(false));
      }
    }

    if (showConfirmBtn) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showConfirmBtn, dispatch]);

  async function handleBtn() {
    const [geometryEngine, Polygon, SimpleFillSymbol] = await loadMultipleModules([ "esri/geometry/geometryEngine", "esri/geometry/Polygon", "esri/symbols/SimpleFillSymbol", ]);
    confirmRoofLocationonClick();
    dispatch(toggleRoofConfirmBtn(false));
    globalLayers.userCurrentLocation = { lat: searchedMarker.lat, lng: searchedMarker.lng }
    
    fetchCompleteAddress(searchedMarker.lat,searchedMarker.lng,true)
      .then((ele:any) => {
        setTimeout(()=>{
          const inp = globalLayers.searchWidgetInput;
          if (inp && inp.container.querySelector(".esri-search__input") && ele) {
            inp.container.querySelector(".esri-search__input").value =ele;
          }
        },2000);
          // dispatch(setSerachedLocation(`${ele?.address}, ${ele?.city}, ${ele?.district}, ${ele?.state}, ${ele?.pincode}, ${ele?.countryAbbr}`))
      })
    let geometry = await fetchRooffromCoordinates( searchedMarker.lat, searchedMarker.lng );
    if (!geometry) {
      dispatch(toggleRoofConfirmBtn(false));
      // dispatch(setModalHeaderFooter({title: "Order New Roof",btnTxt: "Yes",secondaryBtnTxt: ""}));
      dispatch(setNoRoofModal(true));
      // return;
    }

    if (geometry) {
      await fetchKeepOutsRoofsByParentId(
        (globalLayers.selectedRoof.properties as any).id,
        ["watertank", "mumptystructure"],
        geometry,
        geometryEngine,
        Polygon,
        SimpleFillSymbol
      );
    }

    if (geometry) {
      getStateFromCoordinates(searchedMarker.lng, searchedMarker.lat).then(
        (stName) => {
          dispatch(setRegionName(stName));
        }
      );
      let useableGraphic: any = globalLayers.selectedGraphic;
      const id = generateTheUniqueIdforProject(
        user.fname,
        user.lname!,
        projects!.length
      );
      const area = geometryEngine.geodesicArea(geometry, "square-meters");
      const useablearea = geometryEngine.geodesicArea(
        useableGraphic.geometry,
        "square-meters"
      );
      dispatch(
        saveProjectId({ id: id, totalRoofArea: area, useablearea })
      );

      globalLayers.zoomToGeometry(geometry);

      globalLayers.graphicLayerLocation?.graphics.forEach((graphic) => {
        if (
          graphic.attributes &&
          graphic.getAttribute("name") === LocationMarker
        ) {
          globalLayers.graphicLayerLocation?.graphics.remove(graphic);
        }
        if (
          graphic.attributes &&
          graphic.getAttribute("title") === LocationMarker
        ) {
          globalLayers.graphicLayerLocation?.graphics.remove(graphic);
        }
      });
      dispatch(toggleRoofConfirmBtn(false));
      dispatch(setShowInfoModal(false));
      globalLayers.markerState = "move-stop";
      dispatch(setMarkerState(""));
      dispatch(setTitle("projectsetup"));
      dispatch(setProjectName(`PvNxtFP0${projects?.length??0}`));
      dispatch(toggleDrawer(true));
      dispatch(
        setToolTipModal({
          state: true,
          title: "Precise Analysis",
          content:
            "Let's work together to find the perfect solar solution for your home! To proceed, please fill out all details on the left.",
        })
      );
    }
    else {
      dispatch(setTitle(""));
      dispatch(setProjectName(`PvNxtFP0${projects?.length??0}`));
      dispatch(toggleWithRoof(true))
      dispatch(setOpenDraw(true))
      dispatch(setNoRoofModal(false))
      if (globalLayers.sketchButton.polygon) {
        globalLayers.sketchButton.polygon.click()
      }
      dispatch(setToolTipModal({ state: true, title: "Drawing Mode", content: `Click points on the map to draw an area of interest. Press ESC to cancel the drawing mode.` }))
    }
    

  }

  return (
    <>
      {showConfirmBtn && (
        <div
          ref={buttonRef}
          className="btn btn-sm-primary absolute"
          onClick={() => handleBtn()}
          id="killer"
          style={{
            top: `calc(${position.y + 30}px)`,
            left: `calc(${position.x - 87}px)`,
          }}
        >
          Confirm Roof Location
        </div>
      )}
    </>
  );
};

export default RoofConfirmBtn;
