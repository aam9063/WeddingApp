'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { marcellus } from '@/styles/fonts';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

const Countdown: React.FC = () => {
    const t = useTranslations('IndexPage');
    const weddingDate = new Date('2026-05-02T17:30:00');

    const calculateTimeLeft = (): TimeLeft => {
        const difference = weddingDate.getTime() - new Date().getTime();

        if (difference > 0) {
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }

        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="countdown-container w-full py-12 bg-white">
            <div className="container max-w-[1200px] mx-auto px-4 md:px-5">
                <h3
                    style={marcellus.style}
                    className="text-xl md:text-3xl text-center mb-8 md:mb-12 text-[#545748]"
                >
                    {t('countdown.title')}
                </h3>
                
                <div className="countdown-timer flex justify-center items-start gap-4 md:gap-12 lg:gap-20">
                    <div className="countdown-item flex flex-col items-center">
                        <span 
                            style={marcellus.style}
                            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#545748]"
                        >
                            {timeLeft.days}
                        </span>
                        <span className="countdown-label mt-2 md:mt-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-[#A0A48E] font-light">
                            {t('countdown.days')}
                        </span>
                    </div>
    
                    <div className="countdown-item flex flex-col items-center">
                        <span 
                            style={marcellus.style}
                            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#545748]"
                        >
                            {timeLeft.hours}
                        </span>
                        <span className="countdown-label mt-2 md:mt-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-[#A0A48E] font-light">
                            {t('countdown.hours')}
                        </span>
                    </div>
    
                    <div className="countdown-item flex flex-col items-center">
                        <span 
                            style={marcellus.style}
                            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#545748]"
                        >
                            {timeLeft.minutes}
                        </span>
                        <span className="countdown-label mt-2 md:mt-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-[#A0A48E] font-light">
                            {t('countdown.minutes')}
                        </span>
                    </div>
    
                    <div className="countdown-item flex flex-col items-center">
                        <span 
                            style={marcellus.style}
                            className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-[#545748]"
                        >
                            {timeLeft.seconds}
                        </span>
                        <span className="countdown-label mt-2 md:mt-4 text-[10px] sm:text-xs md:text-sm uppercase tracking-wider md:tracking-widest text-[#A0A48E] font-light">
                            {t('countdown.seconds')}
                        </span>
                    </div>
                </div>
    
                <p className="text-center mt-8 md:mt-12 text-[#545748] italic text-xs sm:text-sm md:text-base px-4">
                    {t('countdown.subtitle')}
                </p>
            </div>
        </div>
    );
};

export default Countdown;