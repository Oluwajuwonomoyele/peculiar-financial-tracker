import { store, timestamp } from '../firestore/config'
import { useReducer } from 'react'

let initialState = {
    document: null,
    isPending: false,
    error: null,
    success: false
}

const firestoreReducer = (state, action) => {
    switch(action.type){
        case 'IS_PENDING':
            return { document: null, isPending: true, error: null, success: false}
        case 'ADD_DOC':
            return { document: action.payload, isPending: false, error: false, success: true}
        case 'ERROR': 
            return { document: null, isPending: false, error: action.payload, success: false}
        case 'DELETED_DOC':
            return { isPending: false, document: null, success: true, error: null}
        default:
            return state
    }
}

export const useFirestore = (collection) => {
    const [response, dispatch] = useReducer(firestoreReducer, initialState)

    const ref = store.collection(collection)

    const addDocument = async (doc) => {
        dispatch({type: 'IS_PENDING'})

        try {
            const createdAt = timestamp.fromDate(new Date())
            const addedDoc = await ref.add({...doc, createdAt})
            dispatch({type: 'ADD_DOC' , payload: addedDoc})
        } catch (error) {
            dispatch({type: 'ERROR', payload: error.message})
        }

    }

    const deleteDocument = async (id) => {
        dispatch({type: 'IS_PENDING'})

        try {
            await ref.doc(id).delete()
            dispatch({type: 'DELETED_DOC'})
        } catch (error) {
            dispatch({type: 'ERROR', payload: 'Could not delete transaction'})
        }
    }

    return { addDocument, deleteDocument, response }
}