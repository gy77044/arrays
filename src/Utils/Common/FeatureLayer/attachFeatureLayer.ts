import SceneView from "@arcgis/core/views/SceneView";
import LayerList from "@arcgis/core/widgets/LayerList";

// Create the layer list widget but configure it to only show the sketch layer
export const attachFeatureLayerToMap = (view: SceneView, htmlelement: HTMLElement) => {
    return new LayerList({
        view: view,
        container: htmlelement,
        listItemCreatedFunction: function (event) {
            // Show only the sketch layer in the layer list
            if (event.item.layer.id === "sketchLayer") {
                event.item.panel = {
                    content: "legend",
                    open: true
                };
            } else {
                event.item.visible = false;
            }
        }
    });
}