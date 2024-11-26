import { ChangeEvent, useEffect, useRef, useState } from "react";
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { useAppDispatch, useAppSelector } from "../../../ReduxTool/store/hooks";
import { setGeomHeigth } from "../../../ReduxTool/Slice/Geometry/GeometryReducer";
import NewInput from "../../New/Input/NewInput";

const MapInfoModal = () => {
  // refs
  let viewRef = useRef<"sketch-layer" | "3d">("sketch-layer");
  let inputRef = useRef<HTMLInputElement | null>(null);

  // default states
  const [height, setHeight] = useState(0);
  const [tilt, setTilt] = useState(0);
  const [azimuth, setazimuth] = useState(15);

  // store dispatch or selector
  const dispatch = useAppDispatch();
  const { height: geomHeight, toggle } = useAppSelector(
    (state) => state.geometryData
  );

  const handleView = () => {
    if (viewRef.current === "sketch-layer") {
      viewRef.current = "3d";
      globalLayers.switchGraphicsView("3d");
    } else {
      viewRef.current = "sketch-layer";
      globalLayers.switchGraphicsView("sketch-layer");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setazimuth(e.target.valueAsNumber);
    globalLayers.azimuth = e.target.valueAsNumber;
  };

  const handleSave = () => {
    setHeight(0);
    dispatch(setGeomHeigth(height));
    globalLayers.height = height;
    globalLayers.azimuth = azimuth;
    globalLayers.addHeighttoGraphic(height, tilt, azimuth);
    setTilt(0);
    setazimuth(0);
    if (inputRef.current) {
      inputRef.current.value = "0";
    }
  };

  useEffect(() => {
    if (geomHeight && globalLayers.currentSelectedGraphic) {
      setHeight(globalLayers.currentSelectedGraphic);
    }
  }, [toggle]);

  return (
    <div
      id="mapinfomodal"
      className=" hidden h-[27vh] rounded-default  absolute right-[8px] bottom-[2vh] bg-white"
    ><div className="h2"></div>
      <div className="row p-2">
        {/* <input
          type="number"
          placeholder="height"
          ref={inputRef}
          value={height}
          onChange={(e) => {
            setHeight(e.target.valueAsNumber);
            globalLayers.height = e.target.valueAsNumber;
          }}
        /> */}

        <div className={`input-main`}>
          <div >
            <input
              id={"height"}
              placeholder="height"
              ref={inputRef}
              className={`input-box `}
             value={height}
             onChange={(e) => {
                setHeight(e.target.valueAsNumber);
                globalLayers.height = e.target.valueAsNumber;
              }}
            />
            <label className={`label-box `} htmlFor={"height"}>
            height
            </label>
          </div>
          
        </div>
      </div>
      <div className="row p-2">
        {/* <input type="number" placeholder="tilt" value={tilt} onChange={(e) => setTilt(e.target.valueAsNumber)} /> */}
        <NewInput
          id={"tilt"}
          labelname={"Tilt"}
          name={"tilt"}
          value={tilt}
          type={"number"}
          onChange={(e:any) => setTilt(e.target.valueAsNumber)}
          placeholder={"tilt"}
        />
      </div>
      <div className="row p-2">
        <NewInput
          id={"azimuth"}
          labelname={"Azimuth"}
          name={"sanctionload"}
          value={azimuth}
          type={"number"}
          onChange={(e: any) => handleChange(e)}
          placeholder={"azimuth"}
        />
        {/* <label htmlFor="azimuth">Azimuth</label>
                <input className="pl-0.4 rounded-default" type="number" id="azimuth" placeholder="azimuth" value={azimuth} onChange={(e) => handleChange(e)} /> */}
      </div>

      <div className="flex row pl-2">
        <button
          type="button"
          className="darkthin-sm-btn"
          onClick={() => handleSave()}
        >
          Add Height
        </button>
        {/* <button type="button" className=" ml-3  bg-primary-200 text-white" onClick={() => handleView()}>3D</button> */}
        <button
          type="button"
          className="darkthin-sm-btn ml-3"
          onClick={() => globalLayers.changeAzimuth()}
        >
          Change Azimuth
        </button>
      </div>
    </div>
  );
};

export default MapInfoModal;
