import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";


export const useCollection = (collection, _query) => {
    const [documents, setDocuments] = useState(null);
    const [error, setError] = useState(null);

    // I am using the useRef hook to avoid an infinite loop because the _query parameter being passed in is an array
    // This simply means that if we don't useRef to pull/store the current value, the array will be seen as "changed/different" on every function call
    const query = useRef(_query).current;

    useEffect(() => {
        let ref = projectFirestore.collection(collection);

        if(query){
            ref = ref.where(...query);
        };

        const unsubscribe = ref.onSnapshot((snapshot) => {
            let results = [];
            snapshot.docs.forEach(doc => {
                results.push({ ...doc.data(), id: doc.id });
            })

            setDocuments(results);
            setError(null);
        }, err => {
            console.log(err);
            setError(err.message);
        })

        return () => unsubscribe();

    }, [collection, query])

    return {documents, error};

}
