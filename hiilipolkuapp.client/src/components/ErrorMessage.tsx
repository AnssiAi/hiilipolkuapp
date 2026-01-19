import { useEffect } from "react";
import { useUser } from "../context/UserContext";

function ErrorMessage() {
    const { error, setError } = useUser();

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null)
        }, 10000)

        return () => clearTimeout(timer);
    }, [error])

    const content = error
        ? <p>{error.message}</p>
        : null

    return (
        <>
            {
                error ? (
                    <div className = "errorDisplay" >
                        {content}
                    </div>
                ) 
                : (null)
            }
        </>
    );
}

export default ErrorMessage;