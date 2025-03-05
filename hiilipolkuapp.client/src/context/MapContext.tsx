import { createContext, ReactNode, useContext, useState } from "react";
import { appMap, appVectorLayer } from "../map/map";
import Map from "ol/Map";
import VectorLayer from "ol/layer/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";

type MapContextProviderProps = {
    children: ReactNode;
}

type MapContext = {
    map: Map;
    vectorLayer: VectorLayer;
    userMarker: Feature | null;
    productionMarkers: Feature[];
    productionRoutes: Feature[];
    setMap: (map: Map) => void;
    setVectorLayer: (layer: VectorLayer) => void;
    setUserMarker: (marker: Feature<Point>) => void;
    setProductionMarkers: (markers: Feature[]) => void;
    setProductionRoutes: (routes: Feature[]) => void;
};
const MapContext = createContext({} as MapContext);

export const useMap = () => {
    return useContext(MapContext);
}


function MapProvider({ children }: MapContextProviderProps) {
    const [map, setMap] = useState<Map>(appMap);
    const [vectorLayer, setVectorLayer] = useState<VectorLayer>(appVectorLayer);
    const [userMarker, setUserMarker] = useState<Feature<Point> | null>(null);
    const [productionMarkers, setProductionMarkers] = useState<Feature[]>([]);
    const [productionRoutes, setProductionRoutes] = useState<Feature[]>([]);


    return (
        <MapContext.Provider value={{ map, vectorLayer, userMarker, productionMarkers, productionRoutes, setMap, setVectorLayer, setUserMarker, setProductionMarkers, setProductionRoutes }}>
            {children}
        </MapContext.Provider>
  );
}

export default MapProvider;