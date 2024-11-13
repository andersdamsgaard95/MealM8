import styles from './NewRecipeForm.module.css'

export default function NewRecipeForm () {

    return (
        <form id={styles.newRecipeForm}>
            <div id={styles.formHeadingPlusInputs}>
                <div id={styles.colorCodeHeading}>
                    <div className={styles.colorCode}></div>
                    <h1 className={styles.heading}>what meal (recipe) are you making?</h1>
                </div>
                <div id={styles.formInputs}>
                    <label htmlFor="mealName">
                        <input 
                            type="text"
                            id='mealName'
                            placeholder='Giv dit måltid et navn! ...Lasagne?'
                            required
                        />
                    </label>
                    <label htmlFor="mealRecipe">
                        <textarea
                            id='mealRecipe'
                            placeholder='- 1x egg plant?... - 200g ost?...'
                        />
                    </label>
                </div>
            </div>
            <button type='submit'>
                Save this recipe
                <img src="saveRecipeIcon.svg" alt="Save recipe icon" />
            </button>
        </form>
    )
}