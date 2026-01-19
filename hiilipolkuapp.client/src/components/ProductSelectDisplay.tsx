import { ProductDto } from "../../types";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";

type ProductSelectDisplayProps = {
    product: ProductDto
}
function ProductSelectDisplay({ product }: ProductSelectDisplayProps) {
    const { t } = useTranslation();
    const { addToCart } = useUser();


    return (
        <div className="selectDisplayItem">
            <span>
                <p>{product.productName}</p>
                <p>{product.brand}</p>
            </span>
            <button className="btn-primary" onClick={() => addToCart(product.productId)} aria-label="Add to cart">
                <div className="btn-container">
                    <i className="bi bi-plus-lg"></i>
                    {t("add.toCart")}
                </div>
            </button>
        </div>
    );
}

export default ProductSelectDisplay;