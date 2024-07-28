import firebaseApp from "../firebase/firebase";
import {Database, getDatabase, ref, set} from "firebase/database";

const firebaseDb: Database = getDatabase(firebaseApp)


export async function saveValueFirebase<T>(key: string, value: T) {
    await set(ref(firebaseDb, key), value);
}
