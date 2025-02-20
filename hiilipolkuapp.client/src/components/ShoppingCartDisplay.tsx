import { ProductDetailDto } from "../../types";
import { useUser } from "../context/UserContext";


type ShoppingCartDisplayProps = {
    product: ProductDetailDto
}
function ShoppingCartDisplay({ product }: ShoppingCartDisplayProps) {

    const { removeFromCart } = useUser();

    return (
        <div className="selectDisplayItem">
            <span>
                <p>{product.productName}</p>
                <p>{product.brand}</p>
            </span>
            <button className="btn-primary" onClick={() => removeFromCart(product.productId)}>Remove</button>
        </div>
    );
}

export default ShoppingCartDisplay;