import React, { useState } from "react";
import useInterval from "../utils/useInterval";
import FocusDuration from "./FocusDuration";
import BreakDuration from "./BreakDuration";
import Session from "./Session";
import StartStop from "./StartStop";

function Pomodoro() {
  // .............
  // initial state values
  // .............
  const initialStates = {
    //-----Testing Initial Values-----
    //-----Test Values-----
    // focusDuration: 5,
    // breakDuration: 8,
    // remainingSeconds: 5,
    //-----Real Values-----
    focusDuration: 25 * 60,
    breakDuration: 5 * 60,
    remainingSeconds: 25 * 60,
    //-----/Testing Initial Values-----
    isTimerRunning: false,
    isTimerStarted: false,
    isSessionFocus: true,
  };

  // .............
  // State Declarations
  // .............
  const [state, setState] = useState({ ...initialStates });
  const alarm = new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1482.mp3`);

  // .............
  // functions and helper functions
  // .............

  useInterval(
    () => {
      setState((current) => ({
        ...current,
        remainingSeconds: current.remainingSeconds - 1,
      }));
      state.remainingSeconds === 0 && switchSessions();
    },
    state.isTimerRunning ? 1000 : null
  );

  function playPause() {
    !state.isTimerStarted &&
      setState((current) => ({
        ...current,
        remainingSeconds: current.focusDuration,
      }));
    setState((current) => ({
      ...current,
      isTimerRunning: !current.isTimerRunning,
    }));
    setState((current) => ({ ...current, isTimerStarted: true }));
  }
  function switchSessions() {
    alarm.play();
    setState((current) => ({
      ...current,
      isSessionFocus: !current.isSessionFocus,
    }));
    state.isSessionFocus
      ? setState((current) => ({
          ...current,
          remainingSeconds: current.breakDuration,
        }))
      : setState((current) => ({
          ...current,
          remainingSeconds: current.focusDuration,
        }));
  }

  // .............
  // Handler functions
  // .............

  const stopHandler = () => {
    setState((current) => ({
      ...initialStates,
      focusDuration: current.focusDuration,
      breakDuration: current.breakDuration,
      remainingSeconds: current.focusDuration,
    }));
  };

  const durationHandler = (event) => {
    const target =
      event.target.type === "button" ? event.target : event.target.parentNode;
    const targetId = target.dataset.testid;
    const targetType = targetId.split("-")[1] + "Duration";
    let newDuration = 0;
    switch (targetId) {
      case "decrease-focus":
        newDuration = Math.max(300, state.focusDuration - 300);
        break;
      case "increase-focus":
        newDuration = Math.min(3600, state.focusDuration + 300);
        break;
      case "decrease-break":
        newDuration = Math.max(60, state.breakDuration - 60);
        break;
      case "increase-break":
      default:
        newDuration = Math.min(900, state.breakDuration + 60);
    }
    setState((current) => ({
      ...current,
      [targetType]: newDuration,
    }));
  };

  // Only Render the session if the timer started
  const displaySession = state.isTimerStarted && <Session state={state} />;

  // .............
  // Render
  // .............

  return (
    <div className="pomodoro">
      <div className="row">
        <FocusDuration state={state} durationHandler={durationHandler} />
        <BreakDuration state={state} durationHandler={durationHandler} />
      </div>
      <StartStop
        state={state}
        playPause={playPause}
        stopHandler={stopHandler}
      />
      {displaySession}
    </div>
  );
}

export default Pomodoro;
