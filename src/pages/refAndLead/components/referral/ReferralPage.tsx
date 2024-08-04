import React from "react";
import {CoinsIcon} from "../../../../components/icons/CoinsIcon";
import {Referral} from "./Referral";
import {InviteButton} from "../../../../components/button/InviteButton";
import {CopyButton} from "../../../../components/button/CopyButton";
import {getTelegramId} from "../../../../infrustructure/telegram/telegram_user";
import {ContainerItem} from "../ContainerItem";
import {useUnit} from "effector-react";
import {$referrals} from "../../../../states/referral/store";

export const ReferralPage = () => {
    const [referrals] = useUnit([$referrals]);
    const handleCopy = () => {
        const textArea = document.createElement('textarea');
        textArea.value = `https://t.me/T2048Bot/start?startapp=ref-${getTelegramId()}`;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            Telegram.WebApp.showAlert("Text copied to clipboard!")
        } catch (err) {
            alert('Failed to copy text: ' + err);
        }
        document.body.removeChild(textArea);
    }

    return <>
        <div className={"bg-white h-[4.5rem] py-1 px-4  w-full rounded-[1.313rem] shadow-b-container-orange "}>
            <div className="flex h-full justify-center space-x-2 items-center">
                <CoinsIcon></CoinsIcon>
                <span className="text-[1.25rem] uppercase text-[#228AED]">25.000 FOR EACH INVITATION</span>
            </div>
        </div>
        <div className="text-white mt-4">
            <span className="">List of your friends</span>

        </div>
        <div
            className={`check-tab flex-1 ${referrals.length && 'scroll-element'}  overflow-y-scroll pb-2 space-y-3`}
        >
            {referrals.length ? referrals
                    .map((referral, index) =>
                        <Referral key={`referral-${index}`} referral={referral}></Referral>) :
                <ContainerItem bgColor={"bg-[#D1D8FF]"} align={"justify-center"}>
                    <span className=" text-[#228AED] text-[1rem] text-center">YOU HAVEN’T INVITED ANYONE YET</span>
                </ContainerItem>}


        </div>
        <div className="flex my-2 justify-between">
            <InviteButton></InviteButton>
            <CopyButton onClick={handleCopy}></CopyButton>
        </div>
    </>
}