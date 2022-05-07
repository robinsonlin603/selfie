import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";

// styles and images
import styles from "./NewPosts.module.css";
import Close from "../../assets/close.png";
import Upload from "../../assets/upload.svg";

// components
import PreviewPhoto from "../../components/PreviewPhoto";

const categories = [
    { value: "selfie", label: "Selfie" },
    { value: "ceremony", label: "Ceremony" },
    { value: "trip", label: "Trip" },
    { value: "view", label: "View" },
    { value: "exercise", label: "Exercise" },
    { value: "study", label: "Study" },
    { value: "cooking", label: "Cooking" },
    { value: "restaurant", label: "Restaurant" },
    { value: "make up", label: "Make up" },
]


export default function NewPosts() {
    const navigate = useNavigate();
    const [category, setCategory] = useState("");
    const [caption, setCaption] = useState("");
    const [location, setLocation] = useState("");
    const [photo, setNewPhoto] = useState([]);
    const [thumbnailError, setThumbnailError] = useState(null);
    const [uploadsuccess, setUploadSuccess] = useState(false);
    const [formError, setFormError] = useState(null);
    const [dueDate, setDueDate] = useState("");
    const { user } = useAuthContext();
    const { addDocument , response } = useFirestore("posts");

    const handleNewPhoto = (e) => {

        setNewPhoto([]);
        let selected = e.target.files;
        if(!selected){
            setThumbnailError("Selected file must have an image");
            return
        }
        if(selected.length>6){
            setThumbnailError("Selected file must less than six images");
            return
        }
        for(let i =0 ; i<selected.length ; i++ ){
            if(!selected[i].type.includes("image")){
                setThumbnailError("Selected file must be an image");
                return
            }
            if(!selected[i].size > 100000){
                setThumbnailError("Image file size must be less than 100kb");
                return
            }
        }
        setNewPhoto(selected);
        setThumbnailError(null);
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        if (!category){
            setFormError("Please select a project category");
            return
        }

        const createBy = {
            displayName: user.displayName,
            photoURL: user.photoURL,
            id: user.uid
        }

        const post = {
            category: category.value,
            caption,
            location,
            photo,
            createBy,
            comments:[],    
            hearts:0,
            dueDate: dueDate,
            wholikes:[],
        }
        await addDocument(post);
        if (!response.error){
            navigate("/");
            setFormError(null);
        }
    }

    const createContent = () =>{
        if(photo.length<1){
            setThumbnailError("Selected file must have an image");
            return
        }else{
            setThumbnailError(null);
            setUploadSuccess(true);
        }
    }

    return (
        <div className={ styles.posts }>
            <div className={ styles.close }>
                <button className={ styles.button } onClick={() => navigate("/")}>
                    <div className={ styles.closeIcon }>
                        <img src={ Close } alt="Close icon" />
                    </div>
                </button>
            </div>
            <div className={ styles["create-form"]}>
                <div className={ styles.form }>
                    <div className={ styles.title }>Create new post</div>
                    <form onSubmit={ handlesubmit }>
                        { !uploadsuccess && (
                            <>  
                                <label>
                                { !photo.length<1 && <PreviewPhoto previews={ photo }/>}
                                </label>                 
                                <label className={styles.uploadphoto}>
                                    <input 
                                        placeholder="Add photo:"
                                        type="file"
                                        onChange={ handleNewPhoto }
                                        style={ {display:"none"} }
                                        multiple="multiple"
                                    />
                                    <img src={ Upload } alt="upload icon"></img><span>upload photo</span>
                                </label>
                                <label>
                                    { thumbnailError && <div className="btn" disabled id={styles.btn} onClick={() => setUploadSuccess(true)}>{ thumbnailError }</div> }
                                    { !thumbnailError && <div className="btn" id={styles.btn} onClick={() => createContent()}>Next</div> }
                                </label>
                            </>
                        )}
                        { uploadsuccess && (
                            <>  
                                <label>
                                    <Select
                                        placeholder="Category："
                                        onChange={ (option) => setCategory(option) }
                                        options={ categories }
                                    />
                                </label>
                                <label>
                                    <input
                                        placeholder="Add location："
                                        required 
                                        type="text" 
                                        onChange={ (e) => setLocation(e.target.value) }
                                        value={ location }  
                                    />
                                </label>
                                <label>
                                    <textarea
                                        placeholder="Write a caption..."
                                        required 
                                        type="text"
                                        onChange={ (e) => setCaption(e.target.value) }
                                        value={ caption }  
                                    ></textarea>
                                </label>
                                <label>
                                    <input
                                        required 
                                        placeholder="date"
                                        type="date" 
                                        onChange={ (e) => setDueDate(e.target.value) } 
                                        value={ dueDate }
                                    />
                                </label>
                                { formError && <button className="btn">{ formError }</button>}
                                { !formError && <button className="btn">Submit</button>}
                            </>
                        )}
                    </form>
                </div>
            </div>
        </div>
    )
}
