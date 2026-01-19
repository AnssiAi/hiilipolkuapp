import { ReactNode } from "react";
import useDeviceDetection from "../hooks/useDeviceDetection";

type CollapsibleProps = {
    children: ReactNode;
    alignment: string;
    open: boolean;
    toggleSelf: (value: boolean) => void;
    toggleOther: (value: boolean) => void;
    icon?: string;
    content?: string;
}

function Collapsible({ children, alignment, open, toggleSelf, toggleOther, icon, content }: CollapsibleProps) {
    const device = useDeviceDetection();

    const handleCollapse = () => {
        toggleSelf(!open);
        if (device === "Mobile" || device === "Tablet") {
            toggleOther(false);
        }
    }

    return (
        <div className="collapsibleItem" style={{ alignItems: alignment }}>
            <button type="button" className="btn-collapse" onClick={handleCollapse}>
                <div className="btn-container">
                    {icon && <i className={icon}></i>}
                    {content && device === "Desktop" && content}
                    {open ? (<i className="bi bi-chevron-down"></i>) : (<i className="bi bi-chevron-right"></i>)}
                </div>
            </button>
            {open && children}
        </div>
    )
}

export default Collapsible;