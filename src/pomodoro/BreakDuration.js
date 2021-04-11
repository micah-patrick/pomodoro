import React from "react";
import { secondsToDuration } from "../utils/duration";

export default function BreakDuration({ state, durationHandler }) {
  return (
    <div className="col">
      <div className="float-right">
        <div className="input-group input-group-lg mb-2">
          <span className="input-group-text" data-testid="duration-break">
            Break Duration: {secondsToDuration(state.breakDuration)}
          </span>
          <div className="input-group-append">
            <button
              disabled={state.isTimerStarted}
              type="button"
              className="btn btn-secondary"
              data-testid="decrease-break"
              onClick={durationHandler}
            >
              <span className="oi oi-minus" />
            </button>
            <button
              disabled={state.isTimerStarted}
              type="button"
              className="btn btn-secondary"
              data-testid="increase-break"
              onClick={durationHandler}
            >
              <span className="oi oi-plus" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}