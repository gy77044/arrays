import Point from "@arcgis/core/geometry/Point.js";
import Compass from "@arcgis/core/widgets/Compass.js";
import { useEffect, useMemo, useRef, useState } from "react";
import { resetRoofAnalisis } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setTitle, toggleDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { handleMapClickEvents } from "../../../Utils/CustomerMaps/Maps/Map";
import { pointerMove } from "../../../Utils/CustomerMaps/Maps/pointerMove";
import { watchLocationMarkerChanges } from "../../../lib/watchChanges";
import InfoSlider from "../../InfoModal/InfoSlider";
import LoadingScreen from "../../Loader/LoadingScreen";
import RoofConfirmBtn from "../RoofButton/RoofConfirmBtn";
import {
  clearBoundryandDataModal,
  setToolTipModal,
  toggleRoofConfirmBtn,
} from "./../../../ReduxTool/Slice/Map/MapReducer";
import {
  useAppDispatch,
  useAppSelector,
} from "./../../../ReduxTool/store/hooks";
import globalLayers from "./../../../Utils/CustomerMaps/Maps/GlobaLMap";
import {
  AddSearchWidget,
  addDrawEvents,
  addMarkerToMap,
} from "./../../../Utils/CustomerMaps/Maps/LazyloadMap";
import RightClickMarkerAttchment from "./RightClickMarkerAttchment";
import SketchViewModel from "@arcgis/core/widgets/Sketch/SketchViewModel";
import { NewModal } from "../../New/Modal/NewModal";
import NoRoofModal from "../../New/Modal/NoRoofModal";



export default function MapArea() {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const { showConfirmBtn, showInfoModal } = useAppSelector((state) => state.mapref);
  const { selected_project } = useAppSelector((state) => state.consumerReducers.roofAnalysis);
  const [loading, setLoading] = useState(true);
  const initialRender = useRef(false);
  const dispatch = useAppDispatch();

  const InitializeMap = async () => {
    try {
      let lat = 19.08489;
      let lng = 72.85669;

      const getGeolocation = (): Promise<{
        latitude: number|undefined;
        longitude: number|undefined;
      }> => {
        return new Promise((resolve, reject) => {
          if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                resolve({ latitude, longitude });
              },
              (error) => {
                console.error("Error getting geolocation:", error.message);
                resolve({ latitude: undefined, longitude: undefined });
              }
            );
          } else {
            console.error("Geolocation is not supported by your browser");
            resolve({ latitude: undefined, longitude: undefined });
          }
        });
      };

      const { latitude, longitude } = await getGeolocation();
      if (selected_project?.lat && selected_project?.lng) {
        lat = selected_project.lat;
        lng = selected_project.lng;
        globalLayers.userCurrentLocation = {
          lat: selected_project.lat,
          lng: selected_project.lng,
        };

        // dispatch(setLatlng({ lat, lng }))
      } else {
        // lat = latitude;
        // lng = longitude;
        // dispatch(setLatlng({ lat:latitude, lng:longitude }))
        globalLayers.userCurrentLocation = {
          lat: latitude!,
          lng: longitude!,
        };
      }

      // dispatch(setLatlng({ lat, lng }))
      await globalLayers.initialiseProps(mapRef, lng, lat, dispatch);
      if(globalLayers.indiLayers){
        globalLayers.indiLayers.visible = false;
      }
      if (globalLayers.graphic3dLayers) {
        globalLayers.graphic3dLayers.visible = true;
      }

      if (!mapRef.current) {
        return;
      }

      globalLayers.view?.on("click", (e) =>
        handleMapClickEvents(e, showConfirmBtn, dispatch,selected_project?.projectid!)
      );

      globalLayers.view?.on("drag", (e) => {
        dispatch(toggleRoofConfirmBtn(false));
      });

      globalLayers.view?.on("mouse-wheel", (e) => {
        dispatch(toggleRoofConfirmBtn(false));
        const deltaY = e.deltaY;

        if (deltaY > 0) {
          if (globalLayers.view!.zoom <= 3) {
            globalLayers.view!.navigation.mouseWheelZoomEnabled = false;
          }
        } else if (deltaY < 0) {
          // zoom out
          globalLayers.view!.navigation.mouseWheelZoomEnabled = true;
        }
      });

      globalLayers.view?.on("pointer-move", (e) => pointerMove(e));

      globalLayers.container = mapRef.current;
      globalLayers.view?.when(() => {
        let compass = new Compass({
          view: globalLayers.view!,
        });
        if(document.getElementById('compass-widget')){
          compass.container = document.getElementById('compass-widget') as HTMLElement
        }
        if(globalLayers.indiLayers){
          globalLayers.indiLayers.visible = false
        }

      })
      if (globalLayers.map && globalLayers.view) {
        globalLayers.currentZoomLevel = globalLayers.view.zoom;
        globalLayers.currentSelectedProject = [selected_project!];
        AddSearchWidget(globalLayers.view, dispatch);
        
        await addDrawEvents(globalLayers.view, dispatch).then(() => {
          setLoading(false);
        });
        await watchLocationMarkerChanges();

        if (selected_project == null) {
          dispatch(
            setToolTipModal({
              state: true,
              title: "Search Location/Add Marker",
              content: `Search your address/Right click on the map to confirm the desired roof.`,
            })
          );
        } else {
          if(globalLayers.graphicLayerLocation && globalLayers.graphicLayerLocation.graphics.length){
            globalLayers.graphicLayerLocation.graphics.removeAll()
            if(globalLayers.sketchViewModel){
              (globalLayers.sketchViewModel as SketchViewModel).layer.removeAll();
              (globalLayers.sketchViewModel as SketchViewModel).layer.destroy();
            }
          }
        }
      }

      initialRender.current = true;
      if (globalLayers.changeView) {
        globalLayers.changeView.addEventListener("click", async () => {
          await globalLayers.toggleMapView();
          if (globalLayers.changeView.innerText === "3D") {
            globalLayers.changeView.innerText = "2D";
          } else {
            globalLayers.changeView.innerText = "3D";
          }
        });
      }
      if (selected_project?.projectid) {
        const point = new Point({
          latitude: selected_project.lat,
          longitude: selected_project.lat,
          spatialReference: { wkid: 4326 }, // WGS84 spatial reference
        });
        if (point) {
          if (globalLayers.view) {
            if (globalLayers?.view.zoom < 18) {
              // console.log(globalLayers?.view.zoom, 'globalLayers?.view.zoom')
              try {
                globalLayers.view
                  .goTo({
                    target: point,
                    zoom: 18, // Set the zoom level
                  })
                  .then((ele) => {
                    addMarkerToMap(dispatch); // Add the marker once the zoom completes
                  })
                  .catch((error) => {
                    if (error.name !== "AbortError") {
                      // Only log the error if it's not an AbortError (i.e., not interrupted)
                      console.error("GoTo error: ", error);
                    }
                  });
              } catch (error) {
                console.log("Error in goTo:", error);
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error initializing map:", error);
      // Handle errors if needed'
    }
  };

  const keyBoardEvents = (e: KeyboardEvent) => {
    // console.log("event",e.key,e.keyCode);
    if (e.keyCode === 46||e.key==="Delete") {
      if(selected_project?.projectid){
        return;
      }else{
        dispatch(resetRoofAnalisis());
        dispatch(toggleDrawer(false));
        dispatch(setTitle(''));       
        addMarkerToMap(dispatch)
        globalLayers.sketchLayers?.graphics.removeAll();
      }
    }
    if (e.shiftKey) {
      if (!globalLayers.shiftPressed) {
        globalLayers.shiftPressed = true;
      }
    }
    if ((e.ctrlKey || e.metaKey) && e.key === "c") {
      const allLayers = globalLayers.sketchLayers?.graphics as any;
      globalLayers.sketchVM.updateGraphics.forEach((layer) => {
        let title = globalLayers.polygonListCounts.length;
        let layerName = "poly" + `${title}`;
        let copiedTitle = `${layerName}` + "-" + "copy";
        const filterLayerByName = allLayers?.items.filter(
          (ele: any) =>
            (ele.title as string) === ((layer as any).title as string)
        ) as __esri.Graphic[];
        globalLayers.createDuplicateGraphic(copiedTitle, filterLayerByName);
      });
    }
  };

  const RoofConfirmBtnMemo = useMemo(() => RoofConfirmBtn, []);

  useEffect(() => {

    if(globalLayers.indiLayers){
      globalLayers.indiLayers.visible = false;
    }
    if(process.env.NODE_ENV === "development"){
    return () => {
      InitializeMap();  //should be inside the return
      mapRef.current?.addEventListener("keydown", (e: any) =>
        keyBoardEvents(e)
      );
      mapRef.current?.addEventListener("keyup", (e: any) => {
        if (globalLayers.shiftPressed) {
          globalLayers.shiftPressed = false;
        }
      });
    }}else{
      InitializeMap();  //should be inside the return
      mapRef.current?.addEventListener("keydown", (e: any) =>
        keyBoardEvents(e)
      );
      mapRef.current?.addEventListener("keyup", (e: any) => {
        if (globalLayers.shiftPressed) {
          globalLayers.shiftPressed = false;
        }
      });
    };
  }, []);

  return (
    <>

      {loading && <LoadingScreen />}
      <div
        id="viewDiv"
        className="map-area-container h-[91.5vh] w-[100%]"
        ref={mapRef}
      ></div>
      {/* {showInfoModal && <MapInfoModal />} */}
      <RoofConfirmBtnMemo />
      <RightClickMarkerAttchment/> 
      <InfoSlider />

      
    </>
  );
}
