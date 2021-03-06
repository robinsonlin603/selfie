import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignup } from "../../../hooks/useSignup";

// styles
import styles from "../css/Signup.module.css";
import Anonymous from "../../../assets/account_photo.svg";
import Selfie from "../../../assets/selfie.png";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [img, setImg] = useState(Anonymous);
  const [thumbnail, setThumbnail] = useState(Anonymous);
  const [thumbnailError, setThumbnailError] = useState(null);

  const { signup, isPending, error } = useSignup();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName, thumbnail);
  };

  const handleFileChange = (e) => {
    setThumbnail(null);
    let selected = e.target.files[0];

    if (!selected) {
      return;
    }
    if (!selected.type.includes("image")) {
      setThumbnailError("Selected file must be an image");
      return;
    }
    if (!selected.size > 100000) {
      setThumbnailError("Image file size must be less than 100kb");
      return;
    }
    setImg(URL.createObjectURL(selected));
    setThumbnailError(null);
    setThumbnail(selected);
  };

  return (
    <>
      <div className={styles.background}></div>
      <form className={styles["signup-form"]} onSubmit={handleSubmit}>
        <div className={styles.photo}>
          <img src={Selfie} alt="selfie logo" />
        </div>
        <p>Sign up to see photos and articles from Anonymous.</p>
        <label>
          <input
            required
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="email"
          />
        </label>
        <label>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="password"
          />
        </label>
        <label>
          <input
            required
            type="text"
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="displayName"
            value={displayName}
          />
        </label>
        <label>
          <span>click to change profile thumbnail</span>
          <input
            type="file"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
          <img src={img} alt="thumbnail" />
          {thumbnailError && <div className="error">{thumbnailError}</div>}
        </label>
        {!isPending && <button className="btn">Sign up</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </form>
      <form className={styles.login}>
        <p>
          have an account ?
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </form>
    </>
  );
}
