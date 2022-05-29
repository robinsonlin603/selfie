import { useReducer, useState, useEffect } from "react";

// firebase imports
import {
  collection,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, storage, timestamp, auth } from "../firebase/config";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, success: false, error: null };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return { isPending: false, document: null, success: true, error: null };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "UPDATE_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

export const useFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      console.log(action);
      dispatch(action);
    }
  };

  // update file
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    let ref = collection(db, collectionName);
    ref = doc(ref, id);
    try {
      await updateDoc(ref, updates);
      dispatchIfNotCancelled({
        type: "UPDATE_DOCUMENT",
        payload: updates,
      });
    } catch (error) {
      console.log(error.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  // add file
  const addDocument = async (doc) => {
    let photoURL = [];
    for (let i = 0; i < doc.photo.length; i++) {
      let file = doc.photo[i];
      const fileRef = ref(
        storage,
        `postsphoto/${auth.currentUser.uid}/${file.name}`
      );
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      photoURL.push(url);
    }
    delete doc.photo;
    doc.photoURL = photoURL;
    const postref = collection(db, collectionName);
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      await addDoc(postref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: { ...doc, createdAt },
      });
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
    }
  };

  // delete file
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const docRef = doc(db, collectionName, id);
      await deleteDoc(docRef);
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (error) {
      console.log("error", error.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: "could not delete" });
    }
  };

  useEffect(() => {
    setIsCancelled(false);
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, deleteDocument, response, updateDocument };
};
