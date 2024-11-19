import { useState } from 'react';
import styles from './PickingList.module.css';
import { SavedActivity, SavedMeal } from './TopOfApp';

interface PickingListProps {
    backgroundColor: string;
    colorCode: string
    heading: string,
    colorCodeHeading: string,
    exitPickingList: () => void,
    pickingList: SavedActivity[] | SavedMeal[]
    listType: 'meals' | 'activities';
}

export default function PickingList ({ backgroundColor, colorCode, heading, colorCodeHeading, exitPickingList, pickingList, listType }: PickingListProps) {

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
                            />
                        </label>
                    </div>
                    <ul className={styles.listContainer}>
                        {
                            pickingList.map((item, index) => (
                                <li className={styles.pickingListItem}>
                                    <p>
                                        {listType === 'meals' ? (item as SavedMeal).mealName : listType === 'activities' ? (item as SavedActivity).activityName : null}
                                    </p>
                                    <img src="plusIcon.svg" alt="add to event" />
                                </li>
                            ))
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