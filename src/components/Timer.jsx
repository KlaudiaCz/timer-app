import { useState, useRef, useEffect } from "react";
import TimerDisplay from "./TimerDisplay";
import TimerControls from "./TimerControls";

const Timer = () => {
  const timerRef = useRef(null);

  const [time, setTime] = useState(() => {
    // Inicjalizacja stanu `time` z funkcją, która sprawdza, czy istnieje zapisany czas w localStorage.
    return Number(localStorage.getItem('time') || 0) 
  });
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    // Efekt, który zapisuje aktualny czas do localStorage za każdym razem, gdy `time` się zmienia.
    localStorage.setItem('time', time);
  }, [time]);


  // Funkcja, która włącza lub zatrzymuje licznik czasu.
  const toogleTimer = () => {
    if (isRunning) {
      // Jeśli timer już działa (isRunning === true), przerywa działanie interwału,
      // czyści referencję do interwału i ustawia timer jako zatrzymany.
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      // Jeśli timer nie działa, ustawia nowy interwał co 1000 ms,
      // który zwiększa stan `time` o 1 co sekundę.
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    // Na końcu aktualizuje stan isRunning, przełączając go na przeciwieństwo.
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    // Funkcja resetująca timer, która zatrzymuje interwał, czyści referencję i resetuje czas do 0.
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    timerRef.current = null;
    localStorage.removeItem('time'); // Usuwamy zapisany czas z localStorage podczas resetowania timera.
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gray-100 rouded-lg shadow-lg text-center">
      <TimerDisplay time={time} />
      <TimerControls
        toogleTimer={toogleTimer}
        resetTimer={resetTimer}
        isRunning={isRunning}
      />
    </div>
  );
};

export default Timer;
