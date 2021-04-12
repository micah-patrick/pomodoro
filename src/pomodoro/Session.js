import React from "react";
import { secondsToDuration } from "../utils/duration";
import ProgressBar from "./ProgressBar";


export default function Session({ state }) {
  
  function sessionTitle({ isSessionFocus }) { //determines what the session title should be
    if (isSessionFocus) { // if in focus session (isSessionFocus === true)...
      return (
        "Focusing for " + secondsToDuration(state.focusDuration) + " minutes" //...use for focus sessions
      );
    } else {
      return (
        "On Break for " + secondsToDuration(state.breakDuration) + " minutes" //...use for break sessions
      );
    }
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">{sessionTitle(state)}</h2> {/* use title defined by sessionTitle function */}
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(state.remainingSeconds)} remaining {/* time remaining */}
          </p>
        </div>
      </div>
      <ProgressBar state={state} />
    </>
  );
}
