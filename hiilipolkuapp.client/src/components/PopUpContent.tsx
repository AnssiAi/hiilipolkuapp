import { ProductionType } from "../../types";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";

type PopUpContentProps = {
    feature: number | null
}

function PopUpContent({ feature }: PopUpContentProps) {
    const { t } = useTranslation();
    const { cartItems } = useUser();
    const item = cartItems.find((item) => item.productId === feature);
    return (
        <>
            {item === undefined ? (<p>{t("client.location") }.</p>) : (<><p><b>{t("production.type")}:</b> {ProductionType[item.production.productionType]}</p> <p><b>Co2:</b> {item.production.coG}</p></>)}
        </>
    );
}

export default PopUpContent;