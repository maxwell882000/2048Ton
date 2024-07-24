// useCountdown.js
import {useEffect, useMemo, useState} from 'react';


export interface Time {
    hours: string;
    minutes: string;
    seconds: string;
}

function useCountdown(initialTime: number): Time {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft <= 0) return;

        const intervalId = setInterval(() => {
            setTimeLeft((prevTime) => prevTime - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timeLeft]);
    return useMemo((): Time => {
        const hours = Math.floor(timeLeft / 3600);
        const minutes = Math.floor((timeLeft % 3600) / 60);
        const seconds = timeLeft % 60;

        return {
            hours: String(hours).padStart(2, '0'),
            minutes: String(minutes).padStart(2, '0'),
            seconds: String(seconds).padStart(2, '0'),
        }
    }, [timeLeft]);
}

export default useCountdown;
