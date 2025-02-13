import { ProductDetailDto } from "../../types";
import { useUser } from "../context/UserContext";


type ShoppingCartDisplayProps = {
    product: ProductDetailDto
}
function ShoppingCartDisplay({ product }: ShoppingCartDisplayProps) {

    const { removeFromCart } = useUser();

    return (
        <div className="selectDisplayItem">
            <p>{`${product.productName} ${product.brand}`}</p>
            <button onClick={() => removeFromCart(product.productId)}>Remove</button>
        </div>
    );
}

export default ShoppingCartDisplay;