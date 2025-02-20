import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

function CoReceipt() {
    const { cartItems } = useUser();
    const [cartTotalCo2, setCartTotalCo2] = useState<number>(0)

    useEffect(() => {
        if (cartItems) {
            const co2: number = cartItems.reduce((acc, cur) => acc + cur.production.coG, 0)
            setCartTotalCo2(co2);
        }
    })
    return (
        <div className="receipt-container">
            <h4>Total Co2:</h4>
            {cartItems ? (
                <div className="receipt-display">
                    <div>
                        {cartItems.map(item => (
                            <div className="receipt-item-display" key={item.productId}>
                                <p>{item.productName}:</p>
                                <p>{item.production.coG} g</p>
                            </div>
                        ))}
                    </div>
                    <div className="receipt-total-display">
                        <p>Cart Total Co2:</p>
                        <p>{cartTotalCo2} g</p>
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default CoReceipt;
