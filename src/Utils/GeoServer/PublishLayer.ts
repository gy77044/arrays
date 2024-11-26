import Polygon from "@arcgis/core/geometry/Polygon";
import * as projection from "@arcgis/core/geometry/projection.js";
import SpatialReference from "@arcgis/core/geometry/SpatialReference";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";

export type GeoJsonType = {
  type: string;
  features: __esri.Collection<{
      type: string;
      geometry: {
          type: string;
          coordinates: number[][][];
      };
      properties: any;
  }>
}

async function featureLayerToGeoJSON(featureLayer: FeatureLayer) {
  await projection.load()
  // Extract features from the FeatureLayer
  const features = featureLayer.source.map((graphic) => {
    // const geometry = geojsonUtils.toJSON(graphic.geometry);
    // const properties = graphic.attributes;
    const outSpatialReference = new SpatialReference({ wkid: 4326 });
    const convertedGeometry = projection.project(graphic.geometry, outSpatialReference);
    if (!convertedGeometry) return null;

    return {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: (convertedGeometry as Polygon).rings,
      },
      properties: graphic.attributes
    };
  });

  // Return GeoJSON format
  return {
    type: "FeatureCollection",
    features,
  };
}


export async function publishGeoJSONToGeoServer(layer: FeatureLayer) {

  const geoJSON = await featureLayerToGeoJSON(layer);

  if(!geoJSON) return null;

  const workspace = 'myworkspace'; // The GeoServer workspace
  const datastore = 'mydatastore'; // The GeoServer datastore
  const geoserverUrl = `http://localhost:80/geoserver/rest/workspaces/${workspace}/datastores/${datastore}/file.shp`;

  // Convert GeoJSON to a FormData object (required for POSTing files)
  const formData = new FormData();
  formData.append("file", new Blob([JSON.stringify(geoJSON)], { type: "application/zip" }));

  try {
    const response = await fetch(geoserverUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/zip",
        "Authorization": "Basic " + btoa("admin:geoserver") // Replace with your GeoServer credentials
      },
      body: formData
    });

    if (response.ok) {
      console.log("GeoJSON published successfully!");
      return response.json(); // GeoServer's response with published layer details
    } else {
      console.error("Failed to publish GeoJSON on GeoServer");
    }
  } catch (error) {
    console.error("Error in publishing GeoJSON:", error);
  }
}

function addGeoServerLayerToMap(publishedLayerName: string) {
  const wmsLayerUrl = `http://localhost:80/geoserver/wms`;

  // const geoServerLayer = new Layer({
  //   url: wmsLayerUrl,
  //   params: {
  //     LAYERS: `myworkspace:${publishedLayerName}`, // Workspace and published layer name
  //     TILED: true
  //   },
  //   format: "image/png",
  //   transparent: true
  // });

  // // Add the GeoServer layer to the map
  // map.addLayer(geoServerLayer);
}
