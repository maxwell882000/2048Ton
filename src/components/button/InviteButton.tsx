import {getTelegramId} from "../../infrastructure/telegram/telegram_user";
import {Button} from "./Button";
import {IS_LOCAL} from "../../constants/app";

export const InviteButton = () => {
    const text = "2048 Ton is a fun Telegram mini game where you earn coins by playing, and then use those coins to participate in our airdrop for exciting rewards!\n 💸 +10,000 Coins just for joining as a first-time use";


    return <Button width={'w-[15.063rem]'} onClick={() => {
        const url = IS_LOCAL ?
            `https://t.me/share/url?text=${text}&url=${encodeURI(`https://t.me/Ton_2048test_bot/start?startapp=ref-${getTelegramId()}`)}&text=${text}` :
            `https://t.me/share/url?text=${text}&url=${encodeURI(`https://t.me/T2048Bot/start?startapp=ref-${getTelegramId()}`)}`;
        Telegram.WebApp.openTelegramLink(
            encodeURI(url)
        )
    }}>
        INVITE A FRIEND
    </Button>
}