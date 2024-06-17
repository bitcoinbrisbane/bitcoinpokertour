"use client";
import { useState, useEffect } from "react";

interface CountdownState {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }

  const useCountdown = (targetDate: Date): CountdownState => {
    const [countdown, setCountdown] = useState<CountdownState>({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        const now = new Date();
        const delta = targetDate.getTime() - now.getTime();
  
        if (delta < 0) {
          clearInterval(intervalId);
          return;
        }
  
        const days = Math.floor(delta / (1000 * 60 * 60 * 24));
        const hours = Math.floor((delta % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((delta % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((delta % (1000 * 60)) / 1000);
  
        setCountdown({ days, hours, minutes, seconds });
      }, 1000);
  
      return () => clearInterval(intervalId);
    }, [targetDate]);
  
    return countdown;
  };

const Countdown = () => {
    const targetDate = new Date('2024-06-30T23:59:59Z')
     
    if (isNaN(targetDate.getTime())) {
      throw new Error('Invalid target date');
     }

    const { days, hours, minutes, seconds } = useCountdown(targetDate);

    return (
        <div className="h-1/4 sm:w-full md:w-5/6 text-center border-y-2 border-black  mt-5">
            <ul id="countdownul" className="justify-items-center ">
                <li id="days">
                    <div className="number">{days}</div>
                    <div className="label">Days</div>
                </li>
                <li id="hours">
                    <div className="number">{hours}</div>
                    <div className="label">Hours</div>
                </li>
                <li id="minutes">
                    <div className="number">{minutes}</div>
                    <div className="label">Minutes</div>
                </li>
                <li id="seconds">
                    <div className="number">{seconds}</div>
                    <div className="label">Seconds</div>
                </li>
            </ul>
        </div>
    )
}

export default Countdown;