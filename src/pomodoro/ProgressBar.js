import React from "react";

//progress bar component
export default function ProgressBar({ state }) {
  const percentComplete = state.isSessionFocus //percentage of the session thats complete, expressed as a number 0-100
    ? (1 - state.remainingSeconds / state.focusDuration) * 100 //denominator based on current session
    : (1 - state.remainingSeconds / state.breakDuration) * 100;

  return (
    <div className="row mb-2">
      <div className="col">
        <div className="progress" style={{ height: "20px" }}>
          <div
            className="progress-bar"
            role="progressbar"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={percentComplete} 
            style={{ width: percentComplete + "%" }}
          />
        </div>
      </div>
    </div>
  );
}
