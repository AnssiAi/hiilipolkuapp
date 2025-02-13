import { useEffect } from "react";
import { useUser } from "../context/UserContext";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM"
import { Feature } from "ol";
import { Point } from "ol/geom";
import Style from "ol/style/Style";
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';

const tileLayer: TileLayer = new TileLayer({
    source: new OSM(),
})

function WorldMap() {

    const { userPosition } = useUser();

    const appMap: Map = new Map({
        target: "map",
        layers: [tileLayer],
        view: new View({
            center: [0, 0],
            zoom: 2,
            minZoom: 1,
            maxZoom: 5,
        })
    })
    const marker = new Feature({
        type: 'geoMarker',
        geometry: new Point([0, 0]),
    })

    const vectorLayer = new VectorLayer({
        source: new VectorSource({
            features: [marker]
        }),
        style: (feature) => styles[feature.get('type')]
    })
    appMap.addLayer(vectorLayer);
    const styles = {
        'geoMarker': new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({ color: 'black' }),
                stroke: new Stroke({
                    color: 'white',
                    width: 2,
                })
            })
        })
    }

    return (
        <div id="map" className="appMap" />
    );
}

export default WorldMap;