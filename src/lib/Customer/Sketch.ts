import { toast } from "react-toastify";
import { obstructionArea } from "../../ReduxTool/Slice/Consumer/ConsumerReducers";
import { setTitle, toggleDrawer } from "../../ReduxTool/Slice/Drawer/DrawerReducer";
import { setGeomHeigth } from "../../ReduxTool/Slice/Geometry/GeometryReducer";
import { clearBoundryandDataModal, setIsBuildingDrawn } from "../../ReduxTool/Slice/Map/MapReducer";
import { pvHandleRoofTop_3d } from "../../Utils/CustomerMaps/GenerateRoof/generate3dRoof";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { loadMultipleModules } from "../../Utils/CustomerMaps/Maps/LazyloadMap";
import { getsimpleFillSymbol, simpleLineSymbol } from "../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";
import { store } from "./../../ReduxTool/store/store";
import { bindButtontoSketchObject } from "./bindButtontoSketch_depricated";
import { createCircle, updatingCircleGeometry } from "./createCircle";
import { createPolylinewithCoordinates } from "./createPolyLinefromCoordinates";
import { handlePolygonCreate } from "./createPolygon";
import { createPolylinefromDbClick } from "./createPolylinewithDbClick";
import { createRectangle } from "./createRectangle";
import { getPointPairsFromRing } from "./getPointPairsFromRing";
import { getGeometryRingPolyline } from "./getRingsLengthPointsGeom";
import { watchLocationMarkerChanges } from "./watchChanges/index";
import { MAXUSEABLEAREA, TActiveTool } from "../../Utils/Const";
import Sketch from "@arcgis/core/widgets/Sketch";

var allLinesCoordinates = [] as any[];
var lastLengthArray = [] as any[];
var lastlineLength = 0 as any;
var lastAddedCoordinates = [] as number[];
var currentCoordinates = [] as number[];

var area = 0



export async function addsketchView() {
    const [GroupLayer, Point, Sketch, GraphicsLayer, SimpleFillSymbol, geometryEngine, Measurement, Graphic, geodesicUtils, Polyline, webMercatorUtils, SimpleLineSymbol, SpatialReference, TextSymbol] = await loadMultipleModules(["esri/layers/GroupLayer", "esri/geometry/Point", "esri/widgets/Sketch", "esri/layers/GraphicsLayer", "esri/symbols/SimpleFillSymbol", "esri/geometry/geometryEngine", "esri/widgets/Measurement", "esri/Graphic", "esri/geometry/support/geodesicUtils", "esri/geometry/Polyline", "esri/geometry/support/webMercatorUtils", "esri/symbols/SimpleLineSymbol", "esri/geometry/SpatialReference", "esri/symbols/TextSymbol"])
    const symbolCircle = new SimpleFillSymbol(getsimpleFillSymbol([173, 150, 50, 0.5], [150, 0, 0]))

    if (globalLayers.sketchLayers === null) {
        globalLayers.sketchLayers = new GraphicsLayer({
            title: "sketch-layer",
            id: "sketch-layer",
        });
    }

    if (globalLayers.activeView === "2D") {
        globalLayers.map?.allLayers.forEach(ele => {
            if (ele?.title === "3d") {
                globalLayers.map?.remove(ele);
            }
            if (ele?.title === "RoofTopModule_3d") {
                // ele.visible = false;
                globalLayers.map?.remove(ele);
            }
        });
        const currentModifiedGraohic = globalLayers.selectedGraphic;
        if (currentModifiedGraohic) {
            (globalLayers.sketchLayers?.graphics as any).items.forEach((ele: any) => {
                let graphic3d = currentModifiedGraohic as any;
                // returns true if two given geometries are equal
                if (ele.geometry.type === graphic3d.geometry.type && ele?.title === graphic3d.title) {
                    // const newRings  = globalLayers.removeZfromRings(graphic3d.geometry)
                    ele.geometry.rings = graphic3d.geometry.rings
                }
            })
        }
        globalLayers.map?.add(globalLayers.sketchLayers!)
        if (globalLayers.panles_2d) {
            globalLayers.map?.layers.add(globalLayers.panles_2d);
        }

    } else {
        globalLayers.removeButtonEvents();
        globalLayers.RemoveLayer("RoofTopModule")
        globalLayers.map?.allLayers.forEach(ele => {
            if (ele?.title === "sketch-layer") {
                globalLayers.map?.remove(ele);
            }
            if (ele?.title === "RoofTopModule") {
                globalLayers.map?.remove(ele);
            }
        });

        const currentModifiedGraohic = globalLayers.selectedGraphic
        if (currentModifiedGraohic) {
            (globalLayers.graphic3dLayers?.graphics as any).items.forEach((ele: any) => {
                let graphic2d = currentModifiedGraohic as any;
                if (ele.geometry.type === graphic2d.geometry.type && ele?.title === graphic2d.title) {
                    ele.geometry.rings = graphic2d.geometry.rings;
                }
            })
        }

        if (globalLayers.graphic3dLayers) {
            globalLayers.graphic3dLayers.visible = true
        }

        if (globalLayers.graphic3dLayers) {
            globalLayers.graphic3dLayers.visible = true
            globalLayers.graphic3dLayers.graphics.forEach(graphic => {
                graphic.visible = true
            })
        }

        globalLayers.map?.add(globalLayers.graphic3dLayers!);

        if (globalLayers.polygonGeomforLayout) {
            pvHandleRoofTop_3d(globalLayers.polygonGeomforLayout, globalLayers.elevationP)
        }

    }

    globalLayers.measurement = new Measurement({
        view: globalLayers.view
    })

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

    await globalLayers.skecthVMRefresh(Sketch, sketchObject)
    await watchLocationMarkerChanges()

   
    // Listen to sketch widget's create event.
    globalLayers.sketchVM.on("create", async function (event) {

        let index = globalLayers.polygonListCounts.length - 1;
        let titleName = globalLayers.polygonListCounts[index]

        const groupLayers = new GroupLayer() as __esri.GroupLayer
        await getVertexAddEvent(event, Point, geodesicUtils, titleName, groupLayers, geometryEngine, Graphic)

        if (event.state === "complete") {
            const shapeType = event.tool;
            if (shapeType === "circle") {
                createCircle(event, symbolCircle, geometryEngine)
                return;
            } else {
                event.graphic.symbol = simpleLineSymbol;
                if (shapeType === "polygon") {
                    event.graphic.attributes = { type: "polygon" }
                    const totalPolylines = globalLayers.sketchLayers?.graphics.filter((ele: any) => ele?.title === titleName && ele.geometry.type === "polyline")
                    if (totalPolylines && totalPolylines?.length < allLinesCoordinates.length) {
                        let lstCoordinates = allLinesCoordinates[0]
                        let currCoordinates = allLinesCoordinates[allLinesCoordinates.length - 1]
                        createPolylinefromDbClick(currCoordinates, lstCoordinates, titleName).then(ele => {
                            allLinesCoordinates = []
                        })
                    }
                    handlePolygonCreate(event, geometryEngine, titleName)
                }

                if (shapeType === "rectangle") {
                    createRectangle(event, geometryEngine)

                }
                if (globalLayers.sketchLayers) {
                    const existingGraphics = globalLayers.sketchLayers.graphics.filter((graphic: any) => {
                        return graphic.uid === (event.graphic as any).uid;
                    });
                    if (existingGraphics.length === 0) {
                        globalLayers.sketchLayers.add(event.graphic);
                    }

                }
                if (globalLayers.selectionTool === 'rectangle-selection' && (event.graphic as any).title === 'rectangle') {
                    globalLayers.sketchLayers?.graphics.remove(event.graphic);
                }
            }
            let newGraphic = event.graphic;
            await getLengthfromPolygonLines(newGraphic)

        }
    });

    globalLayers.sketchVM.on('update', (event) => {
        if (event.graphics.length === 0) return;
        const graphic = event.graphics[0] as any
        var title = [] as string[];

        
        if (event.state === "start") {            
            // show modald for remve boundry and data if saved else close the modal of selected no
            // check if project os saved then stop the selection of project 
            if(globalLayers.isSavedProject){
                // globalLayers.stopSketch()
                store.dispatch(clearBoundryandDataModal(true))
            }
            

            globalLayers.selectedGraphic = graphic
            title.push(graphic.title);
            // to make polyline and point visible for the selected layer 
            if (event.graphics.length) {
                event.graphics.forEach((layer: any) => {
                    globalLayers.togglePolyline(layer.title, true)
                });
            }
            if (graphic?.attributes?.height) {
                globalLayers.currentSelectedGraphic = graphic?.attributes?.height
                store.dispatch(setGeomHeigth(graphic.attributes.height))
            }
        }

        if (event.state === "complete") {
            
            if(area > MAXUSEABLEAREA && event.tool === 'transform' && event.type === 'update'){

                // remove 
                globalLayers.sketchLayers?.graphics.remove(event.graphics![0]);
                globalLayers.removePolyLineswithTitle(title);

                globalLayers.sketchLayers?.graphics.forEach(el => {
                    if(el.geometry.type !== 'polygon'){
                        globalLayers.sketchLayers?.graphics.remove(el);
                    }
                })
                globalLayers.sketchLayers?.removeAll()
                // store.dispatch(obstructionArea(null))
                store.dispatch(setTitle(""))
                store.dispatch(toggleDrawer(false))
                // store.dispatch(resetRoofAnalisisForm());


                if(globalLayers.prevsketchLayers){
                    globalLayers.sketchLayers?.graphics.add(globalLayers.prevsketchLayers)
                }

         
            } else {               
                event.graphics?.forEach((ele: any) => {
                    if (title.includes(ele?.title)) return;
                    title.push(ele.title)
                })
                // make the polyline and point invisible after completion
                if (event.graphics.length) {
                    event.graphics.forEach((layer: any) => {
                        globalLayers.togglePolyline(layer.title, false)
                    })
                }
    
                if (graphic.attributes) {
                    if (graphic.attributes.height) {
                        globalLayers.currentSelectedGraphic = 0
                    }
                }

                if (event.graphics.length) {
                    event.graphics.forEach((layer: any) => {
                        globalLayers.togglePolyline(layer.title, false)
                    })
                }

            }
        }

        if (event.toolEventInfo && event.toolEventInfo.type === "selection-change") {
            event.toolEventInfo.added.forEach((ele: any) => {
                title.push(ele?.title)
            })
        }

        if (graphic?.title) {
            if (graphic.title?.includes('circle') === false) {
                globalLayers.lastactiveTool = 'polygon'
            }
        }

        if (event.graphics) {
            if (event.graphics.length === 1) {
                globalLayers.selectedGraphic = graphic
            }
            if (event.graphics.length === 2) {
                event.graphics.forEach(grap => globalLayers.multipleSelectedGraphic.push(grap))
            }
        }

        // only targetting the circle graphic form update sketch object 
        event.graphics.forEach((ele: any) => {
            if (ele?.title?.includes('circle')) {
                if (globalLayers.activeView !== "3D") {
                    updatingCircleGeometry(event, geometryEngine, Polyline, webMercatorUtils, Point, geodesicUtils, Graphic, SimpleFillSymbol)
                }
            } else {
                title.push(ele?.title)
            }
        })

        
        if (event.state === "active") {
            if(!globalLayers.prevsketchLayers){
                globalLayers.prevsketchLayers = event.graphics[0]
            }
            // cal area 
            const geodesicArea = geometryEngine.geodesicArea(event.graphics[0].geometry, "square-meters");
            area = geodesicArea as number

          if(area<MAXUSEABLEAREA){
            store.dispatch(obstructionArea(area.toFixed(2)))
          }

            if(event.toolEventInfo.type === 'scale-stop' && area > MAXUSEABLEAREA){
                // globalLayers.sketchLayers?.graphics.removeAll();

                // when area become mpre then allowed 

                globalLayers.sketchLayers?.graphics.add(event.graphics![0]);
                globalLayers.removePolyLineswithTitle(title);
                globalLayers.sketchLayers?.graphics.forEach(el => {
                    if(el.geometry.type !== 'polygon'){
                        globalLayers.sketchLayers?.graphics.remove(el);
                    }
                })
                globalLayers.sketchLayers?.removeAll();
                toast.error("The drawn area must be between 50 sq m and 4,000 sq m.",{toastId:"customID"})


                // if(globalLayers.prevsketchLayers){
                //     globalLayers.sketchLayers?.graphics.add(globalLayers.prevsketchLayers)
                // }

            }
            getGeometryRingPolyline(graphic, Point, geodesicUtils, webMercatorUtils, SimpleLineSymbol, Polyline, Graphic, SpatialReference, TextSymbol, geometryEngine, title)
        }
    })

    globalLayers.removeButtonEvents()

    await bindButtontoSketchObject()

    if(globalLayers.sketchLayers){
        globalLayers.sketchLayers.graphics.on('after-remove', e => {
            if(e.item){
                const graphic = e.item;
                // check if removed graphic is building
                // if(Object.keys(graphic.attributes).length && graphic.attributes.name && graphic.geometry.type === 'polygon' && (graphic.attributes.name as string).includes('building')){
                //     // store.dispatch(setIsBuildingDrawn(false))
                // }
            }
        });
        (globalLayers.sketchVM as Sketch).watch('activeTool', (activeTool: TActiveTool) => {
            if(!activeTool){
                // the actibe tool is null or the active tool is rest
                globalLayers.hidePolyLines()
            }
            if(activeTool === 'polygon'){
            }
            if(activeTool === 'transform'){
            }
            // console.log(activeTool, 'watching activetool');
        })
    }

}

const getLengthfromPolygonLines = async (newGraphic: any) => {
    const [Point, geodesicUtils ] = await loadMultipleModules(["esri/geometry/Point", "esri/geometry/support/geodesicUtils" ])

    const polygon = newGraphic.geometry;
    // esri/geometry/Point
    // const distanceInMeters = geometryEngine.distance(point1, point2);
    globalLayers.convertSpatialSystem(polygon).then((geom) => {
        let linesLength = [] as number[]
        if (geom) {
            let rings = geom.rings;
            const pairs = getPointPairsFromRing(rings[0]) as any[]

            pairs.forEach(ring => {
                // ring[0], ring[1]
                const point1 = {
                    latitude: ring[0][1],
                    longitude: ring[0][0],
                    type: "point"
                };

                const point2 = {
                    latitude: ring[1][1],
                    longitude: ring[1][0],
                    type: "point"
                };

                const join = geodesicUtils.geodesicDistance(
                    new Point({ x: point1.longitude, y: point1.latitude }),
                    new Point({ x: point2.longitude, y: point2.latitude }),
                    "meters"
                );

                linesLength.push(join.distance!)
            })

            return linesLength
        }
    })
}

async function getVertexAddEvent(event: __esri.SketchCreateEvent, Point: any, geodesicUtils: __esri.geodesicUtils, titleName: string, groupLayers: __esri.GroupLayer, geometryEngine: __esri.geometryEngine, Graphic: any) {
    if (event.state === "start" && event.toolEventInfo.type === "vertex-add" && event.tool === "circle") {
        lastAddedCoordinates = (event.toolEventInfo as any).added[0]
    }

    if (event.state === "active" && event.tool === "circle") {

        if (lastAddedCoordinates.length === 0) {
        } else {
            if (event.toolEventInfo.type === "cursor-update") {
                currentCoordinates = event.toolEventInfo.coordinates
            }
            if (event.toolEventInfo.type === "vertex-add") {
                currentCoordinates = event.toolEventInfo.vertices[0].coordinates
            }
        }

        if (lastAddedCoordinates.length > 0) {
            createPolylinewithCoordinates(geodesicUtils, Point, lastAddedCoordinates, currentCoordinates, titleName)
        }

    }

    if (event.state === "active" && event.tool === "polygon" && event.toolEventInfo.type === "cursor-update") {
        if (allLinesCoordinates.length > 0) {
            const lastAddedCoordinates = allLinesCoordinates[allLinesCoordinates.length - 1]
            const currentCoordinates = event.toolEventInfo.coordinates
            createPolylinewithCoordinates(geodesicUtils, Point, lastAddedCoordinates, currentCoordinates, titleName)
        }
    }

    else if ((event.state === "start" || event.state === "active") && event.tool === "polygon" && event.toolEventInfo?.type === "vertex-add") {
        allLinesCoordinates.push((event.toolEventInfo as any).added[0])
        // console.log(lastlineLength)
        if (lastlineLength && lastlineLength > 0) {
            lastLengthArray.push(lastlineLength)
        }
        if (globalLayers.lineGraphic && globalLayers.textGraphic) {
            globalLayers.lineGraphicList.push(globalLayers.lineGraphic)
            globalLayers.textGraphicList.push(globalLayers.textGraphic)
            globalLayers.lineGraphic = null
            globalLayers.textGraphic = null
        }
    }

    if (event.state === "complete") {
        if (lastlineLength && lastlineLength > 0) {
            lastLengthArray.push(lastlineLength)
        }
    }

    return { lastLengthArray }
}
