import firebaseApp from "./firebase";
import {collection, doc, getFirestore, setDoc} from "firebase/firestore";
import {Firestore, getDocs} from "@firebase/firestore";


const firestoreDb: Firestore = getFirestore(firebaseApp)

export async function setValueFirestore<T extends object>(key: string, value: T) {
    if (Object.values(value).some(val => val === undefined || val === null)) {
        console.error("setValueFirestore", 'Cannot save undefined or null value to firestore')
        throw 'Cannot save undefined or null value to firestore';
    }
    await setDoc(doc(firestoreDb, 'u', key), value, {merge: true})
}

export async function getValueFirestore<T>(key: string) {
    return await getDocs(collection(firestoreDb, "u"));
}
