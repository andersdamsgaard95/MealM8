import { useState } from 'react'
import styles from './App.module.css'
import TopOfApp from './TopOfApp'
import BottomOfApp from './BottomOfApp'
import { SavedMeal, SavedActivity } from './TopOfApp'

export default function App() {

  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>([]);
  const [newMealName, setNewMealName] = useState('');
  const [newMealRecipe, setNewMealRecipe] = useState('');
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');
  const [savedActivitiesList, setSavedActivitiesList] = useState<SavedActivity[]>([]);

  
  return (
    <div id={styles.app}>
      <div className={styles.topOfApp}>
        <TopOfApp 
          savedMeals={savedMeals}
          setSavedMeals={setSavedMeals}
          newMealName={newMealName}
          setNewMealName={setNewMealName}
          newMealRecipe={newMealRecipe}
          setNewMealRecipe={setNewMealRecipe}
          savedActivitiesList={savedActivitiesList}
          setSavedActivitiesList={setSavedActivitiesList}
          newActivityName={newActivityName}
          setNewActivityName={setNewActivityName}
          newActivityDescription={newActivityDescription}
          setNewActivityDescription={setNewActivityDescription} />
      </div>
      <div className={styles.bottomOfApp}>
        <BottomOfApp
          savedMeals={savedMeals}
          savedActivitiesList={savedActivitiesList}
        />
      </div>
    </div>
  )
}
