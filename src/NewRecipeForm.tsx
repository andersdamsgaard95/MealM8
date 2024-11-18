import { useState } from 'react';
import styles from './NewRecipeForm.module.css';
import { SavedMeal } from './TopOfApp';

interface NewRecipeFormProps {
    heading: string,
    inputId: string,
    inputPlaceholder: string,
    textareaId: string,
    textareaPlaceholder: string,
    buttonText: string,
    activeButton?: string,
    setSavedList?: React.Dispatch<React.SetStateAction<SavedMeal[]>>;
}

export default function NewRecipeForm ({ heading, inputId, inputPlaceholder, textareaId, textareaPlaceholder, buttonText, activeButton, setSavedList }: NewRecipeFormProps) {

    const [accordion, setAccordion] = useState(false);
    const [newMealName, setNewMealName] = useState('');
    const [newMealRecipe, setNewMealRecipe] = useState('');

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
        }
    } 

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setSavedList((prev) => [
            ...prev,
            {
                mealName: newMealName,
                mealRecipe: newMealRecipe
            }
        ])
        setNewMealName('');
        setNewMealRecipe('');
    }

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
                                value={newMealName}
                                required
                            />
                        </label>
                        <label htmlFor={textareaId}>
                            <textarea
                                id={textareaId}
                                placeholder={textareaPlaceholder}
                                onChange={handleChange}
                                value={newMealRecipe}
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
                            <h2 className={styles.heading}>saved activities</h2>
                            <img className={accordion === true ? styles.flippedArrow : ''} src="arrow.svg" alt="arrow" />
                        </div>
                        <div className={`${styles.savedActivitiesAccordionHidden} ${accordion === false ? styles.hidden : accordion === true ? styles.visible : ''}`}>
                            <label htmlFor="activitySearch">
                                <input 
                                    type="search"
                                    id='activitySearch'
                                    placeholder='search...'
                                />
                            </label>
                            <ol>
                                <p>You have no saved activities yet...</p>
                                {/* RENDER ACTIVITY LIST HERE */}
                            </ol>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}