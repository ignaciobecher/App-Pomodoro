import React, { useState, useEffect } from 'react';
import './style.css';

function padTime(time) {                      //Creo funcion padTime y le paso el parametro time
  return time.toString().padStart(2, '0');    //hago que time se haga string y despues con padStart le voy a poner un 0 siempre y cuando haya un solo numero
}

const Pomodoro = () => {                      //Funcion pomodoro
  const [title, setTitle] = useState('Arrancar Sesión...');   //const para poner el titulo
  const [timeLeft, setTimeLeft] = useState(25 * 60);          //const para el contador  
  const [isRunning, setIsRunning] = useState(false);          //const para ver si el contador esta en true o false

  const minutes = padTime(Math.floor(timeLeft / 60));         //paso a entero con el math.floor y lo divido por 60
  const seconds = padTime(Math.floor(timeLeft - minutes * 60));

  const startTimer = () => {
    setTitle('Focus!!!');
    setIsRunning(true);
  };

  const stopTimer = () => {
    setTitle('OK te espero!!!');
    setIsRunning(false);
  };

  const resetTimer = () => {
    setTitle('Otra vez ???');
    setTimeLeft(25 * 60);
    setIsRunning(false);
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTimeLeft((timeLeft) => {
          return timeLeft - 1;
        });
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  return (
    <div className="app">
      <h2>{title}</h2>
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div className="buttons">
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
};

export default Pomodoro;