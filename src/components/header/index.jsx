import styles from './style.module.css'

export default function Header({time, bestTime, previousTime, openModal}) {
  return (
    <header className={styles.header}>
      <h1>Memory Game!</h1>
      <div className={styles.scores}>
        {
          (time || bestTime || previousTime) &&
          <>
            {/* if time is running, show that, else if there's a previous time, show the previous time */}
            {
              time > 0
              ? <strong>Time: {time}</strong>
              : previousTime && <strong>Previous: {previousTime}</strong>
            }
            {bestTime && <strong>Best Time: {bestTime}</strong>}
          </>
        }
        <button onClick={openModal}>
          <strong>Help</strong>
        </button>
      </div>
    </header>
  )
}