import SceneView from "@arcgis/core/views/SceneView";
import globalLayers from "../../Utils/CustomerMaps/Maps/GlobaLMap";

export async function getScreenShot(): Promise<string | {
    error: any,
    messgae: string
}> {
    try {
        const view = globalLayers.view as SceneView;
        if (!view) {
            return { 
                error: 'Scene not found',
                messgae: 'No Map scene found to take screenshot'
            }
        };

        // const buildingGraphic = globalLayers.getGraphicbyItsName(buildingBase) as Graphic;
        //   if (!buildingGraphic) {
        //     throw new Error('Building not found!');
        //   }

        // Take a screenshot of the entire view
        const screenshot = await view.takeScreenshot({ format: "png" }); 

        // Remove any previous screenshot from the document
        const existingScreenshot = document.getElementById("screenshotImage");
        if (existingScreenshot) {
            existingScreenshot.remove();
        }

        // Create a new <img> element to display the screenshot
        // Create an <a> element to trigger the download
        // const downloadLink = document.createElement("a");
        // screenshot.dataUrl is the base64 link for the image
        // downloadLink.href = screenshot.dataUrl;
        // downloadLink.download = "screenshot.png"; // Name of the file
        // document.body.appendChild(downloadLink); // Append link to the document

        // Programmatically click the link to trigger the download
        // downloadLink.click();

        // Remove the link after the download is triggered
        // document.body.removeChild(downloadLink);

        // console.log("Screenshot taken and download triggered!");
        return screenshot.dataUrl;

    } catch (error) {
        console.error("Error taking screenshot:", error);
        return {
            error: error,
            messgae: 'Error taking screenshot'
        };
    }
}
