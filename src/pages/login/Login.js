import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

// styles and images
import styles from "./Login.module.css";
import Title from "../../assets/title.png";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login, isPending, error } = useLogin();

    const handleSubmit = (e) =>{
        e.preventDefault();
        login( email , password);
    }

    return (
        <>
            <form className={ styles["login-form"] } onSubmit={ handleSubmit }>
                <img src={ Title } alt="selfie logo" className={ styles.photo } />
                <label>
                    <input 
                        required
                        type="email"
                        onChange={ (e) => setEmail(e.target.value) }
                        value={ email }
                        placeholder="email"
                    />
                </label>
                <label>
                    <input 
                        required
                        type="password"
                        onChange={ (e) => setPassword(e.target.value) }
                        value={ password }
                        placeholder="password"
                    />
                </label>
                { !isPending && <button className="btn">Login</button> }
                { isPending && <button className="btn" disabled >Loading...</button> }
                { error && <div className="error">{ error }</div> }
            </form>
            <form className={ styles.signup }>
                <p>Don't have account ?<span><Link to="/signup">Signup</Link></span></p>
            </form>
        </>
        
  )
}
