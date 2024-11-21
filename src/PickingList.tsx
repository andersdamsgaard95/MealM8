import { useState } from 'react';
import styles from './PickingList.module.css';
import { SavedActivity, SavedMeal } from './TopOfApp';

interface PickingListProps {
    backgroundColor: string;
    colorCode: string
    heading: string,
    colorCodeHeading: string,
    exitPickingList: () => void,
    pickingList: SavedActivity[] | SavedMeal[],
    listType: 'meals' | 'activities',
    handleClick: (index:number) => void,
    savedMeals: SavedMeal[],
    savedActivitiesList: SavedActivity[]
}

export default function PickingList ({ backgroundColor, colorCode, heading, colorCodeHeading, exitPickingList, pickingList, listType, handleClick, savedMeals, savedActivitiesList }: PickingListProps) {

    const [searchWord, setSearchWord] = useState('');

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        setSearchWord(e.target.value);
    }

    function getActualIndex(searchListIndex:number) {
        let actualIndex;
        if (listType === 'meals') {
            actualIndex = savedMeals.findIndex((item) => item === filteredSearchList[searchListIndex])
        } else if (listType === 'activities') {
            actualIndex = savedActivitiesList.findIndex((item) => item === filteredSearchList[searchListIndex])
        }
        handleClick(actualIndex);
    }

    const filteredSearchList = pickingList.filter((item) => {
        if (listType === 'meals' && 'mealName' in item) {
            return item.mealName.toLowerCase().includes(searchWord.toLowerCase());
        }
        if (listType === 'activities' && 'activityName' in item) {
            return item.activityName.toLowerCase().includes(searchWord.toLowerCase());
        }
        return false;
    });

    return (
        <div className={styles.fixedListBox} style={{ backgroundColor: backgroundColor }}> 
            <div className={styles.container}>
                <p>{heading}</p>
                <div className={styles.fieldsContainer}>
                    <div className={styles.colorCodeHeading}>
                        <div className={styles.colorCode} style={{backgroundColor: colorCode}}></div>
                        <p>{colorCodeHeading}</p>
                    </div>
                    <div className={styles.searchDiv}>
                        <label htmlFor="search">
                            <input 
                                type="search"
                                id='search' 
                                placeholder='search'
                                value={searchWord}
                                onChange={handleSearch}
                            />
                        </label>
                    </div>
                    <ul className={styles.listContainer}>
                        {
                            filteredSearchList.length > 0 ?
                            filteredSearchList.map((item, index) => (
                                <li className={styles.pickingListItem}>
                                    <p>
                                        {listType === 'meals' ? (item as SavedMeal).mealName : listType === 'activities' ? (item as SavedActivity).activityName : null}
                                    </p>
                                    <img 
                                        src="plusIcon.svg" 
                                        alt="add to event"
                                        onClick={() => getActualIndex(index)}
                                    />
                                </li>
                            )) : 
                                listType === 'meals' ? 
                                    <p>You have no saved recipes... <br/> Go to "New recipe" and save some recipes</p> : 
                                listType === 'activities' ? 
                                    <p>You have no saved activities <br/> Go to "Life" and save some activities</p> : null
                        }
                    </ul>
                </div>                       
            </div> 
            {/* EXIT BUTTON */}
            <div className={styles.exitButton} onClick={exitPickingList}>
                <img src="x.svg" alt="exit" />
            </div> 

        </div> 
    )
}