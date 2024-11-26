import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";
import { loadMultipleModules } from "../../Utils/CustomerMaps/Maps/LazyloadMap";

// Switches the view from 2D to 3D and vice versa
/**
 * The function `switchView` is an asynchronous function that takes in a parameter `activeView` which
 * can be either '2d' or '3d', and based on the value of `activeView`, it loads the appropriate modules
 * and switches between a 2D view and a 3D view.
 * @param {'2d' | '3d'} activeView - The `activeView` parameter is a string that can have two possible
 * values: "2d" or "3d". It determines which view to switch to - either a 2D view or a 3D view.
 */
export async function switchView(activeView: '2D' | '3D') {
    const [SceneView, MapView] = await loadMultipleModules(["esri/views/SceneView", "esri/views/MapView"])

    if (activeView === "2D") {
        globalLayers.activeView = '3D';
        globalLayers.show3dView(SceneView)
    } else {
        globalLayers.activeView = '2D';
        globalLayers.show2dView(MapView)
    }

}
