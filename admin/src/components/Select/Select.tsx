import type { SelectHTMLAttributes } from "react";
import styles from "./Select.module.css";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement>;

function Select({
    children,
    ...props
}: SelectProps) {
    return (
        <select {...props} className={styles.select}>
            {children}
        </select>
    );
}

export default Select;