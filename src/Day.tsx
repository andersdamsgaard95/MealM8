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
    const [newStartTime, setNewStartTime] = useState<string>('');
    const [newEndTime, setNewEndTime] = useState<string>('');
    const [pickingList, setPickingList] = useState('');
    const [clickedEventIndex, setClickedEventIndex] = useState<number | null>(null);
    const [eventListIsShown, setEventListIsShown] = useState(false);
    const [eventListItemEditIndex, setEventListItemEditIndex] = useState<number | null>(null);
    const [editingListItemName, setEditingListItemName] = useState('');
    const [editingListItemDescription, setEditingListItemDescription] = useState('');
    const [noteEditingIndex, setNoteEditingIndex] = useState<number | null>(null);
    const [newNote, setNewNote] = useState<string>('');

    function addItemToCalender(colorCode:string) {
        setCalender((prev) => [
            ...prev,
            {
                colorCode: colorCode,
                startTime: 'Add start time',
                endTime: 'Add end time',
                note: '',
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

    function pickActivity(clickedEvent:number) {
        setClickedEventIndex(clickedEvent)
        setPickingList('activity');
    }

    function pickMeal(clickedEvent:number) {
        setClickedEventIndex(clickedEvent)
        setPickingList('meal');
    }

    function exitPickingList() {
        setPickingList('');
    }

    function choseFromPickingList(pickedIndex:number) {
        if (pickingList === 'meal') {
            setCalender((prev) => (
                prev.map((item, index) => (
                    index === clickedEventIndex ? 
                    {
                        ...item,
                        calenderItemList: [
                            ...item.calenderItemList,
                            {
                                name: savedMeals[pickedIndex].mealName,
                                description: savedMeals[pickedIndex].mealRecipe
                            }
                        ]
                    } : item
                ))
            ))
        } else if (pickingList === 'activity') {
            setCalender((prev) => (
                prev.map((item, index) => (
                    index === clickedEventIndex ? 
                    {
                        ...item,
                        calenderItemList: [
                            ...item.calenderItemList,
                            {
                                name: savedActivitiesList[pickedIndex].activityName,
                                description: savedActivitiesList[pickedIndex].activityDescription
                            }
                        ]
                    } : item
                ))
            ))
        }
        setPickingList('');
        setClickedEventIndex(null);
    }

    function showEventList(clickedIndex:number) {
        setClickedEventIndex(clickedIndex);
        setEventListIsShown(true);
    }

    function exitEventList() {
        setEventListIsShown(false);
        setClickedEventIndex(null);
    }

    function editEventListItem(editetIndex:number, oldName:string, oldDescription:string) {
        setEventListItemEditIndex(editetIndex);
        setEditingListItemName(oldName);
        setEditingListItemDescription(oldDescription);
    }

    function handleEdit(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;

        switch (id) {
            case 'editingName':
                setEditingListItemName(value);
                break;
            case 'editingDescription':
                setEditingListItemDescription(value);
                break;
        }
    }

    function saveListItemEdit(editedIndex:number) {
        setCalender((prev) => {
            // Create a new array for calender
            const updatedCalender = prev.map((item, index) => {
                if (index === clickedEventIndex) {
                    // Create a new calenderItemList for the specific item
                    const updatedCalenderItemList = item.calenderItemList.map((listItem, listIndex) => 
                        listIndex === editedIndex
                            ? { name: editingListItemName, description: editingListItemDescription }
                            : listItem
                    );
    
                    // Return the updated item
                    return { ...item, calenderItemList: updatedCalenderItemList };
                } else {
                    return item;
                }
                
            });
            return updatedCalender;
        });
    
        setEventListItemEditIndex(null);
        setEditingListItemName('');
        setEditingListItemDescription('');
    }

    function deleteEventListItem(indexToDelete:number) {
        const deleteEventListItemConfirmation = window.confirm('Sure you want to delete this?');

        if (deleteEventListItemConfirmation) {
            setCalender((prev) => {
                const updatedCalender = prev.map((item, index) => {
                    if (index === clickedEventIndex) {
                        const updatedCalenderItemList = item.calenderItemList.filter((_, index) => 
                            index !== indexToDelete
                        )
                        return {...item, calenderItemList: updatedCalenderItemList};
                    } else {
                        return item;
                    }
                })
                return updatedCalender;
            })
        }
    }

    function deleteEvent(eventToDelete:number) {
        const deleteEventConfirmation = window.confirm('Sure you want to delete this event?');

        if (deleteEventConfirmation) {
            setCalender((prev) => 
            prev.filter((_, index) => 
                index !== eventToDelete
            )
        )
        }
    }

    function editNote(editingIndex:number) {
        setNoteEditingIndex(editingIndex);
        setNewNote(calender[editingIndex].note)
    }
    
    function handleEditNote(e: React.ChangeEvent<HTMLTextAreaElement>) {
        setNewNote(e.target.value);
    }

    function saveNote(indexToSaveNote:number) {
        setCalender((prev) => 
            prev.map((item, index) => 
                index === indexToSaveNote ? 
                    {
                        ...item,
                        note: newNote
                    }
                : item
            )
        )
        setNoteEditingIndex(null);
        setNewNote('');    
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

                                            {/* NOTE */}
                                            
                                                <div className={styles.noteAccordion}>
                                                    <div className={styles.addNoteButton} onClick={() => (noteEditingIndex === index ? saveNote(index) : editNote(index))}>
                                                        <p>Note</p>
                                                        <img 
                                                            src="arrow.svg" 
                                                            alt="Open note" 
                                                            className={`${styles.arrow} ${noteEditingIndex === index ? styles.flippedArrow : ''}`} 
                                                        />
                                                    </div>

                                                    {
                                                        noteEditingIndex === index && (
                                                            <label className={styles.editingNote} htmlFor="calenderItemNote">
                                                                <textarea
                                                                    className={styles.calenderItemNote}
                                                                    id='calenderItemNote' 
                                                                    value={newNote}
                                                                    placeholder='add note'
                                                                    onChange={handleEditNote}
                                                                >
                                                                </textarea>
                                                            </label>
                                                        )
                                                    }
                                                </div>   
                                            
                                            
                                            {/* BUTTONS */}
                                            <div className={styles.eventButtons}>
                                                <img 
                                                    src="plusIcon.svg" 
                                                    alt="add recipe or activity to event"
                                                    onClick={calenderItem.colorCode === colorCodes.activity ? () => pickActivity(index) : () => pickMeal(index)}
                                                />
                                                <img 
                                                    src="recipeIcon.svg" 
                                                    alt="see recipies or activities attached to this event"
                                                    onClick={() => showEventList(index)} 
                                                />
                                            </div>

                                            {/* DELETE BUTTON */}
                                            <div className={styles.deleteEventButton} onClick={() => deleteEvent(index)}>
                                                <img src="trash.svg" alt="delete event" />
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
                            handleClick={choseFromPickingList}
                            savedMeals={savedMeals}
                            savedActivitiesList={savedActivitiesList}
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
                            handleClick={choseFromPickingList}
                            savedMeals={savedMeals}
                            savedActivitiesList={savedActivitiesList}
                        />
                    ) : null
                }

                {/* EVENT LIST BEING SHOWN */}
                {
                    eventListIsShown && (
                        <div className={styles.fixedEventList}>
                            <ul>
                                {
                                    calender[clickedEventIndex].calenderItemList.length > 0 ?
                                        calender[clickedEventIndex].calenderItemList.map((item, index) => (
                                            index === eventListItemEditIndex ? 
                                            (
                                                <li>
                                                    <label htmlFor="editingName">
                                                        <input 
                                                            type="text"
                                                            id='editingName'
                                                            value={editingListItemName}
                                                            onChange={handleEdit} 
                                                        />
                                                    </label>
                                                    <label htmlFor="editingDescription">
                                                        <textarea 
                                                            id="editingDescription"
                                                            value={editingListItemDescription}
                                                            onChange={handleEdit}
                                                        >                                                          
                                                        </textarea>
                                                    </label>
                                                    <button onClick={() => saveListItemEdit(index)}>Save Edit</button>
                                                </li>
                                            ) 
                                            : 
                                            (
                                                <li>
                                                    <p>{item.name}</p>
                                                    <pre>{item.description}</pre>
                                                    <div className={styles.buttonContainer}>
                                                        <button onClick={() => editEventListItem(index, item.name, item.description)}>Edit</button>
                                                        <button onClick={() => deleteEventListItem(index)}>Delete</button>
                                                    </div>
                                                </li>
                                            )
                                        ))
                                    : 
                                        <p>You haven't attached anything to this event...</p>
                                }
                            </ul>
                            <div className={styles.exitButton} onClick={exitEventList}>
                                <img src="x.svg" alt="exit" />
                            </div>
                        </div>
                    )
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