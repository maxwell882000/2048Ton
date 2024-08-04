import {getTelegramId, getTelegramUser} from "../../infrustructure/telegram/telegram_user";
import {setValueFirestore} from "../../infrustructure/firebase/firestore";
import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/telegram/telegram_storage";
import {getTelegramParams} from "../../infrustructure/telegram/telegram_params";
import {REFERRAL_REWARD} from "../../constants/game";
import {ReferrerStatus, UserApiDto} from "../../dtos/api/userApiDto";


// User
// created_at        []     (ct)
// updated_at        []     (ut)
// referral_type     []     (rt)
// referrer_id       []     (ri)
// score             []     (s)
// username          []     (un)
// photo_url         []     (p)


const USER_STORAGE_KEY = 'user'

export class UserApi {

    private buildUser(): UserApiDto {
        const user = getTelegramUser();
        const params = getTelegramParams();
        return {
            un: (user?.first_name ?? "") + " " + (user?.last_name ?? ""),
            p: user?.photo_url ?? "",
            ct: new Date(),
            ut: new Date(),
            rt: 'ref' in params && params['ref'] ? ReferrerStatus.HAS_REFERRER : ReferrerStatus.NO_REFERRER,
            ri: 'ref' in params && params['ref'] ? Number(params['ref']) : "",
            s: 'ref' in params && params['ref'] ? REFERRAL_REWARD : 0,
        } as UserApiDto;
    }

    async sync() {
        try {
            const user = this.buildUser();
            const userId = getTelegramId();
            if (userId) {
                const storageUser = await getValueCloudStorage<UserApiDto>(USER_STORAGE_KEY);
                if (storageUser != null) {
                    this.deleteConstantFields(user);
                    if (this.userDataChanged(user, storageUser)) {
                        await this.setUser(userId.toString(), user);
                    }
                } else {
                    await this.setUser(userId.toString(), user);
                    return user;
                }
            }

        } catch (e) {
            console.log(e);
        }
    }

    async updateScore(score: number) {
        const id = getTelegramId();
        await setValueFirestore(id?.toString() ?? '0', {
            's': score
        });
    }

    private deleteConstantFields(user: UserApiDto) {
        // do not send referral information if the user was already created
        delete user['rt'];
        delete user['ri'];
        // do not send created_at if user was already created
        delete user['ct'];
        delete user['s'];
    }

    private async setUser(userId: string, user: UserApiDto) {
        await setValueFirestore(userId.toString(), user);
        await setValueCloudStorage(USER_STORAGE_KEY, user);
    }

    private userDataChanged(newUser: UserApiDto, oldUser: UserApiDto) {
        return !(newUser.un === oldUser?.un &&
            newUser.p === oldUser?.p);
    }


}