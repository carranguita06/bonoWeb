"use client";

import { useEffect, useState } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  const handleReset = () => {
    setRunning(false);
    setSeconds(0);
  };

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  const buttonStyle = {
    width: 110,
    height: 90,
    fontSize: 36,
    border: "none",
    color: "black",
    fontFamily: "inherit",
  };

  return (
    <div style={{ fontFamily: "serif" }}>
      <h1 style={{ fontSize: 50}}>Timer</h1>

      <p style={{ fontSize: 30}}>
        {mins} mins {secs} secs
      </p>

      <div style={{ display: "flex", gap: 8 }}>
        <button
          onClick={() => setRunning(true)}
          style={{ ...buttonStyle, background: "green" }}
        >
          Start
        </button>
        <button
          onClick={() => setRunning(false)}
          style={{ ...buttonStyle, background: "red" }}
        >
          Stop
        </button>
        <button
          onClick={handleReset}
          style={{ ...buttonStyle, background: "yellow" }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}