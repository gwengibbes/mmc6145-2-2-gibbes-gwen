import { useState, useEffect } from 'react'
import Card from '../card'
import styles from './style.module.css'

export default function CardGame({
  onGameStart = () => {},
  onGameEnd = () => {},
  cardTexts
}) {
  const [cards, setCards] = useState()
  const [firstClick, setFirstClick] = useState(true)
  const [clicksDisabled, setClicksDisabled] = useState(false)

  useEffect(() => {
    if (cards) return
    const cardList = [...cardTexts, ...cardTexts]
      .map(card => ({text: card, facedown: true, matched: false}))
    cardList.sort(() => 0.5 - Math.random())
    setCards(cardList)
  }, [cardTexts])

  function flipCard(index) {
    const updatedCards = [...cards]
    updatedCards[index].facedown = false
    setCards(updatedCards)
  }

  function faceAllCardsDown() {
    setCards(cards => cards.map(c => ({...c, matched: false, facedown: true})))
  }

  function shuffleCards() {
     setCards(cards => {
      cards.sort(() => 0.5 - Math.random())
      return [...cards]
    })
  }

  function faceUnmatchedCardsDown() {
    setCards(cards.map(c => ({...c, facedown: !c.matched})))
  }

  function resetGame() {
    setClicksDisabled(true)
    onGameEnd()
    setTimeout(() => {
      faceAllCardsDown()
      // call callback function prop when game is over
    }, 3000)
    // shuffle after facing cards down
    // so user cannot see new card placement
    setTimeout(() => {
      shuffleCards()
      setClicksDisabled(false)
      setFirstClick(true)
    }, 3500)
  }

  function handleCardClick(clickedCardIndex) {
    if (clicksDisabled) return
    if (firstClick) {
      setFirstClick(false)
      onGameStart()
    }

    const cardAlreadyFaceup = !cards[clickedCardIndex].facedown
    if (cardAlreadyFaceup) return

    const isFirstFlip = cards
      .filter(c => !c.facedown)
      .length % 2 === 0

    if (isFirstFlip) return flipCard(clickedCardIndex)

    setClicksDisabled(true)

    // check for matching flipped card before flipping second card
    const matchingFaceupCardIndex = cards
      .findIndex(c => !c.facedown && c.text === cards[clickedCardIndex].text)

    flipCard(clickedCardIndex)

    // if matching card is face up, mark both matched
    if (matchingFaceupCardIndex > -1) {
      cards[clickedCardIndex].matched = true
      cards[matchingFaceupCardIndex].matched = true
      setCards([...cards])
      setClicksDisabled(false)
    } else {
      setTimeout(() => {
        faceUnmatchedCardsDown()
        setClicksDisabled(false)
      }, 700)
    }

    const allCardsAreMatched = cards.filter(c => !c.matched).length === 0
    if (allCardsAreMatched) {
      resetGame()
    }
  }

  return (
    <div className={styles.playfield}>
      {cards && cards.map((card, i) => (
        <Card
          key={i}
          handleClick={() => handleCardClick(i)}
          facedown={card.facedown}>
          {card.text}
        </Card>
      ))}
    </div>
  )
}