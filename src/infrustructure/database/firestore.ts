import firebaseApp from "../firebase/firebase";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";
import {Firestore, getDocs} from "@firebase/firestore";


const firestoreDb: Firestore = getFirestore(firebaseApp)

export async function setValueFirestore<T>(key: string, value: T) {
    if (value === undefined || value === null) {
        throw new Error('Cannot save undefined or null value to firestore');
    }
    await setDoc(doc(firestoreDb, 'u', key), value, {merge: true})
}

export async function getValueFirestore<T>(key: string) {
    return await getDocs(collection(firestoreDb, "u"));
}
