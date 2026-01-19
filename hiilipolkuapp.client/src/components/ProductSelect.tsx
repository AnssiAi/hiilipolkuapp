import { useEffect  } from "react";
import { ProductDto } from "../../types"
import { useUser } from "../context/UserContext";
import ProductSelectDisplay from "./ProductSelectDisplay";
import ProductSearch from "./ProductSearch";
import LocationFinder from "./LocationFinder";


function ProductSelect() {

    const { products, fetchProducts } = useUser();

    useEffect(() => {
        fetchProducts();
    }, [])

    return (
        <div className="collapsibleContent">
            <LocationFinder />
            <ProductSearch/>
            {
                products && products.length > 0
                    ? (<>
                        <div>{products.map((product: ProductDto) => <ProductSelectDisplay key={product.productId} product={product} />)}</div>
                    </>)
                    : (<><p>Loading...</p></>)
            }
        </div>
    );

}

export default ProductSelect;