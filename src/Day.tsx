import { useState } from 'react';
import styles from './Day.module.css';
import PickingList from './PickingList';
import { SavedMeal, SavedActivity } from './TopOfApp';

interface DayComponentProps {
    day: string;
    goToNextDay: () => void;
    goToPreviousDay: () => void;
    calender: CalenderItem[] | [];
    setCalender: React.Dispatch<React.SetStateAction<CalenderItem[]>>,
    savedMeals: SavedMeal[],
    savedActivitiesList: SavedActivity[];
}

const colorCodes = {
        mealTime: '#DAAE9C',
        prepTime: '#88C4E8',
        shopping: '#DAD09C',
        activity: '#000000'
}

export interface CalenderItem {
    colorCode: string;
    startTime: string,
    endTime: string,
    note: string,
    calenderItemList: CalenderItemListItem[] | [];
}

export interface CalenderItemListItem {
    name: string,
    description: string
}

export default function Day ({ 
    day, 
    goToNextDay, 
    goToPreviousDay,
    calender,
    setCalender,
    savedMeals,
    savedActivitiesList 
    }:DayComponentProps) {

    //  STATE VARIABLES
    const [timeEditingIndex, setTimeEditingIndex] = useState<number | null>(null);
    //const [noteIsBeingEdited, setNoteIsBeingEdited] = useState(false);
    const [newStartTime, setNewStartTime] = useState<string>('');
    const [newEndTime, setNewEndTime] = useState<string>('');
    const [pickingList, setPickingList] = useState('');
    //const [newEventNote, setNewEventNote] = useState<string>('');

    function addItemToCalender(colorCode:string) {
        setCalender((prev) => [
            ...prev,
            {
                colorCode: colorCode,
                startTime: 'Add start time',
                endTime: 'Add end time',
                note: 'Add note',
                calenderItemList: []
            }
        ])
    }

    function editTime (oldStartTime:string, oldEndTime:string, timeEditingIndex:number) {
        setTimeEditingIndex(timeEditingIndex);
        setNewStartTime(oldStartTime);
        setNewEndTime(oldEndTime);
    }

    function handleTimeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;

        switch (id) {
            case 'startTime':
                setNewStartTime(value);
                break;
            case 'endTime':
                setNewEndTime(value);
                break;
        }
    }

    function saveTimeEdit (savedTimeIndex:number) {
        setCalender((prev) => {
            const updatedCalender = prev.map((item, index) =>
                index === savedTimeIndex ? 
                { ...item, startTime: newStartTime, endTime: newEndTime }
                : item
            );
    
            // Sort by startTime in ascending order
            updatedCalender.sort((a, b) => (a.startTime > b.startTime ? 1 : -1));
    
            return updatedCalender;
        });
    
        setNewStartTime('');
        setNewEndTime('');
        setTimeEditingIndex(null);
    }

    function pickActivity(clickedEvent) {
        setPickingList('activity');

    }

    function pickMeal(clickedEvent) {
        setPickingList('meal');
    }

    function exitPickingList() {
        setPickingList('');
    }

    return (
        <section id={styles.day}>
            {/* CALENDER */}
            <div className={styles.calender}>
                {/* RENDER CALENDER HERE */}
                {
                    calender.length > 0 ? (
                        <ul className={styles.calenderFlex}>
                            {
                                calender.map((calenderItem, index) => (
                                        <li className={styles.calenderItem}>
        
                                            <div className={styles.colorCode} style={{backgroundColor: calenderItem.colorCode}}></div>

                                            {/*  TIME INPUTS */}
                                            {
                                                timeEditingIndex === index ? (
                                                    <div className={styles.editingTimeInputs}>
                                                        <div className={styles.timeInputs}>
                                                            <label htmlFor="startTime">
                                                                <input 
                                                                    className={styles.timeInput} 
                                                                    type="time" name="startTime" 
                                                                    id="startTime"
                                                                    onChange={handleTimeChange} 
                                                                    value={newStartTime}
                                                                />
                                                            </label>
                                                            <label htmlFor="endTime">
                                                                <input 
                                                                    className={styles.timeInput} 
                                                                    type="time" name="endTime" 
                                                                    id="endTime"
                                                                    onChange={handleTimeChange}
                                                                    value={newEndTime}
                                                                />
                                                            </label>
                                                        </div>
                                                        <button className={styles.saveTime} onClick={() => saveTimeEdit(index)}>Save time</button>
                                                    </div>
                                                ) :
                                                <div className={styles.addTimeButton} onClick={() => editTime(calenderItem.startTime, calenderItem.endTime, index)}>
                                                    <p>{calenderItem.startTime}</p>
                                                    <p>{calenderItem.endTime}</p>
                                                </div>
                                            }

                                            <label htmlFor="calenderItemNote">
                                                <input 
                                                    className={styles.calenderItemNote}
                                                    type="text" 
                                                    id='calenderItemNote' 
                                                />
                                            </label>

                                            <div className={styles.eventButtons}>
                                                <img 
                                                    src="plusIcon.svg" 
                                                    alt="add recipe or activity to event"
                                                    onClick={calenderItem.colorCode === colorCodes.activity ? () => pickActivity(index) : () => pickMeal(index)}
                                                />
                                                <img 
                                                    src="recipeIcon.svg" 
                                                    alt="see recipies or activities attached to this event" 
                                                />
                                            </div>

                                        </li>
                                    ))
                            }
                        </ul>
                    ) :
                    <p>Your calender is empty...</p>
                }

                {/* MEAL OR ACTIVITY BEING PICKED */}
                {
                    pickingList === 'activity' && savedActivitiesList ? (
                        <PickingList
                            backgroundColor={'#DFF1F4'}
                            colorCode='#000000'
                            heading='Add an activity to this event'
                            colorCodeHeading='Saved Activities'
                            exitPickingList={exitPickingList}
                            pickingList={savedActivitiesList}
                            listType={'activities'}
                        /> 
                    )
                    :
                    pickingList === 'meal' && savedMeals ? (
                        <PickingList 
                            backgroundColor={'#9CDAA0'}
                            colorCode='#9CDAA0'
                            heading='Add a recipe to this event'
                            colorCodeHeading='Saved Recipes'
                            exitPickingList={exitPickingList}
                            pickingList={savedMeals}
                            listType='meals'
                        />
                    ) : null
                }
            </div>

            {/* ADD EVENT TO CALENDER BUTTON */}
            <div className={styles.addEventButtons}>
                <button onClick={() => addItemToCalender(colorCodes.mealTime)}>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.mealTime }}></div>
                    Create new meal time
                </button>
                <button onClick={() => addItemToCalender(colorCodes.prepTime)}>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.prepTime }}></div>
                    Create new prep time
                </button>
                <button onClick={() => addItemToCalender(colorCodes.shopping)}>
                    <div className={styles.colorCode} style={{ backgroundColor: colorCodes.shopping }}></div>
                    Create new shopping
                </button>
                <button onClick={() => addItemToCalender(colorCodes.activity)}>
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