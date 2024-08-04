import {useCallback, useEffect, useRef, useState} from "react";
import {useUnit} from "effector-react";
import {$navigation} from "../../states/store";
import {LeaderPage} from "./components/leaderboard/LeaderPage";
import {ReferralPage} from "./components/referral/ReferralPage";

export const RefAndLead = () => {
    const [navigation] = useUnit([$navigation]);
    const [swipePositionButton, setSwipePositionButton] = useState<number>(0);
    const swipeButtonParentRef = useRef<HTMLDivElement | null>(null);
    const backgroundRef = useRef<HTMLDivElement | null>(null);

    const pageRef = useRef<HTMLDivElement | null>(null);

    const [pagePosition, setPagePosition] = useState<number>(0);
    const [pageSecondPosition, setPageSecondPosition] = useState<number>(0);

    const [leftHeight, setLeftHeight] = useState<number>(0);
    const [animation, setAnimation] = useState<string>("");

    const swipeToLeftButton = () => {
        setSwipePositionButton(0);
        moveLeftPage();
    };

    const swipeToRightButton = () => {
        if (swipeButtonParentRef.current
            && backgroundRef.current) {
            const containerRect = swipeButtonParentRef.current.getBoundingClientRect();
            const containerWidth = containerRect.width;
            const redDivWidth = backgroundRef.current.getBoundingClientRect().width;
            const leftPosition = containerWidth - redDivWidth;
            setSwipePositionButton(leftPosition);
            handleClick();
        }
        moveRightPage();
    };

    const handleClick = () => {
        // Check if vibration is supported
        if ('vibrate' in navigator) {
            navigator.vibrate(1000); // Vibrate for 100 milliseconds
        }
    };

    const moveLeftPage = () => {
        if (pageRef.current) {
            const containerPageWidth = pageRef.current.getBoundingClientRect().width;
            setPagePosition(0);
            setPageSecondPosition(containerPageWidth * -1);
        }
    }
    const moveRightPage = () => {
        if (pageRef.current) {
            const containerPageWidth = pageRef.current.getBoundingClientRect().width;
            setPagePosition(containerPageWidth);
            setPageSecondPosition(0);
        }
    }

    const initPage = useCallback(() => {
        if (navigation.params == "referral") {
            swipeToRightButton();
        } else {
            swipeToLeftButton();
        }
    }, [navigation.params]);

    useEffect(() => {
        initPage();
        setLeftHeight(document.querySelector('.page-tab')?.getBoundingClientRect().height ?? 0);
        setTimeout(() => setAnimation("left 0.2s  linear"), 200);
    }, [navigation.params]);

    return (
        <>
            <span
                className={"text-white text-[1.5rem]"}>{swipePositionButton !== 0 ? "INVITE AND EARN" : "Leaderboard"}</span>
            <div
                style={{
                    boxShadow: '0 0.25rem 0 rgba(0, 0, 0, 0.25)'
                }}
                className="mt-10 border-[0.125rem] bg-[#4E19A5] rounded-[1.688rem] border-white ">
                <div
                    ref={swipeButtonParentRef} className="relative w-[15rem] h-[2rem] flex justify-between">
                    <span
                        onClick={swipeToLeftButton}
                        className={`
                        relative z-20 w-[50%]  transition-colors ${swipePositionButton !== 0 ? 'text-[#D1D8FF]' : 'text-white'}  cursor-pointer text-center leading-[2rem]`}>
                               Top Miners
                    </span>

                    <span
                        onClick={swipeToRightButton}
                        className={` w-[50%] transition-colors ${swipePositionButton === 0 ? 'text-[#D1D8FF]' : 'text-white'}  relative z-20  cursor-pointer text-center leading-[2rem]`}>
                    Referrals
                </span>
                    <div
                        ref={backgroundRef}
                        style={{
                            transition: animation,
                            left: `${swipePositionButton}px`
                        }}
                        className="bg-[#C286FF] rounded-[1.688rem] h-full w-[50%] absolute z-10"
                    ></div>
                </div>
            </div>

            <div className="flex-1 page-tab w-screen my-4">
                <div
                    ref={pageRef}
                    className="relative h-full w-full overflow-hidden">
                    <div
                        style={{
                            transition: animation,
                            left: `${pagePosition}px`,
                            height: `${leftHeight}px`
                        }}
                        className={"absolute  w-full"}>
                        <LeaderPage></LeaderPage>
                    </div>
                    <div
                        style={{
                            transition: animation,
                            left: `${pageSecondPosition}px`,
                            height: `${leftHeight}px`
                        }}
                        className={"absolute w-full"}>
                        <div style={{
                            height: `${leftHeight}px`
                        }} className={"h-[200px] px-4 flex flex-col overflow-hidden"}>
                            <ReferralPage></ReferralPage>
                        </div>
                    </div>
                    <div className="invisible h-full">

                    </div>
                </div>
            </div>
        </>
    );
}