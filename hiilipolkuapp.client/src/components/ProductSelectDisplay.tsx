import { ProductDto } from "../../types";
import { useUser } from "../context/UserContext";


type ProductSelectDisplayProps = {
    product: ProductDto
}
function ProductSelectDisplay({ product }: ProductSelectDisplayProps) {
    const { addToCart } = useUser();


    return (
        <div className="selectDisplayItem">
            <span>
                <p>{product.productName}</p>
                <p>{product.brand}</p>
            </span>
            <button className="btn-primary" onClick={() => addToCart(product.productId)}>Add To Cart</button>
        </div>
    );
}

export default ProductSelectDisplay;