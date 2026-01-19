import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import { ProductDetailDto } from "../../types";
import CoReceipt from "./CoReceipt";
import ShoppingCartDisplay from "./ShoppingCartDisplay";
import ActiveStep from "./ActiveStep";

function ShoppingCart() {
    const { t } = useTranslation();
    const { cartItems } = useUser();
    const [receipt, setReceipt] = useState<boolean>(false);
    const [selected, setSelected] = useState<number>(1);

    useEffect(() => {
        setSelected(!receipt ? 1 : 2);
    }, [receipt])

    const handleViewChange = () => {
        setReceipt((prev) => !prev)
    }


    return (
        <div className="collapsibleContent">
            < ActiveStep steps={2} selected={selected} />
            {receipt ? (
                <>
                    <CoReceipt />
                    <button className="btn-primary" onClick={handleViewChange} aria-label="Cart">
                        <div className="btn-container">
                            <i className="bi bi-arrow-left"></i>
                            {t("cart.tocart")}
                        </div>
                    </button>
                </>
            ):
            (
                <>
                    {cartItems && cartItems.length > 0 ? (
                            <div>{cartItems.map((product: ProductDetailDto) => <ShoppingCartDisplay key={product.productId} product={product} />)}</div>) :
                            (<p>{t("cart.noproducts")}</p>)}
                        <button type="button" className="btn-primary" onClick={handleViewChange} aria-label="Receipt">
                            <div className="btn-container">
                                {t("cart.toreceipt")}
                                <i className="bi bi-arrow-right"></i>
                            </div>
                        </button>
                </>
             )}
        </div>
    );
}

export default ShoppingCart;