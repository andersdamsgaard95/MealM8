import { useState } from 'react';
import styles from './BottomOfApp.module.css';
import Day from './Day';
import { CalenderItem, CalenderItemListItem } from './Day'
import { SavedActivity, SavedMeal } from './TopOfApp';

interface BottomOfAppProps {
    savedMeals: SavedMeal[],
    savedActivitiesList: SavedActivity[]
}

export default function BottomOfApp ({ savedMeals, savedActivitiesList }: BottomOfAppProps) {

    const [currentDayIndex, setCurrentDayIndex] = useState<number>(1);
    const [mondayCalender, setMondayCalender] = useState<CalenderItem[]>([])
    const [tuesdayCalender, setTuesdayCalender] = useState<CalenderItem[]>([])
    const [wednesdayCalender, setWednesdayCalender] = useState<CalenderItem[]>([])
    const [thursdayCalender, setThursdayCalender] = useState<CalenderItem[]>([])
    const [fridayCalender, setFridayCalender] = useState<CalenderItem[]>([])
    const [saturdayCalender, setSaturdayCalender] = useState<CalenderItem[]>([])
    const [sundayCalender, setSundayCalender] = useState<CalenderItem[]>([])

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
                        currentDayIndex === 1 ? 
                            <Day 
                                day={'Monday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay} 
                                calender={mondayCalender}
                                setCalender={setMondayCalender}
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> :
                        
                        currentDayIndex === 2 ? 
                            <Day 
                                day={'Tuesday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay}
                                calender={tuesdayCalender}
                                setCalender={setTuesdayCalender}
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> :

                        currentDayIndex === 3 ? 
                            <Day day={'Wednesday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay} 
                                calender={wednesdayCalender}
                                setCalender={setWednesdayCalender}
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> :

                        currentDayIndex === 4 ? 
                            <Day day={'Thursday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay}
                                calender={thursdayCalender}
                                setCalender={setThursdayCalender}
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> :

                        currentDayIndex === 5 ? 
                            <Day 
                                day={'Friday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay}
                                calender={fridayCalender}
                                setCalender={setFridayCalender} 
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> :

                        currentDayIndex === 6 ? 
                            <Day day={'Saturday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay}
                                calender={saturdayCalender}
                                setCalender={setSaturdayCalender}
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> :

                        currentDayIndex === 7 ? 
                            <Day day={'Sunday'} 
                                goToNextDay={goToNextDay} 
                                goToPreviousDay={goToPreviousDay}
                                calender={sundayCalender}
                                setCalender={setSundayCalender}
                                savedMeals={savedMeals}
                                savedActivitiesList={savedActivitiesList}
                            /> : 

                        null
                    }
                </div>
            </div>
        </div>
    )
}