import { useState , useEffect} from "react";
import { useAuthContext } from "./useAuthContext";

// firebase import
import { auth , storage , db } from "../firebase/config";
import { createUserWithEmailAndPassword , updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [isPending, setIsPending] = useState("");
    const [error, setError] = useState("");
    const { dispatch } = useAuthContext();

    const signup =  async(email , password , displayName, thumbnail) => {
        let photoURL
        setError(null);
        setIsPending(true);
        try{
            const userCredential = await createUserWithEmailAndPassword(auth , email, password);
            if (!userCredential){
                throw new Error("Could not complete signup!");
            }

            // upload user thumbnail
            if (typeof(thumbnail) === "object"){
                const fileRef = ref(storage, `thumbnails/${auth.currentUser.uid}/${thumbnail.name}`);
                await uploadBytes(fileRef, thumbnail);
                photoURL = await getDownloadURL(fileRef);
            }

            if (typeof(thumbnail) === "string"){
                photoURL = "https://firebasestorage.googleapis.com/v0/b/theselfie-59eaf.appspot.com/o/thumbnails%2Fanonymousphoto%2Faccount_photo.svg?alt=media&token=1f70eddd-0b8d-419b-9c93-0cceebe6d532";
            }
            
            // update user profile
            await updateUserProfile({ displayName, photoURL });

            // create a user document
            const docRef = doc(db,"users",auth.currentUser.uid);
            await setDoc(docRef,{
                online: true,
                displayName: displayName,
                photoURL:photoURL,
                friends:"",
                likesposts:[]
            })

            // dispatch login action
            dispatch({ type:"LOGIN" , payload: userCredential.user})

            // update state
            if (!isCancelled){
                setIsPending(false);
                setError(null);
            }

        }catch(error){
            if (!isCancelled){
                let error_message = error.message;

                if(error_message.includes("auth/email-already-in-use")){
                    setError("email already use");
                    setIsPending(false);
                }else{
                    setError(error.message);
                    setIsPending(false);
                }
            }
        }
    }
    const updateUserProfile = async({ displayName, photoURL }) => {
        try{
            if ( auth.currentUser){
                const user = auth.currentUser;
                await updateProfile( user, {
                    displayName,
                    photoURL
                });
            }
        }catch(error){
            console.log("error",error.message);
            setError(error.message);
        }
    }

    useEffect( () =>{
        setIsCancelled(false);
        return () => setIsCancelled(true)
    },[])
    return { signup, isPending , error}
}
