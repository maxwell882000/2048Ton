import {getValueFirebase} from "../../infrustructure/database/firebase_db";
import {getValueFirestore} from "../../infrustructure/database/firestore";


test("check firebase getting value", async () => {
    const value = await getValueFirebase("users");
    const val = value.val();
    expect(val).toBeTruthy()
})


test("check firestore getting value", async () => {
    const value = await getValueFirestore("users");
    value.forEach(doc => {
        console.log(doc.id, " => ", doc.data());
    })
    expect(value).toBeTruthy()
})