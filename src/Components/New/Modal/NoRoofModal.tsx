import Graphic from "@arcgis/core/Graphic";
import { useEffect } from "react";
import { bindButtontoSketchObject } from "../../../lib/Customer/bindButtontoSketch_depricated";
import { setCreatedId, setFormProjectSetup, setLatlng, toggleWithRoof } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setTitle, toggleDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setNoRoofModal, setOpenDraw, setToolTipModal } from "../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { newgeneratedId } from "../../../Utils/commonFunctions";
import { LocationMarker } from "../../../Utils/Const";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { addMarkerToMap, fetchCompleteAddress, getCityFromCoordinates } from "../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { Button } from "../../AllButton/AllButtons.tsx";
import { removeSearchedGraphic } from "../../../Utils/CustomerMaps/Maps/removeSearchedLocationGraphic";

const NoRoofModal = ({ setClose, }: { setClose: React.Dispatch<React.SetStateAction<boolean>>; }) => {

  const dispatch = useAppDispatch();
  const {roofAnalysis:{formDetails:{projectSetup}}} = useAppSelector(state=>state.consumerReducers);
  const {user:{projects}} = useAppSelector(state=>state.auth);

  const handleWithoutRoofBd = () => {
    console.log('object no',)


    let found = false;
    
    globalLayers.graphicLayerLocation?.graphics.forEach((ele: Graphic) => {
      if (ele.attributes && ele.attributes.name === LocationMarker) {
      found = true
           dispatch(setLatlng({lat:(ele.geometry as any).latitude,lng:(ele.geometry as any).longitude}));         
            getCityFromCoordinates((ele.geometry as any).longitude, (ele.geometry as any).latitude).then((city: string) => {
              dispatch(setCreatedId(newgeneratedId(city)));
            //   fetchCompleteAddress(event.graphics[0].geometry.longitude, event.graphics[0].geometry.latitude,true).then((searchAddress:any) => {
            //     setTimeout(()=>{
            //         const inp = globalLayers.searchWidgetInput;
            //         if (inp && inp.container.querySelector(".esri-search__input") && searchAddress) {
            //             inp.container.querySelector(".esri-search__input").value =searchAddress;
            //         }
            //     },2000);
            //     dispatch(setSerachedLocation(searchAddress));
            // });
            
            fetchCompleteAddress((ele.geometry as any).latitude, (ele.geometry as any).longitude,true)
              .then((res) => {
                setTimeout(()=>{
                  const inp = globalLayers.searchWidgetInput;
                  if (inp && inp.container.querySelector(".esri-search__input") && res) {
                      inp.container.querySelector(".esri-search__input").value =res;
                  }
              },2000);
              // 
                // dispatch(setSerachedLocation(res));
                dispatch(setFormProjectSetup({ ...projectSetup,projectname:`PvNxtFP0${(projects && projects.length)?projects.length+1:1}`, address: res,lng:(ele.geometry as any).longitude, lat:(ele.geometry as any).latitude }));
              });
            });
      }
    });
    if(!found){
      const { lat, lng } = globalLayers.userCurrentLocation;
      addMarkerToMap(dispatch, 'nomarker')
      dispatch(setLatlng({lat,lng}));         
        getCityFromCoordinates(lat, lng).then((city: string) => {
          dispatch(setCreatedId(newgeneratedId(city)));
        })
        fetchCompleteAddress(lat, lng,true)
              .then((res) => {
                setTimeout(()=>{
                  const inp = globalLayers.searchWidgetInput;
                  if (inp && inp.container.querySelector(".esri-search__input") && res) {
                      inp.container.querySelector(".esri-search__input").value =res;
                  }
              },2000);
              // 
                // dispatch(setSerachedLocation(res));
                dispatch(setFormProjectSetup({ ...projectSetup,projectname:`PvNxtFP0${(projects && projects.length)?projects.length+1:1}`, address: res,lng, lat }));
              });
        }
    dispatch(toggleWithRoof(false))
    dispatch(setTitle("projectsetup"))
    dispatch(toggleDrawer(true))
    setClose(false)
  }

  const handleBoundayBtn = () => {
    dispatch(toggleWithRoof(true))
    dispatch(setOpenDraw(true))
    dispatch(setNoRoofModal(false))
 
    if (globalLayers.sketchButton.polygon) {
      globalLayers.sketchButton.polygon.click()
    } else {
      if (dispatch) {                      
        dispatch(setOpenDraw(true))           
    }

      globalLayers.selectionTool = ''
      globalLayers.lastactiveTool = 'polygon'
      let name = 'poly' + globalLayers.polygonListCounts.length
      globalLayers.polygonListCounts.push(name)
      globalLayers.sketchVM.create("polygon");
      globalLayers.height = 0
      removeSearchedGraphic()

    }
    dispatch(setToolTipModal({ state: true, title: "Drawing Mode", content: `Click points on the map to draw an area of interest. Press ESC to cancel the drawing mode.` }))
  }

  useEffect(() => {
    bindButtontoSketchObject(dispatch)
  }, [])
  
  return (
    <>
      <div className="modal-backdrop1">
        <div className="main-modal2">
          <h4 className="heading heading-md-semibold">Ready to Solarize Your Roof?</h4>
          <p className="para para-md">Don't worry, we're here to help. Let's get started and unlock the power of the sun! 🌞. <br /><strong>Draw Your Roof</strong> it's as easy as drawing a stick figure! ✏️.</p>
          <div className="flex gap-4 max-sm:flex-col mt-4">
            <Button className="btn btn-sm-outlineprimary" name={"No, Cancel"} onClick={handleWithoutRoofBd} />
            <Button className="btn btn-sm-primary" name={"Draw Your Roof"} onClick={handleBoundayBtn} />
          </div>
        </div>
      </div>

    </>
  );
};

export default NoRoofModal;

export const NewRoofModal = () => {
  return (
    <>
      <p className=" text-1.6xl leading-[2.4vh] text-primary-400">1. Click on the map at the first corner point of your roof.</p>
      <p className=" text-1.6xl leading-[2.4vh] text-primary-400">2. Continue clicking points along the entire roof perimeter.</p>
      <p className=" text-1.6xl leading-[2.4vh] text-primary-400">3. Ensure you form a closed polygon for the entire roof area.</p>
      <p className=" text-1.6xl leading-[2.4vh] text-primary-400">4. After you're satisfied, click on "Analyze Your Roof Potential."</p>
      <p className=" text-1.6xl leading-[2.4vh] text-primary-400">5. Still have any query connect with <b>support@terranxt.com</b>.</p>
    </>
  );
};