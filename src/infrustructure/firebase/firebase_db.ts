import firebaseApp from "./firebase";
import {child, Database, get, getDatabase, ref, set} from "firebase/database";

const firebaseDb: Database = getDatabase(firebaseApp)


 async function setValueFirebase<T>(key: string, value: T) {
    await set(child(ref(firebaseDb, "users"), key), value);
}

export async function getValueFirebase<T>(key: string) {
    return await get(ref(firebaseDb, key));
}
