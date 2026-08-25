import styles from "./Toast.module.css";

type ToastProps = {
    message: string;
    type?: "success" | "error";
    onClose?: () => void;
};

function Toast({ message, type = "success", onClose }: ToastProps) {
    return (
        <div className={`${styles.toast} ${styles[type]}`}>
            <span>{message}</span>

            {onClose && (
                <button onClick={onClose} className={styles.close}>
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
                            stroke-width="2"
                            stroke-linecap="round"
                        />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default Toast;