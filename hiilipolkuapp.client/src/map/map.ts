import { View, Map} from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

const appRed = '#EE4266';
const appBlue = '#5995ED';
const appHighlight = '#FFFFFF';

const styles = {
    'route': new Style({
        stroke: new Stroke({
            width: 3,
            color: appRed,
        }),
    }),
    'userMarker': new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: appBlue }),
            stroke: new Stroke({
                color: appHighlight,
                width: 2,
            })
        })
    }),
    'productionMarker': new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: appRed }),
            stroke: new Stroke({
                color: appHighlight,
                width: 2,
            })
        })
    })
}

const tileLayer: TileLayer = new TileLayer({
    source: new OSM(),
})
export const appVectorLayer = new VectorLayer({
    source: new VectorSource({
        features: []
    }),
    style: (feature) => styles[feature.get('type')]
})
export const appMap: Map = new Map({
    target: "mapDiv",
    layers: [tileLayer, appVectorLayer],
    view: new View({
        center: [0, 0],
        zoom: 2,
        minZoom: 1,
        maxZoom: 5,
    })
})