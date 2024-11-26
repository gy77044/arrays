import axios, { AxiosResponse } from "axios";
import globalLayers from "./GlobaLMap";
import { getsimpleFillSymbol } from "../../CustomerMaps/MarkerSymbols/MarkerSymbols";
import { loadEsriModules } from "./getEsriModules";
import { getGraphic } from "./getFucntion";


const geosolutions = process.env.NODE_ENV === "development" ? process.env.REACT_APP_LOCAL_GEOSERVER_OWS : process.env.REACT_APP_GEOSERVER_OWS;
const GeoURL = (typeNames: string, cqlFilter: string) => `${geosolutions}/wfs?SERVICE=WFS&VERSION=2.0.0&REQUEST=GetFeature&typeNames=${typeNames}&cql_filter=${cqlFilter}&outputFormat=application/json`

export const fetchRooffromCoordinates = async (latitude: number, longitude: number): Promise<null | __esri.Geometry> => {
    if (latitude && longitude) {
        const typeNames = 'pvbuilding:building'
        const cqlFilter = "INTERSECTS(the_geom, POINT (" + latitude + ' ' + longitude + "))"
        const wfs = GeoURL(typeNames, cqlFilter)
        var response = null as  AxiosResponse<any, any> | null;
        try{
            response = await axios.get(wfs)
        } catch(e){
            console.log(e)
            return null;
        }

        if(response?.status !== 200){
            console.log("encountered some error while fetching the layer");
            return null;
        }
       

        if(response?.data?.features.length){
            
            globalLayers.selectedRoof.objectid = response?.data.features[0]?.id && (response?.data.features[0]?.id as string).split(".")[1]
            globalLayers.selectedRoof.properties = response?.data.features[0]?.properties
            globalLayers.elevationP = response?.data.features[0]?.properties.ElevationP;
            const geometry = response?.data.features[0]?.geometry
    
            const [Polygon, GeoJSONLayer] = await loadEsriModules(['esri/geometry/Polygon', 'esri/layers/GeoJSONLayer'])
            if (geometry.coordinates && geometry.coordinates.length) {
                globalLayers.mainPoly = new Polygon({
                    rings: geometry.coordinates[0]
                })
                const blob = new Blob([JSON.stringify(response?.data)], {
                    type: "application/json"
                });
                const url = URL.createObjectURL(blob);
                let layer = new GeoJSONLayer({
                    url,
                    title: "GeoJson"
                }) as __esri.GeoJSONLayer;
                globalLayers.map?.allLayers.forEach((ele: any) => {
                    if (ele?.title === layer.title) {
                        globalLayers.map?.remove(ele);
                    }
                  
                })
    
            }
        }


        return globalLayers.mainPoly


    }
    return null;
}

export const fetchKeepOutsRoofsByParentId = async (id: number, lyrNames: string[], geometry: __esri.Geometry, geometryEngine: __esri.geometryEngine, Polygon: any, SimpleFillSymbol: any) => {
    let differnecGeom = geometry as any;
    const axiosRequests = lyrNames.map(async (name) => {
        const typeNames = `pvbuilding:${name}`;
        const cqlFilter = `parentid = ${id}`;
        const wfs = GeoURL(typeNames, cqlFilter);
        const response = await axios.get(wfs);
        (response?.data.features as any[]).forEach(item => {
            let cutOffGeom = item.geometry;
            const diffPoly = new Polygon({
                rings: cutOffGeom.coordinates[0]
            });
            let height: number = (item.properties as { height: number }).height ? parseFloat(item.properties.height) : 0;
            const bufferGeometry: any = geometryEngine.geodesicBuffer(diffPoly, height, 'meters', true);
            differnecGeom = (geometryEngine as __esri.geometryEngine).difference(differnecGeom, bufferGeometry);
          
        });
    });

    await Promise.all(axiosRequests);

    const symbol = new SimpleFillSymbol(getsimpleFillSymbol([173, 150, 50, 0.5], [150, 55, 0]))
    globalLayers.selectedGraphic = getGraphic(differnecGeom, symbol, { title: 'roofboundry' })

    globalLayers.sketchLayers?.graphics.forEach(ele => {
        if (ele.attributes && ele.attributes?.title === 'roofboundry') {
            globalLayers.sketchLayers?.graphics.remove(ele);
        }
    })

    globalLayers.sketchLayers?.graphics.add(globalLayers.selectedGraphic);
    globalLayers.sketchVM.update(globalLayers.selectedGraphic);
};
