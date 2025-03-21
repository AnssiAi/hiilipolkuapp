import { useEffect } from "react";

type ErrorMessageProps = {
    error: Error | null,
    setError: React.Dispatch<React.SetStateAction<Error | null>>
}
function ErrorMessage({ error, setError }: ErrorMessageProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            setError(null)
        }, 7000)

        return () => clearTimeout(timer);
    }, [error])

    const content = error
        ? <p>{error.message}</p>
        : null

    return (
        <div className="errorDisplay">
            {content}
        </div>
    );
}

export default ErrorMessage;