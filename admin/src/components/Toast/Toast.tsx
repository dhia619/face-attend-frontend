import { useEffect, useState } from "react";

import styles from "./Toast.module.css";

type ToastProps = {
    message: string;
    type?: "success" | "error";
};

function Toast({
    message,
    type = "success",
}: ToastProps) {
    const [isClosing, setIsClosing] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const closeTimer = setTimeout(() => {
            setIsClosing(true);
        }, 3000);

        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3250);

        return () => {
            clearTimeout(closeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    function handleClose() {
        setIsClosing(true);

        setTimeout(() => {
            setIsVisible(false);
        }, 250);
    }

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`
                ${styles.toast}
                ${styles[type]}
                ${isClosing ? styles.hide : ""}
            `}
        >
            <span>{message}</span>

            <button
                type="button"
                className={styles.close}
                onClick={handleClose}
            >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M6 6L18 18M18 6L6 18"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                    />
                </svg>
            </button>
        </div>
    );
}

export default Toast;