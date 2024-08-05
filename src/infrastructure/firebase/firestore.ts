import firebaseApp from "./firebase";
import {collection, doc, getFirestore, setDoc, writeBatch} from "firebase/firestore";
import {Firestore, getDocs} from "@firebase/firestore";

export interface BatchWriteDto {
    key: string;
    body: object;
}

// first make rule that person
const firestoreDb: Firestore = getFirestore(firebaseApp)

function validateValue(value: object) {
    if (Object.values(value).some(val => val === undefined || val === null)) {
        console.error("setValueFirestore", 'Cannot save undefined or null value to firestore')
        throw 'Cannot save undefined or null value to firestore';
    }
}

function divideArrayIntoBatches<T>(array: T[], batchSize: number) {
    const batches = [];
    for (let i = 0; i < array.length; i += batchSize) {
        batches.push(array.slice(i, i + batchSize));
    }
    return batches;
}

export async function setValueFirestore<T extends object>(key: string, value: T) {
    validateValue(value);
    await setDoc(doc(firestoreDb, 'u', key), value, {merge: true})
}

export async function setValueBatchFirestore<T extends BatchWriteDto>(values: T[]) {
    // A batched write can contain up to 500 operations
    const batchedValues = divideArrayIntoBatches(values, 500);
    for (const batchedValue of batchedValues) {
        const batch = writeBatch(firestoreDb);
        for (const value of batchedValue) {
            const ref = doc(firestoreDb, 'u', value.key);
            validateValue(value.body);
            batch.set(ref, value.body, {merge: true})
        }
        await batch.commit();
    }
}

export async function getValueFirestore<T>(key: string) {
    return await getDocs(collection(firestoreDb, "u"));
}
