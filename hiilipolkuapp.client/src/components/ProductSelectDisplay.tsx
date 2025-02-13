import { ProductDto } from "../../types";
import { useUser } from "../context/UserContext";


type ProductSelectDisplayProps = {
    product: ProductDto
}
function ProductSelectDisplay({ product }: ProductSelectDisplayProps) {
    const { addToCart } = useUser();


    return (
        <div className="selectDisplayItem">
            <p>{`${product.productName} ${product.brand}`}</p>
            <button onClick={() => addToCart(product.productId)}>Add To Cart</button>
        </div>
    );
}

export default ProductSelectDisplay;