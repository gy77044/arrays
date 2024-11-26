import Point from "@arcgis/core/geometry/Point";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import axios from "axios";
import { loadModules, setDefaultOptions } from "esri-loader";
import { changeLocationMarker } from "./../../../lib/Customer/MarkersFunctions/changeLocationMarker";
import { newPos, setMarkerState, setRightClick, setShowInfoModal, setToolTipModal, toggleRoofConfirmBtn } from "./../../../ReduxTool/Slice/Map/MapReducer";
import { setLocationPinLatLng } from "./../../../ReduxTool/Slice/Marker/MarkersReducer";
import { resetReducerAnalysis, resetRoofAnalisisForm, setnewAddress } from "./../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { AppDispatch } from "./../../../ReduxTool/store/store";
import { IUpdateEvent, LocationMarker } from "./../../Const";
import { getSymbol, markerSymbol } from "./../../CustomerMaps/MarkerSymbols/MarkerSymbols";
import { loadEsriModules } from "./getEsriModules";
import globalLayers from "./GlobaLMap";
import { setLatlng, setSerachedLocation } from "../../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setTitle, toggleDrawer } from "../../../ReduxTool/Slice/Drawer/DrawerReducer";
import { fetchCompleteAddressStr, getfilterObjKeysByArr } from "../../commonFunctions";

setDefaultOptions({ css: true });

export const loadMultipleModules = async (moduleNames: string[]) => {
    const loadedModules = await loadModules(moduleNames);
    return loadedModules;
};

export const getCustomSearchSource = async (): Promise<__esri.SearchSource> => {
    const [SearchSource] = await loadMultipleModules(["esri/widgets/Search/SearchSource"]);
    const searchSource = new SearchSource();
    searchSource.placeholder = "Enter Address"; // Change the placeholder text

    return searchSource;
};

//locator
// Function to get the state name from coordinates
export const getStateFromCoordinates = async (longitude: number, latitude: number) => {
    try {
        const [locator, Point] = await loadEsriModules(['esri/rest/locator', 'esri/geometry/Point'])
        let url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        const point = new Point({
            longitude: longitude,
            latitude: latitude
        })

        // Use the locator to reverse geocode the coordinates
        const result = await (locator as __esri.locator).locationToAddress(url, {
            location: point
        });

        if (result && result.address && result.address) {
            // Access the state (Region) name
            const stateName = result.attributes.Region;
            return stateName;
        } else {
            console.warn("State name not found for the given coordinates.");
            return null;
        }
    } catch (error) {
        console.error("Error getting state name:", error);
        return null;
    }
};

export const getCityFromCoordinates = async (longitude: number, latitude: number) => {
    try {
        const [locator, Point] = await loadEsriModules(['esri/rest/locator', 'esri/geometry/Point'])
        let url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
        const point = new Point({
            longitude: longitude,
            latitude: latitude
        })

        // Use the locator to reverse geocode the coordinates
        const result = await (locator as __esri.locator).locationToAddress(url, {
            location: point
        });

        if (result && result.address && result.address) {
            // Access the state (Region) name
            const stateName = result.attributes?.MetroArea ? result.attributes.MetroArea : result.attributes?.CntryName ;
            return stateName;
        } else {
            console.warn("State name not found for the given coordinates.");
            return null;
        }
    } catch (error) {
        console.error("Error getting state name:", error);
        return null;
    }
};

export const lazyLoadArcGisMapModules = async () => {
    const [SceneView, Map, Search, GraphicsLayer, MapView, Editor, SnappingControls, watchUtils, reactiveUtils, GroupLayer, Sketch, GeoJSONLayer, Polygon,BingMapsLayer,BasemapToggle] = await loadMultipleModules(["esri/views/SceneView", "esri/Map", "esri/widgets/Search", "esri/layers/GraphicsLayer", "esri/views/MapView", "esri/widgets/Editor", "esri/widgets/support/SnappingControls", 'esri/core/watchUtils', 'esri/core/reactiveUtils', 'esri/layers/GroupLayer', 'esri/widgets/Sketch', 'esri/layers/GeoJSONLayer', 'esri/geometry/Polygon','esri/layers/BingMapsLayer',"esri/widgets/BasemapToggle"]);
    return { SceneView, Map, Search, GraphicsLayer, MapView, Editor, SnappingControls, watchUtils, reactiveUtils, GroupLayer, Sketch, GeoJSONLayer, Polygon, BingMapsLayer,BasemapToggle };
}


export const searchWidget = async (view: __esri.SceneView) => {
    const [Search] = await loadMultipleModules(["esri/widgets/Search"])
    globalLayers.searchWidgetInput = new Search({
        view: view,
        container: "searchDiv",
        allPlaceholder: "Enter Address",
        includeDefaultSources: true,
        sources: [{}],
        icon: "redo",
    })
    return globalLayers.searchWidgetInput;
};

export const searchWidget_setup = async (dispatch: AppDispatch) => {
    const [Search] = await loadMultipleModules(["esri/widgets/Search"])
    if (globalLayers.view) {
        if (globalLayers.projectSearch) {
            globalLayers.projectSearch = null
        } else {
            globalLayers.projectSearch = new Search({
                view: globalLayers.view,
                container: "projectInput_searchloaction1",
                title: 'project_search',
                allPlaceholder: "Enter Address",
                includeDefaultSources: true,
                sources: [{}],
                icon: "redo"
            })

            if (globalLayers.view?.graphics.length) {
                globalLayers.view?.graphics.forEach(ele => {
                    if (ele.symbol.type === "point-3d") {
                        globalLayers.view?.graphics.remove(ele);
                    }
                })
            }

            globalLayers.projectSearch.allSources.on("after-add", ({ item }: { item: any }) => {
                item.resultSymbol = {
                    type: "point-3d",  // autocasts as new PointSymbol3D()
                    symbolLayers: [{
                        type: "icon",  // autocasts as new IconSymbol3DLayer()
                        size: 0,  // points
                        resource: { href: "" },
                        material: { color: "#FF881B" }
                    }],
                    title: 'pin'
                };
            });

            searchEventHandler(globalLayers.projectSearch, dispatch, globalLayers.view)

        }
    }
    // globalLayers.map?.add(globalLayers.projectSearch)
    return globalLayers.projectSearch;
};

export const AddSearchWidget = (view: __esri.SceneView, dispatch: AppDispatch) => {
    // searchWidget(view, "projectInput_searchloaction1")
    searchWidget(view)
        .then(widget => {
            if (!widget) {
                console.warn("Search widget coould not attached.")
                return
            }
            // if(getUserType()==="Consumer"){
            //     view.ui.add(widget, {
            //         position: "top-right",
            //         index: 9
            //     });
            // }


            setTimeout(() => {
                const searchInput = widget.container.querySelector(".esri-search__input");
                if (searchInput) {
                    searchInput.focus(); // Activate the focus on the search input
                }
            }, 2000);

            if (globalLayers.view?.graphics.length) {
                globalLayers.view?.graphics.forEach(ele => {
                    if (ele.symbol.type === "point-3d" && (ele.symbol as any).title === "pin") {
                        globalLayers.view?.graphics.remove(ele);
                    }
                })
            }
            

            widget.allSources.on("after-add", (ele: any) => {
                ele.item.resultSymbol = {
                    type: "point-3d",  // autocasts as new PointSymbol3D()
                    symbolLayers: [{
                        type: "icon",  // autocasts as new IconSymbol3DLayer()
                        size: 0,  // points
                        resource: { href: "" },
                        material: { color: "#FF881B" }
                    }],
                    title: 'pin'
                };
            });

            searchEventHandler(widget, dispatch, view)

        })
        .catch(e => {
            console.warn("Search Widget couldn't be attached to map")
        })
}

export const getGraphicLayer = () => {
    return new GraphicsLayer();
}

const searchEventHandler = (widget: any, dispatch: AppDispatch, view: __esri.SceneView) => {
    widget.on("search-complete", (event: __esri.SearchSearchCompleteEvent) => {
        let selectedProject = globalLayers.currentSelectedProject;
        dispatch(setRightClick(''))
        dispatch(toggleDrawer(false))
        dispatch(setTitle(""))
        dispatch(resetRoofAnalisisForm());
        
        if(globalLayers.sketchVM.activeTool === 'polygon'){
            globalLayers.sketchVM.cancel();
          }

        if(globalLayers.sketchLayers?.graphics.length){
            globalLayers.sketchLayers?.graphics.removeAll()
        }
        
        if (selectedProject.length) {
            globalLayers.sketchLayers?.graphics.forEach(ele => {
                if (ele.attributes && ele.attributes?.title === "roofboundry") {
                    globalLayers.sketchLayers?.graphics.remove(ele);
                }
            })
            if (globalLayers.indiLayers?.graphics.length) {
                globalLayers.map?.remove(globalLayers.indiLayers)
            }

            dispatch(setnewAddress(event.searchTerm))
        }

        if (event.searchTerm) {
            dispatch(setSerachedLocation(event.searchTerm))
        }
        // dispatch(setTitle("projectsetup"))
        dispatch(setToolTipModal({ state: true, title: "Great Job!", content: "You've reached at your selected destination. Now, simply click on the marker." }))
        // dispatch(toggleDrawer(true))

        dispatch(setToolTipModal({ state: true, title: "Locate Roof", content: `Move the marker to precisely locate your roof on the map.`}))

        const searchResult = event.results[0] as __esri.SearchSearchCompleteEventResults

        if (searchResult) {
            if (event.searchTerm === '') {
                dispatch(setSerachedLocation(searchResult.results[0].name))
            }
            const extent = (searchResult.results[0].feature.geometry as Point)
            const lat = extent.latitude;
            const lng = extent.longitude;

            // dispatch(setLatlng({ lat, lng }))

            const point = { type: "point", longitude: lng, latitude: lat} as Point;

            loadMultipleModules(["esri/widgets/Sketch/SketchViewModel", "esri/Graphic", "esri/geometry/support/webMercatorUtils"])
                .then(([SketchViewModel, Graphic, webMercatorUtils]) => {
try{
                    let pointGraphic = new Graphic({
                        geometry: webMercatorUtils.geographicToWebMercator(point), 
                        symbol: markerSymbol,
                        attributes: {
                            name: LocationMarker
                        }
                    });

                    globalLayers.LocationMarkerPointGraphic = pointGraphic;

                    globalLayers.graphicLayerLocation?.graphics.forEach(ele => {
                        if (ele.attributes && ele.getAttribute('name') === LocationMarker) {
                            globalLayers.graphicLayerLocation?.graphics.remove(ele);
                        }
                        if (ele.attributes && ele.getAttribute('title') === LocationMarker) {
                            globalLayers.graphicLayerLocation?.graphics.remove(ele);
                        }
                    })

                    globalLayers.graphicLayerLocation?.graphics.addMany([pointGraphic]);
                    if(!globalLayers.sketchViewModel){
                        globalLayers.sketchViewModel = new SketchViewModel({
                            view,
                            layer: globalLayers.graphicLayerLocation!,
                            updateOnGraphicClick: true,
                            multipleSelectionEnabled: true,
                            defaultUpdateOptions: {
                                toggleToolOnClick: true,
                                tool: "reshape",
                            }
                        });
                    }

                    
                    globalLayers.view?.goTo(pointGraphic)

                    const handlePosition = (event: MouseEvent) => {
                        globalLayers.lastCursorPositionSelected = { x: event.offsetX, y: event.offsetY };
                        dispatch(newPos(globalLayers.lastCursorPositionSelected!))
                    }
                    document.addEventListener("mouseup", (event) => handlePosition(event));
                    SearchViewModal(dispatch, handlePosition)
                         
        }
        catch(e){

        }
                })

        }

    })

    globalLayers.graphicLayerLocation?.graphics.on("change", (element: any) => {
        if (element?.target && element.target?._items?.length) {
            let geometry = element.target?._items[0].geometry;
            setTimeout(() => {
                //    console.log(globalLayers.graphicLayerLocation?.graphics, 'graphics')
                try {
                    globalLayers.view?.goTo({
                        center: [geometry?.longitude, geometry?.latitude],
                        zoom: 18
                    })
                } catch (error) {
                    console.error(error)
                }
            },500)
        }
    })

}

export const SearchViewModal = (dispatch: AppDispatch, handlePosition: (event: MouseEvent) => void) => {

    globalLayers.sketchViewModel?.on("update", function (event: IUpdateEvent) {
        
        if (event.state === "start") {
            dispatch(toggleRoofConfirmBtn(true));
            dispatch(setToolTipModal({ state: true, title: "Great Job!", content: "Now, drag it to your preferred location." }))
            dispatch(setLatlng({ lat: event.graphics[0].geometry.latitude, lng: event.graphics[0].geometry.longitude }));
            dispatch(setLocationPinLatLng({ lat: event.graphics[0].geometry.latitude, lng: event.graphics[0].geometry.longitude }));
            // getAddressFromPinDropCoordinates(event.graphics[0].geometry.longitude, event.graphics[0].geometry.latitude).then(
            //     (searchAddress: any) => {
            //         // console.log('searchAddressdrag', searchAddress)
            //         dispatch(setSerachedLocation(searchAddress))
            //     }
            // );
            
            fetchCompleteAddress(event.graphics[0].geometry.latitude, event.graphics[0].geometry.longitude,true).then((searchAddress:any) => {
                setTimeout(()=>{
                    const inp = globalLayers.searchWidgetInput;
                    if (inp && inp.container.querySelector(".esri-search__input") && searchAddress) {
                        inp.container.querySelector(".esri-search__input").value =searchAddress;
                    }
                },2000);
                
                dispatch(setSerachedLocation(searchAddress));
            });
        }
        if (event.toolEventInfo) {
            changeLocationMarker(event, markerSymbol)
            if (event.toolEventInfo.type === "move") {
                if (globalLayers.markerState !== 'move') {
                    globalLayers.markerState = 'active';
                    dispatch(setMarkerState('locate'))
                    dispatch(setShowInfoModal(true))
                }
            }
            // 
            if (event.toolEventInfo.type === "move-stop") {
                dispatch(setMarkerState('confirm'));
                globalLayers.latitude = event.graphics[0].geometry.latitude;
                globalLayers.longitude = event.graphics[0].geometry.longitude;
                globalLayers.RemoveLayer('GeoJson');
                globalLayers.showRoofSelectionBtn = true;
                dispatch(toggleRoofConfirmBtn(true));
                dispatch(setLatlng({ lat: event.graphics[0].geometry.latitude, lng: event.graphics[0].geometry.longitude }));
                dispatch(setLocationPinLatLng({ lat: event.graphics[0].geometry.latitude, lng: event.graphics[0].geometry.longitude }));
                // getAddressFromPinDropCoordinates(event.graphics[0].geometry.longitude, event.graphics[0].geometry.latitude).then(
                //     (searchAddress: any) => {
                //         // console.log('searchAddressdrag', searchAddress)
                //         dispatch(setSerachedLocation(searchAddress))
                //     }
                // );
                
                fetchCompleteAddress(event.graphics[0].geometry.latitude, event.graphics[0].geometry.longitude,true).then((searchAddress:any) => {
                    setTimeout(()=>{
                        const inp = globalLayers.searchWidgetInput;
                        if (inp && inp.container.querySelector(".esri-search__input") && searchAddress) {
                            inp.container.querySelector(".esri-search__input").value =searchAddress;
                        }
                    },2000);
                    
                    dispatch(setSerachedLocation(searchAddress));
                });
                document.removeEventListener('click', (e) => handlePosition(e));
            }
        }
    });
}

export const addDrawEvents = async (view: __esri.SceneView, dispatch: AppDispatch): Promise<__esri.SceneView> => {
    globalLayers.changeView = document.getElementById("changeActiveView");
    globalLayers.addSketchDraw();
    return view
}

export const addMeasurementTools = async (view: __esri.SceneView) => {
};

export const renderer = {
    type: "unique-value", // autocasts as new UniqueValueRenderer()
    defaultSymbol: getSymbol("#FFFFFF"),
    defaultLabel: "Other",
    field: "TYPE",
    visualVariables: [
        {
            type: "size",
            field: "Max_Elev_F"
        }
    ]
};

export const addFeatureLayer = async (lat?: number, lng?: number) => {
    const [LayerList] = await loadMultipleModules(["esri/widgets/LayerList"])

    // Set the renderer on the layer
    if (globalLayers.featureLayers.layerlist) {
        globalLayers.map?.allLayers.forEach(ele => {
            if (ele.title === "Extruded building footprints") {
                globalLayers.map?.remove(ele)

            }
        })
    }

    globalLayers.featureLayers.layerlist = new LayerList({
        view: globalLayers.view,
        title: "layerList",
    });
};

export const getShadowCastWidget = async () => {
    loadMultipleModules(["esri/widgets/esri/ShadowCast"])
        .then(([ShadowCast]) => {
            globalLayers.shadowCastWidget = new ShadowCast({
                view: globalLayers.view,
            })
        })
        .catch(e => {
            return null
        })
};


export const addMarkerToMap = (dispatch: AppDispatch, addMarker?: string) => {
    let { userCurrentLocation: { lat, lng } } = globalLayers;
    const point = {
        type: "point",
        longitude: lng,
        latitude: lat,
    };

    loadMultipleModules(["esri/widgets/Sketch/SketchViewModel", "esri/Graphic", "esri/geometry/support/webMercatorUtils"])
    .then(([SketchViewModel, Graphic, webMercatorUtils]) => {
            let pointGraphic = new Graphic({
                geometry: point as any,
                symbol: markerSymbol as any,
                attributes: {
                    name: LocationMarker
                }
            });
            globalLayers.LocationMarkerPointGraphic = pointGraphic;
            // globalLayers.sketchVM.complete()
            globalLayers.graphicLayerLocation?.graphics.forEach((ele: Graphic) => {              
                if (ele.attributes && ele.attributes.name === LocationMarker) {
                    globalLayers.graphicLayerLocation?.graphics.remove(ele);
                }
            });     
            
            if(addMarker === undefined || !addMarker){
                globalLayers.graphicLayerLocation?.graphics.addMany([pointGraphic]);
                
                if(!globalLayers.sketchViewModel){
                    globalLayers.sketchViewModel = new SketchViewModel({
                        view: globalLayers.view!,
                        layer: globalLayers.graphicLayerLocation!,
                        updateOnGraphicClick: true,
                        // multipleSelectionEnabled: true,
                        defaultUpdateOptions: {
                            toggleToolOnClick: true,
                            tool: "reshape",
                        }
                    });
                }
            }


            dispatch(setToolTipModal({ state: true, title: "Great Job!", content: "You've reached at your selected destination. Now, simply click on the marker." }))

            const handlePosition = (event: MouseEvent) => {
                globalLayers.lastCursorPositionSelected = { x: event.offsetX, y: event.offsetY };
                dispatch(newPos(globalLayers.lastCursorPositionSelected!))
            }
            document.addEventListener("mouseup", (event) => handlePosition(event));
            SearchViewModal(dispatch, handlePosition);
        });
};




export const getAddressFromPinDropCoordinates = async (longitude: number, latitude: number) => {
    try {
        const [locator, Point] = await loadEsriModules(['esri/rest/locator', 'esri/geometry/Point'])

        // Create a new Locator instance
        let url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"

        const point = new Point({
            longitude: longitude,
            latitude: latitude
        })

        // Use the locator to reverse geocode the coordinates
        const result = await (locator as __esri.locator).locationToAddress(url, {
            location: point
        });

        if (result && result.address && result.address) { 
            // console.log(result.attributes.Match_addr, 'result.attributes.Match_addr') 
            const matchAddressName = result.attributes.Match_addr;
            return matchAddressName;
        } else {
            console.warn("Region name not found for the given coordinates.");
            return null;
        }
    } catch (error) {
        console.error("Error getting region name:", error);
        return null;
    }
};




export const fetchCountryNamefromLatLng = async (lat: number, lng: number) => {
    const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${lng},${lat}&outSR=4326&f=json`;

    try {
      const response = await axios.get(url);
      if (response.data && response.data.address&&response.data.address.CntryName) {
        const country = response.data.address.CntryName;
        // console.log("countryName",country)
      return country;
      } else {
       console.log('Country not found');
      }
    } catch (error) {
      console.error('Error fetching country:', error);
    }
  };

//  export const fetchCompleteAddress = async (lat: number, lng: number) => {
//     const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${lng},${lat}&outSR=4326&f=json`;
 
//     try {
//       const response = await axios.get(url);
//       if (response.data && response.data.address&&response.data.address.CntryName) {
//          const completeaddress = `${response.data.address.Addr_type}, ${response.data.address.City}, ${response.data.address.District}, ${response.data.address.Region}, ${response.data.address.ShortLabel}, ${response.data.address.CountryCode}`
//       return completeaddress;
//       } else {
//        console.log('Country not found');
//       }
//     } catch (error) {
//       console.error('Error fetching country:', error);
//       console.log('Error fetching country');
//     }
//   };

  export const fetchCompleteAddress = async (lat: number, lng: number,isStringFormat?:boolean,fieldsReq?:any[]) => {
    const url = `https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${lng},${lat}&outSR=4326&f=json`;
    
    try {
      const {data} = await axios.get(url);
      if (data && data.address && data.address.CntryName) {
          let addressobj: any = {
              city: data.address.City,
              district: data.address.District,
              state: data.address.Region,
              pincode: data.address.Postal,
              countryAbbr: data.address.CountryCode
          }
        if(fieldsReq){
            addressobj =  getfilterObjKeysByArr(addressobj,fieldsReq);
        }
        if(isStringFormat){ 
            addressobj = fetchCompleteAddressStr(addressobj); // Removes undefined or empty values
        }
        return addressobj;
      } else {
       console.log('Country not found');
      }
    } catch (error) {
      console.error('Error fetching country:', error);
      console.log('Error fetching country');
    }
  };

  export const getCoordinatesFromAddress = async (address: string) => {
    try {
        const [locator] = await loadEsriModules(['esri/rest/locator']);
        let url = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer";

        // Use the locator to geocode the address
        const results = await (locator as __esri.locator).addressToLocations(url, {
            address: { SingleLine: address },
            maxLocations: 1
        });

        if (results && results.length > 0) {
            const location = results[0].location;
            const coordinates = {
                latitude: location.y,
                longitude: location.x
            };
            return coordinates;
        } else {
            console.warn("Coordinates not found for the given address.");
            return null;
        }
    } catch (error) {
        console.error("Error getting coordinates:", error);
        return null;
    }
};

