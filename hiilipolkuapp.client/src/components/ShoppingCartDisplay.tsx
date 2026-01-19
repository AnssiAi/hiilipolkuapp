import { ProductDetailDto } from "../../types";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";


type ShoppingCartDisplayProps = {
    product: ProductDetailDto
}
function ShoppingCartDisplay({ product }: ShoppingCartDisplayProps) {
    const { t } = useTranslation();
    const { removeFromCart } = useUser();

    return (
        <div className="selectDisplayItem">
            <span>
                <p>{product.productName}</p>
                <p>{product.brand}</p>
            </span>
            <button type="button" className="btn-primary" onClick={() => removeFromCart(product.productId)} aria-label="Remove">
                <div className="btn-container">
                    <i className="bi bi-x-lg"></i>
                    {t("cart.remove")}
                </div>
            </button>
        </div>
    );
}

export default ShoppingCartDisplay;