import {Leader} from "./Leader";
import {useUnit} from "effector-react";
import {$leaderboard} from "../../../../states/leaderboard/store";

export const LeaderPage = () => {
    const [leaders] = useUnit([$leaderboard]);
    return <>
        <div
            className={`px-4 scroll-element h-full overflow-y-scroll space-y-3 pb-2`}
        >
            {leaders.map((leader, index) => (
                <Leader key={`leader-${index}`} leader={leader} place={index + 1}></Leader>
            ))}
        </div>
    </>
}