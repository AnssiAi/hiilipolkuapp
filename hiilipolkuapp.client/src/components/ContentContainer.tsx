import { useState } from "react";
import { useTranslation } from "react-i18next";
import useDeviceDetection from "../hooks/useDeviceDetection";
import CartCollapsible from "./CartCollapsible";
import Collapsible from "./Collapsible";
import ProductSelect from "./ProductSelect";
import ShoppingCart from "./ShoppingCart";

function ContentContainer() {
    const { t } = useTranslation();
    const [selectOpen, setSelectOpen] = useState<boolean>(false);
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const device = useDeviceDetection();


    const toggleSelect = (value: boolean) => {
        setSelectOpen(value);
    }
    const toggleCart = (value: boolean) => {
        setCartOpen(value);
    }

    return (
        <div className="contentContainer">
            <Collapsible alignment={"flex-start"} content={t("product")} open={selectOpen} toggleSelf={toggleSelect} toggleOther={toggleCart} icon={device !== "Desktop" ? "bi bi-list-check" : undefined}>
                <ProductSelect />
            </Collapsible>
            <CartCollapsible alignment={"flex-end"} content={t("cart")} open={cartOpen} toggleSelf={toggleCart} toggleOther={toggleSelect} icon={device !== "Desktop" ? "bi bi-bag-fill" : undefined}>
                <ShoppingCart />
            </CartCollapsible>
        </div>
    )
}

export default ContentContainer;