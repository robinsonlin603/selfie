import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

// styles and images
import styles from "./Navbar.module.css";
import Title from "../assets/title.png";
import Home from "../assets/home.svg";
import Add from "../assets/add.svg";
import Favorite from "../assets/favorite.svg";
import Chat from "../assets/chat.svg";
import Search from "../assets/search.png"

// components
import Avatar from "./Avatar";
import ProflieList from "./ProfileList";

export default function Navbar() {

    const navigate = useNavigate();
    const { user } = useAuthContext();
    const [clickProfile, setClickProfile] = useState(false);
    const [searchId,setSearchId] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(searchId)
    }

    return (
        <div className={ styles.navbar }>
            <ul>
                <li className={ styles.logo }>
                    <img src={ Title } id={styles.logo} alt="logo" onClick={() => navigate("/")} />
                </li>
                <div>
                <form onSubmit={handleSubmit}>
                    <img src={ Search } alt="search icon "></img>
                    <input
                        type="text"
                        onChange={(e) => setSearchId(e.target.value)}
                        required
                        placeholder="Search"
                    />
                    <button></button>
                </form>
                </div>
                <li>
                    <img src={ Home } alt="Home icon" className={ styles.photo } />
                </li>
                <li>
                    <img src={ Chat } alt="Chat icon" className={ styles.photo } />
                </li>
                <li>
                    <img src={ Add } alt="Add icon" className={ styles.photo } onClick={() => navigate("/posts")} />
                </li>
                <li>
                    <img src={ Favorite } alt="Favorite icon" className={ styles.photo } />
                </li>
                <li className={ styles.profile } onClick={ ()=> setClickProfile(!clickProfile)} >
                    <Avatar src={ user.photoURL }/>
                    { clickProfile && <ProflieList/> }
                </li>
            </ul>
        </div>
    )
}
