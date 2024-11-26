import { loadModules } from "esri-loader";
import { toast } from "react-toastify";
import { convertGeometryToWebMercator } from "../../../lib/Customer/convertSpatialSystem";
import { getRandomColorArray } from "../../../lib/Customer/generateColor";
import { addsketchView } from "../../../lib/Customer/Sketch";
import { switchView } from "../../../lib/Customer/SwitchMap";
import { ProjectTy } from "../../../ReduxTool/Slice/Auth/types";
import { setMapActive } from "../../../ReduxTool/Slice/Map/MapReducer";
import { AppDispatch } from "../../../ReduxTool/store/store";
import { LocationMarker } from "../../Const";
import { extrudeSymbol3D } from "../../CustomerMaps/MarkerSymbols/MarkerSymbols";
import { lazyLoadArcGisMapModules, loadMultipleModules } from "./LazyloadMap";
import { pvHandleRoofTop } from "../GenerateRoof/GenrateRoof";
import { FinRes } from "../../../ReduxTool/Slice/Consumer/types";

interface IPeoperties {
    ELEVATION: number
    ENCLOSED_A: string
    ElevationP: number
    ISLAND_ARE: string
    LENGTH: string
    PERIMETER: number
    WIDTH: string
}

type IndexedGraphic = Record<number, __esri.Graphic>
export type MapViewType = '2D' | '3D'

const globalLayers = {
    initialiseProps: async function (mapRef: React.MutableRefObject<HTMLDivElement | null>, lng: number, lat: number,dispatch:AppDispatch) {
        const { GraphicsLayer, Map, MapView } = await lazyLoadArcGisMapModules();

        this.sketchLayers = new GraphicsLayer({
            title: "sketch-layer",
            id: "sketch-layer"
        });
        this.prevsketchLayers = new GraphicsLayer({
            title: "sketch-layer",
            id: "sketch-layer"
        });
        this.graphic3dLayers = new GraphicsLayer({
            title: "3d",
            id: '3d'
        });
        this.graphicLayerLocation = new GraphicsLayer({
            id: LocationMarker,
            title: LocationMarker
        });
        this.roofModuleGraphicLayer = new GraphicsLayer({
            title: 'Roof Modules'
        });
        this.map = new Map({
            basemap: "satellite",
            ground: "world-elevation",
            layers: [globalLayers.graphicLayerLocation],
            
        });
        this.view = new MapView({
            container: mapRef.current!,
            map: this.map,
            center: [lng, lat],
            zoom: 4,
        });
        dispatch(setMapActive("esri"))
        if(this.indiLayers){
            this.indiLayers.visible = false
          }

    },
    markerLocation: { x: 0, y: 0 },
    load: 0,
    isDone: false,
    sanctionload: 0,
    totalroofArea: 0,
    trackMarker:false,
    plantcapacity: 0,
    sanctionload2: 0,

    userCurrentLocation: {
        lat: 0,
        lng: 0
    },
    isSavedProject: false  as boolean,

    degradation: null  as any,
    selected_project: null  as any | ProjectTy,
    financial: null  as FinRes | null,
    projectid: null  as string | null,

    //
    totalNumberofModules: 0,

    markerState: '' as 'move' | 'move-stop' | 'idle' | 'active' | 'complete',
    // dom x and y coordinates
    lastCursorPositionSelected: { x: 0, y: 0 },
    showRoofSelectionBtn: false,
    customButton: null as null | HTMLButtonElement,

    weatherStations: [] as __esri.Graphic[],

    currentSelectedProject: [] as ProjectTy[],

    lastDrawnRoofBoundry: null as __esri.Graphic | null,
    lastDrawnRoofBoundryGraphicTitle: null as string | null,

    weatherSelectionCircleGraphic: null as __esri.Graphic | null,

    currentZoomLevel: 3 as number,
    shiftPressed: false,

    // to hold tempGraphic while pointer is moving 
    tempGraphic: null as __esri.Graphic | null,
    guidinglines: {
        verticalLine: null as __esri.Graphic | null,
        horizontalLine: null as __esri.Graphic | null,
    },
    // to hold all the added graphic 
    addedBlocks: [] as __esri.Graphic[],

    // to store records of line and points wrt titlenames
    graphicLinesObjects: {} as Record<string, IndexedGraphic>,

    // selection tools 
    selectionTool: '' as '' | 'rectangle-selection' | 'rectangle',

    // map layer and view 
    map: null as null | __esri.Map, // Store the map object
    view: null as null | __esri.SceneView, // Store the view object
    changeView: null as any,
    activemapView: "" as any,

    // roofs generated counts 
    roofCounts: 0,

    // markers and polyline with length symbol
    lineGraphic: null as any,

    lineGraphicList: [] as any[],
    textGraphic: null as any,
    textGraphicList: [] as any[],

    // polygon counts and titles count
    polygonListCounts: [] as any[],
    polygonTitles: [] as string[],

    // panel generation variables for rooftop simulation
    mainPoly: null as any,
    geomPoly: [] as any[],
    elevationP: 0 as number,
    altitude: 0 as number,
    latitude: 0 as number,
    longitude: 0 as number,
    height: 0 as number,
    currentSelectedGraphic: 0 as number,
    // azimuth: 15 as number,  // incline angle for building
    azimuth: 0 as number,  // incline angle for building
    tilt: 0 as number,  // tilt angle for panels

    // state to store total number of roof top oanels layed out on roofs as layers 
    roofTitlename: "RoofTop Module",
    roofTopModuleCount: [] as any[],

    // draw and edit tools 
    activeView: "2D" as "2D" | '3D', // current active view type
    lastactiveTool: "" as "circle" | 'polygon' | "rectangle", // current active draw tool

    snapOptions: {
        snapEnabled: true,
        snapToVertex: true,
        snapToEdge: true,
        tolerance: 15 // Adjust the tolerance distance as needed (in pixels)
    }, // draw snap tools

    sketchButton: {
        polygon: null as null | HTMLElement,
        circle: null as null | HTMLElement,
        rectangle: null as null | HTMLElement,
        polyline: null as null | HTMLElement,
        delete: null as null | HTMLElement,
        select: null as null | HTMLElement,
        refresh: null as null | HTMLElement,
        measurement: null as null | HTMLElement,
        zoomIn: null as null | HTMLElement,
        zoomOut: null as null | HTMLElement,
        featureAdd: null as null | HTMLElement,
        currentButtonClicked: null as null | "left" | "right",
    }, // draw or edit buttons 

    // table mudule feature add or remove state
    featureAddState: null as null | 'active' | "delete" | 'select',
    isSelected: false as boolean,

    // solar module symbol and boundry geometry
    polygonGeomforLayout: null as any,
    panles_2d: null as any,
    panles_3d: null as any,

    // circle type polygon 
    circleLineGraphic: null as any, // for inittial polyline or top to center polyline
    circleTextGraphicTop: null as any,
    leftLineCirclePolyGraphic: null as any,
    leftLineCirclePolyGraphicSymbol: null as any,
    circleTextGraphic: null as any,

    /// editor for skethc 
    editor: null as null | __esri.Editor,


   // sketch and graphic layer tools 
   indiLayers: null as null | __esri.GraphicsLayer, // Store the sketch graphics layer for table blocks
   prevsketchLayers: null as null | __esri.Graphic, // Store the sketch graphics layer
   sketchLayers: null as null | __esri.GraphicsLayer, // Store the sketch graphics layer
   graphic3dLayers: null as null | __esri.GraphicsLayer, // Store the sketch graphics layer
   measurement: null as null | __esri.Measurement,
   container: null as null | HTMLDivElement,
   searchWidgetInput: null as any,
   projectSearch: null as any,
   LocationMarkerPointGraphic: null as null | __esri.Graphic,
   graphicLayerLocation: null as null | __esri.GraphicsLayer,

   roofGroupLayer: null as null | __esri.GroupLayer,
   totaltableCount:null as null|number,

    // to hold all the roof modules that are generated
    roofModuleGraphicLayer: null as null | __esri.GraphicsLayer,

    shadowCastWidget: null as __esri.ShadowCast | null,
    groupLayer: null as __esri.GroupLayer | null,
    // sketchview Modal
    sketchViewModel: null as any,
    // ViewModal for Sketch
    sketchVM: {} as __esri.Sketch,
    selectedGraphic: null as __esri.Graphic | null,
    multipleSelectedGraphic: [] as __esri.Graphic[],

    // additional properties here
    selectedRoof: {
        properties: {} as IPeoperties,
        objectid: '' as string
    },

    // footer lat & lng
    footers: {
        lat: null as null | HTMLElement,
        lng: null as null | HTMLElement,
    },

    // feature layer/WFS layers 
    featureLayers: {
        buildingFeatureDhaka: null as __esri.FeatureLayer | null,
        layerlist: null as __esri.LayerList | null,
        wfsLayers: [] as __esri.WFSLayer[],
        groupLayer: {} as __esri.GroupLayer
    },
    zoomToGeometry: function (geometry: __esri.Geometry) {
        try {
            if(typeof(geometry) !== "object"){
                throw new Error("Invalid Geometry");
            }
            if (!geometry || !(geometry as any).centroid) {
                console.error("Invalid geometry or missing centroid property.");
                return;
            }

            const centroid = (geometry as any).centroid;
            if (!centroid.longitude || !centroid.latitude) {
                console.error("Centroid does not have valid longitude and latitude.");
                return;
            }

            globalLayers.view!.goTo({
                center: [centroid.longitude, centroid.latitude],
                zoom: 18
            })
        }
        catch (e: any) {
            console.error('Error during goTo operation:', e);
            toast.error(e.message)
        };
    },

    /// all the methods & operation start down here 
    // to switch current view type 
    toggleMapView: async () => {
        await switchView(globalLayers.activeView);
    },

    addSketchDraw: async () => {
        await addsketchView()
    },

    skecthVMRefresh: async function (Sketch: any, skecthObject: any) {

        if (Object.keys(this.sketchVM).length > 0) {
            this.sketchVM.destroy()
            this.sketchVM = {} as __esri.Sketch;
        }
        if (Object.keys(this.sketchVM).length === 0) {
            this.sketchVM = new Sketch(skecthObject)
        }

    },

     // Function to stop drawing or updating on Sketch widget
    stopSketch:async function () {
        if (this.sketchVM) {
          // Cancel any active drawing or updating process
          this.sketchVM.cancel();
        }
      },
    

    // to remove all the found title in the sketch layers by the provided title
    removeTitledGraphicsfromSkecth: function (title: string[]) {
        let deleteGraphics = [] as __esri.Graphic[]
        this.sketchLayers?.graphics.forEach((ele: any) => {
            if (title.includes(ele.title)) {
                deleteGraphics.push(ele)
            }
        });

        if (title.length) {
            title.forEach(name => {
                if (this.lineGraphic?.title === name) {
                    this.lineGraphic = null
                }
            })
        }
        this.sketchLayers?.graphics.removeMany(deleteGraphics);
        deleteGraphics = []
    },

    spatialReference: async function (): Promise<__esri.SpatialReference> {
        const [SpatialReference] = await loadMultipleModules(["esri/geometry/SpatialReference"])
        return new SpatialReference({
            wkid: 4326
        })
    },
    // to create Graphic
    createGraphic: async function (geometry: any, symbol: any, title: any, visible?: boolean): Promise<__esri.Graphic> {
        const [Graphic] = await loadMultipleModules(["esri/Graphic"])
        return new Graphic({
            geometry,
            symbol,
            title,
            visible,
            attributes: {
                title
            }
        })
    },

    // to create Polyline from given paths 
    createPolylineGeometry: async function (paths: number[][][], title: string) {
        const [Polyline] = await loadMultipleModules(["esri/geometry/Polyline"])
        // Create a Polyline object using the paths
        const polyline = new Polyline({
            paths: paths,
            spatialReference: { wkid: 4326 } // Use the appropriate spatial reference
        });
        // const graphic = await globalLayers.createGraphic(polyline, PvSymbols.simpleFillSymbol([255,0,0], [0.5,0.5,0.5]), title)
        return polyline;
    },

    // remove selected  skect graphic
    deleteSelectedGraphics: function () {
        const selectedGraphics = this.sketchVM.updateGraphics;
        if (selectedGraphics.length > 0) {
            // Loop through the selected graphics and remove them from the GraphicsLayer
            selectedGraphics.forEach(selectedGraphic => {
                this.sketchLayers?.graphics.remove(selectedGraphic);
            });

            // Clear the selection after deleting
            this.sketchVM.cancel();
        } else {
            console.error("No feature selected. Please select a feature first.");
        }
    },

    setBaselayer: function (baseMap: string) {
        loadModules(['esri/Basemap'])
            .then(([Basemap]) => {
                // Retrieve the desired basemap by name
                const newBasemap = Basemap.fromId(baseMap);
                if (newBasemap && this.map) {
                    // Update the map's basemap
                    this.map.basemap = newBasemap;
                } else {
                    console.warn(`Basemap with ID '${newBasemap}' not found.`);
                }
            })
            .catch(e => console.log(e))
    },
    setBinglayer: function (bmap:string) {
        //const { GraphicsLayer, Map, MapView,BingMapsLayer } = await lazyLoadArcGisMapModules();
        loadModules(['esri/layers/BingMapsLayer', "esri/views/MapView", "esri/Map"])
            .then(([BingMapsLayer, MapView, Map]) => {
                let bingmap1
                if(bmap==="esri"){
                    bingmap1 = new Map({                    
                           basemap: "satellite",
                           ground: "world-elevation",
                           layers: [globalLayers.graphicLayerLocation],
                        
                       
                   });
                  

                }else if(bmap==="bing"){
                     bingmap1 = new Map({
                        basemap: {
                            baseLayers: [new BingMapsLayer({
                                style: "aerial", // Specify the Bing Maps style (options: "aerial", "road", "hybrid", "canvasDark", "canvasLight", "birdseye", "birdseyeAerial")
                                key: "AkTWG50yjCD1xIYtd_-gBFbrLdthMQwWHCN-KYZx89ecBiNwR-A1ZwCrnqxGrwmB"
                            })]
                        }
                    });
                    

                }

                // this.map = new Map({
                //     basemap: "satellite",
                //     ground: "world-elevation",
                //     layers: [globalLayers.graphicLayerLocation],
                // });

                globalLayers.view = new MapView(
                    {
                        container: globalLayers.container,
                        map: bingmap1,
                        center: globalLayers.userCurrentLocation?[globalLayers.userCurrentLocation.lng, globalLayers.userCurrentLocation.lat]:[72.85669,19.08489],
                        zoom: globalLayers.currentZoomLevel
                    });
            })
            .catch(e => console.log(e))
    },

    // Method to add a graphic to the map
    addGraphic: function (graphic: __esri.Graphic, title: string) {
        if (this.view && this.view.map) {
            const graphicsLayer = new __esri.GraphicsLayer({
                title: title
            });
            graphicsLayer.add(graphic);
            this.view.map.add(graphicsLayer);
        } else {
            console.warn("Couldn't find the view/map")
        }
    },

    // Method to find a graphic by its title
    GetGraphicLayerbyTitle: function (title: string): __esri.Layer | null {
        let graphicsLayer: __esri.Layer | null = null;
        if (this.view && this.view.map) {
            this.view.map.allLayers.forEach(ele => {
                if (ele.title === title) {
                    graphicsLayer = ele
                }
            })
        }
        return graphicsLayer;
    },

    RemoveLayer: function (title: string): boolean {
        let graphicsLayer: __esri.Layer | null = null;
        if (this.view && this.view.map) {
            this.view.map.allLayers.forEach(ele => {
                if (ele.title === title) {
                    graphicsLayer = ele
                    this.view?.map.remove(ele);
                    console.log(`${title} removed successfully`)
                }
            })
        }
        if (graphicsLayer) {
            console.warn(`${title} removed successfully`)
            return true
        }
        console.error(`${title}: could not find this layer`)
        return false
    },

    Removeaddress: function () {
        if (this.searchWidgetInput) {
            this.searchWidgetInput.clear()
        }
    },

    addNewFeatureLayer: function (title: string, layer: any) {
        if (this.map) {
            const layers = this.map?.layers as any
            let featureLyar = layers._items.filter((ele: any) => ele.title === title)
            if (!featureLyar.lenght) {
                this.map.add(layer)
            }
        }
    },

    addGroupLayer: function (title: string) {

        loadModules(["esri/layers/GroupLayer"])
            .then(([GroupLayer]) => {
                this.groupLayer = new GroupLayer({
                    title: title
                });
                this.map?.add(globalLayers.groupLayer!);
            })
            .catch(e => console.error(e))
    },

    toggleLocationPin: function () {
        if (this.map) {
            (this.map.allLayers as any).items.forEach((ele: any) => {
                if (ele?.title === "locationMarker") {
                    if (ele.visible) {
                        ele.visible = false
                    } else {
                        ele.visible = true
                    }
                } else {
                    console.error("No Location Graphic Found")
                }
            })
        } else {
            console.error("No view attached to map")
        }
    },

    addHeighttoGraphic: async function (height: number, tilt: number, azimuth: number) {

        const [GraphicsLayer, Point] = await loadMultipleModules(["esri/layers/GraphicsLayer", "esri/geometry/Point"])
        if (this.sketchVM.updateGraphics === undefined) {
            console.warn('No layer selected')
            return;
        }
        const currSelectGraphicList = (this.sketchVM.updateGraphics as any)._items as __esri.Graphic[]
        if (currSelectGraphicList.length === 0) return

        currSelectGraphicList.forEach((graphic: any) => {
            graphic.attributes = { ...graphic.attributes, height: height }
            const attributes = graphic.attributes;
            let geometry = graphic.geometry as any

            if (geometry.type !== "polygon") return;
            const centerCoordinates = (geometry as any).centroid;
            // const adjocentHeight = height * Math.tan(90 - tilt);
            geometry.hasZ = true
            const pointGeometry = new Point({
                latitude: centerCoordinates.latitude,
                longitude: centerCoordinates.longitude,
                z: globalLayers.altitude,
            });

            const graphicLayer = new GraphicsLayer({
                title: "3d",
                id: '3d'
            });

            convertGeometryToWebMercator(pointGeometry)
                .then(updatedGeometry => {
                    let centerLong = updatedGeometry?.x; // longitude for point geometry in spatialreference wkid 102100
                    let centerLat = updatedGeometry?.y; // latitude for point geometry in spatialreference wkid 102100
                    // adding height to all the rings in the geometry
                    if (geometry.rings.length > 1) {
                        for (let i = 0; i < geometry.rings.length; i++) {
                            for (let j = 0; j < geometry.rings[i].length; j++) {
                                let long = geometry.rings[i][j][0];
                                let lat = geometry.rings[i][j][1];
                                let heig = pointGeometry?.z;
                                if (centerLong > long) {
                                    geometry.rings[i][j][2] = heig;
                                    // return 'right';
                                } else if (centerLat < lat) {
                                    geometry.rings[i][j][2] = heig;
                                    // return 'left';
                                } else {
                                    geometry.rings[i][j][2] = heig;
                                    // return 'same';
                                }
                            }
                        }

                        this.createGraphic(geometry, extrudeSymbol3D(40, "red"), '', false)
                            .then(graphic => {
                                graphicLayer.add(graphic);
                                globalLayers.view?.map.add(graphicLayer);
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }
                    else {
                        const ring: number[][] = geometry.rings[0]
                        const updatedGeometry = this.updateGeomrtyRingswithTilt(graphic, ring, pointGeometry, centerLong, geometry, centerLat)
                        const color = getRandomColorArray()
                        this.createGraphic(updatedGeometry, extrudeSymbol3D(height, color), graphic?.title, false)
                            .then(graphic => {
                                // graphicLayer.add(graphic);
                                if (globalLayers.graphic3dLayers) {
                                    globalLayers.graphic3dLayers.graphics.forEach((layer: any) => {
                                        // look for the existing same graphic layer and update it with the new graphic here
                                        if (layer.title === geometry?.title) {
                                            globalLayers.graphic3dLayers?.graphics.remove(layer);
                                        }
                                    })
                                    graphic.attributes = attributes;
                                    if (graphic.attributes && graphic.attributes.radius) {
                                    }
                                    globalLayers.graphic3dLayers?.add(graphic)
                                }
                                // globalLayers.view?.map.add(graphicLayer);
                            })
                            .catch(e => {
                                console.log(e)
                            })
                    }
                })
                .catch(e => console.error(e))

        })
        return globalLayers.graphic3dLayers;
    },

    changeAzimuth: async function () {

        if (!this.lastDrawnRoofBoundryGraphicTitle) return;
        let title = this.roofTitlename + this.roofTopModuleCount.length;
        // remove previously drawn rooftop graphics 

        this.map?.remove(this.indiLayers!);
        // let boundry = this.lastDrawnRoofBoundryGraphicTitle;
        await pvHandleRoofTop(this.lastDrawnRoofBoundry, this.elevationP, title)
    },

    show3dView: function (SceneView: any) {
        globalLayers.sketchVM.complete()
        if (this.activeView === "2D") {
            return "Scene is already in 3d Mode."
        }
        if (!this.graphic3dLayers) {
            return "No 3D graphics found."
        }


        globalLayers.view = new SceneView({
            container: globalLayers.container!,
            map: globalLayers.map,
            center: [72.85669, 19.08489],
            zoom: 18,
        });


        globalLayers.addSketchDraw().then(() => {
            console.log('sketch-added')
        })

    },

    show2dView: function (MapView: any) {
        globalLayers.sketchVM.complete()
        if (this.activeView === "3D") {
            return "MapView is already in 2D Mode."
        }
        if (!this.sketchLayers) {
            return "No graphics found."
        }


        globalLayers.view = new MapView({
            container: globalLayers.container!,
            map: globalLayers.map,
            center: [72.85669, 19.08489],
            zoom: 18,
        });


        globalLayers.addSketchDraw().then(() => {
            console.log('sketch-added')
        })

    },

    switchGraphicsView: function (type: "sketch-layer" | '3d') {
        if (type === "3d") {
            // this.show3dView()
        } else {
            // this.show2dView()
        }
    },

    // create the duplicate graphics
    createDuplicate: function () {
        const toastId = 'copypolygon'
        let titles = [] as string[]
        this.sketchVM.updateGraphics.forEach((ele: any) => {
            if (titles.includes(ele.title)) return
            titles.push(ele.title)
        })

        if (this.sketchVM.updateGraphics.length > 0) {
            this.sketchLayers?.graphics.forEach(layer => {
                if (titles.includes((layer as any).title)) {
                    let clonedGraphic = layer.clone();
                    (clonedGraphic as any).title = (layer as any).title as string + "-" + "copy";
                    this.sketchLayers?.graphics.add(clonedGraphic)
                }
            })
            toast.success('Graphic Copied Successfully.', { toastId });

        } else {
            toast.warn('No graphic selected. Please select a graphic first.', { toastId })
        }
    },

    createDuplicateGraphic: function (title: string, filterLayerByName: __esri.Graphic[]) {
        const toastId = 'copy-polygon'
        // check if the props titlename graphic already exists 
        let alredayExistGraphic = this.sketchLayers?.graphics.filter((layer: any) => layer.title === title)
        if (alredayExistGraphic && alredayExistGraphic.length > 0) return; // graphic alredy exists now either return from here or remove them then attach again 
        let newCopiedGraphics = [] as __esri.Graphic[]
        for (let i = 0; i < filterLayerByName.length; i++) {
            let originalGraphic = filterLayerByName[i];
            let copiedGraphic: any = originalGraphic.clone(); // Create a shallow copy
            copiedGraphic.title = title;
            newCopiedGraphics.push(copiedGraphic);
        }
        this.sketchLayers?.graphics.addMany(newCopiedGraphics);
        newCopiedGraphics.forEach((ele: any) => {
            if (!this.polygonListCounts.includes(ele.title)) {
                this.polygonListCounts.push(ele.title)
            }

        })
        toast.success('Graphic Copied Successfully.', { toastId });
    },

    // Flip the selected geometry / Graphic
    fliptheGeom: async function () {
        const [geometryEngineAsync, Graphic] = await loadMultipleModules(["esri/geometry/geometryEngineAsync", "esri/Graphic"])
        const selectedGraphicLayer = globalLayers.selectedGraphic


        if (selectedGraphicLayer === null) {
            console.warn("No selected layer found.")
            return
        }

        const flipGeom = await geometryEngineAsync.flipHorizontal(selectedGraphicLayer.geometry);

        const flippedGeometryRotate = await geometryEngineAsync.rotate(flipGeom, 12)

        const flippedGraphic = new Graphic({
            geometry: flippedGeometryRotate,
            symbol: selectedGraphicLayer.symbol,
            title: 'flip'
        });

        this.sketchLayers?.remove(selectedGraphicLayer);
        this.sketchLayers?.add(flippedGraphic)
        this.selectedGraphic = flippedGraphic

        return flippedGraphic



    },

    shadowCast: async function (toggle: "add" | "remove") {
        if (toggle === "add") {
            const [ShadowCast] = await loadMultipleModules(["esri/widgets/ShadowCast"])
            globalLayers.shadowCastWidget = new ShadowCast({
                view: this.view,
                container: "shadowCast",
                title: "shadowcast",
                visibleElements: { tooltip: true }
            })
        } else {

            if (globalLayers.shadowCastWidget) {
                globalLayers.shadowCastWidget.visible = false;
                globalLayers.shadowCastWidget.visibleElements.tooltip = false;
            }
        }
    },

    add3DGraphicLayer: async function () {
        if (this.graphic3dLayers) {
            this.view?.map.add(this.graphic3dLayers)
        }
    },

    convertSpatialSystem: async function (geometry: any) {
        try {
            const [projection, SpatialReference] = await loadMultipleModules(["esri/geometry/projection", "esri/geometry/SpatialReference"]);
            await projection.load();

            if (geometry.spatialReference.wkid === "4326") {
                const res = this.removeZfromRings(geometry);
                return res;
            } else {
                const outSpatialReference = new SpatialReference({ wkid: 4326 });
                const convertedGeometry = projection.project(geometry, outSpatialReference);
                if(!convertedGeometry || !convertedGeometry?.rings) return null;
                const res = this.removeZfromRings(convertedGeometry);
                return res;
            }
        } catch (error) {
            // Handle any errors that might occur during module loading or projection
            console.error("Error converting spatial system:", error);
            return null;
        }
    },

    removeZfromRings: function (geometry: any) {
        const newRings = geometry.rings.map((ring: any) => {
            return ring.map((item: any) => [item[0], item[1]]);
        });
        geometry.rings = newRings;
        return geometry;

    },

    updateGeomrtyRingswithTilt: function (graphic: any, ring: number[][], pointGeometry: __esri.Point, centerLong: number, geometry: any, centerLat: number) {
        for (let i = 0; i < ring.length; i++) {
            let long = ring[i][0];
            let lat = ring[i][1];
            // let heig = pointGeometry?.z;
            if (graphic.attributes?.type === "circle" || graphic.title === "select-rectangle") {
                geometry.rings[0][i][2] = 0;
            } else {
                if (centerLong > long) {
                    geometry.rings[0][i][2] = 0;
                } else if (centerLat < lat) {
                    geometry.rings[0][i][2] = 0 - 10;
                    // return 'left';
                } else {
                    geometry.rings[0][i][2] = 0 - 10;
                    // return 'same';
                }
            }
        }
        return geometry;

    },

    removeButtonEvents: function () {
        Object.entries(this.sketchButton)
            .forEach(items => {
                if (items && items[1] !== null) {
                    if (items[1]) {

                    }
                    // (items[1] as HTMLButtonElement)?.removeEventListener('click', () => {
                    //     // console.log('button click event removed..')
                    // })
                }
            })
    },

    removePolyLineswithTitle: function (title: string | string[], type?: string) {
        let removeGraphics = [] as __esri.Graphic[]
        if (this.lastactiveTool === "circle") return
        this.sketchLayers?.graphics.forEach((graphic: any) => {
            if (typeof (title) === "string") {
                if (graphic.title?.trim() === title?.trim() && (graphic.geometry.type === "polyline" || graphic.geometry.type === "point")) {
                    removeGraphics.push(graphic)
                }
            } else {
                if (title.includes(graphic?.title?.trim()) && (graphic.geometry.type === "polyline" || graphic.geometry.type === "point")) {
                    removeGraphics.push(graphic)
                }
            }
        });

        if (removeGraphics.length) {
            this.sketchLayers?.graphics.removeMany(removeGraphics)
        }

        // console.log(this.sketchLayers?.graphics)
    },

    togglePolyline: function (title: string, toggle: boolean) {
        if (this.sketchVM.state === "ready") {
            this.sketchLayers?.graphics.forEach((ele: any) => {
                if (ele.title && ele.title === title && ele.geometry.type !== 'polygon') {
                    ele.visible = toggle
                }
            })
        }
        this.sketchLayers?.graphics.forEach((ele: any) => {
            if (!ele) return;
            if (ele.title && ele.title === title && ele.geometry.type !== 'polygon') {
                ele.visible = toggle
            }
        })
    },
    hidePolyLines: function () {
        if (this.sketchVM) {
            this.sketchLayers?.graphics.forEach((ele) => {
                if (ele.attributes && (ele.geometry.type === 'polyline' || ele.geometry.type === 'point') && Object.keys(ele.attributes).length) {
                    if(ele.attributes.name){
                        ele.visible = false
                    }
                }
            })
        }
        this.sketchLayers?.graphics.forEach((ele: any) => {
            this.sketchLayers?.graphics.forEach((ele) => {
                if (ele.attributes && (ele.geometry.type === 'polyline' || ele.geometry.type === 'point') && Object.keys(ele.attributes).length) {
                    if(ele.attributes.name){
                        ele.visible = false
                    }
                }
                if (ele.attributes && (ele.geometry.type === 'polyline' || ele.geometry.type === 'point') && Object.keys(ele.attributes).length) {
                    if(ele.attributes.name){
                        ele.visible = false
                    }
                }
            })
        })
    }
}

export default globalLayers;

export const basemapNames = [
    'satellite',
    'hybrid',
    'dark-gray',
    'oceans',
    'national-geographic',
    'terrain',
    'osm',
    'streets-navigation-vector',
    'streets-relief-vector',
    'streets-night-vector',
    'streets-vector',
    'topo-vector',
    'gray-vector'
];
export const mapLayesNames = [
    'esri',
    'bing'
];
