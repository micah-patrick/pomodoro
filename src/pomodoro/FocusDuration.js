import React from "react";
import { secondsToDuration } from "../utils/duration";

export default function Durations({ state, durationHandler }) {
  return (
    <div className="col">
      <div className="input-group input-group-lg mb-2">
        <span className="input-group-text" data-testid="duration-focus">
          Focus Duration: {secondsToDuration(state.focusDuration)}
        </span>
        <div className="input-group-append">
          <button
            disabled={state.isTimerStarted}
            type="button"
            className="btn btn-secondary"
            data-testid="decrease-focus"
            onClick={durationHandler}
          >
            <span className="oi oi-minus" />
          </button>
          <button
            disabled={state.isTimerStarted}
            type="button"
            className="btn btn-secondary"
            data-testid="increase-focus"
            onClick={durationHandler}
          >
            <span className="oi oi-plus" />
          </button>
        </div>
      </div>
    </div>
  );
}