import {fetchMethods} from "../../infrustructure/fetch/fetchMethods";
import {ReferralApiCloudStorageDto, ReferralApiDto} from "../../dtos/api/referralApiDto";
import {getValueCloudStorage, setValueCloudStorage} from "../../infrustructure/telegram/telegram_storage";
import {getTelegramUser} from "../../infrustructure/telegram/telegram_user";
import moment from "moment";
import {BatchWriteDto, setValueBatchFirestore} from "../../infrustructure/firebase/firestore";

const referralMethod = "referrals"
//
//  I need to raise the score
//
export class ReferralApi {

    async getReferral(): Promise<ReferralApiDto[]> {
        const user = getTelegramUser();
        const referrals = await this.getReferralFromCloudStorage();
        if (user && referrals.expiry <= new Date()) {
            const data = await fetchMethods<{ [referrerId: number]: ReferralApiDto[] }>(referralMethod);
            const referralOfUser = data[user.id] ?? [];
            const activatedReferrals: BatchWriteDto[] = [];
            for (const referral of referralOfUser) {
                if (!(referral.r in referrals.referrals)) {
                    activatedReferrals.push({
                        key: referral.r.toString(), body: {
                            'rt': 2 // activated referral
                        }
                    })
                    referrals.referrals[referral.r] = referral;
                }
            }
            referrals.expiry = moment().add(3, 'hours').toDate();
            await setValueBatchFirestore(activatedReferrals);
            await setValueCloudStorage(referralMethod, referrals);
        }
        return Object.values(referrals.referrals);
    }

    async acceptReward(referralId: number) {
        const referrals = await this.getReferralFromCloudStorage();
        const ref = referrals.referrals[referralId];
        ref.ac = true;
        await setValueCloudStorage(referralMethod, referrals)
    }

    private async getReferralFromCloudStorage(): Promise<ReferralApiCloudStorageDto> {
        const result = await getValueCloudStorage<ReferralApiCloudStorageDto>(referralMethod);
        return {
            referrals: result?.referrals ?? {},
            expiry: new Date(result?.expiry ?? new Date(0, 0, 0).toString()),
        }
    }
}