import ButtonLoader from "../ButtonLoader/ButtonLoader";
import styles from "./ConfirmDialog.module.css";

type ConfirmDialogProps = {
	title: string;
	message: React.ReactNode;
	onConfirm: () => void;
	onCancel: () => void;
	isLoading?: boolean;
};

function ConfirmDialog({ title, message, onConfirm, onCancel, isLoading }: ConfirmDialogProps) {
	return (
		<div className={styles.backdrop} onClick={onCancel}>
			<div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
				<h3 className={styles.title}>{title}</h3>
				<p className={styles.message}>{message}</p>
				<div className={styles.actions}>
					<button className={styles.cancelButton} onClick={onCancel} disabled={isLoading}>
						Cancel
					</button>
					<button className={styles.confirmButton} onClick={onConfirm} disabled={isLoading}>
						{isLoading ? <ButtonLoader /> : "Delete"}
					</button>
				</div>
			</div>
		</div>
	);
}

export default ConfirmDialog;