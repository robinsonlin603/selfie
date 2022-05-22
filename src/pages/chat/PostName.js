import { usePostCollection } from "../../hooks/usePostCollection";

// styles
import styles from "./PostName.module.css";

// components
import Avatar from "../../components/Avatar";

export default function PostName({ member }) {
  const { documents: userProfile } = usePostCollection("users", member[0]);

  return (
    <div className={styles.postname}>
      {userProfile.length > 0 && (
        <>
          <div className={styles.photo}>
            <Avatar src={userProfile[0].photoURL} uid={userProfile[0].id} />
          </div>
          <h3>{userProfile[0].displayName}</h3>
        </>
      )}
    </div>
  );
}
