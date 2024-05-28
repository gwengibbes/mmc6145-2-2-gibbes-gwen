import { useEffect, useRef } from 'react'
import styles from './style.module.css'

export default function Modal({ isShown, close }) {
  const modalCardRef = useRef()
  const modalRef = useRef()
  const closeBtnRef = useRef()

  useEffect(() => {
    function handleOutsideModalClick(e) {
      if (modalCardRef.current.contains(e.target)) return
      if (modalRef.current.contains(e.target)) close()
    }

    function handleKeyPress(e) {
      if (
        e.key === 'Tab' &&
        isShown &&
        !modalCardRef.current.contains(document.activeElement)
      ) {
        closeBtnRef.current.focus()
      }
      if (e.key === 'Escape')
        close()
    }
    document.body.addEventListener('click', handleOutsideModalClick)
    document.addEventListener('keyup', handleKeyPress)
    return () => {
      document.body.removeEventListener('click', handleOutsideModalClick)
      document.removeEventListener('keyup', handleKeyPress)
    }
  }, [close, isShown])

  useEffect(() => {
    if (!isShown) return
    document.activeElement.blur()
    modalCardRef.current.focus()
  }, [isShown])

  return (
    <div
      className={isShown ? [styles.modal, styles.showModal].join(" ") : styles.modal}
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalHeading"
      tabIndex="-1"
      aria-hidden={!isShown}>
      <div className={styles.modalCard} ref={modalCardRef}>
        <button
          ref={closeBtnRef}
          onClick={close}
          aria-label="close modal">
            &times;
        </button>
        <h3 id="modalHeading">Instructions</h3>
        <p>
          Click on a card to flip it over, then click a second card. If the cards match, they both remain face up. If they don't match, both cards are flipped face down.
        </p>
        <p>Match all the pairs to complete the game. Try to get lowest time!</p>
      </div>
    </div>
  )
}