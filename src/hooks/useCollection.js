import { useEffect, useState, useRef } from "react"
import { store } from '../firestore/config'

export const useCollection = (collection, _query, _order) => {
    const [documents, setDocuments] = useState(null)
    const [error, setError] = useState(null)
    const query = useRef(_query).current
    const orderBy = useRef(_order).current

    useEffect(() => {
        let ref = store.collection(collection)

        if(query){
            ref = ref.where(...query)
        }
        if(orderBy){
            ref = ref.orderBy(...orderBy)
        }
        const unsub = ref.onSnapshot(snapshot => {
            let result = []
            snapshot.docs.forEach(doc => {
                result.push({...doc.data(), id: doc.id})
            })
            setDocuments(result)
            setError(null)
        }, (error) => {
            console.log(error)
            setError('Could not fetch data')
        })

        return () => unsub();
    }, [collection, query, orderBy])

    return { documents, error}
}