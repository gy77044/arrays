import { loadEsriModules } from "../../../Utils/CustomerMaps/Maps/getEsriModules"
import globalLayers from "../../../Utils/CustomerMaps/Maps/GlobaLMap"


export const weatherStationSelectionClick = (e: __esri.ViewClickEvent) => {
    globalLayers.view?.hitTest(e)
        .then((response:any) => {
            if (response.results.length) {
                loadEsriModules(['esri/geometry/support/geodesicUtils', 'esri/geometry/Point'])
                    .then(([geodesicUtils, Point]) => {

                        const selectedGraphicGeometry = (response.results[0] as any).graphic.geometry
                        const centerPointofCircle = (globalLayers.weatherSelectionCircleGraphic?.geometry as any).centroid

                        const length = (geodesicUtils as __esri.geodesicUtils).geodesicDistance(
                            new Point({ x: selectedGraphicGeometry.longitude, y: selectedGraphicGeometry.latitude }),
                            new Point({ x: centerPointofCircle.longitude, y: centerPointofCircle.latitude }),
                            'kilometers'
                        );

                        if (globalLayers.weatherSelectionCircleGraphic) {
                            loadEsriModules(['esri/geometry/Circle'])
                                .then(([Circle]) => {
                                    const circleGeometry = new Circle({
                                        center: [centerPointofCircle.longitude, centerPointofCircle.latitude],
                                        geodesic: true,
                                        radius: length.distance,
                                        radiusUnit: "kilometers"
                                    });
                                    if (globalLayers.weatherSelectionCircleGraphic) {
                                        globalLayers.weatherSelectionCircleGraphic.geometry = circleGeometry;
                                    }

                                })
                        }

                    })
            }
        })
}