import Button from "../../components/Button/Button";

import styles from "./PageNotFound.module.css";

import { useNavigate } from "react-router";

function PageNotFound() {

    const navigate = useNavigate();

    return (
        <div className={styles.main}>
            <p>Oops!</p>
            <p>This page does not exist.</p>
            <Button onClick={() => {navigate(-1)}}>
                Get Back
            </Button>
        </div>
    )
}

export default PageNotFound;