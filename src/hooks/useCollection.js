import { useState, useEffect, useRef } from "react";

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

  const order = useRef(_orderBy).current;
  const q = useRef(_query).current;

  useEffect(() => {
    let ref = collection(db, collectionName);

    if (order) {
      ref = query(ref, orderBy(order, "desc"));
    }

    if (q) {
      ref = query(ref, where(...q));
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
  }, [collectionName, order, q]);

  return { documents, error, isPending };
};
