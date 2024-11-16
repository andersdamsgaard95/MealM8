import { useState } from 'react';
import styles from './SavedRecipes.module.css';
import { SavedMeal } from './TopOfApp';

export default function SavedRecipes ({ savedMeals }) {

    const [accordion, setAccordion] = useState(true);

    function toggleAccordion() {
        if (accordion === true) {
            setAccordion(false);
        } else if (accordion === false) {
            setAccordion(true);
        }
    }

    return (
        <section id={styles.savedRecipesSection}>
            <div className={styles.accordion}>
                <div onClick={toggleAccordion} className={styles.colorCodeHeading}>
                    <div className={styles.colorCode}></div>
                    <h1 className={styles.heading}>Saved Recipes</h1>
                    <img className={accordion === false ? styles.flippedArrow : ''} src="arrowUp.svg" alt="arrow" />
                </div>
                <div className={`${styles.visibleAccordion} ${accordion === false ? styles.hidden : styles.visible}`}>
                    <div className={styles.sortAndSearch}>
                        <label htmlFor="sort">
                            <select 
                                name="sort" 
                                id="sort"
                            >
                                <option value="" disabled selected>Sort?</option>
                                <option value="price">Cheapest</option>
                                <option value="health">Healthiest</option>
                            </select>
                        </label>
                        <label htmlFor="search">
                            <input 
                                type="search"
                                placeholder='search'
                            />
                        </label>
                    </div>
                    <ol>
                        {/* Render saved meals list */}
                        {savedMeals.map((savedMeal:SavedMeal, index:number) => (
                            <li key={index}>
                                <p>{savedMeal.mealName}</p>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        </section>
    )
}