import {getTelegramUser, WebAppUser} from "../../infrustructure/telegram/telegram_user";
import {setValueFirestore} from "../../infrustructure/firebase/firestore";
import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/telegram/telegram_storage";

export class InitApi {
    async syncUserData() {
        const user = getTelegramUser();
        const isInit = await getValueCloudStorage<WebAppUser>('init');
        if (user && user.id && this.userDataChanged(user, isInit)) {
            await setValueFirestore(
                user.id.toString(),
                {
                    un: user.first_name + " " + user.last_name,
                    p: user.photo_url ?? "",
                }
            )
            await setValueCloudStorage("init", user);
        }
    }

    private userDataChanged(newUser: WebAppUser, oldUser: WebAppUser) {
        return !(newUser.first_name === oldUser.first_name &&
            newUser.last_name === oldUser.last_name &&
            newUser.photo_url === oldUser.photo_url);

    }
}