import { useState } from 'react';
import styles from './SavedRecipes.module.css';
import { SavedMeal } from './TopOfApp';

export default function SavedRecipes ({ savedMeals, setSavedMeals }: { savedMeals: SavedMeal[], setSavedMeals: React.Dispatch<React.SetStateAction<SavedMeal[]>> }) {

    const [mealDetailsAreShown, setMealDetailsAreShown] = useState(false);
    const [clickedMealIndex, setClickedMealIndex] = useState<number>(0);
    const [healthRating, setHealthRating] = useState<number | null>(null);
    const [priceRating, setPriceRating] = useState<number | null>(null);
    const [sortBy, setSortBy] = useState<string>('');
    const [isEditing, setIsEditing] = useState(false);
    const [editingMealRecipe, setEditingMealRecipe] = useState<string>('');
    const [searchText, setSearchText] = useState('');

    function showMealDetails(mealIndex: number) {
        setMealDetailsAreShown(true);
        setClickedMealIndex(mealIndex);
        setHealthRating(savedMeals[mealIndex].healthRating ?? null);
        setPriceRating(savedMeals[mealIndex].priceRating ?? null);
    }
    function exitMealDetails() {
        setMealDetailsAreShown(false);
        setIsEditing(false);
    }
    function handleRatingChange (e: React.ChangeEvent<HTMLInputElement>) {
        const { id, value } = e.target;
        const numericValue = value === '' ? null : parseInt(value, 10);

        switch (id) {
            case 'healthRating':
                setHealthRating(numericValue);
                break;
            case 'priceRating':
                setPriceRating(numericValue);
                break;
        }
    }
    function handleRatingSubmit (e: React.FormEvent<HTMLFormElement>, ratedMealIndex: number) {
        e.preventDefault();

        setSavedMeals((prev: SavedMeal[]) => (
            prev.map((meal:SavedMeal, index:number) => (
                ratedMealIndex === index ? 
                    {...meal, 
                    healthRating: healthRating, 
                    priceRating: priceRating} :
                    meal
            ))
        ))

        setHealthRating(null);
        setPriceRating(null);
        exitMealDetails();
    }
    function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const sortByValue = e.target.value;
        setSortBy(sortByValue);

        const sortedMeals = [...savedMeals]; // Copy the array to avoid mutating the original

        if (sortByValue === 'price') {
            // Sort by price
            sortedMeals.sort((a, b) => {
                if (a.priceRating === null || b.priceRating === null) {
                    return a.priceRating === null ? 1 : -1; // Move null values to the end
                }
                return a.priceRating - b.priceRating; // Sort ascending by price
            });
        } else if (sortByValue === 'health') {
            // Sort by health rating
            sortedMeals.sort((a, b) => {
                if (a.healthRating === null || b.healthRating === null) {
                    return a.healthRating === null ? 1 : -1; // Move null values to the end
                }
                return b.healthRating - a.healthRating; // Sort descending by health
            });
        }

        setSavedMeals(sortedMeals); // Set the sorted meals
    }
    function handleRecipeEdit(oldRecipeText: string) {
        setIsEditing(true);
        setEditingMealRecipe(oldRecipeText);
    }
    function handleEditChange (e: React.ChangeEvent<HTMLTextAreaElement>) {
        const { id, value } = e.target;

        switch (id) {
            case 'editingMealRecipe':
                setEditingMealRecipe(value);
                break;
        }
    }
    function saveRecipeEdit(editingMealIndex:number) {
        setSavedMeals((prev:SavedMeal[]) => (
            prev.map((meal, index) => (
                index === editingMealIndex ? {...meal, mealRecipe: editingMealRecipe}
                : meal
            ))
        ))
        
        setIsEditing(false);
    }

    const filteredMeals = savedMeals.filter((meal) => 
        meal.mealName.toLowerCase().includes(searchText.toLocaleLowerCase())
    );


    return (
        <section id={styles.savedRecipesSection}>
            <div className={styles.accordion}>
                <div className={styles.colorCodeHeading}>
                    <div className={styles.colorCode}></div>
                    <h1 className={styles.heading}>Saved Recipes</h1>
                </div>
                <div className={styles.visibleAccordion}>
                    <div className={styles.sortAndSearch}>
                        <label htmlFor="sort">
                            <select 
                                name="sort" 
                                id="sort"
                                onChange={handleSortChange}
                            >
                                <option value="" disabled selected>Sort?</option>
                                <option value="price">Cheap to expensive</option>
                                <option value="health">Healthy to unhealthy</option>
                            </select>
                        </label>
                        <label htmlFor="search">
                            <input 
                                type="search"
                                placeholder='search'
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            />
                        </label>
                    </div>
                    <ol>
                        {/* Render saved meals list */}
                        { 
                            filteredMeals.length > 0 ?
                                filteredMeals.map((savedMeal:SavedMeal, index:number) => (
                                    <li onClick={() => showMealDetails(index)}>
                                        <p>{savedMeal.mealName}</p>
                                        <img src="recipeIcon.svg" alt="See saved meal" />
                                    </li>
                                )) :
                                <p>No meals...</p> 
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
                            {
                                isEditing ? (
                                    <div className={styles.editingTextArea}>
                                        <textarea 
                                            id='editingMealRecipe'
                                            value={editingMealRecipe}
                                            onChange={handleEditChange}
                                        >
                                                {editingMealRecipe}
                                        </textarea>
                                        <button onClick={() => saveRecipeEdit(clickedMealIndex)}>Save edit</button>
                                    </div>
                                ) : (
                                    <div className={styles.recipeField}>
                                        <pre>{savedMeals[clickedMealIndex].mealRecipe}</pre>
                                        <button onClick={() => handleRecipeEdit(savedMeals[clickedMealIndex].mealRecipe)}>Edit</button>
                                    </div>
                                )
                            }
                        </div>
                        <form id={styles.ratingContainer} onSubmit={(e) => handleRatingSubmit(e, clickedMealIndex)}>
                            <label className={styles.healthRating} htmlFor="healthRating">
                                How healthy is this meal? (1-10)
                                <input 
                                    type="number" 
                                    name="healthRating" 
                                    id="healthRating" 
                                    min={1} max={10}
                                    onChange={handleRatingChange}
                                    value={healthRating ?? ''}
                                />
                            </label>
                            <label className={styles.priceRating} htmlFor="priceRating">
                                How expensive is this meal in your own curency?
                                <input 
                                    type="number" 
                                    name="priceRating" 
                                    id="priceRating"
                                    onChange={handleRatingChange}
                                    value={priceRating ?? ''}
                                />
                            </label>
                            <button type='submit' className={styles.doneMealDetails}>
                                <p>Done</p>
                            </button>
                        </form>

                        <div className={styles.exitMealDetails} onClick={exitMealDetails}></div>
                    </div>
                )
            }
        </section>
    )
}