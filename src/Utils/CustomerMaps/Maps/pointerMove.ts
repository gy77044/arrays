import globalLayers from "./GlobaLMap";
import { getCursorCoordinates } from "../../../lib/Customer/FooterCoordinates";
import { getGraphic } from "./getFucntion";

export const pointerMove = (e: __esri.ViewPointerMoveEvent) => {
    // get the coordinates and show in footer if map
    getCursorCoordinates(e)
    // console.log(globalLayers.featureAddState)

    if (!globalLayers.indiLayers) return;
    if (globalLayers.indiLayers.graphics.length === 0) return;

    const mapPoint = globalLayers.view?.toMap({ x: e.x, y: e.y });

    if (globalLayers.featureAddState === 'active') {
        if (!mapPoint) return; // not mapPoint found for map coordinates

        // get a single graphic from the module graphics
        let justOneGraphicatRandom = ((globalLayers.indiLayers.graphics as any).items[0] as __esri.Graphic).clone();
        let polygonGeometry = justOneGraphicatRandom.geometry as __esri.Polygon;
        const oldCentroid = polygonGeometry.centroid;

        const dx = mapPoint.longitude - oldCentroid.x;
        const dy = mapPoint.latitude - oldCentroid.y;

        for (const ring of polygonGeometry.rings) {
            for (const point of ring) {
                point[0] += dx;
                point[1] += dy;
            }
        }

        if(globalLayers.tempGraphic){
            globalLayers.indiLayers.graphics.remove(globalLayers.tempGraphic);
        }

        // Create a new polygon graphic with the updated geometry
        globalLayers.tempGraphic = getGraphic(polygonGeometry, justOneGraphicatRandom.symbol, justOneGraphicatRandom.attributes)

        globalLayers.indiLayers.graphics.add(globalLayers.tempGraphic);

        // for guiding guiding lines graphic 

        const polylineVertical = {
            type: "polyline",
           paths: [
                [mapPoint.longitude, mapPoint.latitude], //Longitude, latitude
                [mapPoint.longitude, mapPoint.latitude + 0.00005], //Longitude, latitude
                [mapPoint.longitude, mapPoint.latitude - 0.00005], //Longitude, latitude
            ]

        };

        const polylineHorizontal = {
            type: "polyline",
            paths: [
                [mapPoint.longitude, mapPoint.latitude], //Longitude, latitude
                [mapPoint.longitude + 0.00005, mapPoint.latitude], //Longitude, latitude
                [mapPoint.longitude- 0.00005, mapPoint.latitude ], //Longitude, latitude
            ]

        };

        const simpleLineSymbol = {
            type: "simple-line",
            color: [226, 119, 40], // Orange
            width: 1,
            style: "dot"
        };
        // remove the guiding lines if already attached
        if(globalLayers.guidinglines.verticalLine){
            globalLayers.indiLayers.graphics.remove(globalLayers.guidinglines.verticalLine);
        }
        if(globalLayers.guidinglines.horizontalLine){
            globalLayers.indiLayers.graphics.remove(globalLayers.guidinglines.horizontalLine);
        }

        // make these into graphic layer 
        globalLayers.guidinglines.verticalLine = getGraphic(polylineVertical, simpleLineSymbol, {})
        globalLayers.guidinglines.horizontalLine = getGraphic(polylineHorizontal, simpleLineSymbol, {})


        // add these graphci to the indilayers

        globalLayers.indiLayers.graphics.add(globalLayers.guidinglines.verticalLine);
        globalLayers.indiLayers.graphics.add(globalLayers.guidinglines.horizontalLine);

    }

    // to handle pointer move with selected graphic 
    if(globalLayers.featureAddState === 'select' && globalLayers.isSelected){

        if(globalLayers.tempGraphic){
        
            if (!mapPoint) return; // not mapPoint found for map coordinates

            // get a single graphic from the module graphics
            let justOneGraphicatRandom = ((globalLayers.indiLayers.graphics as any).items[0] as __esri.Graphic).clone();
            let polygonGeometry = justOneGraphicatRandom.geometry as __esri.Polygon;
            const oldCentroid = polygonGeometry.centroid;

            const dx = mapPoint.longitude - oldCentroid.x;
            const dy = mapPoint.latitude - oldCentroid.y;

            for (const ring of polygonGeometry.rings) {
                for (const point of ring) {
                    point[0] += dx;
                    point[1] += dy;
                }
            }

            if(globalLayers.tempGraphic){
                globalLayers.indiLayers.graphics.remove(globalLayers.tempGraphic);
            }

            // Create a new polygon graphic with the updated geometry
            globalLayers.tempGraphic = getGraphic(polygonGeometry, justOneGraphicatRandom.symbol, justOneGraphicatRandom.attributes)

            globalLayers.indiLayers.graphics.add(globalLayers.tempGraphic);

            // create guiding lines 
            const polylineVertical = {
                type: "polyline",
               paths: [
                    [mapPoint.longitude, mapPoint.latitude], //Longitude, latitude
                    [mapPoint.longitude, mapPoint.latitude + 0.00005], //Longitude, latitude
                    [mapPoint.longitude, mapPoint.latitude - 0.00005], //Longitude, latitude
                ]
    
            };
    
            const polylineHorizontal = {
                type: "polyline",
                paths: [
                    [mapPoint.longitude, mapPoint.latitude], //Longitude, latitude
                    [mapPoint.longitude + 0.00005, mapPoint.latitude], //Longitude, latitude
                    [mapPoint.longitude- 0.00005, mapPoint.latitude ], //Longitude, latitude
                ]
    
            };
    
            const simpleLineSymbol = {
                type: "simple-line",
                color: [226, 119, 40], // Orange
                width: 1,
                style: "dot"
            };
            // remove the guiding lines if already attached
            if(globalLayers.guidinglines.verticalLine){
                globalLayers.indiLayers.graphics.remove(globalLayers.guidinglines.verticalLine);
            }
            if(globalLayers.guidinglines.horizontalLine){
                globalLayers.indiLayers.graphics.remove(globalLayers.guidinglines.horizontalLine);
            }
    
            // make these into graphic layer 
            globalLayers.guidinglines.verticalLine = getGraphic(polylineVertical, simpleLineSymbol, {})
            globalLayers.guidinglines.horizontalLine = getGraphic(polylineHorizontal, simpleLineSymbol, {})
    
    
            // add these graphci to the indilayers
    
            globalLayers.indiLayers.graphics.add(globalLayers.guidinglines.verticalLine);
            globalLayers.indiLayers.graphics.add(globalLayers.guidinglines.horizontalLine);
        
        }

    }
}