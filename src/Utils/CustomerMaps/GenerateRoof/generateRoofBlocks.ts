import { loadModules } from "esri-loader";
import globalLayers from "../Maps/GlobaLMap";

import { createLayerWithSymbol } from "../Maps/CalPolyModules";
import { getGraphic } from "../Maps/getFucntion";
import { groupGraphicbyDistance } from "../Maps/groupGraphicbyDistance";
import { simpleFillSymbol_2d } from "../MarkerSymbols/MarkerSymbols";

/**
 * The `generateRoofBlocks` function generates roof blocks on a map using a collection of graphics and
 * a symbol.
 * @param {any[]} polyGraphicCollection - The `polyGraphicCollection` parameter is an array of graphics
 * that represent polygons or shapes on a map.
 * @param {any} symbol - The `symbol` parameter is an object that represents the symbol used to render
 * the graphics in the layer. It could be a marker symbol, line symbol, fill symbol, or text symbol,
 * depending on the type of graphics being rendered.
 * @param {string} title - The title parameter is a string that represents the title of the graphic
 * layer that will be created.
 * @param [zoommin=0] - The `zoommin` parameter is the minimum scale at which the layer should be
 * visible on the map. It is used to control the visibility of the layer based on the zoom level of the
 * map.
 * @param [zoommax=0] - The `zoommax` parameter is used to set the maximum scale at which the layer
 * will be visible on the map. This means that the layer will only be visible when the map is zoomed in
 * beyond the specified scale.
 * @param [exp=.OBJECTID] - The `exp` parameter is an expression that is used to define the
 * attribute value for each graphic in the layer. In this case, it is set to ".OBJECTID", which
 * means that the value of the OBJECTID field from the feature layer will be used as the attribute
 * value for each
 */

export const generateRoofBlocks = (polyGraphicCollection: any[], symbol: any, title: string, pointGraphicRotation: __esri.Graphic,  zoommin = 0, zoommax = 0, exp = "$feature.OBJECTID") => {
    const simpleFillSymbol = simpleFillSymbol_2d()
    loadModules(['esri/layers/GraphicsLayer', 'esri/geometry/geometryEngine', 'esri/geometry/Point', 'esri/geometry/support/webMercatorUtils', 'esri/geometry/Polyline', 'esri/geometry/projection'])
        .then(([GraphicsLayer, geometryEngine, Point, webMercatorUtils, Polyline, projection]) => {
            var roatedGraphicCollection = [] as __esri.Graphic[];
            // make the grphic collection rotate minus azmiuth degree and then group them 
            polyGraphicCollection.forEach(element => {
                const rotateelem = geometryEngine.rotate(element.geometry, -globalLayers.azimuth, pointGraphicRotation.geometry);
                let rotateElemGraphic = getGraphic(rotateelem, simpleFillSymbol, {});
                roatedGraphicCollection.push(rotateElemGraphic);
            })
            
            const setsOfGraphics = groupGraphicbyDistance(roatedGraphicCollection, 6, 2, geometryEngine, pointGraphicRotation)

            let graphicAlreadyThere = globalLayers.indiLayers;
            if(globalLayers.indiLayers){
                globalLayers.map?.layers.remove(globalLayers.indiLayers!)
            }
            // create a graphic layer for all the layer collection in module table
            globalLayers.lastDrawnRoofBoundryGraphicTitle = `Solar Blocks ${globalLayers.roofCounts + 1}`;
            globalLayers.indiLayers = new GraphicsLayer({
                title: graphicAlreadyThere?.title ? graphicAlreadyThere?.title : globalLayers.lastDrawnRoofBoundryGraphicTitle,
                spatialReference: {
                    wkid: 102100
                }
            })
         
            globalLayers.indiLayers?.graphics.addMany(polyGraphicCollection);
            if(globalLayers.indiLayers){
                globalLayers.indiLayers.visible = false;
                globalLayers.indiLayers?.graphics.on('change', (e) => {
                    console.log(e.added, 'added')
                })

            }
            if(globalLayers.indiLayers?.graphics.length){
                globalLayers.totalNumberofModules = globalLayers.indiLayers?.graphics.length;
                
            }

            
        
            
            (globalLayers.map?.allLayers as any)._items.forEach((e: any) => {
                if(e.title && e.title === 'Solar Blocks 1'){
                    globalLayers.map?.layers.remove(globalLayers.indiLayers!)
                }
            });

            // globalLayers.map?.add(globalLayers.indiLayers!);
            globalLayers.roofCounts += 1
        })
        .catch(e => {
            console.log(e)
        })

    createLayerWithSymbol(polyGraphicCollection, symbol, title, exp).then(lyrPath => {
        if (zoommin != 0) {
            lyrPath.minScale = zoommin;
            lyrPath.maxScale = zoommax;
        }
        // globalLayers.map?.layers.add(lyrPath);
        globalLayers.panles_2d = lyrPath;
        // store the ayer on global state 
        globalLayers.roofTopModuleCount.push(lyrPath)
        return lyrPath;
    })
}


const createStringsfromGeometrie = (collection: __esri.Graphic[]) => {
    let lastCentroid = [];
    collection.forEach(graphic => {
        if(lastCentroid.length > 0){

            // create a line from last centroid to the current geometry centroid 


        } else {
            lastCentroid.push((graphic.geometry as any).centroid)
        }
    })
}