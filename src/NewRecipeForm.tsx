import { useState } from 'react';
import styles from './NewRecipeForm.module.css'

interface NewRecipeFormProps {
    heading: string,
    inputId: string,
    inputPlaceholder: string,
    textareaId: string,
    textareaPlaceholder: string,
    buttonText: string,
    activeButton?: string
}

export default function NewRecipeForm ({ heading, inputId, inputPlaceholder, textareaId, textareaPlaceholder, buttonText, activeButton }: NewRecipeFormProps) {

    const [accordion, setAccordion] = useState(false);

    function toggleAccordion() {
        if (accordion === true) {
            setAccordion(false);
        } else if (accordion === false) {
            setAccordion(true);
        }
    }

    return (
        <section>
            {/* FORM */}
            <form id={styles.newRecipeForm}>
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
                                required
                            />
                        </label>
                        <label htmlFor={textareaId}>
                            <textarea
                                id={textareaId}
                                placeholder={textareaPlaceholder}
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
                            <img className={accordion === false ? styles.flippedArrow : ''} src="arrow.svg" alt="arrow" />
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