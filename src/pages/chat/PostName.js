import { usePostCollection } from "../../hooks/usePostCollection";
import { useNavigate } from "react-router-dom";

// styles
import styles from "./PostName.module.css";

// components
import Avatar from "../../components/Avatar";
import leftArrow from "../../assets/btn_leftArrow.png";

export default function PostName({ member, setChangeChat }) {
  const { documents: userProfile } = usePostCollection("users", member[0]);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
    setChangeChat(false);
  };

  return (
    <div className={styles.postname}>
      {userProfile.length > 0 && (
        <>
          <div className={styles.image}>
            <img
              src={leftArrow}
              alt="back icon"
              onClick={() => handleClick()}
            />
          </div>
          <div className={styles.photo}>
            <Avatar src={userProfile[0].photoURL} uid={userProfile[0].id} />
          </div>
          <h3>{userProfile[0].displayName}</h3>
        </>
      )}
    </div>
  );
}
