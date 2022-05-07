// styles & imgages
import styles from "./Avatar.module.css";


export default function Avatar({ src }) {
    return (
        <div className={styles.avatar}>
            <img src={ src } alt="user avater" />
        </div>
    )
}
