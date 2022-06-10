import { useNavigate } from "react-router-dom";

// styles and images
import styles from "../css/Introduce.module.css";
import Icon from "../../../assets/logo-removebg.png";
import Name from "../../../assets/selfie.png";
import Selfie from "../../../assets/TheSelfie.gif";
import Posts from "../../../assets/AddPost.gif";
import Chat from "../../../assets/Chat.gif";
import Friend from "../../../assets/Friend.gif";
import Rwd from "../../../assets/rwd.png";

export default function Introduce() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className={styles["introduce-container"]}>
      <div className={styles.introduce}>
        <div className={styles.title}>
          <img src={Icon} alt="icon"></img>
          <img src={Name} alt="name"></img>
        </div>
        <div className={styles.slogan}>
          <h2>Discover joy from the post and Make life better</h2>
          <p>Connect with more people</p>
          <p>Create compelling content</p>
          <p>Share and grow your life with community</p>
          <div>
            <button className="btn" onClick={() => handleLogin()}>
              Get Start !
            </button>
          </div>
        </div>
      </div>
      <div className={styles.homepage}>
        <div className={styles.part1}>
          <div className={styles.text}>
            <h3>A post bring the world coloser together </h3>
            <p>Share your life by posts.And know others.</p>
            <p>Easy to use whole functions in navbar.</p>
            <p>Wath posts and kill time until get off.</p>
          </div>
          <div className={styles.photo}>
            <img src={Selfie} alt="Selfie"></img>
          </div>
        </div>
        <div className={styles.part2}>
          <h3>How to use</h3>
          <div className={styles.fun}>
            <div className={styles.introfun}>
              <div className={styles.photo}>
                <img src={Posts} alt="posts" />
              </div>
              <h4>Add post with click</h4>
              <p>Select photos you want to share.</p>
              <p>And add caption to post.</p>
            </div>
            <div className={styles.introfun}>
              <div className={styles.photo}>
                <img src={Chat} alt="Chat" />
              </div>
              <h4>Chatroom</h4>
              <p>chat with anyone have same interests and hobbies.</p>
            </div>
            <div className={styles.introfun}>
              <div className={styles.photo}>
                <img src={Friend} alt="Friend" />
              </div>
              <h4>Friendlist</h4>
              <p>Following anyone you like.</p>
              <p>When you have new follower,we will remind you.</p>
            </div>
          </div>
        </div>
        <div className={styles.part3}>
          <div className={styles.photo}>
            <img src={Rwd} alt="rwd"></img>
          </div>
          <div className={styles.text}>
            <h3>Easy to browse</h3>
            <p>Support desktop and mobile.</p>
            <p>See post in anywhere and anytime you want.</p>
          </div>
        </div>
        <div className={styles.button}>
          <button onClick={() => handleLogin()}>Click me to start</button>
        </div>
      </div>
    </div>
  );
}
