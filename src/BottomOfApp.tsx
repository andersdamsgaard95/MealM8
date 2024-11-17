import { useState } from 'react';
import styles from './BottomOfApp.module.css';
import Day from './Day';

export default function BottomOfApp () {

    //const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);

    function goToNextDay() {
        if (currentDayIndex === 7) {
            setCurrentDayIndex(1);
        } else {
            setCurrentDayIndex((prev) => prev + 1);
        }
    }
    function goToPreviousDay() {
        if (currentDayIndex === 1) {
            setCurrentDayIndex(7);
        } else {
            setCurrentDayIndex((prev) => prev - 1);
        }
    }

    return (
        <div id={styles.bottomOfAppBackground}>
            <div id={styles.dayBackground}>
                <div id={styles.dayContainer}>
                    {
                        currentDayIndex === 1 ? <Day day={'Monday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> :
                        currentDayIndex === 2 ? <Day day={'Tuesday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> :
                        currentDayIndex === 3 ? <Day day={'Wednesday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> :
                        currentDayIndex === 4 ? <Day day={'Thursday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> :
                        currentDayIndex === 5 ? <Day day={'Friday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> :
                        currentDayIndex === 6 ? <Day day={'Saturday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> :
                        currentDayIndex === 7 ? <Day day={'Sunday'} goToNextDay={goToNextDay} goToPreviousDay={goToPreviousDay} /> : null
                    }
                </div>
            </div>
        </div>
    )
}