import { SimpleLineSymbol, SimpleFillSymbol } from '@arcgis/core/symbols'
import Color from '@arcgis/core/Color'
import { IconSymbol3DLayer, PointSymbol3D } from "@arcgis/core/symbols";
import epcmarker from '../../../assests/svg/epcmarker.svg'

export type SymbolColor = string | number[]

export type symbolTypes = "simple-marker" | "picture-marker" | "simple-line" | "simple-fill" | "picture-fill" | "text" | "shield-label-symbol" | "point-3d" | "line-3d" | "polygon-3d" | "web-style" | "mesh-3d" | "label-3d" | "cim"

export type Tsymbol = { type: string; color: number[]; outline: { color: number[]; width: number; }; }
export type TSymbolStyle = { type: string; style: string; color: number[]; outline: { color: number[]; width: number; }; }

// export const markerSymbol = new SimpleMarkerSymbol({
//     style: 'circle',
//     color: new Color('#00FFFF'),
//     size: 8,
// });

export const lineSymbol = new SimpleLineSymbol({
    style: 'dash',
    color: new Color('#FF0000'),
    width: 2,
});

export const fillSymbol = new SimpleFillSymbol({
    style: 'solid',
    color: new Color([255, 0, 0, 0.2]),
    outline: {
        color: new Color([255, 0, 0, 0.8]),
        width: 1,
    },
});

export const extrudeSymbol3D = (height: number, color: number[] | string) => {
    return {
        type: "polygon-3d", // autocasts as new PolygonSymbol3D() 
        symbolLayers: [{
            type: "extrude", // autocasts as new ExtrudeSymbol3DLayer() 
            size: height, // 100,000 meters in height 
            material: { color: color }
        }]
    };
}

export const getsimpleFillSymbol = (color: number[] | string, outlineColor: number[] | string, width = 1) => {
    return {
        color: color,
        outline: {
            color: outlineColor,
            width
        }        
    }
}

export var simpleFillSymbol = {
    type: "simple-fill",
    color: [3, 82, 150, 0.4], // orange, opacity 80%
    outline: {
        color: [3, 82, 150],
        width: 1
    }
};

export const simpleLineSymbol = new SimpleLineSymbol({
    color: 'black',
    width: "2px",
    style: "solid"
});

export const getsimpleFillOutlineSymbol = (color: number[] | string, outlineColor: number[] | string, width = 1) => {
    return {
        type: "simple-fill",
        color: 'transparent',
        outline: {
            color: outlineColor,
            width: width
        }
    };
};

export const getStyledSimpleFillSymbol = (style: symbolTypes = "simple-fill", color: number[] | string, outlineColor: number[] | string, outlineStyle = "long-dash", width = 1,) => {
    return {
        style,
        color,
        outline: {
            color: outlineColor,
            width,
            style: outlineStyle
        }
    }
}


export const circleSymbol = new SimpleFillSymbol({
    color: [173, 216, 230, 0.5], // Light blue fill color (RGBA values)
    outline: {
        color: [0, 25, 50], // Blue boundary color (RGB values)
        width: 0.5 // Boundary width
    }
});


export const PvSymbols = {
    /**
     * create the symbol for geometry boundry
     * @param {number[]} color - define the color for inner space in boundry
     * @param {number[]} outlineColor - array of number to define colors for outline 
     * @param {number} width - define the width for lines witin
     * @returns {Graphic} 
     */
    simpleFillSymbol: function (color: number[], outlineColor: number[], width = 1) {
        return {
            type: "simple-fill",
            color: color, // orange, opacity 80%
            style: "solid",
            outline: {
                color: outlineColor,
                width: width
            }
        }
    },
    /* A function that returns an object. */
    simpleMarkerSymbol: function (color: number[], outlineColor: number[], width = 1) {
        return {
            type: "simple-marker",
            color: color, // orange
            outline: {
                color: outlineColor, // white
                width: width
            }
        }
    },
    /* A function that returns an object. */
    lineSymbol: function (color: number[], outlineColor: number[], width = 1) {
        return {
            type: "simple-line", // autocasts as SimpleLineSymbol()
            color: color,
            style: "solid",
            width: 4,
            outline: {
                color: outlineColor,
                width: width
            }
        }
    },
    /* A function that returns an object. */
    simpleFillNone: function (color: number[], outlineColor: number[], width = 1) {
        return {
            type: "simple-fill",
            style: "none",
            color: color,
            outline: {
                color: outlineColor,
                width: width,
            }
        }
    },

    simpleFillObject: function (color: number[], outlineColor: number[], width = 1){
        return {
            type: "simple-fill",
            color: color, // orange, opacity 80%
            outline: {
                color: outlineColor,
                width: width
            }
        }
    },
    // create ployline
    /**
    * create polyline
    * @param {string} type - type of polygon
    * @param {number[][]} path - array of number to define path of poly gon
    * @returns {*} 
    */
    polyLine: function (type: string, path: any[][]) {
        return {
            type: type, // autocasts as new Polyline()
            paths: path
        }
    }
}


export const getTextSymbolObject = (length: number, color: SymbolColor) => {
    return {
        color,
        text: `${length.toFixed(2)} m`, // Text to display (rounded to 2 decimal places)
        xoffset: 5,
        yoffset: 5,
        font: {
            size: 12,
            family: "Arial",
        }
    }
}


export const getSimpleLineSymboleMarker = (SimpleLineSymbol?: any) => {
    return {
        type: 'simple-line',
        color: [227, 139, 79, 0.8],
        outline: {
            color: [45, 55, 255],
            width: 1
        },
        marker: { // autocasts from LineSymbolMarker
            color: "blue",
            placement: "begin-end",
            style: "arrow"
        }
    }
    // return symbolLine;
}

// symbol for 3d layout of panels
export const simpleFillSymbol_3d = () => {
    return {
        type: "polygon-3d",  // autocasts as new PointSymbol3D()
        // type: "simple-fill",  // autocasts as new PointSymbol3D()
        symbolLayers: [{
            type: "object",  // autocasts as new ObjectSymbol3DLayer()
            resource: {
                href: "panel.glb"
            },
            height: 2.17,
            width: 1.13,
            heading: 270,
            material: {
                color: "#1c2a53"
            }
        }]
    }
}

export const simpleFillSymbol_2d = () => {
    return {
        type: "simple-fill",  // autocasts as new PointSymbol3D()
        symbolLayers: [{
            type: "object",  // autocasts as new ObjectSymbol3DLayer()
            resource: {
                href: "panel.glb"
            },
            height: 2.17,
            width: 1.13,
            heading: 270,
            material: {
                color: "#1c2a53"
            }
        }]
    }
}


export function getSymbol(color: string) {
    return {
        type: "polygon-3d", // autocasts as new PolygonSymbol3D()
        symbolLayers: [
            {
                type: "extrude", // autocasts as new ExtrudeSymbol3DLayer()
                material: {
                    color: color
                },
                edges: {
                    type: "solid",
                    color: "#999",
                    size: 0.5
                }
            }
        ]
    };
};



export const markerSymbol = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "/loaction_marker.svg",
    width: "60px",  
    height: "60px"
};

export const markerSymbol3D = new PointSymbol3D({
        symbolLayers: [new IconSymbol3DLayer({
          resource: {
            
            href: epcmarker// Ensure the URL is correct
          },
          size: 32 // size in points
        })]
      });


export const markerSymbolSuccess = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "location_marker.svg",
    // url: "location_marker.svg",
    width: "60px",
    height: "60px"
};

export const selectedRoofMarker = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "selected_Marker.svg",
    width: "90px",
    height: "90px"
};

export const markerSymbolConfirm = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "confirmMarker.svg",
    width: "80px",
    height: "80px"
};

export const markerSymbolStations = {
    type: "picture-marker",  // autocasts as new PictureMarkerSymbol()
    url: "infoMarker.svg",
    width: "40px",
    height: "80px"
};