import type { ReactNode } from "react";
import styles from "./FormField.module.css";

type FormFieldProps = {
	label: string;
	htmlFor: string;
	error?: string;
	children: ReactNode;
};

function FormField({
	label,
	htmlFor,
	error,
	children,
}: FormFieldProps) {
	return (
	<div className={styles.group}>
		<label htmlFor={htmlFor} className={styles.label}>
			{label}
		</label>

		<div
		className={`${styles.controlWrapper} ${error ? styles.error : ""}`}>
			{children}
		</div>

		{error && (
		<span className={styles.errorMessage}>
			{error}
		</span>
		)}
	</div>
	);
}

export default FormField;