import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import Sketch from '@arcgis/core/widgets/Sketch'
import { fillSymbol, lineSymbol } from '../../CustomerMaps/MarkerSymbols/MarkerSymbols';
import Graphic from '@arcgis/core/Graphic';

// geometryType here will be polygon, rectangle or circle
export const startDrawing = (geometryType: string, view: __esri.SceneView, graphicsLayer: GraphicsLayer) => {
    const sketch = new Sketch({
        view: view,
        layer: graphicsLayer,
        availableCreateTools: ['polygon', 'rectangle', 'circle'],
        defaultCreateOptions: {
            mode: 'click'
        },
    });

    sketch.on('create', (event) => {
        if (event.state === 'complete') {
            const graphic = new Graphic({
                geometry: event.graphic.geometry,
                symbol: geometryType === 'polygon' ? fillSymbol : lineSymbol,
            });
            graphicsLayer.add(graphic);
        }
    });

    // Set the symbol for the sketch based on the geometry type
    switch (geometryType) {
        case 'polygon':
            sketch.viewModel.polygonSymbol = fillSymbol;
            break;
        case 'rectangle':
            sketch.viewModel.polygonSymbol = fillSymbol;
            sketch.viewModel.polylineSymbol = lineSymbol;
            break;
        default:
            break;
    }

    view.ui.add(sketch, 'top-right');
};

