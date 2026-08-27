import styles from "./PermissionCheckbox.module.css";

interface PermissionCheckboxProps {
    isChecked: boolean;
    onChange: () => void;
    label?: string;
}

function PermissionCheckbox ({
    isChecked,
    onChange,
    label
}: PermissionCheckboxProps) {
    return (
        <label className={styles.checkboxContainer}>
            <input
                type="checkbox"
                checked={isChecked}
                onChange={onChange}
                aria-label={label}
            />
            <span className={styles.checkmark} />
        </label>
    );
};

export default PermissionCheckbox;