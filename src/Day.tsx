//import { useState } from 'react';
import styles from './Day.module.css';

interface dayComponentProps {
    day: string;
    goToNextDay: () => void;
    goToPreviousDay: () => void;
}

const colorCodes = {
        mealTime: '#DAAE9C',
        prepTime: '#88C4E8',
        shopping: '#DAD09C',
        activity: '#000000'
}

export default function Day ({ day, goToNextDay, goToPreviousDay }:dayComponentProps) {

    return (
        <section id={styles.day}>
            {/* CALENDER */}
            <div className={styles.calender}>
                <p>Your calender is empty...</p>
                {/* RENDER CALENDER HERE */}
            </div>

            {/* ADD EVENT TO CALENDER BUTTON */}
            <div className={styles.addEventButtons}>
                <button>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.mealTime }}></div>
                    Create new meal time
                </button>
                <button>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.prepTime }}></div>
                    Create new prep time
                </button>
                <button>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.shopping }}></div>
                    Create new shopping
                </button>
                <button>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.activity }}></div>
                    Create new activity
                </button>
            </div>

            {/* DAY BUTTON */}
            <div className={styles.dayButton}>
                <button onClick={goToPreviousDay}>
                    <img src="dayArrowLeft.svg" alt="arrow left" />
                </button>
                <h2>{day}</h2>
                <button onClick={goToNextDay}>
                    <img src="dayArrowRight.svg" alt="arrow right" />
                </button>
            </div>
        </section>
    )
}