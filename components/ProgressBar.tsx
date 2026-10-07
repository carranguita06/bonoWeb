"use client";

import { useState, type ChangeEvent } from "react";

const SIZE = 52; // diámetro del círculo en px

export default function ProgressBar() {
  const [text, setText] = useState("");
  const parsed = Number(text);
  const value = Math.min(100, Math.max(0, parsed));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };


  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        fontFamily: "Montserrat, system-ui, sans-serif",
      }}
    >
      <h1 style={{ fontSize: 48}}>
        Progress bar
      </h1>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value}
        style={{
          position: "relative",
          height: 48,
          background: "#bcbbbc",
          borderRadius: 20,
        }}
      >
        <div
          style={{
            position: "absolute",
            height: "100%",
            width: `calc(${value}% + ${SIZE / 2}px)`,
            background:"#ff5e6c" ,
            borderRadius: 20,
            transition: "width 0.3s ease",
          }}
        />

        <div
          style={{
            position: "absolute",
            top: "50%",
            left: value + "%",
            width: SIZE,
            height: SIZE,
            transform: "translateY(-50%)",
            borderRadius: "50%",
            background: "#ff5e6c",
            color: "white",
            fontSize: 16,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "left 0.3s ease",
          }}
        >
          {value}%
        </div>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          marginTop: 32,
        }}
      >
        <label htmlFor="porcentaje" style={{ fontSize: 18 }}>
          Input Percentage:
        </label>
        <input
          id="porcentaje"
          type="number"
          min={0}
          max={100}
          value={text}
          onChange={handleChange}
          style={{
            width: 110,
            height: 56,
            fontSize: 18,
            background: "#bcbbbc",
            borderRadius: 28,
            textAlign: "center",
          }}
        />
      </div>
    </div>
  );
}