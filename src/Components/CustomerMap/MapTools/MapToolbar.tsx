import { useEffect } from "react";
import { IconAdd, IconSub } from "../../../assests/icons/MapToolsIcons";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { Button } from "../../AllButton/AllButtons.tsx";
import {
  IconRsbDelete,
  IconRsbMeasure,
  IconRsbPolygon,
  IconRsbZoomIn,
  IconRsbZoomOut,
} from "../../../assests/icons/EPCIcons/Icons";
import { TTootip } from "../../../Screen/Consumer/RoofAnalysis/ConsumerRoofAnalysis";

const MapToolbar = ({ type }: { type?: string }) => {
  const dispatch = useAppDispatch();
  const { selected_project } = useAppSelector(
    (state) => state.consumerReducers.roofAnalysis
  );
  const newMapToolstitle = useAppSelector(
    (state) => state.mapToolsReducer.newMapToolstitle
  );

  useEffect(() => {
    if (newMapToolstitle !== "Shadow") {
      globalLayers.shadowCast("remove");
    }
    if (selected_project !== null) {
      // Remove the `id` attribute from the target element
      const element = document.getElementById("polygon"); // Replace "yourElementId" with the actual ID
      if (element) {
        element.removeAttribute("id");
      }
    }
  }, [newMapToolstitle, selected_project]);

  // const handleMapMarker = async () => {
  //   const coordDat = await getGeolocation();
  //   await addMarkerToMap(dispatch, globalLayers.view, coordDat.latitude, coordDat.longitude, markerSymbol3D, LocationMarker, globalLayers);
  // };

  return (
    // <>
    //   <div className=" flex flex-col space-y-4 ">
    //       <div className="sidebar bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-2 border-b-4 border-cusbg-custom-primary-default hover:border-cusbg-custom-primary-default rounded">
    //         <div id="customer-compass-widget" title="Compass"></div>
    //       </div>
    //       <div className={`flex flex-col space-y-4 `}>
    //         <Button
    //           className="bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-4 rounded"
    //           id="zoomIn"
    //           name={<IconAdd />}
    //         />
    //         <Button
    //           className="bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-4 rounded"
    //           id="zoomOut"
    //           name={<IconSub />}
    //         />
    //       </div>
    //     </div>
    // </>
    <>
      <div className="flex flex-col justify-end gap-4">
        <div
          className={`flex flex-col p-3 gap-4 w-fit h-fit bg-white rounded-md`}
        >
          <div className="relative group" style={{height:"24px"}}>
            <button style={{ width: "inherit" }} title="Zoom In" id="zoomIn">
              <IconRsbZoomIn />
            </button>
            <TTootip content="Zoom In" dir={"right"} />
          </div>
          <div className="relative group" style={{height:"24px"}}>
            <button style={{ width: "inherit" }} title="Zoom Out" id="zoomOut">
              <IconRsbZoomOut />
            </button>
            <TTootip content="Zoom Out" />
          </div>
        </div>

        <div
          className={`flex flex-col p-3 gap-4 w-fit h-fit bg-white rounded-md`}
        >
          <div className="relative group" style={{height:"24px"}}>
            <div
              style={{ width: "inherit" }}
              title="Compass"
              id="compass-widget"
            ></div>
            <TTootip content="Compass" dir={"right"} />
          </div>
        </div>

        {/* <div className={`flex flex-col p-3 gap-4 w-fit h-fit bg-white rounded-md`}>
          <button style={{ width: "inherit" }} title="Compass" id="compass-widget">
          </button>
        </div> */}
      </div>

      {/* <div className=" flex flex-col space-y-4 ">
  <div className="sidebar bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-2 border-b-4 border-cusbg-custom-primary-default hover:border-cusbg-custom-primary-default rounded">
    <div  id="customer-compass-widget"  title="Compass"></div>
  </div> */}
      {/* <div className="h2"></div> */}
      {/* <div className={`flex flex-col space-y-4 `}> */}
      {/* <div id="zoomIn"
      style={{ width: "inherit" }}
      title="Zoom In"
      className={`cursor-pointer bg-[#069FB1] p-2 h-6 rounded-sm`}
    >
      <IconAdd />
    </div> */}
      {/* <div id="zoomOut"
      style={{ width: "inherit" }}
      title="Zoom Out"
      className="cursor-pointer bg-[#069FB1] p-2 h-6 rounded-sm"
    >
      <IconSub />
    </div> */}
      {/*
    <Button className="bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-4 rounded" id="zoomIn" name={<IconAdd />} />
    <Button className="bg-custom-primary-default hover:bg-custom-primary-default text-white font-bold p-4 rounded" id="zoomOut" name={<IconSub />} />
  </div>
</div> */}
    </>
  );
};
export default MapToolbar;
