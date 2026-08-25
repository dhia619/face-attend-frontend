
import styles from "./MenuButton.module.css";

type ButtonProps = {
    text: string,
    className?: string,
    onClick?: () => void,
    svg?: React.ReactNode,
};

function MenuButton(props: ButtonProps) {
    return (
        <button
            className={`${styles.menuItem} ${props.className ?? ""}`}
            onClick= {props.onClick}
        >
            {props.svg && props.svg}
            {props.text}
        </button>
    )
}

export default MenuButton;