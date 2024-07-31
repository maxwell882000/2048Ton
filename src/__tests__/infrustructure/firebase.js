import {getValueFirebase} from "../../infrustructure/firebase/firebase_db";
import {setValueFirestore} from "../../infrustructure/firebase/firestore";


test("check firebase getting value", async () => {
    const value = await getValueFirebase("users");
    const val = value.val();
    expect(val).toBeTruthy()
})


test("check firestore getting value", async () => {
    await setValueFirestore(
        '0',
        {
            // un: 'first_name' + " " + 'last_name',
            // l: 'photo_url',
            h: undefined,
            d: '3'
        }
    )
    // const value = await getValueFirestore("users");
    // value.forEach(doc => {
    //     console.log(doc.id, " => ", doc.data());
    // })
    // expect(value).toBeTruthy()
})