import { useState } from 'react'
import styles from './TopOfApp.module.css'
import NewRecipeForm from './NewRecipeForm';
import SavedRecipes from './SavedRecipes';

export interface SavedMeal {
    mealName: string;
    mealRecipe: string;
}

export default function TopOfApp () {

    //  STATE VARIABLES
    const [activeButton, setActiveButton] = useState<string | null>(null);
    const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
    const [savedActivities, setSavedActivities] = useState([]);

    /**
     * Decides which button is active
     * @param button is the name of the button that is clicked
     */
    function toggleActiveButton(button: string) {
        if (activeButton === button) {
            setActiveButton(null);
        } else {
            setActiveButton(button);
        }
    }

    return (
        <>

            {/* GLOBAL NAVIGATION */}
            <nav id={styles.globalNav}>
                
                {/* NEW RECIPE BUTTON */}
                <button 
                    onClick={() => toggleActiveButton('newRecipe')}
                    id={styles.newRecipeButton}
                    className={activeButton === 'newRecipe' ? styles.activeNavButton : ''}
                >
                    New recipe
                    <img 
                        src="arrow.svg" alt="arrow"
                        className={activeButton === 'newRecipe' ? styles.flippedImg : ''}
                    />
                </button>
                
                {/* SAVED RECIPES BUTTON */}
                <button 
                    onClick={() => toggleActiveButton('savedRecipes')}
                    id={styles.savedRecipesButton}
                    className={activeButton === 'savedRecipes' ? styles.activeNavButton : ''}
                >
                    Saved recipes
                    <img 
                        src="arrow.svg" alt="arrow" 
                        className={activeButton === 'savedRecipes' ? styles.flippedImg : ''}
                    />
                </button>

                {/* LIFE BUTTON */}
                <button 
                    onClick={() => toggleActiveButton('life')}
                    id={styles.lifeButton}
                    className={activeButton === 'life' ? styles.activeNavButton : ''}
                >
                    Life
                    <img 
                        src="arrow.svg" alt="arrow"
                        className={activeButton === 'life' ? styles.flippedImg : ''}
                    />
                </button>

            </nav>

            {
                activeButton === 'newRecipe' ? 
                    <NewRecipeForm 
                        heading={'what meal (recipe) are you making?'}
                        inputId={'mealName'}
                        inputPlaceholder={'Giv dit måltid et navn! ...Lasagne?'}
                        textareaId={'mealRecipe'}
                        textareaPlaceholder={'- 1x egg plant?... - 200g ost?...'}
                        buttonText={'Save this recipe'}
                        setSavedList={setSavedMeals}
                    /> :
                activeButton === 'savedRecipes' ? 
                    <SavedRecipes
                        savedMeals={savedMeals}
                    /> :
                activeButton === 'life' ? 
                    <NewRecipeForm
                        heading={'New activity'}
                        inputId={'activityName'}
                        inputPlaceholder={'Whats the activity? ...Work? Surf?'}
                        textareaId={'activityNote'}
                        textareaPlaceholder={'Details? ...Low tide is 05.20am?'}
                        buttonText={'Save this activity'}
                        activeButton={activeButton}
                    /> : 
                    null
            }
        </>
    )
}