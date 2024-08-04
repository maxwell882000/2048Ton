import {HomeContainer} from "./components/HomeContainer";
import PlayButton from "../../components/button/PlayButton";
import React from "react";
import {LabelButton} from "../../components/button/LabelButton";
import {LeadersIcon} from "../../components/icons/LeadersIcon";
import {ReferralIcon} from "../../components/icons/ReferralIcon";
import {useUnit} from "effector-react";
import {$gameStarted, $pageChanged} from "../../states/events";
import {Pages} from "../../constants/pages";
import {$isContinueGame} from "../../states/game/stores";
import ContinueGameButton from "../../components/button/ContinueGameButton";

export const HomePage = () => {
    const [gameStarted, pageChanged, isContinueGame] = useUnit([$gameStarted, $pageChanged, $isContinueGame]);

    return (
        <>
            <div className="flex-1 flex flex-col justify-center items-center">
                <HomeContainer></HomeContainer>
                <div className="mt-6"></div>
                {isContinueGame ?
                    <ContinueGameButton onClick={() => {
                        pageChanged({
                            page: Pages.GAME
                        })
                    }} width={'w-lg-button'}></ContinueGameButton> :
                    <PlayButton onClick={gameStarted} width={'w-lg-button'}></PlayButton>}

            </div>

            <div className="space-x-7 flex justify-between mb-5 ">
                <LabelButton
                    onClick={() => {
                        pageChanged({
                            page: Pages.REFANDLEADER,
                            params: "leaders"
                        })
                    }}
                    label={"Leaders"}>
                    <LeadersIcon></LeadersIcon>
                </LabelButton>
                <LabelButton
                    onClick={() => {
                        pageChanged({
                            page: Pages.REFANDLEADER,
                            params: "referral"
                        })
                    }}
                    label={"Referrals"}>
                    <ReferralIcon></ReferralIcon>
                </LabelButton>
            </div>

        </>
    )
}