import { ProductionType } from "../../types";
import { useUser } from "../context/UserContext";

type PopUpContentProps = {
    feature: number | null
}

function PopUpContent({ feature }: PopUpContentProps) {

    console.log(feature);
    const { cartItems } = useUser();
    const item = cartItems.find((item) => item.productId === feature);
    return (
        <>
            {item === undefined ? (<p>You are here.</p>) : (<><p><b>Production type:</b> {ProductionType[item.production.productionType]}</p> <p><b>Co2:</b> {item.production.coG}</p></>)}
        </>
    );
}

export default PopUpContent;