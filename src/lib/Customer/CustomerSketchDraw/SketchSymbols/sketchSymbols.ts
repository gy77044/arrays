import { ExtrudeSymbol3DLayer, LineSymbol3D, ObjectSymbol3DLayer, PathSymbol3DLayer, PointSymbol3D, PolygonSymbol3D } from "@arcgis/core/symbols";
import SolidEdges3D from "@arcgis/core/symbols/edges/SolidEdges3D.js";

const defaultHeight = 0.05

export const buildingSymbology = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: defaultHeight,
      material: {
        color: [255, 255, 255, 0.2]
      },
      edges: new SolidEdges3D({
        size: 1,
        color: [82, 82, 122, 1]
      })
    })
  ]
});

export const solarPanelsSymbology = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: defaultHeight,
      material: {
        color: [0, 0, 75, 0.4]
      },
      edges: new SolidEdges3D({
        size: 1,
        color: [128, 128, 128, 0.5]
      })
    })
  ]
});

export const updateElevationSymbology = (height: number) => {
  return new PolygonSymbol3D({
    symbolLayers: [
      new ExtrudeSymbol3DLayer({
        size: height,
        material: {
          color: [0, 0, 75, 0.4]
        },
        edges: new SolidEdges3D({
          size: 0,
          color: [128, 128, 128, 0.5]
        })
      })
    ]
  })
};

export const updatedSymbolWithHeight = (height: number) => {
  return new PolygonSymbol3D({
    symbolLayers: [
      new ExtrudeSymbol3DLayer({
        size: height, // extrude by 3.5m meters
        material: {
          color: [255, 255, 255, 0.2]
        },
        edges: new SolidEdges3D({
          size: 1,
          color: [82, 82, 122, 1]
        })
      })
    ]
  })
}

// polyline symbols
export const pipelineSymbology = new LineSymbol3D({
  symbolLayers: [
    new PathSymbol3DLayer({
      anchor: 'bottom',
      profile: "quad", // creates a path symbol with rectangular profile
      width: 0.3, // symbology width in meters
      height: defaultHeight, // symbology height in meters
      material: {
        color: "#a57e5e"
      },
      cap: "square",
      profileRotation: "heading"
    })
  ]
});

export const pipelineSymbologyWidth = (width: number, height: number) => {
  return new LineSymbol3D({
    symbolLayers: [
      new PathSymbol3DLayer({
        anchor: 'bottom',
        profile: "circle",
        width, // symbology width in meters
        height, // symbology height in meters
        material: {
          color: "#a57e5e"
        },
        cap: "square",
        profileRotation: "heading"
      })
    ]
  })
};

// solar panels cutouts symbols
export const solarModuleSymbology = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: 0.002,
      material: {
        color: [0, 0, 0, 0.5]
      },
      edges: new SolidEdges3D({
        size: 1,
        color: [82, 82, 122, 1]
      })
    })
  ]
});

export const solarModuleSymbologyWithHeight = (height: number) => {
  return new PolygonSymbol3D({
    symbolLayers: [
      new ExtrudeSymbol3DLayer({
        size: height, // extrude by 3.5m meters
        material: {
          color: [0, 0, 0, 0.5]
        },
        edges: new SolidEdges3D({
          size: 1,
          color: [82, 82, 122, 1]
        })
      })
    ]
  })
}

export const roofSymbology = new PolygonSymbol3D({
  symbolLayers: [
    new ExtrudeSymbol3DLayer({
      size: 0,
      material: {
        color: [0, 0, 0, 0.1]
      },
      edges: new SolidEdges3D({
        size: 1,
        color: [82, 82, 122, 1]
      })
    })
  ]
});

export const roofSymbologywithHeight = (height: number) => {
  return new PolygonSymbol3D({
    symbolLayers: [
      new ExtrudeSymbol3DLayer({
        size: height,
        material: {
          color: [0, 0, 0, 0.1]
        },
        edges: new SolidEdges3D({
          size: 1,
          color: [82, 82, 122, 1]
        })
      })
    ]
  })
}

export const treeSymbology = new PointSymbol3D({
  symbolLayers: [
    new ObjectSymbol3DLayer({
      resource: {
        href: "https://static.arcgis.com/arcgis/styleItems/ThematicTrees/gltf/resource/PlatanusOccidentalis.glb"
      },
      height: 10
    })
  ]
});

export const symb_simple = {
  type: "simple-fill",  // autocasts as new SimpleFillSymbol()
  color: [0, 0, 75, 0.4],
  outline: { 
    color: [128, 128, 128, 0.5],
    width: "0.5px"
  }
};

export const simpleMarkerSymbol = {
  type: "simple-marker",
  color: [226, 119, 40],  // Orange
  outline: {
      color: [255, 255, 255], // White
      width: 1
    }
}