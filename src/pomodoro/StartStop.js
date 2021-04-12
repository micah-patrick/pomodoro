import React from "react";
import classNames from "../utils/class-names";

//play/pause button and stop button
export default function StartStop({ state, playPause, stopHandler }) {
  return (
    <div className="row">
      <div className="col">
        <div
          className="btn-group btn-group-lg mb-2"
          role="group"
          aria-label="Timer controls"
        >
          <button //start / pause button
            type="button"
            className="btn btn-primary"
            data-testid="play-pause"
            title="Start or pause timer"
            onClick={playPause}
          >
            <span
              className={classNames({
                oi: true,
                "oi-media-play": !state.isTimerRunning, //uses play icon when timer is not running
                "oi-media-pause": state.isTimerRunning, //uses puase icon whrn timer is running
              })}
            />
          </button>
          <button //stop button
            disabled={!state.isTimerStarted} // stop button is disabled when timer is not started.
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
