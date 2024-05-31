import React, { useState } from "react";
import CardGame from "./components/cardGame";
import Header from "./components/header";
import Modal from "./components/modal";
import { useTimer } from "./util/customHooks";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [currentTime, setCurrentTime] = useState(null); 
  const {
    time,
    start: timerStart,
    stop: timerStop,
    reset: timerReset,
  } = useTimer({
    //Utilize the useTimer custom hook
    ontimeupdate:(t)=>{
      //currentTime = t;
    }
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
  let completionTimes = []

  //function that starts the timer when the game starts.
  const gameStarted = () => {
     //reset the timer to 0, 
    timerReset();
    //start the timer
    timerStart();
    //currentTime = time;
    setCurrentTime(3)
  }

  //function that starts the timer when the game ends.
  const gameEnded = () => {
    //stop the timer
      timerStop();
      const currentTime = time;
      //store current time to an array
      completionTimes.push(time);
      //update previous time
      if (completionTimes.length >= 2){
        setPreviousTime(completionTimes[completionTimes.length-2]);
      };
      //get the smallest value in the array to update the best time
      setBestTime(Math.min (...completionTimes));
  }

  return (
    <>
      <Header
        // add time, bestTime, previousTime props
        openModal={() => setShowModal(true)}
        bestTime={bestTime}
        previousTime={previousTime}
        time={currentTime}
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

