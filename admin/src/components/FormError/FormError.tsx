import styles from "./FormError.module.css";

function FormError({message}: {message: string}) {
    return (
        <p className={styles.errorMessage}>{message}</p>
    )
}

export default FormError;