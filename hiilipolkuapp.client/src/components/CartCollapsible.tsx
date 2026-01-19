import { ReactNode } from "react";
import { useUser } from "../context/UserContext";
import useDeviceDetection from "../hooks/useDeviceDetection";

type CartCollapsibleProps = {
    children: ReactNode;
    alignment: string;
    open: boolean;
    toggleSelf: (value: boolean) => void;
    toggleOther: (value: boolean) => void;
    icon?: string;
    content?: string;
}

function CartCollapsible({ children, alignment, open, toggleSelf, toggleOther, icon, content }: CartCollapsibleProps) {
    const device = useDeviceDetection();
    const { cartItems } = useUser();

    const handleCollapse = () => {
        toggleSelf(!open);
        if (device === "Mobile" || device === "Tablet") {
            toggleOther(false);
        }
    }

    return (
        <div className="collapsibleItem" style={{ alignItems: alignment }}>
            <div className="openCart">
                <button type="button" className="btn-collapse" onClick={handleCollapse}>
                    <div className="btn-container">
                        {icon && <i className={icon}></i>}
                        {content && device === "Desktop" && content}
                        {open ? (<i className="bi bi-chevron-down"></i>) : (<i className="bi bi-chevron-right"></i>)}
                    </div>
                </button>
                {cartItems.length > 0 ? (
                    <div className="itemCounter">
                        <div>
                            {cartItems.length}
                        </div>
                    </div>
                ) : (<></>)
                }
            </div>
            {open && children}
        </div>
    )
}

export default CartCollapsible;