import { useEffect,useState,useCallback } from "react";

function Counter(time){
const [seconds, setSeconds] = useState(time.time);
useEffect(() => {
    const interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
    }, 1000);
    return () => clearInterval(interval);
}, []);

const formatTime = useCallback((seconds) => {
    const days = Math.floor(seconds / (24 * 60 * 60));
    const daysSec = seconds % (24 * 60 * 60);
    const hours = Math.floor(daysSec / (60 * 60));
    const hoursSec = daysSec % (60 * 60);
    const minutes = Math.floor(hoursSec / 60);
    const remainingSeconds = hoursSec % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
}, []);

return formatTime(seconds);


    
}

export default Counter;