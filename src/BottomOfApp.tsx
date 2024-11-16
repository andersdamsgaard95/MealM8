import { useState } from 'react';
import styles from './BottomOfApp.module.css';
import Day from './Day';

export default function BottomOfApp () {

    const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [positionX, setPositionX] = useState(0);
    const gap = 10;

    function goToNextDay() {
        setPositionX((prev: number) => (prev + 100) % (days.length * 100));
    }
    function goToPreviousDay() {
        setPositionX((prev: number) => 
            prev === 0 
                ? (days.length - 1) * 100 // Wrap to the last day
                : prev - 100
        );
    }

    const transformationStyle = `translateX(calc(-${positionX}% - ${Math.floor(positionX / 100) * gap}px))`;
    

    return (
        <div id={styles.bottomOfAppBackground}>
            <div id={styles.dayContainer}>
                <div 
                    id={styles.dayCarousel} 
                    style={{transform: transformationStyle}}>
                        {days.map((day, index) => (
                            <Day 
                                day={day} 
                                key={index}
                                goToNextDay={goToNextDay}
                                goToPreviousDay={goToPreviousDay}
                            />
                        ))}
                </div>
            </div>
        </div>
    )
}