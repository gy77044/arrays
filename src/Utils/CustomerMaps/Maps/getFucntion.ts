import Graphic from "@arcgis/core/Graphic";
import Polygon from "@arcgis/core/geometry/Polygon";

export function getGraphicwithCoordinates(polygon: any, symbol: any, attributes: object) {
    const graphic = new Graphic({
        geometry: new Polygon({
            rings: polygon.coordinates[0],
        }),
        symbol: symbol,
        attributes: attributes
    })
    return graphic;
}

export function getGraphic(polygon: any, symbol: any, attributes: any = {}, title?: string) {

    if (title) {
        attributes.title = title;
    }
    return new Graphic({
        geometry: polygon,
        symbol: symbol,
        attributes: attributes
    })
}