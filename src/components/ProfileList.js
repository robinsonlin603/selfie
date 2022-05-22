import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

// styles and images
import styles from "./ProfileList.module.css";
import Switch from "../assets/switch.svg";
import Profile from "../assets/profile.svg";
import Saved from "../assets/saved.svg";
import Setting from "../assets/setting.svg";

export default function ProflieList({ user }) {
  const { logout, isPending } = useLogout();

  return (
    <div className={styles.content}>
      <div className={styles.triangle}></div>
      <div className={styles.square}>
        <Link
          to={{
            pathname: `/profile/${user.uid}`,
          }}
          className={styles.item}
        >
          <img src={Profile} alt="Profile icon" />
          <span>Profile</span>
        </Link>
        <Link to="/" className={styles.item}>
          <img src={Saved} alt="Saved icon" />
          <span>Saved</span>
        </Link>
        <Link to="/" className={styles.item}>
          <img src={Setting} alt="Setting icon" />
          <span>Setting</span>
        </Link>
        <Link to="/" className={styles.item}>
          <img src={Switch} alt="Switch icon" />
          <span>Switch Account</span>
        </Link>
        <hr />
        {!isPending && (
          <div className={styles.item} onClick={logout}>
            <span>Log Out</span>
          </div>
        )}
        {isPending && (
          <div className={styles.item}>
            <span>Logging out...</span>
          </div>
        )}
      </div>
    </div>
  );
}
