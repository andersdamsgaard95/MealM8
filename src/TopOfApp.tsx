import { useState } from 'react'
import styles from './TopOfApp.module.css'

export default function TopOfApp () {

    const [activeButton, setActiveButton] = useState<string | null>(null);

    function toggleActiveButton(button: string) {
        if (activeButton === button) {
            setActiveButton(null);
        } else {
            setActiveButton(button);
        }
    }

    return (
        <section>
            <nav id={styles.globalNav}>

                <button 
                    onClick={() => toggleActiveButton('newRecipe')}
                    className={activeButton === 'newRecipe' ? styles.activeNavButton : ''}
                >
                    New recipe
                    <img 
                        src="arrow.svg" alt="arrow"
                        className={activeButton === 'newRecipe' ? styles.flippedImg : ''}
                    />
                </button>

                <button 
                    onClick={() => toggleActiveButton('savedRecipes')}
                    className={activeButton === 'savedRecipes' ? styles.activeNavButton : ''}
                >
                    Saved recipes
                    <img 
                        src="arrow.svg" alt="arrow" 
                        className={activeButton === 'savedRecipes' ? styles.flippedImg : ''}
                    />
                </button>

                <button 
                    onClick={() => toggleActiveButton('life')}
                    className={activeButton === 'life' ? styles.activeNavButton : ''}
                >
                    Life
                    <img 
                        src="arrow.svg" alt="arrow"
                        className={activeButton === 'life' ? styles.flippedImg : ''}
                    />
                </button>

            </nav>
        </section>
    )
}