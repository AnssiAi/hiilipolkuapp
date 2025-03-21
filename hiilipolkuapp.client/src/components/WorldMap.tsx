import { useEffect, useRef, useState } from "react";
import { useMap } from "../context/MapContext";
import { useUser } from "../context/UserContext";
import { ProductDetailDto } from "../../types";
import { Feature, Overlay } from "ol";
import { LineString, Point } from "ol/geom";
import { useGeographic } from "ol/proj";
import { Coordinate } from "ol/coordinate";
import VectorSource from "ol/source/Vector";
import PopUpContent from "./PopUpContent";

function WorldMap() {

    useGeographic();
    const mapRef = useRef<HTMLDivElement>(null);
    const popRef = useRef<HTMLDivElement>(null);
    const { userPosition, cartItems } = useUser();
    const { map, vectorLayer, setUserMarker } = useMap();
    const [feature, setFeature] = useState<number | null>(null);
    useEffect(() => {
        if (mapRef.current) {
            map.setTarget(mapRef.current);
            map.updateSize();
        }
        if (popRef.current) {
            const overlay = new Overlay({
                element: popRef.current,
                autoPan: {
                    animation: {
                        duration: 250,
                    }
                }
            })

            map.addOverlay(overlay);

            map.on("singleclick", (event) => {
                const coordinate = event.coordinate;
                const features = map.getFeaturesAtPixel(event.pixel, {
                    layerFilter: (layer) => layer === vectorLayer,
                });
                if (features.length > 0) {
                    const featureProperties = features[0].getProperties();

                    if ("id" in featureProperties) {
                        setFeature(featureProperties.id)
                        overlay.setPosition(coordinate);

                    } else {
                        overlay.setPosition(undefined);
                    }

                } else {
                    overlay.setPosition(undefined);
                }

            })
        }

        return () => map.setTarget(undefined);
    }, [])

    useEffect(() => {
        const vectorSource = vectorLayer.getSource();

        if (vectorSource) {
            vectorSource.clear();
        }
        let userMark = null
        if (userPosition && vectorSource) {
            const positionArr: number[] = [userPosition.longitude, userPosition.latitude]
            userMark = updateUserMarker(positionArr, vectorSource)
            setUserMarker(userMark);
        }
        if (cartItems && vectorSource) {
            const newMarkers: Feature<Point>[] = updateProductionMarkers(vectorSource);
            if (userMark) {

                updateProductionRoutes(userMark, newMarkers, vectorSource);
            }
        }

    }, [map, userPosition, cartItems])

    const updateUserMarker = (positionArr: number[], vectorSource: VectorSource): Feature<Point> => {
        const marker = drawUserMarker(positionArr);
        vectorSource.addFeature(marker);
        vectorLayer.setSource(vectorSource);
        return marker;
    }
    const updateProductionMarkers = (vectorSource: VectorSource): Feature<Point>[] => {
        let newMarkers: Feature<Point>[] = [];
        if (cartItems) {
            cartItems.forEach((item: ProductDetailDto) => {
                const positionArr = [item.production.longitude, item.production.latitude]
                const marker: Feature<Point> = drawProductionMarker(item.productId, item.production.coG, positionArr);
                vectorSource.addFeature(marker);
                newMarkers = newMarkers.concat(marker);
            })
        }
        return newMarkers;
    }

    const updateProductionRoutes = (userMark: Feature<Point>, markers: Feature<Point>[], vectorSource: VectorSource): void => {

        const userGeometry: Point | undefined = userMark.getGeometry();
        if (userGeometry) {

            const userCoord: Coordinate = userGeometry.getCoordinates();
            markers.forEach((marker) => {
                const markerGeometry: Point | undefined = marker.getGeometry()

                if (markerGeometry) {

                    const markerCoord: Coordinate = markerGeometry.getCoordinates();
                    const route = drawRoute(markerCoord, userCoord);
                    vectorSource.addFeature(route);
                }
            })
        }
    }

    const drawUserMarker = (positionArr: number[]): Feature<Point> => {
        return new Feature({
            type: 'userMarker',
            geometry: new Point(positionArr),
            id: 0,
        })
    }

    const drawProductionMarker = (id: number, cog: number, positionArr: number[]): Feature<Point> => {
        return new Feature({
            type: getProductionType(cog),
            geometry: new Point(positionArr),
            id: id,
        })
    }

    const getProductionType = (cog: number): string => {
        let result = 'productionLow';

        if (cog >= 1000 && cog < 5000) {
            result = 'productionMed';
        }
        if (cog >= 5000) {
            result = 'productionHigh'
        }
        return result;
    }

    const drawRoute = (startCoordinates: Coordinate, endCoordinates: Coordinate): Feature<LineString> => {
        return new Feature({
            type: 'route',
            geometry: new LineString([startCoordinates, endCoordinates])
        })
    }


    return (
        <>
            <div id="mapDiv" ref={mapRef} className="appMap" />
            <div id="popUp" ref={popRef} className="popUp">
                {feature !== null ? <PopUpContent feature={feature} /> : null}
            </div>
        </>
    );
}

export default WorldMap;