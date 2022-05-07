import { useState , useEffect ,useRef  } from "react";

// firebase imports
import { collection, onSnapshot, query , orderBy} from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (collectionName, _orderBy) =>{
    const [documents , setDocument ] = useState("");
    const [error , setError ] = useState("");
    const [isPending, setIsPending] = useState(false);

    // set up query

    const order = useRef(_orderBy).current;

    useEffect(() => {
        let ref = collection(db, collectionName);

        if (order){
            ref = query(ref, orderBy(order,"desc"));
        }

        setIsPending(true);

        // fetch data

        const unsub = onSnapshot(ref, (snapshot) => {
            let results = [];
            snapshot.docs.forEach( doc => {
                results.push({ id: doc.id , ...doc.data()})
            })
            setDocument(results);
            setError(null);
            setIsPending(false);
        }, (error) => {
            console.log("error",error.message);
            setError("could not fetch data");
            setIsPending(false);
        });

        return () => unsub()
    },[ collectionName , order]);

    return { documents , error , isPending}
}