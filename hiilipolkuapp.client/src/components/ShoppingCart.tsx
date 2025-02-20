import { ProductDetailDto } from "../../types";
import { useUser } from "../context/UserContext";
import CoReceipt from "./CoReceipt";
import ShoppingCartDisplay from "./ShoppingCartDisplay";

function ShoppingCart() {
    const { cartItems } = useUser();

    return (
        <div className="shoppingCart">
            {cartItems && cartItems.length > 0 ? (<>
                <ul>{cartItems.map((product: ProductDetailDto) => <ShoppingCartDisplay key={product.productId} product={product} />)}</ul>
                <CoReceipt />

            </>) : (<p>No products in cart</p>)}
        </div>
    );
}

export default ShoppingCart;