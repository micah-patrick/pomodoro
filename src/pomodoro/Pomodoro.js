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
    isSessionFocus: true,
    isTimerRunning: false,
    isTimerStarted: false,
  }; 

  // .............
  // State Declarations
  // .............
  const [state, setState] = useState({ ...initialStates });
  const focusAlarm = new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1484.mp3`);
  const breakAlarm = new Audio(`https://bigsoundbank.com/UPLOAD/mp3/1673.mp3`);

  // .............
  // functions and helper functions
  // .............

  useInterval( //what heppens each second while the timer is running
    () => {
      setState((current) => ({//subtract one second from the remaining seconds
        ...current,
        remainingSeconds: current.remainingSeconds - 1, 
      }));
      state.remainingSeconds === 0 && switchSessions(); //when the remaining seconds reaches zero, run switchSessions function.
    },
    state.isTimerRunning ? 1000 : null //run this interval every second while state.isTimerRunning === true. 
  );

  function playPause() { //runs when play or pause is clicked
    !state.isTimerStarted &&
    setState((current) => ({ //if the timer hasn't started, set the remaining seconds to the current focus duration setting
        ...current,
        remainingSeconds: current.focusDuration,
      }));
    setState((current) => ({ //switch boolean state of isTimerRunning
      ...current,
      isTimerRunning: !current.isTimerRunning,
    }));
    setState((current) => ({ ...current, isTimerStarted: true })); //start timer
  }

  function switchSessions() { // runs each time the timer hits 0.
    setState((current) => ({ //switch boolean of isSessionFocus. switches between focus or break session.
      ...current,
      isSessionFocus: !current.isSessionFocus,
    }));
    if (state.isSessionFocus) // if session was previously focus...
       {setState((current) => ({
          ...current,
          remainingSeconds: current.breakDuration, //...set remaining seconds to break duration setting...
        }))
        breakAlarm.play(); //play break alarm sound
      }
      else {setState((current) => ({
          ...current,
          remainingSeconds: current.focusDuration, //...otherwise set to current focus duration setting
        }))
        focusAlarm.play(); //play focus alarm sound
      };
  }

  // .............
  // Handler functions
  // .............

  const stopHandler = () => { //when stop button is clicked
    setState((current) => ({ //reset all state values except keep current duration settings and set remaining seconds to focus duration setting.
      ...initialStates,
      focusDuration: current.focusDuration,
      breakDuration: current.breakDuration,
      remainingSeconds: current.focusDuration,
    }));
  };

  const durationHandler = (event) => { //handles clicks on increase or decrease of focus and break durations
    const target = //wheather the button or the span(icon) is clicked set target to = the button node.
      event.target.type === "button" ? event.target : event.target.parentNode; 
    const targetId = target.dataset.testid; // get the button's "test-id" attribute to determine which button is targeted.
    const targetType = targetId.split("-")[1] + "Duration"; // refactor targetId to match the state variable names.
    let newDuration = 0;
    switch (targetId) { // decide the new value depending on which button was targeted.
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
    setState((current) => ({ //set the value of the target with the new value defined above.
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
