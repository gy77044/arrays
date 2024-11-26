import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import Layer from "@arcgis/core/layers/Layer";

const geoServerWFSUrl = '';
const geoServerWorkspace = '';
const wmsLayerName = '';

export async function fetchGeoserverLayer(featureLayer: FeatureLayer) {
    try {
        // Convert the FeatureLayer to GeoJSON or GML format required by GeoServer
        const geojson = featureLayerToGeoJSON(featureLayer);

        // Prepare WFS-T request to upload the feature
        const response = await fetch(geoServerWFSUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/xml" // or "application/json" for GeoJSON format
            },
            body: geojson // Feature layer in the format (GeoJSON or GML) required by GeoServer
        });

        if (!response.ok) {
            throw new Error(`Failed to send the feature layer to GeoServer: ${response.statusText}`);
        }

        // Wait for the response and parse it
        const responseData = await response.text();

        // Check if GeoServer processed the WFS request correctly
        if (responseData.includes('<ows:ExceptionReport')) {
            throw new Error('GeoServer returned an exception: ' + responseData);
        }

        console.log("Feature successfully sent to GeoServer!");

        // Construct the WMS layer URL
        const wmsUrl = `${geoServerWFSUrl.replace('/wfs', '/wms')}?service=WMS&version=1.1.0&request=GetMap&layers=${geoServerWorkspace}:${wmsLayerName}&styles=&bbox=-180,-90,180,90&width=800&height=400&srs=EPSG:4326&format=image/png`;

        // Create an OpenLayers WMS layer (assuming OpenLayers is used)
        

        // Add the WMS layer to the map view
        // map.addLayer(wmsLayer);

        console.log("WMS layer added to map!");

    } catch (error) {
        console.error("An error occurred:", error);
    }
}

// Utility function to convert a FeatureLayer to GeoJSON (modify as needed for your case)
function featureLayerToGeoJSON(featureLayer: any) {
    // Assuming the featureLayer has a method to convert to GeoJSON. Modify if needed.
    const geojson = featureLayer.toGeoJSON(); // Placeholder function. Adjust for your FeatureLayer format
    return geojson;
}
