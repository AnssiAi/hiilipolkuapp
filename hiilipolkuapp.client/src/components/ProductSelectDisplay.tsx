import { ProductDto } from "../../types";
import { useShoppingCart } from "../context/ShoppingCartContext";


type ProductSelectDisplayProps = {
    product: ProductDto
}
function ProductSelectDisplay({ product }: ProductSelectDisplayProps) {
    const { addToCart } = useShoppingCart();


    return (
        <div className="selectDisplayItem">
            <p>{`${product.productName} ${product.brand}`}</p>
            <button onClick={() => addToCart(product.productId)}>Add To Cart</button>
        </div>
    );
}

export default ProductSelectDisplay;