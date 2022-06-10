import { useNavigate } from "react-router-dom";

// styles & imgages
import styles from "../css/Avatar.module.css";

export default function Avatar({ src, uid }) {
  const navigate = useNavigate();
  const handleClick = () => {
    if (uid) {
      navigate(`/profile/${uid}`);
    }
  };
  return (
    <div className={styles.avatar} onClick={() => handleClick()}>
      <img src={src} alt="user avater" />
    </div>
  );
}
