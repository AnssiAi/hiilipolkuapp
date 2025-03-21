import { View, Map } from "ol";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import { OSM } from "ol/source";
import VectorSource from "ol/source/Vector";
import CircleStyle from "ol/style/Circle";
import Fill from "ol/style/Fill";
import Stroke from "ol/style/Stroke";
import Style from "ol/style/Style";

const styles: { [key: string]: Style} = {
    route: new Style({
        stroke: new Stroke({
            width: 3,
            color: 'red',
        }),
    }),
    userMarker: new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: 'black' }),
            stroke: new Stroke({
                color: 'white',
                width: 2,
            })
        })
    }),
    productionMarker: new Style({
        image: new CircleStyle({
            radius: 7,
            fill: new Fill({ color: 'red' }),
            stroke: new Stroke({
                color: 'white',
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
    style: (feature): Style => styles[feature.get('type')]
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