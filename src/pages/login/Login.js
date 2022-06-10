import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

// styles and images
import styles from "./Login.module.css";
import Selfie from "../../assets/selfie.png";

export default function Login() {
  const [email, setEmail] = useState("cat@cat.com");
  const [password, setPassword] = useState("123456789");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };
  return (
    <>
      <div className={styles.background}></div>
      <form className={styles["login-form"]} onSubmit={handleSubmit}>
        <div className={styles.photo}>
          <img src={Selfie} alt="selfie logo" />
        </div>
        <p>Login to see photos and articles from Anonymous.</p>
        <label>
          <input
            required
            type="email"
            defaultValue="cat@cat.com"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email"
          />
        </label>
        <label>
          <input
            required
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            defaultValue="123456789"
            placeholder="password"
          />
        </label>
        {!isPending && <button className="btn">Login</button>}
        {isPending && (
          <button className="btn" disabled>
            Loading...
          </button>
        )}
        {error && <div className="error">{error}</div>}
      </form>
      <form className={styles.signup}>
        <p>
          Don't have account ?
          <span>
            <Link to="/signup">Signup</Link>
          </span>
        </p>
      </form>
    </>
  );
}
