import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";

/**
 * The function `getCursorCoordinates` takes in a pointer move event and updates the latitude and
 * longitude coordinates based on the event's screen point.
 * @param event - The event parameter is of type __esri.ViewPointerMoveEvent. It represents the pointer
 * move event that is triggered when the user moves the cursor within the view.
 */
export const getCursorCoordinates = (event: __esri.ViewPointerMoveEvent) => {
    if (globalLayers.view) {
        var screenPoint = {
            x: event.x,
            y: event.y
        };
        var mapPoint = globalLayers.view?.toMap(screenPoint)
        if (mapPoint) {
            globalLayers.latitude = mapPoint?.latitude;
            globalLayers.longitude = mapPoint?.longitude;
            if(globalLayers.footers.lat && globalLayers.footers.lng){
                globalLayers.footers.lat.innerText = mapPoint?.latitude.toFixed(5)
                globalLayers.footers.lng.innerText = mapPoint?.longitude.toFixed(5)
            }
        }
    }
};