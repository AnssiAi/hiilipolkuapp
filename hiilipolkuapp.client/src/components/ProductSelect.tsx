import { ProductDto } from "../../types"
import { useUser } from "../context/UserContext";
import ProductSelectDisplay from "./ProductSelectDisplay";


type ProductSelectProps = {
    products: ProductDto[];
}
function ProductSelect({ products }: ProductSelectProps) {

    const { addPosition } = useUser();

    const getLocation = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                addPosition(position.coords.latitude, position.coords.longitude);
            })
        }
    }
    return (
        <div className="productSelect">
            {
                products && products.length > 0
                    ? (<>
                        <button className="geoBtn" onClick={getLocation }>Location</button>
                        <ul>{products.map((product: ProductDto) => <ProductSelectDisplay key={product.productId} product={product} />)}</ul>
                    </>)
                    : (<><p>Loading...</p></>)
            }
        </div>
    );

}

export default ProductSelect;