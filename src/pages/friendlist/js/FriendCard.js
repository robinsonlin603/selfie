import { usePostCollection } from "../../../hooks/usePostCollection";
import { useFirestore } from "../../../hooks/useFirestore";
import { useNavigate } from "react-router-dom";
// styles
import styles from "../css/FriendCard.module.css";

// components
import Avatar from "../../../components/js/Avatar";

export default function FriendCard({ follow, documents }) {
  const { updateDocument } = useFirestore("users");
  const { documents: users } = usePostCollection("users", follow.uid);
  const navigate = useNavigate();
  const addFollowing = async () => {
    const addfollowing = {
      uid: users[0].id,
      photoURL: users[0].photoURL,
      displayName: users[0].displayName,
    };
    await updateDocument(documents[0].id, {
      following: [...documents[0].following, addfollowing],
    });
    const addfollower = {
      uid: documents[0].id,
      photoURL: documents[0].photoURL,
      displayName: documents[0].displayName,
      check: false,
    };
    await updateDocument(users[0].id, {
      followers: [...users[0].followers, addfollower],
    });
  };
  const unFollowing = async () => {
    const unfollow = documents[0].following.filter((f) => {
      return f.uid !== users[0].id;
    });
    await updateDocument(documents[0].id, {
      following: unfollow,
    });
    const unfollower = users[0].followers.filter((f) => {
      return f.uid !== documents[0].id;
    });
    await updateDocument(users[0].id, {
      followers: unfollower,
    });
  };

  return (
    <ul className={styles.friendcard}>
      <li
        className={styles.photo}
        onClick={() => navigate(`/profile/${users[0].id}`)}
      >
        <Avatar src={follow.photoURL} />
      </li>
      <li onClick={() => navigate(`/profile/${users[0].id}`)}>
        <p>{follow.displayName}</p>
      </li>
      <li>
        {documents[0].following.find((f) => f.uid === follow.uid) ? (
          <button className={styles.btn} onClick={() => unFollowing()}>
            Unfollow
          </button>
        ) : (
          <button className={styles.btn} onClick={() => addFollowing()}>
            Following
          </button>
        )}
      </li>
    </ul>
  );
}
