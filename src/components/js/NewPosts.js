import Select from "react-select";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// styles and images
import styles from "../css/NewPosts.module.css";
import Close from "../../assets/close.png";
import Upload from "../../assets/upload.svg";

// components
import PreviewPhoto from "./PreviewPhoto";

const categories = [
  { value: "Selfie", label: "Selfie" },
  { value: "Trip", label: "Trip" },
  { value: "Foodie", label: "Foodie" },
  { value: "Life", label: "Life" },
  { value: "Hello", label: "Hello" },
  { value: "Else", label: "Else" },
];

export default function NewPosts({ setClickAddPost }) {
  const [category, setCategory] = useState("");
  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setNewPhoto] = useState([]);
  const [thumbnailError, setThumbnailError] = useState(null);
  const [uploadsuccess, setUploadSuccess] = useState(false);
  const [formError, setFormError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [dueDate, setDueDate] = useState("");
  const { user } = useAuthContext();
  const { addDocument, response } = useFirestore("posts");

  const handleNewPhoto = (e) => {
    setNewPhoto([]);
    let selected = e.target.files;
    if (!selected) {
      setThumbnailError("Selected file must have an image");
      return;
    }
    if (selected.length > 6) {
      setThumbnailError("upload photo must less than twelve");
      return;
    }
    for (let i = 0; i < selected.length; i++) {
      if (!selected[i].type.includes("image")) {
        setThumbnailError("Selected file must be an image");
        return;
      }
      if (!selected[i].size > 100000) {
        setThumbnailError("Image file size must be less than 100kb");
        return;
      }
    }
    setNewPhoto(selected);
    setThumbnailError(null);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setFormError("Please select a project category");
      return;
    }
    const createBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid,
    };

    const post = {
      category: category.value,
      caption,
      location,
      photo,
      createBy,
      comments: [],
      hearts: 0,
      dueDate: dueDate,
      wholikes: [],
    };
    setIsPending(true);
    await addDocument(post);
    if (!response.error) {
      setClickAddPost(false);
      setFormError(null);
      setIsPending(false);
    }
  };

  const createContent = () => {
    if (photo.length < 1) {
      setThumbnailError("Selected file must have an image");
      return;
    } else {
      setThumbnailError(null);
      setUploadSuccess(true);
    }
  };

  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  if (dd < 10) {
    dd = "0" + dd;
  }
  if (mm < 10) {
    mm = "0" + mm;
  }

  today = yyyy + "-" + mm + "-" + dd;

  return (
    <div className={styles.posts}>
      <div className={styles.close}>
        <button
          className={styles.button}
          onClick={() => setClickAddPost(false)}
        >
          <div className={styles.closeIcon}>
            <img src={Close} alt="Close icon" />
          </div>
        </button>
      </div>
      <div className={styles["create-form"]}>
        <div className={styles.form}>
          <div className={styles.title}>Create new post</div>
          <form onSubmit={handlesubmit}>
            {!uploadsuccess && (
              <>
                <label>
                  {!photo.length < 1 && <PreviewPhoto previews={photo} />}
                </label>
                <label className={styles.uploadphoto}>
                  <input
                    placeholder="Add photo:"
                    type="file"
                    onChange={handleNewPhoto}
                    style={{ display: "none" }}
                    multiple="multiple"
                  />
                  <img src={Upload} alt="upload icon"></img>
                  <span>upload photo</span>
                </label>
                <label>
                  {thumbnailError && (
                    <div
                      className="btn"
                      disabled
                      id={styles.btn}
                      onClick={() => setUploadSuccess(false)}
                    >
                      {thumbnailError}
                    </div>
                  )}
                  {!thumbnailError && (
                    <div
                      className="btn"
                      id={styles.btn}
                      onClick={() => createContent()}
                    >
                      Next
                    </div>
                  )}
                </label>
              </>
            )}
            {uploadsuccess && (
              <>
                <Select
                  placeholder="Category："
                  onChange={(option) => setCategory(option)}
                  options={categories}
                  className={styles.selected}
                />
                <label>
                  <input
                    placeholder="Add location："
                    required
                    type="text"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                  />
                </label>
                <label>
                  <textarea
                    placeholder="Write a caption..."
                    required
                    type="text"
                    onChange={(e) => setCaption(e.target.value)}
                    value={caption}
                  ></textarea>
                </label>
                <label>
                  <input
                    required
                    placeholder="date"
                    type="date"
                    onChange={(e) => setDueDate(e.target.value)}
                    value={dueDate}
                    max={today}
                  />
                </label>
                <label>
                  {formError && (
                    <button className="btn" id={styles.btn}>
                      {formError}
                    </button>
                  )}
                  {!formError && !isPending && (
                    <button className="btn" id={styles.btn}>
                      Submit
                    </button>
                  )}
                  {!formError && isPending && (
                    <button className="btn" id={styles.btn}>
                      Uploading...
                    </button>
                  )}
                </label>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
