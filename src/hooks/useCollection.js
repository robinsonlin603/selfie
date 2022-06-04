import { useState, useEffect } from "react";

// firebase imports
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, _orderBy, _query) => {
  const [documents, setDocument] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  // set up query

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (_orderBy) {
      ref = query(ref, orderBy(_orderBy, "desc"));
    }

    if (_query) {
      ref = query(ref, where("createBy.id", "==", _query));
    }
    setIsPending(true);

    // fetch data

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ id: doc.id, ...doc.data() });
        });
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
  }, [collectionName, _orderBy, _query]);

  return { documents, error, isPending };
};
