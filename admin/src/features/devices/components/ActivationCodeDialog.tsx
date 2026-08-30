import { useState } from "react";
import Toast from "../../../components/Toast/Toast";
import styles from "./ActivationCodeDialog.module.css";

type ActivationCodeDialogProps = {
    activationCode: string;
    onCancel: () => void;
};

function ActivationCodeDialog({
    activationCode,
    onCancel,
}: ActivationCodeDialogProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(activationCode);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    return (
        <>
            {copied && (
                <Toast message="Activation code copied to clipboard!" />
            )}

            <div className={styles.backdrop} onClick={onCancel}>
                <div
                    className={styles.dialog}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className={styles.header}>
                        <h3 className={styles.title}>
                            Device Activation Code
                        </h3>

                        <button
                            className={styles.closeButton}
                            type="button"
                            onClick={onCancel}
                            aria-label="Close"
                            title="Close"
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

                    <p className={styles.message}>
                        Make sure to copy the code before closing that dialog,
                        once closed the code is no longer available.
                    </p>

                    <p className={styles.message}>
                        This code expires in 15 minutes, consider activating the
                        device within the time.
                    </p>

                    <div className={styles.main}>
                        <input
                            className={styles.codeInput}
                            type="text"
                            readOnly
                            value={activationCode}
                        />

                        <button
                            type="button"
                            className={styles.copyButton}
                            onClick={handleCopy}
                            aria-label="Copy activation code"
                            title="Copy activation code"
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="9"
                                    y="9"
                                    width="11"
                                    height="11"
                                    rx="2"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                />
                                <path
                                    d="M15 9V6C15 4.89543 14.1046 4 13 4H6C4.89543 4 4 4.89543 4 6V13C4 14.1046 4.89543 15 6 15H9"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ActivationCodeDialog;