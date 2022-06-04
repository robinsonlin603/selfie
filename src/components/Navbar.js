import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import { usePostCollection } from "../hooks/usePostCollection";

// styles and images
import styles from "./Navbar.module.css";
import Selfie from "../assets/selfie.png";
import Home from "../assets/home.svg";
import Add from "../assets/add.svg";
import Favorite from "../assets/favorite.svg";
import Chat from "../assets/chat.svg";

// components
import Avatar from "./Avatar";
import ProflieList from "./ProfileList";
import NewPosts from "./NewPosts";
import SearchData from "./SearchData";

export default function Navbar() {
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const [clickProfile, setClickProfile] = useState(false);
  const [clickAddPost, setClickAddPost] = useState(false);
  const { documents: currentUserProfile } = usePostCollection(
    "users",
    user.uid
  );
  const number = currentUserProfile
    ? currentUserProfile[0].followers.filter((follower) => {
        return follower.check === false;
      })
    : null;
  return (
    <div className={styles.navbar}>
      {clickAddPost && <NewPosts setClickAddPost={setClickAddPost} />}
      <ul>
        <li className={styles.logo}>
          <img
            src={Selfie}
            id={styles.logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </li>
        <div className={styles.form}>
          <SearchData />
        </div>
        <li>
          <img
            src={Home}
            alt="Home icon"
            className={styles.photo}
            onClick={() => navigate("/")}
          />
        </li>
        <li>
          <img
            src={Chat}
            alt="Chat icon"
            className={styles.photo}
            onClick={() => navigate("/chat")}
          />
        </li>
        <li>
          <img
            src={Add}
            alt="Add icon"
            className={styles.photo}
            onClick={() => setClickAddPost(!clickAddPost)}
          />
        </li>
        <li className={styles.friend}>
          <img
            src={Favorite}
            alt="Favorite icon"
            className={styles.photo}
            onClick={() => navigate("/friendlist")}
          />
          {number && number.length > 0 ? (
            <div className={styles.circle}>{number.length}</div>
          ) : null}
        </li>
        <li
          className={styles.profile}
          onClick={() => setClickProfile(!clickProfile)}
        >
          <Avatar src={user.photoURL} />
          {clickProfile && <ProflieList user={user} />}
        </li>
      </ul>
    </div>
  );
}
