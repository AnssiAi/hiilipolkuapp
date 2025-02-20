import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { ProductDetailDto, ProductionType } from "../../types";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM"
import { Feature} from "ol";
import { LineString, Point } from "ol/geom";
import Style from "ol/style/Style";
import CircleStyle from 'ol/style/Circle';
import Fill from 'ol/style/Fill';
import Stroke from 'ol/style/Stroke';
import VectorLayer from 'ol/layer/Vector.js';
import VectorSource from 'ol/source/Vector.js';
import { useGeographic } from "ol/proj";
import { Coordinate } from "openlayers";
import Popup from "ol-popup";

function WorldMap() {

    useGeographic();
    const { userPosition, cartItems } = useUser();
    const [vector, setVector] = useState<VectorLayer | null>(null);
    const [userMarker, setUserMarker] = useState<Feature<Point> | null>(null);
    const [productionMarkers, setProductionMarkers] = useState<Feature<Point>[] | null>(null);
    const [productionRoutes, setProductionRoutes] = useState<Feature<LineString>[] | null>(null);

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
        const popUp = new Popup();
        appMap.addOverlay(popUp);
        appMap.on("singleclick", (event) => {
            const features = appMap.getFeaturesAtPixel(event.pixel, {
                layerFilter: (layer) => layer === vectorLayer,
            });
            if (features.length > 0) {
                const featureProperties = features[0].getProperties()

                if ("name" in featureProperties) {

                    popUp?.show(event.coordinate, `<div class="popUp"><p><b>You are here.</b></p></div>`);
                }
                if ("id" in featureProperties) {
                    const featureItem = cartItems.find(item => item.productId === featureProperties.id);
                    if (featureItem) {
                        popUp?.show(event.coordinate, `<div class="popUp"><p><b>Production Type:</b> ${ProductionType[featureItem.production.productionType]}</p> <p><b>Co2 production / kg:</b> ${featureItem?.production.coG} g</p></div>`);
                    } else {
                        popUp?.show(event.coordinate, `<div class="popUp"><p><b>Undefined Feature</b></p></div>`);
                    }
                }
            } else {
                popUp?.hide();
            }
        })

        setVector(vectorLayer);

        return () => appMap.setTarget(undefined);

    }, [])

    useEffect(() => {
        if (userPosition) {
            const positionArr: number[] = [userPosition.longitude, userPosition.latitude]
            handleUserMarkerUpdate(positionArr);
        }
        if (cartItems) {
            handleProductionUpdate();
        }
    }, [userPosition, cartItems])

    const styles = {
        'route': new Style({
            stroke: new Stroke({
                width: 3,
                color: 'red',
            }),
        }),
        'userMarker': new Style({
            image: new CircleStyle({
                radius: 7,
                fill: new Fill({ color: 'black' }),
                stroke: new Stroke({
                    color: 'white',
                    width: 2,
                })
            })
        }),
        'productionMarker': new Style({
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

    const drawUserMarker = (positionArr: number[]): Feature<Point> => {
        const marker = new Feature({
            type: 'userMarker',
            geometry: new Point(positionArr),
            name: 'user',
        })
        return marker
    }
    const drawProductionMarker = (id: number, positionArr: number[]): Feature<Point> => {
        const marker = new Feature({
            type: 'productionMarker',
            geometry: new Point(positionArr),
            id: id,
        })
        return marker
    }
    const drawRoute = (start: Feature<Point>, end: Feature<Point>): Feature<LineString> => {
        const startCoordinates: Coordinate = start.getGeometry().getCoordinates();
        const endCoordinates: Coordinate = end.getGeometry().getCoordinates();

        const line = new Feature({
            type: 'route',
            geometry: new LineString([startCoordinates, endCoordinates])
        })
        return line;
    }

    const handleUserMarkerUpdate = (positionArr: number[]): void => {
        const newSource = vector?.getSource();
        if (userMarker) {
            newSource?.removeFeature(userMarker);
        }
        const marker = drawUserMarker(positionArr);
        newSource?.addFeature(marker);
        vector?.setSource(newSource);
        setUserMarker(marker);
    }

    const handleProductionUpdate = (): void => {
        const newSource = vector?.getSource();
        let newMarkers: Feature<Point>[] = [];
        let newRoutes: Feature<LineString>[] = [];
        if (productionMarkers) {
            newSource?.removeFeatures(productionMarkers);
        }
        if (productionRoutes) {
            newSource?.removeFeatures(productionRoutes);
        }
        cartItems.forEach((item: ProductDetailDto) => {
            const positionArr = [item.production.longitude, item.production.latitude]
            const marker: Feature<Point> = drawProductionMarker(item.productId, positionArr);
            newSource?.addFeature(marker);
            newMarkers = newMarkers.concat(marker);
            if (userMarker) {
                const route = drawRoute(marker, userMarker);
                newSource?.addFeature(route);
                newRoutes = newRoutes.concat(route)
            }

        })
        vector?.setSource(newSource);
        setProductionMarkers(newMarkers);
        if (newRoutes.length > 0) {
            setProductionRoutes(newRoutes);

        }
    }

    return (
        <>
            <div id="mapDiv" className="appMap" />
        </>
    );
}

export default WorldMap;