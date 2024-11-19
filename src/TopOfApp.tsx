import { useState } from 'react'
import styles from './TopOfApp.module.css'
import NewRecipeForm from './NewRecipeForm';
import SavedRecipes from './SavedRecipes';

export interface SavedMeal {
    mealName: string;
    mealRecipe: string;
    healthRating?: number | null;
    priceRating?: number | null;
}

export interface SavedActivity {
    activityName: string,
    activityDescription: string,
}

interface TopOfAppProps {
    savedMeals: SavedMeal[],
    setSavedMeals: React.Dispatch<React.SetStateAction<SavedMeal[]>>,
    newMealName: string,
    setNewMealName: React.Dispatch<React.SetStateAction<string>>,
    newMealRecipe: string,
    setNewMealRecipe: React.Dispatch<React.SetStateAction<string>>,
    savedActivitiesList: SavedActivity[],
    setSavedActivitiesList: React.Dispatch<React.SetStateAction<SavedActivity[]>>,
    newActivityName: string,
    setNewActivityName: React.Dispatch<React.SetStateAction<string>>,
    newActivityDescription: string,
    setNewActivityDescription: React.Dispatch<React.SetStateAction<string>>
}

export default function TopOfApp ({
    savedMeals,
    setSavedMeals,
    newMealName,
    setNewMealName,
    newMealRecipe,
    setNewMealRecipe,
    savedActivitiesList,
    setSavedActivitiesList,
    newActivityName,
    setNewActivityName,
    newActivityDescription,
    setNewActivityDescription
}: TopOfAppProps) {

    //  STATE VARIABLES
    const [activeButton, setActiveButton] = useState<string | null>(null);

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
                        inputValue={newMealName}
                        textareaValue={newMealRecipe}
                        buttonText={'Save this recipe'}
                        setSavedList={setSavedMeals}
                        newMealName={newMealName}
                        setNewMealName={setNewMealName}
                        newMealRecipe={newMealRecipe}
                        setNewMealRecipe={setNewMealRecipe}
                        activeForm={'recipe'}
                    /> :
                activeButton === 'savedRecipes' ? 
                    <SavedRecipes
                        savedMeals={savedMeals}
                        setSavedMeals={setSavedMeals}
                    /> :
                activeButton === 'life' ? 
                    <NewRecipeForm
                        heading={'New activity'}
                        inputId={'activityName'}
                        inputPlaceholder={'Whats the activity? ...Work? Surf?'}
                        textareaId={'activityDescription'}
                        textareaPlaceholder={'Details? ...Low tide is 05.20am?'}
                        inputValue={newActivityName}
                        textareaValue={newActivityDescription}
                        buttonText={'Save this activity'}
                        activeButton={activeButton}
                        activeForm={'life'}
                        newActivityName={newActivityName}
                        setNewActivityName={setNewActivityName}
                        newActivityDescription={newActivityDescription}
                        setNewActivityDescription={setNewActivityDescription}
                        savedActivitiesList={savedActivitiesList}
                        setSavedActivitiesList={setSavedActivitiesList}
                    /> : 
                    null
            }
        </>
    )
}