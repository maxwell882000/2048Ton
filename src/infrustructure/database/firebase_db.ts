import firebaseApp from "../firebase/firebase";
import {Database, getDatabase, ref, set} from "firebase/database";

const firebaseDb: Database = getDatabase(firebaseApp)


export async function saveValueFirebase(key: string, value: number) {
    await set(ref(firebaseDb, key), value);
}
