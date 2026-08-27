import styles from "./PageError.module.css";

function PageError({message}: {message: string}) {
    return (
        <div className={styles.errorContainer}>
            <p>{message}</p>
        </div>
    )
}

export default PageError;