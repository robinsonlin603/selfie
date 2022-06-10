import { usePostCollection } from "../../../hooks/usePostCollection";
import { Link } from "react-router-dom";

// styles
import styles from "../css/PostCard.module.css";

// components
import Avatar from "../../../components/js/Avatar";

export default function SwitchPostCard({ member, chatroomId, setChangeChat }) {
  const { documents: userProfile } = usePostCollection("users", member[0]);

  return (
    <Link
      to={{ pathname: `${chatroomId}` }}
      className={styles["postcard-container"]}
      onClick={() => setChangeChat(true)}
    >
      {userProfile.length > 0 && (
        <>
          <div className={styles.photo}>
            {userProfile[0].online && (
              <span className={styles["online-user"]}></span>
            )}
            {!userProfile[0].online && (
              <span className={styles["offline-user"]}></span>
            )}
            <div className={styles.avatar}>
              <Avatar src={userProfile[0].photoURL} />
            </div>
          </div>
          <div className={styles.user}>
            <h4>{userProfile[0].displayName}</h4>
            <p>{userProfile[0].online ? "Active Now" : "Offline"}</p>
          </div>
        </>
      )}
    </Link>
  );
}
