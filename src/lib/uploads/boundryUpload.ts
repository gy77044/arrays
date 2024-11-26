import Graphic from "@arcgis/core/Graphic";
import { PvSymbols } from "../../Utils/CustomerMaps/MarkerSymbols/MarkerSymbols";
import { getGraphic } from "../../Utils/CustomerMaps/Maps/getFucntion";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";

type CentroidPoint = {
    type: string;
    longitude: any;
    latitude: any;
}

export const uploadGeojsonBoundry = (files: FileList) => {
    // to upload the geojosn file on the esri map and show it on map
    if(files.length === 0) return;
    const file  = files[0];
    const fileName = file.name.toLowerCase();
    let geojson: any = null;

    
    var geoJSONboundryGraphic = {} as Graphic
    const returnObjectGraphicInfo = {} as { geoJSONboundryGraphic: Graphic, centroidPoint:  CentroidPoint, altitude: number }
    
    const reader = new FileReader()

    reader
    .onload = async (e) => {
        const fileBuffer = await file.arrayBuffer();
        if (e.target != null) {
            let ring: any[] = []
            const text = (e.target.result) as string;
            if(fileName.endsWith('.geojson')){
                geojson = JSON.parse(text);
            }

            if(geojson){
                ring = geojson.features[0].geometry.coordinates;
            }

            var polygon = {
                type: "polygon",
                uidn: "grid",
                rings: ring,
                title: "plotBoundary"
            };

            const simpleFillSymbol = PvSymbols.simpleFillObject([3, 82, 150, 0.4], [3, 82, 150], 1);

            returnObjectGraphicInfo.geoJSONboundryGraphic = getGraphic(polygon, simpleFillSymbol, { title: "plotBoundary" });

            // create a point geomteyr from the above plotBoundry Graphic centroid
            returnObjectGraphicInfo.centroidPoint = {
                type: "point",
                longitude: (geoJSONboundryGraphic.geometry as any)?.centroid?.longitude,
                latitude: (geoJSONboundryGraphic.geometry as any)?.centroid?.latitude
            };
            const simpleMarker = PvSymbols.simpleMarkerSymbol([226, 119, 40], [255, 255, 255], 1)
            const pointGraphic = getGraphic(returnObjectGraphicInfo.centroidPoint, simpleMarker, {});

            const terrainLayer = (globalLayers.view?.map.ground.layers as any).items as any[];
            const pointCentroid = await terrainLayer[0].queryElevation(pointGraphic.geometry)
            
            returnObjectGraphicInfo.altitude = Math.round((pointCentroid.geometry.z + Number.EPSILON) * 100) / 100;

        }
    }
    reader
    .onprogress = function (data) {
        if (data.lengthComputable) {
            // getting the progress completion count from here
            var progress = ((data.loaded / data.total) * 100);
            
        }
    }

    return returnObjectGraphicInfo;
}