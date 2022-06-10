import { useAuthContext } from "../../../hooks/useAuthContext";
import { usePostCollection } from "../../../hooks/usePostCollection";
import { useState } from "react";
// styles
import styles from "../css/Friendlist.module.css";

// components
import FriendCard from "./FriendCard";
import NewFriendCard from "./NewFriendCard";

export default function Friendlist() {
  const { user } = useAuthContext();
  const [changeFollow, setChangeFollow] = useState(false);
  const { documents } = usePostCollection("users", user.uid);

  return (
    <div className={styles["friendlist-container"]}>
      {documents && (
        <>
          <div className={styles.friendlist}>
            <div className={styles.following}>
              <h4>
                {documents[0].following.length} <span>following</span>
              </h4>
              <div className={styles.cardcontainer}>
                {documents[0].following.map((follow) => {
                  return (
                    <FriendCard
                      follow={follow}
                      key={follow.uid}
                      documents={documents}
                    />
                  );
                })}
              </div>
            </div>
            <div className={styles.followers}>
              <h4>
                {documents[0].followers.length} <span>followers</span>
              </h4>
              <div className={styles.cardcontainer}>
                {documents[0].followers.map((follow) => {
                  if (follow.check) {
                    return (
                      <FriendCard
                        follow={follow}
                        key={follow.uid}
                        documents={documents}
                      />
                    );
                  } else {
                    return (
                      <NewFriendCard
                        follow={follow}
                        key={follow.uid}
                        documents={documents}
                      />
                    );
                  }
                })}
              </div>
            </div>
          </div>
          <div className={styles.switchfriendlist}>
            <div className={styles.switchbutton}>
              <button
                style={
                  !changeFollow
                    ? { borderTop: "1px solid black", color: "black" }
                    : { borderTop: "" }
                }
                onClick={() => setChangeFollow(false)}
              >
                following
              </button>
              <button
                style={
                  changeFollow
                    ? { borderTop: "1px solid black", color: "black" }
                    : { borderTop: "" }
                }
                onClick={() => setChangeFollow(true)}
              >
                follower
              </button>
            </div>
            <div className={styles.following}>
              {!changeFollow &&
                documents[0].following.map((follow) => {
                  return (
                    <FriendCard
                      follow={follow}
                      key={follow.uid}
                      documents={documents}
                    />
                  );
                })}
              {changeFollow &&
                documents[0].followers.map((follow) => {
                  if (follow.check) {
                    return (
                      <FriendCard
                        follow={follow}
                        key={follow.uid}
                        documents={documents}
                      />
                    );
                  } else {
                    return (
                      <NewFriendCard
                        follow={follow}
                        key={follow.uid}
                        documents={documents}
                      />
                    );
                  }
                })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
