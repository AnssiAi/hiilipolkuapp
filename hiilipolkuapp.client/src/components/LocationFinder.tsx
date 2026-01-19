import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";

function LocationFinder() {
    const { t } = useTranslation();
    const { addPosition } = useUser();

    const handleGetLocation = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                addPosition(newPosition.latitude, newPosition.longitude);
            })
        }
    }

    return (
        <div className="testInput">
            <button className="btn-geo" onClick={handleGetLocation} role="button" aria-label="set location">
                <div className="btn-container">
                    <i className="bi bi-geo-alt-fill"></i>
                    {t("location.set")}
                </div>
            </button>
        </div>
    )
}

export default LocationFinder;