import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap";
import { lazyLoadArcGisMapModules } from "../../../Utils/CustomerMaps/Maps/LazyloadMap";
function formatScale(scale: number): string {
    if (scale >= 1000) {
      const km = (scale / 1000).toFixed(0);
      const meters = (scale % 1000).toFixed(0);
      return `${km} km ${meters} m`;
    } else {
      const feet = Math.round(scale * 3.28084);
      return `${scale} m ${feet} ft`;
    }
  }

export async function watchLocationMarkerChanges() {
    const { reactiveUtils } = await lazyLoadArcGisMapModules()

    // will only be triggered when globalLayers.graphicLayerLocation?.visible is true 
    reactiveUtils.when(
        () => [globalLayers.view?.scale, globalLayers.view?.center, globalLayers.view?.zoom], // to look for what evevtn,
        ([scale, center, zoom]: [scale: number, center: __esri.Point, zoom: number]) => {
            let zoomLevel = zoom.toFixed(0);
            let scaleInFeet = formatScale(scale);
            // console.log('object', scaleInFeet);
            let scaleEle = document.querySelector('#scale') as HTMLSpanElement;
            let ele = document.querySelector('#zoomDiv') as HTMLSpanElement;
            if(ele && scale){
                (document.querySelector('#zoomDiv') as HTMLSpanElement).innerText = zoomLevel;
                (document.querySelector('#scale') as HTMLSpanElement).innerText = scaleInFeet
            }
        }
    );

    
}