/* eslint-disable react-hooks/rules-of-hooks */
import { useCollection } from "../../hooks/useCollection";
import { useParams, useNavigate } from "react-router-dom";
import { usePostContext } from "../../hooks/usePostContext";
import { usePostCollection } from "../../hooks/usePostCollection";
import { useChatCollection } from "../../hooks/useChatCollection";
import { useChatFirestore } from "../../hooks/useChatFirestore";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useState } from "react";
import { useFirestore } from "../../hooks/useFirestore";

// styles and images
import styles from "./Profile.module.css";
import MorePhoto from "../../assets/morephoto.svg";

// components
import Avatar from "../../components/Avatar";
import Filter from "./Filter.js";

export default function profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { documents, error } = useCollection("posts", "createdAt", id);
  const { user } = useAuthContext();
  const [edditClick, setEdditClick] = useState(false);
  const [newIntroduce, setNewIntroduce] = useState(null);
  const { documents: userProfile } = usePostCollection("users", id);
  const { documents: currentUserProfile } = usePostCollection(
    "users",
    user.uid
  );
  const { documents: chatroomProfile } = useChatCollection(
    "chatroom",
    `members.${id}`,
    `members.${user.uid}`
  );
  const [currentFilter, setCurrentFilter] = useState("all");
  const { dispatch } = usePostContext();
  const { updateDocument } = useFirestore("users");
  const { addDocument, response: chatroomResponse } =
    useChatFirestore("chatroom");
  const handleClickOpen = (post) => {
    dispatch({
      type: "OPEN",
      payload: post,
    });
  };
  const changeFilter = (newFilter) => {
    setCurrentFilter(newFilter);
  };
  const posts = documents
    ? documents.filter((document) => {
        switch (currentFilter) {
          case "all":
            return true;
          case "Selfie":
            return document.category === currentFilter;
          case "Trip":
            return document.category === currentFilter;
          case "Foodie":
            return document.category === currentFilter;
          case "Life":
            return document.category === currentFilter;
          case "Else":
            return document.category === currentFilter;
          default:
            return true;
        }
      })
    : null;
  const handleSubmit = (e) => {
    e.preventDefault();

    updateDocument(id, {
      introduce: newIntroduce,
    });
    setEdditClick(false);
  };
  const addFollowing = async () => {
    const addfollowing = {
      uid: userProfile[0].id,
      photoURL: userProfile[0].photoURL,
      displayName: userProfile[0].displayName,
    };
    await updateDocument(currentUserProfile[0].id, {
      following: [...currentUserProfile[0].following, addfollowing],
    });
    const addfollower = {
      uid: currentUserProfile[0].id,
      photoURL: currentUserProfile[0].photoURL,
      displayName: currentUserProfile[0].displayName,
      check: false,
    };
    await updateDocument(userProfile[0].id, {
      followers: [...userProfile[0].followers, addfollower],
    });
  };
  const unFollowing = async () => {
    const unfollow = currentUserProfile[0].following.filter((f) => {
      return f.uid !== userProfile[0].id;
    });
    await updateDocument(currentUserProfile[0].id, {
      following: unfollow,
    });
    const unfollower = userProfile[0].follower.filter((f) => {
      return f.uid !== currentUserProfile[0].id;
    });
    await updateDocument(userProfile[0].id, {
      followers: unfollower,
    });
  };
  const sendMessage = async () => {
    if (chatroomProfile.length !== 0) {
      navigate(`/chat/${chatroomProfile[0].id}`);
    } else {
      const uid = user.uid;
      const chatroom = {
        conversation: [],
        members: {
          [id]: true,
          [uid]: true,
        },
      };
      const result = await addDocument(chatroom);
      if (!chatroomResponse.error) {
        navigate(`/chat/${result.id}`);
      }
    }
  };
  return (
    <main>
      {error && <p className="error">{error}</p>}
      {documents && userProfile.length !== 0 && (
        <div className={styles["profile-container"]}>
          <header>
            <div className={styles.user}>
              <div className={styles.userphoto}>
                <Avatar src={userProfile[0].photoURL} />
              </div>
            </div>
            <div className={styles.detail}>
              <div className={styles.updateuser}>
                <h2>{userProfile[0].displayName}</h2>
                {user.uid === id && (
                  <>
                    <div></div>
                    <button
                      className="btn"
                      id={styles.eddit}
                      onClick={() => setEdditClick(!edditClick)}
                    >
                      Eddit Profile
                    </button>
                  </>
                )}
                {user.uid !== id && (
                  <>
                    <button className="btn" onClick={() => sendMessage()}>
                      Message
                    </button>
                    {userProfile[0].followers.find(
                      (follower) => follower.uid === user.uid
                    ) ? (
                      <>
                        {
                          <button
                            className="btn"
                            id="try"
                            onClick={() => unFollowing()}
                          >
                            Unfollow
                          </button>
                        }
                      </>
                    ) : (
                      <>
                        {
                          <button
                            className="btn"
                            onClick={() => addFollowing()}
                          >
                            Following
                          </button>
                        }
                      </>
                    )}
                  </>
                )}
              </div>
              <ul>
                <li>
                  {documents.length} <span>posts</span>
                </li>
                <li>
                  {userProfile[0].followers.length} <span>followers</span>
                </li>
                <li>
                  {userProfile[0].following.length} <span>following</span>
                </li>
              </ul>
              <div className={styles.introduce}>
                Intro.
                {!edditClick && <p>{userProfile[0].introduce}</p>}
                {edditClick && (
                  <form onSubmit={handleSubmit}>
                    <label>
                      <textarea
                        required
                        type="text"
                        defaultValue={userProfile[0].introduce}
                        onChange={(e) =>
                          e.target.value
                            ? setNewIntroduce(e.target.value)
                            : setNewIntroduce(userProfile[0].introduce)
                        }
                      />
                    </label>
                    <button className="btn">Submit</button>
                  </form>
                )}
              </div>
            </div>
            <ul className={styles.detail2}>
              <li>
                {documents.length} <span>posts</span>
              </li>
              <li>
                {userProfile[0].followers.length} <span>followers</span>
              </li>
              <li>
                {userProfile[0].following.length} <span>following</span>
              </li>
            </ul>
          </header>
          <div className={styles.filter}>
            <Filter currentFilter={currentFilter} changeFilter={changeFilter} />
          </div>
          <section>
            {documents.length === 0 && (
              <div className={styles.first}>No Post</div>
            )}
            {posts.map((post) => (
              <div
                className={styles.post}
                key={post.id}
                onClick={() => handleClickOpen(post)}
              >
                {post.photoURL.length > 1 && (
                  <img
                    className={styles.morephoto}
                    alt="morephoto"
                    src={MorePhoto}
                  />
                )}
                <img src={post.photoURL[0]} alt="postPhoto" />
              </div>
            ))}
          </section>
        </div>
      )}
    </main>
  );
}
