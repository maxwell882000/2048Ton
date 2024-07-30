import {getTelegramUser} from "../../infrustructure/telegram/telegram_user";
import {setValueFirestore} from "../../infrustructure/firebase/firestore";
import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/telegram/telegram_storage";

export class InitApi {
    async syncUserData() {
        const user = getTelegramUser();
        const isInit = await getValueCloudStorage('init');
        console.log("syncUserData", user, user?.id.toString(), !isInit)
        if (user && user.id && !isInit) {
            console.log("STARTED  TO VALUE FIRESTORE 1!!!")
            await setValueFirestore(
                user.id.toString(),
                {
                    un: user.first_name + " " + user.last_name,
                    l: user.photo_url,
                }
            )
            console.log("SAVED TO VALUE FIRESTORE 1!!!")
            await setValueCloudStorage("init", true);
        }
    }
}