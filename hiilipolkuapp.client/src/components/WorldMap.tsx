import { useEffect, useState } from "react";
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
import { useGeographic } from "ol/proj";


function WorldMap() {

    useGeographic();
    const { userPosition } = useUser();
    const [vector, setVector] = useState<VectorLayer | null>(null)
    const [userMarker, setUserMarker] = useState<Feature | null>(null)

    useEffect(() => {
        const tileLayer: TileLayer = new TileLayer({
            source: new OSM(),
        })
        const vectorLayer = new VectorLayer({
            source: new VectorSource({
                features: []
            }),
            style: (feature) => styles[feature.get('type')]
        })
        const appMap: Map = new Map({
            target: "mapDiv",
            layers: [tileLayer, vectorLayer],
            view: new View({
                center: [0, 0],
                zoom: 2,
                minZoom: 1,
                maxZoom: 5,
            })
        })
        setVector(vectorLayer);


        return () => appMap.setTarget(undefined);

    }, [])

    useEffect(() => {
        if (userPosition) {
            const positionArr: number[] = [userPosition.longitude, userPosition.latitude]
            handleUserMarkerUpdate(positionArr);
        }
    }, [userPosition])

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

    const handleUserMarkerUpdate = (positionArr: number[]) => {
        const marker = new Feature({
            type: 'geoMarker',
            geometry: new Point(positionArr),
        })
        const newSource = vector?.getSource();
        if (userMarker) {
            newSource?.removeFeature(userMarker);
        }
        newSource?.addFeature(marker);

        vector?.setSource(newSource);
        setUserMarker(marker);
    }

    return (
        <div id="mapDiv" className="appMap" />
    );
}

export default WorldMap;