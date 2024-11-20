import React, { useState, useEffect } from "react";
import { MdRestartAlt } from "react-icons/md";
import { useMediaQuery } from "react-responsive";
import bg1 from "../../src/assets/bg-images/1.jpg";
import bg2 from "../../src/assets/bg-images/2.jpg";
import bg3 from "../../src/assets/bg-images/3.jpg";
import bg4 from "../../src/assets/bg-images/4.jpg";

function PomodoroTimer() {
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });

  const bgs = [bg1, bg2, bg3, bg4];
  const [bg, setBg] = useState(bgs[0]);

  const timers = {
    pomodoro: 25,
    shortBreak: 5,
    longBreak: 10,
  };

  const [isRunning, setIsRunning] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(timers.pomodoro * 60);
  const [timerType, setTimerType] = useState("pomodoro");

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    let intervalId;

    if (isRunning && currentTimer > 0) {
      intervalId = setInterval(() => {
        setCurrentTimer((prev) => prev - 1);
      }, 1000);
    } else if (!isRunning) {
      clearInterval(intervalId);
    }

    if (currentTimer === 0) {
      setIsRunning(false);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, currentTimer]);

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleSetTime = (time) => {
    if (time <= 0) return;
    setTimerType(
      time === timers.pomodoro
        ? "pomodoro"
        : time === timers.shortBreak
        ? "shortBreak"
        : "longBreak"
    );
    setCurrentTimer(time * 60);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    if (timerType === "pomodoro") {
      setCurrentTimer(timers.pomodoro * 60);
    } else if (timerType === "shortBreak") {
      setCurrentTimer(timers.shortBreak * 60);
    } else {
      setCurrentTimer(timers.longBreak * 60);
    }
  };

  return (
    <div
      className="timer-container"
      style={{
        backgroundImage:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), " + bg,
        backgroundSize: "cover",
      }}
    >
      <div className="timer-buttons">
        <button
          onClick={() => handleSetTime(timers.pomodoro)}
          className={timerType === "pomodoro" ? "active" : ""}
        >
          Pomodoro
        </button>
        <button
          onClick={() => handleSetTime(timers.shortBreak)}
          className={timerType === "shortBreak" ? "active" : ""}
        >
          {isMobile ? "SB" : "Short Break"}
        </button>
        <button
          onClick={() => handleSetTime(timers.longBreak)}
          className={timerType === "longBreak" ? "active" : ""}
        >
          {isMobile ? "LB" : "Long Break"}
        </button>
      </div>
      <div className="timer">
        {currentTimer > 0 ? formatTime(currentTimer) : "Time up"}
      </div>
      <div className="timer-buttons">
        <button onClick={handleStartStop}>
          {isRunning ? "Stop" : "Start"}
        </button>
        <button className="setting-button" onClick={handleReset}>
          <MdRestartAlt />
        </button>
        {bgs.map((bg, index) => (
          <button
            key={index}
            className="bg-button"
            style={{ backgroundImage: `url(${bg})` }}
            onClick={() => setBg(`url(${bg})`)}
          />
        ))}
      </div>
    </div>
  );
}

export default PomodoroTimer;
