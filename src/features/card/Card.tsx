// Leave room for imports just in case
import { useEffect, useState } from "react";
import styles from "./Card.module.css";

export function Card(props: any) {
    // Setup
    const [cardClass, setCardClass] = useState(styles.hide);

    useEffect(() => {
        // Once the component is rendered once, change the styles
        setCardClass(styles.column);
    }, []);

    // Render
    return (
        <div className={cardClass + " w-2/5"}>
            <img
                className={styles.img + " animate-bounce"}
                src={props.image}
                style={{ width: "5rem" }}
                alt=''
            />
            <span className={styles.value}>
                {props.titleLbl}
                {props.title}
            </span>
            <span className={styles.value}>
                {props.descrLbl}
                {props.description}
            </span>
            <span className={styles.value}>
                {props.taglineLbl}
                {props.tagline}
            </span>
            <button
                className={styles.close}
                onClick={() => props.close(props.id)}
            >
                X
            </button>
        </div>
    );
}
