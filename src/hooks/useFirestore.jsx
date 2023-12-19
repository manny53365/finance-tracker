import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: null
};

const firestoreReducer = (state, action) => {
    switch (action.type){

        case 'IS_PENDING':
            return {isPending: true, document: null, error: null, success: false}

        case 'ADDED_DOCUMENT':
            return {...state, isPending: false, document: action.payload, success: true, error: null}

        case 'ERROR':
            return {...state, error: action.payload, isPending: false, success: false, document: null}

        case 'DELETED_DOCUMENT':
            return {isPending: false, success: true, document: null, error: null}
        default:
            return state
    }
}

export const useFirestore = (collection, id) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState);
    const [isCanceled, setIsCanceled] = useState(false);

    const ref = projectFirestore.collection(collection)

    const dispatchIfNotCanceled = (action) => {
        if(!isCanceled){
            dispatch(action);
        };
    };

    const addDocument = async (doc) => {
        dispatch({
            type: 'IS_PENDING'
        })

        try {

            const createdAt = timestamp.fromDate(new Date());

            const addedDocument = await ref.add({...doc, createdAt});

            dispatchIfNotCanceled({type: 'ADDED_DOCUMENT', payload: addedDocument});

        } catch (err) {
            dispatchIfNotCanceled({type: 'ERROR', payload: err.message})
        }
    }

    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'});

        try {
            await ref.doc(id).delete();
            dispatchIfNotCanceled({ type: 'DELETED_DOCUMENT'});

        } catch (err) {
            dispatchIfNotCanceled({ type: 'ERROR', payload: Error(err.message) })
        }
    }


    useEffect(() => {
        return () => setIsCanceled(true);
    }, [])

    return { addDocument, deleteDocument, response}

}