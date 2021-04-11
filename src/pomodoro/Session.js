import React from "react";
import { secondsToDuration } from "../utils/duration";
import ProgressBar from "./ProgressBar";

export default function Session({ state }) {
  function sessionTitle({ isSessionFocus }) {
    if (isSessionFocus) {
      return (
        "Focusing for " + secondsToDuration(state.focusDuration) + " minutes"
      );
    } else {
      return (
        "On Break for " + secondsToDuration(state.breakDuration) + " minutes"
      );
    }
  }

  return (
    <>
      <div className="row mb-2">
        <div className="col">
          <h2 data-testid="session-title">{sessionTitle(state)}</h2>
          <p className="lead" data-testid="session-sub-title">
            {secondsToDuration(state.remainingSeconds)} remaining
          </p>
        </div>
      </div>
      <ProgressBar state={state} />
    </>
  );
}