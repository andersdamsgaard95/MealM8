//import { useState } from 'react'
import styles from './App.module.css'
import TopOfApp from './TopOfApp'
import BottomOfApp from './BottomOfApp'

export default function App() {
  
  return (
    <div id={styles.app}>
      <div className={styles.topOfApp}>
        <TopOfApp />
      </div>
      <div className={styles.bottomOfApp}>
        <BottomOfApp />
      </div>
    </div>
  )
}
