import { ProductDetailDto } from "../../types";
import { useShoppingCart } from "../context/ShoppingCartContext";


type ShoppingCartDisplayProps = {
    product: ProductDetailDto
}
function ShoppingCartDisplay({ product }: ShoppingCartDisplayProps) {

    const { removeFromCart } = useShoppingCart();

    return (
        <div className="selectDisplayItem">
            <p>{`${product.productName} ${product.brand}`}</p>
            <button onClick={() => removeFromCart(product.productId)}>Remove</button>
        </div>
    );
}

export default ShoppingCartDisplay;