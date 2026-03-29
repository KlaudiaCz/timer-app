import { useEffect, useRef } from "react";

const TimerControls = ({ toogleTimer, resetTimer, isRunning }) => {
  // `startButtonRef` przechowuje referencję do elementu DOM przycisku, co pozwala nam na bezpośrednią manipulację tym elementem, np. ustawienie focusu po zamontowaniu komponentu.
  const startButtonRef = useRef(null);

  // a `useEffect` z pustą tablicą zależności uruchamia się tylko raz. Po zamontowaniu komponentu sprawdza, czy referencja do przycisku jest ustawiona, a jeśli tak, to ustawia focus na tym przycisku. 
  // Dzięki temu użytkownik może od razu zacząć korzystać z funkcji Start/Pause bez konieczności ręcznego klikania w przycisk.
  useEffect(() => {
    if (startButtonRef.current) {
      // Po zamontowaniu komponentu ustawiamy focus na przycisku Start/Pause.
      startButtonRef.current.focus();
    }
  }, []);
  return (
    <div>
      <button
        ref={startButtonRef}
        onClick={toogleTimer}
        className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        {isRunning ? "Pause" : "Start"}
      </button>

      <button
        onClick={resetTimer}
        className="mt-3 ml-3 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
};

export default TimerControls;
