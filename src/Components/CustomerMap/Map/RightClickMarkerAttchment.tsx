import { setTitle, toggleDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setNoRoofModal, setRightClick } from "../../../ReduxTool/Slice/Map/MapReducer";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { addMarkerToMap } from "../../../Utils/CustomerMaps/Maps/LazyloadMap";
import { Button } from "../../AllButton/AllButtons.tsx";
 
 
const RightClickMarkerAttchment = () => {
  const dispatch = useAppDispatch();
  const { rightClick, zoomlevel, showConfirmBtn,lat,lng } = useAppSelector((state) => state.mapref); 
  const toastId = "custom_id_toast"; 
  
  const addMarker = ()=>{
    if(globalLayers.sketchLayers){
      globalLayers.sketchLayers.graphics.removeAll();
    }
    dispatch(toggleDrawer(false))
    dispatch(setTitle(""))

    if(globalLayers.sketchVM.activeTool === 'polygon'){
      globalLayers.sketchVM.cancel();
    }
    addMarkerToMap(dispatch, 'nomarker');
    dispatch(setNoRoofModal(true))
    dispatch(setRightClick(''))
  }
  return (
    <>
      <div
        className="flex flex-col h-auto rounded-default gap-2 py-1 absolute "
        style={{
          left: globalLayers.markerLocation.x,
          top: globalLayers.markerLocation.y,
        }}
      >
        {!showConfirmBtn && rightClick === "start" && (
          // <button
          //   className="btn-lg text-1.4xl px-1 py-1 "
          //   onClick={addMarker}
          // >
          // Mark Location
          // </button>
                    <Button className="btn btn-sm-outlineprimary" name="Mark Location" onClick={addMarker} />
        )}
      </div>
    </>
  );
};
 
export default RightClickMarkerAttchment;