import { useState, useEffect } from "react"
import { useAuthContext } from "./useAuthContext";

// firebase import
import { auth , db } from "../firebase/config";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";


export const useLogout = () => {
    const [isCancelled, setIsCancelled] = useState(false);
    const [error , setError] = useState("");
    const [isPending , setIsPending] = useState("");
    const { dispatch , user } = useAuthContext();

    const logout = async() =>{
        setError(null);
        setIsPending(true);


        // sign the user out
        try{
            // update online status
            
            const { uid } = user ;
            const docRef = doc(db,"users",uid);
            await updateDoc(docRef,{ online: false });
            await signOut(auth);
            dispatch({type:"LOGOUT"});

            // update state
            if (!isCancelled){
                
                setError(null);
                setIsPending(false);
            }
        }catch(error){
            if (!isCancelled){
                console.log("error",error.message);
                setError(error.message);
                setIsPending(false);
            }
        }
    }

    useEffect( () =>{
        setIsCancelled(false);
        return () => setIsCancelled(true);
    },[])
    
    return { logout , error , isPending }
}