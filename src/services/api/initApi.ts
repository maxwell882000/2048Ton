import {getTelegramId, getTelegramUser} from "../../infrustructure/telegram/telegram_user";
import {setValueFirestore} from "../../infrustructure/firebase/firestore";
import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/telegram/telegram_storage";
import {getTelegramParams} from "../../infrustructure/telegram/telegram_params";

enum ReferrerStatus {
    NO_REFERRER,
    HAS_REFERRER
}

interface Referrer {
    referrerStatus?: ReferrerStatus
}

// User
// created_at        []     (ct)
// updated_at        []     (ut)
// referral_type     []     (rt)
// referrer_id       []     (ri)
// score             []     (s)
// username          []     (un)
// photo_url         []     (p)


interface User {
    ct?: Date,
    ut: Date,
    rt?: ReferrerStatus,
    ri?: number,
    un: string,
    p?: string
}

const USER_STORAGE_KEY = 'user'

export class InitApi {
    private user: User;

    constructor() {
        this.user = this.buildUser();
    }

    private buildUser(): User {
        const user = getTelegramUser();
        const params = getTelegramParams();
        return {
            un: (user?.first_name ?? "") + " " + (user?.last_name ?? ""),
            p: user?.photo_url ?? "",
            ct: new Date(),
            ut: new Date(),
            rt: 'ref' in params && params['ref'] ? ReferrerStatus.HAS_REFERRER : ReferrerStatus.NO_REFERRER,
            ri: 'ref' in params && params['ref'] ? Number(params['ref']) : ""
        } as User;
    }

    async sync() {
        try {
            const userId = getTelegramId();
            if (userId) {
                const storageUser = await getValueCloudStorage<User>(USER_STORAGE_KEY);
                if (storageUser != null) {
                    this.deleteConstantFields();
                    if (this.userDataChanged(this.user, storageUser)) {
                        await this.setUser(userId.toString())
                    }
                } else {
                    await this.setUser(userId.toString())
                }
            }
        } catch (e) {
            console.log(e)
        }

    }

    private deleteConstantFields() {
        // do not send referral information if the user was already created
        delete this.user['rt'];
        delete this.user['ri'];
        // do not send created_at if user was already created
        delete this.user['ct'];
    }

    private async setUser(userId: string) {
        console.log("setUser", this.user);
        await setValueFirestore(userId.toString(), this.user);
        await setValueCloudStorage(USER_STORAGE_KEY, this.user);
    }

    private userDataChanged(newUser: User, oldUser: User) {
        return !(newUser.un === oldUser?.un &&
            newUser.p === oldUser?.p);

    }
}