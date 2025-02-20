import { useState } from "react";
import { ProductDto, UserPosition } from "../../types"
import { useUser } from "../context/UserContext";
import ProductSelectDisplay from "./ProductSelectDisplay";


type ProductSelectProps = {
    products: ProductDto[];
}
function ProductSelect({ products }: ProductSelectProps) {
    const [position, setPosition] = useState<UserPosition>({ latitude: 0, longitude: 0 })

    const { addPosition } = useUser();

    const handleGetLocation = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                const newPosition = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                }
                setPosition(newPosition);
            })
        }
    }
    const handleSetLocation = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (position) {
            addPosition(position.latitude, position.longitude);
        }
    }
    const handlePositionChange = (e: React.SyntheticEvent) => {
        e.preventDefault();
        if (e.target instanceof HTMLInputElement) {
            const newPosition = {
                ...position,
                [e.target.name]: e.target.value
            }
            setPosition(newPosition);
        }

    }
    return (
        <div className="productSelect">
            {
                products && products.length > 0
                    ? (<>
                        <form className="testInput" role="form" >
                        <button className="btn-geo" onClick={handleGetLocation} role="button" aria-label="get your location" tabIndex={1}>Your Location</button>
                        <button className="btn-geo" onClick={handleSetLocation} role="button" aria-label="set your location marker" tabIndex={2}>Set Marker</button>
                            <input type="number" name="latitude" required value={position.latitude} onChange={handlePositionChange} aria-label="latitude input" tabIndex={3} />
                            <input type="number" name="longitude" required value={position.longitude} onChange={handlePositionChange} aria-label="latitude input" tabIndex={4} />
                        </form>
                        <ul>{products.map((product: ProductDto) => <ProductSelectDisplay key={product.productId} product={product} />)}</ul>
                    </>)
                    : (<><p>Loading...</p></>)
            }
        </div>
    );

}

export default ProductSelect;