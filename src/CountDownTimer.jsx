import React, { useState, useEffect } from "react";

function CountdownTimer({ expirationDate }) {
    const calculateTimeRemaining = () => {
        const now = new Date();
        const expiration = new Date(expirationDate);
        const difference = expiration - now;

        if (difference <= 0) {
            return { expired: true };
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
            (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    };

    const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeRemaining(calculateTimeRemaining());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    if (timeRemaining.expired) {
        return <div>Expired</div>;
    }

    const { days, hours, minutes, seconds } = timeRemaining;

    if (days > 0) {
        return (
            <div>
                {days} day{days > 1 ? "s " : " "} left
                {/* {hours > 0 && <span>{hours} hour{hours > 1 ? 's ' : ' '}</span>}
        {minutes > 0 && <span>{minutes} minute{minutes > 1 ? 's ' : ' '}</span>}
        <span>{seconds} second{seconds !== 1 ? 's' : ''}</span> */}
            </div>
        );
    } else {
        return (
            <div>
                {hours > 0 && hours}
                {hours > 0 && "hr"}
                {hours > 1 ? "s " : " "}
                {minutes > 0 && minutes}
                {minutes > 0 && "min"}
                {minutes > 1 ? "s " : " "}
                {seconds > 0 && seconds}
                {seconds > 0 && "sec"}
                {seconds > 1 ? "s" : ""}
            </div>
        );
    }
}

export default CountdownTimer;
