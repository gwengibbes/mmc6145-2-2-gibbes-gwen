import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer({
  });

  const cardTexts = [
    "Bunny 🐰", 
    "Frog 🐸",
    "Panda 🐼",
    "Doggy 🐶",
    "Kitty 😺",
    "Duck 🦆",
  ];

  const [bestTime, setBestTime] = useState(null);
  const [previousTime, setPreviousTime] = useState(null);

  //function that starts the timer when the game starts.
  const gameStarted = () => {
    //start the timer
    timerStart();
  }

  //function that starts the timer when the game ends.
  const gameEnded = () => {
    //stop the timer
      timerStop();
      //set previous time
      setPreviousTime(time);
      //get the smallest value in the array to update the best time
      setBestTime(Math.min (bestTime ?? time, time));
         //reset the timer to 0, 
      timerReset();
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        openModal={() => setShowModal(true)}
        bestTime={bestTime}
        previousTime={previousTime}
        time={time}
      />
      <CardGame
        // add onGameStart, onGameEnd props
        onGameStart={() => gameStarted()}
        onGameEnd={() => gameEnded()}
        cardTexts={cardTexts}
      />
      <Modal isShown={showModal} close={() => setShowModal(false)} />
    </>
  );
}

