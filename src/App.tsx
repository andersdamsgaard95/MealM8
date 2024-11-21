import { useState, useEffect } from 'react'
import styles from './App.module.css'
import TopOfApp from './TopOfApp'
import BottomOfApp from './BottomOfApp'
import { SavedMeal, SavedActivity } from './TopOfApp'

export default function App() {

  //  STATE VARIABLES
  const [newMealName, setNewMealName] = useState('');
  const [newMealRecipe, setNewMealRecipe] = useState('');
  const [newActivityName, setNewActivityName] = useState('');
  const [newActivityDescription, setNewActivityDescription] = useState('');

  const [savedMeals, setSavedMeals] = useState<SavedMeal[]>(() => {
    // Load saved meals from local storage on initialization
    const storedMeals = localStorage.getItem('savedMeals');
    return storedMeals ? JSON.parse(storedMeals) : [];
  });

  const [savedActivitiesList, setSavedActivitiesList] = useState<SavedActivity[]>(() => {
    // Load saved activities from local storage on initialization
    const storedActivities = localStorage.getItem('savedActivities');
    return storedActivities ? JSON.parse(storedActivities) : [];
  });

  // Save meals and activities to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('savedMeals', JSON.stringify(savedMeals));
  }, [savedMeals]);

  useEffect(() => {
    localStorage.setItem('savedActivities', JSON.stringify(savedActivitiesList));
  }, [savedActivitiesList]);

  
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
