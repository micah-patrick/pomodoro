import React from "react";
import classNames from "../utils/class-names";

export default function StartStop({ state, playPause, stopHandler }) {
  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !state.isTimerRunning,
                "oi-media-pause": state.isTimerRunning,
              })}
            />
          </button>
          <button
            disabled={!state.isTimerStarted}
            type="button"
            className="btn btn-secondary"
            title="Stop the session"
            onClick={stopHandler}
          >
            <span className="oi oi-media-stop" />
          </button>
        </div>
      </div>
    </div>
  );
}