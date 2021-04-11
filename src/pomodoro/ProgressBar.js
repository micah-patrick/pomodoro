import React from "react";

export default function ProgressBar({ state }) {
  const percentComplete = state.isSessionFocus
    ? (1 - state.remainingSeconds / state.focusDuration) * 100
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