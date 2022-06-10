import { useState } from "react";
import { useFirestore } from "../hooks/useFirestore";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePostContext } from "../hooks/usePostContext";
import { usePostCollection } from "../hooks/usePostCollection";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

// styles and image
import styles from "./Post.module.css";
import Close from "../assets/close.png";
import Left from "../assets/btn_leftArrow.png";
import Right from "../assets/btn_rightArrow.png";
import More from "../assets/more.svg";
import Heart from "../assets/heart.svg";
import Favorite from "../assets/favorite.png";
import Category from "../assets/category.jpg";

// components
import Circle from "./Circle";
import Avatar from "./Avatar";

// firebase
import { timestamp } from "../firebase/config";

export default function Post({ postInfo }) {
  const { user } = useAuthContext();
  const [selectPicture, setSelectPicture] = useState(0);
  const [newComment, setNewComment] = useState("");
  const { updateDocument, response, deleteDocument } = useFirestore("posts");
  const [eddit, setEddit] = useState(false);
  const [showOption, setShowOption] = useState(false);
  const { dispatch } = usePostContext();
  const { documents } = usePostCollection("posts", postInfo.id);
  const [newCaption, setNewCaption] = useState(null);
  const onClickClose = () => {
    dispatch({
      type: "CLOSE",
    });
  };
  const plusPic = () => {
    setSelectPicture((prevstate) => prevstate + 1);
  };
  const minusPic = () => {
    setSelectPicture((prevstate) => prevstate - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const commentAdd = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      content: newComment,
      createdAt: timestamp.fromDate(new Date()),
      id: Math.random(),
      uid: user.uid,
    };

    await updateDocument(documents[0].id, {
      comments: [...documents[0].comments, commentAdd],
    });

    if (!response.error) {
      setNewComment("");
    }
  };
  const addLike = async () => {
    documents[0].wholikes.push(user.uid);
    await updateDocument(documents[0].id, {
      hearts: documents[0].hearts + 1,
      wholikes: documents[0].wholikes,
    });
    if (!response.error) {
      setNewComment("");
    }
  };

  const minusLike = async () => {
    documents[0].wholikes.splice(user.uid);
    await updateDocument(documents[0].id, {
      hearts: documents[0].hearts - 1,
      wholikes: documents[0].wholikes,
    });
    if (!response.error) {
      setNewComment("");
    }
  };
  const handleDelete = async () => {
    dispatch({
      type: "CLOSE",
    });
    await deleteDocument(postInfo.id);
  };
  const handleEdit = async () => {
    setEddit(!eddit);
    setShowOption(!showOption);
  };
  const handleCaptionSubmit = async (e) => {
    e.preventDefault();

    await updateDocument(documents[0].id, {
      caption: newCaption,
    });
    setEddit(false);
  };
  const handleCancel = () => {
    setEddit(false);
    setShowOption(false);
  };
  return (
    <div className={styles["post-container"]}>
      {documents && (
        <>
          <div className={styles.close}>
            <button className={styles.button}>
              <div className={styles.closeIcon} onClick={() => onClickClose()}>
                <img src={Close} alt="Close icon" />
              </div>
            </button>
          </div>
          <main>
            <div className={styles.photo}>
              {!(selectPicture === 0) && (
                <img
                  className={styles.leftarrow}
                  src={Left}
                  alt="left"
                  onClick={() => minusPic()}
                />
              )}
              <img
                className={styles.photo}
                src={documents[0].photoURL[selectPicture]}
                alt="updatephoto "
              />
              {!(selectPicture === documents[0].photoURL.length - 1) && (
                <img
                  className={styles.rightarrow}
                  src={Right}
                  alt="right"
                  onClick={() => plusPic()}
                />
              )}
              <div className={styles.circle}>
                <Circle
                  numbers={documents[0].photoURL}
                  selectPicture={selectPicture}
                />
              </div>
            </div>
            <div className={styles["comment-container"]}>
              <ul className={styles.title}>
                <li
                  className={styles.titlePhoto}
                  onClick={() => onClickClose()}
                >
                  <Avatar
                    src={documents[0].createBy.photoURL}
                    uid={documents[0].createBy.id}
                  />
                </li>
                <li>{documents[0].createBy.displayName}</li>
                <li>
                  {postInfo.createBy.id === user.uid && (
                    <img
                      src={More}
                      alt="More icon"
                      onClick={() => setShowOption(!showOption)}
                    />
                  )}
                  {showOption && (
                    <ul className={styles.more}>
                      <li onClick={() => handleEdit()}>Edit</li>
                      <li onClick={() => handleDelete()}>Delete</li>
                      <li onClick={() => handleCancel()}>Cancel</li>
                    </ul>
                  )}
                </li>
              </ul>
              <ul className={styles.comment}>
                <div className={styles["comment-photo"]}>
                  <li onClick={() => onClickClose()}>
                    <Avatar
                      src={documents[0].createBy.photoURL}
                      uid={documents[0].createBy.id}
                    />
                  </li>
                  <div className={styles["comment-text"]}>
                    {!eddit && (
                      <p>
                        <span>{documents[0].createBy.displayName} </span>
                        {documents[0].caption}
                      </p>
                    )}
                    {eddit && (
                      <form onSubmit={handleCaptionSubmit}>
                        <label>
                          <textarea
                            required
                            type="text"
                            defaultValue={documents[0].caption}
                            onChange={(e) =>
                              e.target.value
                                ? setNewCaption(e.target.value)
                                : setNewCaption(documents[0].caption)
                            }
                          />
                        </label>
                        <button className="btn">Submit</button>
                      </form>
                    )}
                    <div className={styles.time}>
                      {formatDistanceToNow(documents[0].createdAt.toDate(), {
                        addSuffix: true,
                      })}
                    </div>
                  </div>
                </div>
                {documents[0].comments.map((comment) => (
                  <div className={styles["comment-photo"]} key={comment.id}>
                    <li
                      className={styles.commentphoto}
                      onClick={() => onClickClose()}
                    >
                      <Avatar src={comment.photoURL} uid={comment.uid} />
                    </li>
                    <div className={styles["comment-text"]}>
                      <p>
                        <span>{comment.displayName} </span>
                        {comment.content}
                      </p>
                      <div className={styles.time}>
                        {formatDistanceToNow(comment.createdAt.toDate(), {
                          addSuffix: true,
                        })}
                      </div>
                    </div>
                  </div>
                ))}
              </ul>
              <ul className={styles.favorite}>
                <li>
                  {documents[0].wholikes.includes(user.uid) ? (
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
                  <span> {documents[0].hearts} likes</span>
                </li>
                <li className={styles.caregory}>
                  <img src={Category} alt="category icon"></img>
                  <span> {documents[0].category}</span>
                </li>
              </ul>
              <ul className={styles["add-comment"]}>
                <form onSubmit={handleSubmit}>
                  <div className={styles.userphoto}>
                    <Avatar src={user.photoURL} />
                  </div>
                  <input
                    type="text"
                    required
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button className="btn">Submit</button>
                </form>
              </ul>
            </div>
          </main>
        </>
      )}
    </div>
  );
}
