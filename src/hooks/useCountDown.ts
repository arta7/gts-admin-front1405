import { useState } from 'react';
import useInterval from './useInterval';

const useCountdown = (seconds: number, onFinish?: () => any) => {
    const [countDown, setCountDown] = useState(seconds);
    const { startInterval, disposeInterval } = useInterval(startTimer, 1000)

    function startTimer() {
        setCountDown(countDown - 1);
        if (countDown == 0) {
            if (onFinish) {
                onFinish();
            }
            disposeInterval();
        }
    };

    const start = () => {
        setCountDown(seconds);
        startInterval()
    }

    return [...getReturnValues(countDown), start];
};

const getReturnValues = (countDown: number) => {
    if (countDown == -1) {
        return ['00', '00']
    }
    const date = new Date(countDown * 1000);
    let minutes: any = date.getUTCMinutes();
    let seconds: any = date.getSeconds().toString();
    if (minutes < 10) { minutes = "0" + minutes; }
    if (seconds < 10) { seconds = "0" + seconds; }

    return [minutes, seconds];
};

export default useCountdown;