import { useState } from 'react';
import styles from './SavedRecipes.module.css';
import { SavedMeal } from './TopOfApp';

export default function SavedRecipes ({ savedMeals, setSavedMeals }) {

    const [accordion, setAccordion] = useState(true);
    const [mealDetailsAreShown, setMealDetailsAreShown] = useState(false);
    const [clickedMealIndex, setClickedMealIndex] = useState<number>(0);

    function toggleAccordion() {
        if (accordion === true) {
            setAccordion(false);
        } else if (accordion === false) {
            setAccordion(true);
        }
    }
    function showMealDetails(mealIndex: number) {
        setMealDetailsAreShown(true);
        setClickedMealIndex(mealIndex);
    }
    function exitMealDetails() {
        setMealDetailsAreShown(false);
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
                        { 
                            savedMeals.length > 0 ?
                                savedMeals.map((savedMeal:SavedMeal, index:number) => (
                                    <li onClick={() => showMealDetails(index)}>
                                        <p>{savedMeal.mealName}</p>
                                        <img src="recipeIcon.svg" alt="See saved meal" />
                                    </li>
                                )) :
                                <p>You have no saved meals yet...</p> 
                        }
                    </ol>
                </div>
            </div>

            {/* MEAL DETAILS ON CLICK */}
            {
                mealDetailsAreShown && (
                    <div className={styles.savedMealDetails}>
                        <p className={styles.recipeName}>{savedMeals[clickedMealIndex].mealName}</p>
                        <div className={styles.recipeContainer}>
                            <p className={styles.recipeHeading}>Recipe:</p>
                            <pre>{savedMeals[clickedMealIndex].mealRecipe}</pre>
                        </div>
                        <div id={styles.ratingContainer}>
                            <label className={styles.healthRating} htmlFor="healthRating">
                                How healthy is this meal? (1-10)
                                <input type="number" name="healthRating" id="healthRating" min={1} max={10} />
                            </label>
                            <label className={styles.priceRating} htmlFor="priceRating">
                                How expensive is this meal in your own curency?
                                <input type="number" name="priceRating" id="priceRating" />
                            </label>
                        </div>
                        <div className={styles.doneMealDetails} onClick={exitMealDetails}>
                            <p>Done</p>
                        </div>

                        <div className={styles.exitMealDetails} onClick={exitMealDetails}></div>
                    </div>
                )
            }
        </section>
    )
}