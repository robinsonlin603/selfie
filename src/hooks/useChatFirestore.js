import { useReducer, useState, useEffect } from "react";

// firebase imports
import {
  collection,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db, timestamp } from "../firebase/config";

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        isPending: true,
        document: null,
        success: false,
        error: null,
      };
    case "ADDED_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        success: true,
        error: null,
      };
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
      return { ...state };
  }
};

let initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

export const useChatFirestore = (collectionName) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // update file
  const updateDocument = async (id, updates) => {
    dispatch({ type: "IS_PENDING" });

    let ref = collection(db, collectionName);
    ref = doc(ref, id);

    try {
      const updatedDocument = await updateDoc(ref, updates);
      dispatchIfNotCancelled({
        type: "UPDATE_DOCUMENT",
        payload: updatedDocument,
      });
      return updatedDocument;
    } catch (error) {
      console.log(error.message);
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      return null;
    }
  };

  // add file
  const addDocument = async (doc) => {
    const postref = collection(db, collectionName);
    dispatch({ type: "IS_PENDING" });
    const createdAt = timestamp.fromDate(new Date());
    try {
      const addedDocument = await addDoc(postref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
      return addedDocument;
    } catch (error) {
      dispatchIfNotCancelled({ type: "ERROR", payload: error.message });
      return null;
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
