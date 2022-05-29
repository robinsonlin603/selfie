import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { usePostContext } from "../hooks/usePostContext";
import { useNavigate } from "react-router-dom";

// styles and images
import styles from "./ShowPosts.module.css";
import More from "../assets/more.svg";
import Left from "../assets/btn_leftArrow.png";
import Right from "../assets/btn_rightArrow.png";
import Heart from "../assets/heart.svg";
import Favorite from "../assets/favorite.png";

// components
import Avatar from "./Avatar";
import Circle from "./Circle";

// firebase
import { timestamp } from "../firebase/config";

export default function ShowPosts({ post, user }) {
  const [selectPicture, setSelectPicture] = useState(0);
  const [showMore, setShowMore] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { updateDocument, response } = useFirestore("posts");
  const { dispatch } = usePostContext();
  const navigate = useNavigate();
  const handleClickOpen = (post) => {
    dispatch({
      type: "OPEN",
      payload: post,
    });
  };

  const plusPic = () => {
    setSelectPicture((prevstate) => prevstate + 1);
  };
  const minusPic = () => {
    setSelectPicture((prevstate) => prevstate - 1);
  };
  const addLike = async () => {
    post.wholikes.push(user.uid);
    await updateDocument(post.id, {
      hearts: post.hearts + 1,
      wholikes: post.wholikes,
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  const minusLike = async () => {
    post.wholikes.splice(user.uid);
    await updateDocument(post.id, {
      hearts: post.hearts - 1,
      wholikes: post.wholikes,
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      uid: user.uid,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
    };

    await updateDocument(post.id, {
      comments: [...post.comments, commentAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };

  return (
    <div className={styles["post-container"]}>
      <div className={styles.title}>
        <header>
          <div className={styles.userphoto}>
            <Avatar src={post.createBy.photoURL} uid={post.createBy.id} />
          </div>
          <div className={styles.user}>
            <div>{post.createBy.displayName}</div>
            <div>{post.location}</div>
          </div>
        </header>
        <div className={styles.option}>
          <img
            src={More}
            alt="more icon"
            onClick={() => setShowOption(!showOption)}
          />
          {showOption && <div className={styles.try}>hello</div>}
        </div>
      </div>
      <div className={styles["photo-container"]}>
        {!(selectPicture === 0) && (
          <img
            className={styles.legtarrow}
            src={Left}
            alt="left"
            onClick={() => minusPic()}
          />
        )}
        <img
          className={styles.photo}
          src={post.photoURL[selectPicture]}
          alt="updatephoto "
        />
        {!(selectPicture === post.photoURL.length - 1) && (
          <img
            className={styles.rightarrow}
            src={Right}
            alt="right"
            onClick={() => plusPic()}
          />
        )}
      </div>
      <div className={styles["content-container"]}>
        <div className={styles.heart}>
          {post.wholikes.includes(user.uid) ? (
            <>
              {
                <img
                  src={Favorite}
                  alt="heart icon"
                  onClick={() => minusLike()}
                ></img>
              }
            </>
          ) : (
            <>
              {
                <img
                  src={Heart}
                  alt="heart icon"
                  onClick={() => addLike()}
                ></img>
              }
            </>
          )}
        </div>
        <div className={styles.circle}>
          <Circle numbers={post.photoURL} selectPicture={selectPicture} />
        </div>
      </div>
      <div className={styles["comment-container"]}>
        <div className={styles.details}>
          <div className={styles.detailtext}>
            <h4>Category:</h4>
            <span>{post.category}</span>
          </div>
          <div className={styles.detailtext}>
            <h4>Date:</h4>
            <span>{post.dueDate}</span>
          </div>
          <div className={styles.detailtext}>
            <h4>Like:</h4>
            <span>{post.hearts} people</span>
          </div>
        </div>
        <div className={styles.caption}>
          <div
            className={styles.displayName}
            onClick={() => navigate(`/profile/${post.createBy.id}`)}
          >
            {post.createBy.displayName}
          </div>
          {post.caption.length < 30 ? (
            <p>{post.caption.substring(0, 30)}</p>
          ) : showMore ? (
            <p>{post.caption}</p>
          ) : (
            <p>
              {post.caption.substring(0, 30)}
              <span onClick={() => setShowMore(!showMore)}>...more</span>
            </p>
          )}
        </div>
        {post.comments.length !== 0 && (
          <div
            className={styles.comments}
            onClick={() => handleClickOpen(post)}
          >
            View all {post.comments.length} comments
          </div>
        )}
        {post.comments.map(
          (comment) =>
            comment.displayName === user.displayName && (
              <div className={styles.caption} key={Math.random()}>
                <div>{comment.displayName}</div>
                <p>{comment.content}</p>
              </div>
            )
        )}
      </div>
      <div className={styles["add-comment"]}>
        <form onSubmit={handleSubmit}>
          <div className={styles.userphoto}>
            <Avatar src={user.photoURL} />
          </div>
          <input
            type="text"
            placeholder="Message..."
            required
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button className="btn">Submit</button>
        </form>
      </div>
    </div>
  );
}
