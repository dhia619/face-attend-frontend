import type { InputHTMLAttributes } from "react";
import styles from "./Input.module.css";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input({...props }: InputProps) {
	return (
		<input {...props} className={`${styles.input} ${props.className}`}/>
	);
}

export default Input;