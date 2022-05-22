import { useState, useEffect } from "react";

// firebase imports
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";

export const usePostCollection = (collectionName, q) => {
  const [documents, setDocument] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const docRef = doc(db, collectionName, q);

    setIsPending(true);

    // fetch data

    const unsub = onSnapshot(
      docRef,
      (snapshot) => {
        let results = [];
        results.push({ id: snapshot.id, ...snapshot.data() });
        setDocument(results);
        setError(null);
        setIsPending(false);
      },
      (error) => {
        console.log("error", error.message);
        setError("could not fetch data");
        setIsPending(false);
      }
    );

    return () => unsub();
  }, [collectionName, q]);

  return { documents, error, isPending };
};
