import {getValueFirebase} from "../../infrustructure/database/firebase_db";


test("check firebase getting value", async () => {
    const value = await getValueFirebase("users");
    const val = value.val();
    expect(val).toBeTruthy()
})