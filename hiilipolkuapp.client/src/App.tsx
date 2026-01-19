import './App.css';
import ErrorMessage from './components/ErrorMessage';
import UserProvider from './context/UserContext';
import WorldMap from './components/WorldMap';
import InfoBar from './components/InfoBar';
import MapProvider from './context/MapContext';
import ContentContainer from './components/ContentContainer';

function App() {
    return (
        <UserProvider>
            <div className="baseContainer">
                <InfoBar />
                <ErrorMessage />
                <MapProvider>
                  <div className="mapContainer">
                        <WorldMap />
                        <ContentContainer />
                  </div>
                </MapProvider>
            </div>
        </UserProvider>
    );


}

export default App;