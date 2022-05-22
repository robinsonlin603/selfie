import { useState, useEffect } from "react";

// firebase imports
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useChatCollection = (collectionName, userone, usertwo) => {
  const [documents, setDocument] = useState("");
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    let ref = collection(db, collectionName);
    if (userone && !usertwo) {
      ref = query(
        ref,
        orderBy("createdAt", "desc"),
        where(userone, "==", true)
      );
    }
    if (usertwo) {
      ref = query(
        ref,
        orderBy("createdAt", "desc"),
        where(userone, "==", true),
        where(usertwo, "==", true)
      );
    }

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
  }, [collectionName, userone, usertwo]);

  return { documents, error, isPending };
};
