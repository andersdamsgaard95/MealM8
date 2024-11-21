import { useState } from 'react';
import styles from './NewRecipeForm.module.css';
import { SavedMeal, SavedActivity } from './TopOfApp';

interface NewRecipeFormProps {
    heading: string,
    inputId: string,
    inputPlaceholder: string,
    textareaId: string,
    textareaPlaceholder: string,
    inputValue: string,
    textareaValue: string,
    buttonText: string,
    activeButton?: string,
    setSavedList: React.Dispatch<React.SetStateAction<SavedMeal[]>>;
    newMealName:string;
    setNewMealName: React.Dispatch<React.SetStateAction<string>>;
    newMealRecipe: string;
    setNewMealRecipe: React.Dispatch<React.SetStateAction<string>>;
    newActivityName: string,
    setNewActivityName: React.Dispatch<React.SetStateAction<string>>;
    newActivityDescription: string;
    setNewActivityDescription: React.Dispatch<React.SetStateAction<string>>;
    savedActivitiesList: SavedActivity[];
    setSavedActivitiesList: React.Dispatch<React.SetStateAction<SavedActivity[]>>;
    activeForm: string;
}


export default function NewRecipeForm ({ 
    heading, 
    inputId, 
    inputPlaceholder, 
    textareaId, 
    textareaPlaceholder, 
    inputValue, 
    textareaValue, 
    buttonText, 
    activeButton, 
    setSavedList, 
    newMealName, 
    setNewMealName, 
    newMealRecipe, 
    setNewMealRecipe, 
    newActivityName, 
    setNewActivityName, 
    newActivityDescription, 
    setNewActivityDescription,
    savedActivitiesList,
    setSavedActivitiesList, 
    activeForm}: NewRecipeFormProps) {

    const [accordion, setAccordion] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [activityDetailsAreShown, setActivityDetailsAreShown] = useState(false);
    const [clickedActivityIndex, setClickedActivityIndex] = useState(0);
    const [activityIsBeingEdited, setActivityIsBeingEdited] = useState(false);
    const [editingActivityName, setEditingActivityName] = useState('');
    const [editingActivityDescription, setEditingActivityDescription] = useState('');
    const [toast, setToast] = useState(false);

    function toggleAccordion() {
        if (accordion === true) {
            setAccordion(false);
        } else if (accordion === false) {
            setAccordion(true);
        }
    }

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = event.target;

        switch (id) {
            case 'mealName':
                setNewMealName(value);
                break;
            case 'mealRecipe':
                setNewMealRecipe(value);
                break;
            case 'activityName':
                setNewActivityName(value);
                break;
            case 'activityDescription':
                setNewActivityDescription(value);
                break;
        }
    } 

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (activeForm === 'recipe') {
            setSavedList((prev) => [
                ...prev,
                {
                    mealName: newMealName,
                    mealRecipe: newMealRecipe
                }
            ])
            setNewMealName('');
            setNewMealRecipe('');
        } else if (activeForm === 'life') {
            setSavedActivitiesList((prev) => [
                ...prev,
                {
                    activityName: newActivityName,
                    activityDescription: newActivityDescription
                }
            ])
            setNewActivityName('');
            setNewActivityDescription('');
        }

        setToast(true);
        setTimeout(() => setToast(false), 3000);
    }

    function showActivityDetails(index:number) {
        setActivityDetailsAreShown(true);
        const actualIndex = savedActivitiesList.findIndex((activity) => activity === filteredActivities[index]);
        setClickedActivityIndex(actualIndex);
    }

    function handleActivityEdit(oldActivityName:string, oldActivityDescription:string) {
        setActivityIsBeingEdited(true);
        setEditingActivityName(oldActivityName);
        setEditingActivityDescription(oldActivityDescription);
    }

    function handleEditChange(e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { id, value } = e.target;

        switch (id) {
            case 'activityName':
                setEditingActivityName(value);
                break;
            case 'activityDescription':
                setEditingActivityDescription(value);
                break;
        }
    }

    function saveActivityEdit(editingActivityIndex:number) {
        setActivityIsBeingEdited(false);

        setSavedActivitiesList((prev) => 
        prev.map((activity, index) => (
            index === editingActivityIndex ? 
            {activityName: editingActivityName, activityDescription: editingActivityDescription} 
            : activity)
        ))
    }

    function deleteActivity(activityToDeleteIndex:number) {
        const deleteIsConfirmed = window.confirm('Are you sure you want to delete this activity?');

        if (deleteIsConfirmed) {
            setActivityDetailsAreShown(false);
            setSavedActivitiesList((prev) => (
                prev.filter((_, index) => (
                    index !== activityToDeleteIndex
                ))
            ))
        }
    }

    function exitActivityDetails() {
        setActivityDetailsAreShown(false);
    }

    const filteredActivities = savedActivitiesList?.filter((activity) =>
        activity.activityName.toLowerCase().includes(searchText.toLowerCase()) ||
        activity.activityDescription.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <section>
            {/* FORM */}
            <form id={styles.newRecipeForm} onSubmit={handleSubmit}>
                <div id={styles.formHeadingPlusInputs}>
                    <div className={`${activeButton === 'life' ? styles.colorCodeHeadingLife : styles.colorCodeHeading}`}>
                        <div className={styles.colorCode}></div>
                        <h1 className={styles.heading}>{heading}</h1>
                    </div>
                    <div id={styles.formInputs}>
                        <label htmlFor={inputId}>
                            <input 
                                type="text"
                                id={inputId}
                                placeholder={inputPlaceholder}
                                onChange={handleChange}
                                value={inputValue}
                                required
                            />
                        </label>
                        <label htmlFor={textareaId}>
                            <textarea
                                id={textareaId}
                                placeholder={textareaPlaceholder}
                                onChange={handleChange}
                                value={textareaValue}
                            />
                        </label>
                    </div>
                </div>
                <button type='submit'>
                    {buttonText}
                    <img src="saveRecipeIcon.svg" alt="Save recipe icon" />
                </button>
            </form>

            {/* SAVED ACTIVITIES !ONLY FOR LIFE! */}
            {activeButton === 'life' && (
                <div id={styles.savedActivitiesContainer}>
                    <div className={styles.savedActivitiesAccordion}>
                        <div onClick={toggleAccordion} className={styles.colorCodeHeading}>
                            <div className={styles.colorCode}></div>
                            <h2 className={styles.heading}>Saved activities</h2>
                            <img className={accordion === true ? styles.flippedArrow : ''} src="arrow.svg" alt="arrow" />
                        </div>
                        <div className={`${styles.savedActivitiesAccordionHidden} ${accordion === false ? styles.hidden : accordion === true ? styles.visible : ''}`}>
                            <label htmlFor="activitySearch">
                                <input 
                                    type="search"
                                    id='activitySearch'
                                    placeholder='search...'
                                    onChange={(e) => setSearchText(e.target.value)}
                                    value={searchText}
                                />
                            </label>
                            <ol>
                                {
                                    filteredActivities.length > 0 ? (
                                        filteredActivities.map((activity, index) => (
                                            <li onClick={() => showActivityDetails(index)}>
                                                <p>{activity.activityName}</p>
                                                <img src="recipeIcon.svg" alt="See Activity" /> {/** ÆNDR IMG IKON */}
                                            </li>
                                        ))
                                    ) : 
                                    <p>You have no saved activities yet...</p>
                                }
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {/* ACTIVITY DETAILS ON CLICK */}
            {
                activityDetailsAreShown ? (
                    <div className={styles.savedActivityDetails}>
                        <div className={styles.activityContainer}>
                            {
                                activityIsBeingEdited ? (
                                    <div className={styles.editingTextArea}>
                                            <input 
                                                type="text"
                                                id='activityName'
                                                value={editingActivityName}
                                                onChange={handleEditChange}
                                            />
                                            <textarea 
                                                id='activityDescription'
                                                value={editingActivityDescription}
                                                onChange={handleEditChange}
                                            >
                                                {editingActivityDescription}
                                            </textarea>
                                            <button onClick={() => saveActivityEdit(clickedActivityIndex)}>Save edit</button>
                                        </div>
                                ) :
                                    <div className={styles.notEditingActivity}>
                                    <p className={styles.activityName}>{savedActivitiesList[clickedActivityIndex].activityName}</p>
                                    <pre>{savedActivitiesList[clickedActivityIndex].activityDescription}</pre>
                                    <div className={styles.buttonContainer}>
                                        <button className={styles.editActivityButton} onClick={() => handleActivityEdit(savedActivitiesList[clickedActivityIndex].activityName, savedActivitiesList[clickedActivityIndex].activityDescription)}>Edit</button>
                                        <button className={styles.deleteActivityButton} onClick={() => deleteActivity(clickedActivityIndex)}>Delete</button>
                                    </div>
                            </div>
                                }
                        </div>
                        <div className={styles.exitActivityDetails} onClick={exitActivityDetails}>
                            <img src="x.svg" alt="exit activity" />
                        </div>
                    </div>
                ) : null
            }

            {/* TOAST MESSAGE */}
            {
                toast && (
                    <div className={styles.toastContainer}>
                        <p>You have saved this recipe!</p>
                    </div>
                )
            }

        </section>
    )
}