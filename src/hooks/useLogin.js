import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

// firebase import
import { auth, db } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState("");
  const [error, setError] = useState("");
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    // sign up the user
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (!userCredential) {
        throw new Error("Could not complete signup!");
      }

      // update online status
      const docRef = doc(db, "users", userCredential.user.uid);
      await updateDoc(docRef, { online: true });

      // dispatch login action
      dispatch({ type: "LOGIN", payload: userCredential.user });

      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      if (!isCancelled) {
        let error_message = error.message;

        if (error_message.includes("auth/wrong-password")) {
          setError("email or password error");
          setIsPending(false);
        } else if (error_message.includes("auth/invalid-email")) {
          setError("didn't input email or password ");
          setIsPending(false);
        } else {
          setError(error_message);
          setIsPending(false);
        }
      }
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);
  return { login, isPending, error };
};
