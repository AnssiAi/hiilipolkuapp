import { ProductDetailDto } from "../../types";
import { useUser } from "../context/UserContext";
import ShoppingCartDisplay from "./ShoppingCartDisplay";

function ShoppingCart() {
    const { cartItems } = useUser();

    const content = cartItems && cartItems.length > 0
        ? <ul>{cartItems.map((product: ProductDetailDto) => <ShoppingCartDisplay key={product.productId} product={product} />)}</ul>
        : <p>No products in cart</p>
    return (
        <div className="shoppingCart">
            <span>
                {content}
            </span>
            <span>
                <p>Total co2: Not Implemented!</p>
            </span>
        </div>
    );
}

export default ShoppingCart;