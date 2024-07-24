import React from 'react';
import useCountdown from "../../../hooks/home/useCountdown";

interface CountdownTimerProps {
    initialTime: number;
}


function CountdownTimer({initialTime}: CountdownTimerProps) {
    const time = useCountdown(initialTime);

    return (
        <div className="tracking-[0.05rem] text-[1.125rem] text-[#60CFFF]">
            <span>{time.hours}</span>:
            <span>{time.minutes}</span>:
            <span>{time.seconds}</span>
        </div>
    );
}

export default CountdownTimer;
