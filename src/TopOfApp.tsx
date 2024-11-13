import { useState } from 'react'
import styles from './TopOfApp.module.css'
import NewRecipeForm from './NewRecipeForm';
import SavedRecipes from './SavedRecipes';
import LifeForm from './LifeForm';

export default function TopOfApp () {

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
        <div>

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
                activeButton === 'newRecipe' ? <NewRecipeForm /> :
                activeButton === 'savedRecipes' ? <SavedRecipes /> :
                activeButton === 'life' ? <LifeForm /> 
                : null
            }
        </div>
    )
}