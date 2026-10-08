"use client";

import { useEffect, useState } from "react";

const SETS = {
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  numbers: "0123456789",
  special: "!@#$%^&*()-_=+[]{};:,.?|&lt>~",
};

type Option = keyof typeof SETS;

const LABELS: Record<Option, string> = {
  uppercase: "Uppercase",
  lowercase: "Lowercase",
  numbers: "Numbers",
  special: "Special Characters",
};

const ORDER: Option[] = ["uppercase", "lowercase", "numbers", "special"];

function RefreshIcon({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 12a8 8 0 1 1-2.5-5.8" />
      <path d="M20 4v4h-4" />
    </svg>
  );
}

function CopyIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <rect x="8" y="3" width="12" height="16" rx="2" />
      <path d="M4 7v12a2 2 0 0 0 2 2h9v-2H6V7z" />
    </svg>
  );
}

function randomInt(max: number) {
  const arr = new Uint32Array(1);
  crypto.getRandomValues(arr);
  return arr[0] % max;
}

function generatePassword(length: number, active: Option[]) {
  if (active.length === 0) return "";

  const sets = active.map((key) => SETS[key]);
  const pool = sets.join("");


  const chars = sets.map((set) => set[randomInt(set.length)]);
  while (chars.length < length) {
    chars.push(pool[randomInt(pool.length)]);
  }

  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomInt(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }

  return chars.slice(0, length).join("");
}

function getStrength(password: string ){

  const upper = (password.match(/[A-Z]/g) ?? []).length;
  const lower = (password.match(/[a-z]/g) ?? []).length;
  const numbers = (password.match(/[0-9]/g) ?? []).length;
  const special = (password.match(/[^A-Za-z0-9]/g) ?? []).length;

  let score = 0;

  if (password.length > 5) score += 1;
  score += special * 2;
  score += upper + lower + numbers;

  if (score <= 6) return { label: "Weak", color: "red" };
  if (score <= 10) return { label: "Medium", color: "yellow" };
  return { label: "Strong", color: "green" };
}

export default function PasswordGenerator() {
  const [length, setLength] = useState(10);
  const [options, setOptions] = useState<Record<Option, boolean>>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    special: true,
  });
  const [password, setPassword] = useState("");
  const [nonce, setNonce] = useState(0); 
  const [copied, setCopied] = useState(false);

  const active = ORDER.filter((key) => options[key]);


  useEffect(() => {
    setPassword(generatePassword(length, active)); 
    }, 
    [length, options, nonce]);

  const toggle = (key: Option) => {
    if (options[key] && active.length === 1) return;
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleCopy = async () => {
    
      await navigator.clipboard.writeText(password);
      setCopied(true);
        setTimeout(() => setCopied(false), 2000);
  };

  const strength = getStrength(password);

  return (
    <div
      style={{
        maxWidth: 460,
        margin: "40px auto",
        fontFamily: "Roboto, system-ui, sans-serif",
        color: "white",
      }}
    >
    
      <div style={{ textAlign: "center" }}>
        <img src="/candado.svg" alt="Imagen candado" width={200} />

        <h1 style={{ fontSize: 34, fontWeight: 700}}>
          PASSWORD GENERATOR
        </h1>
        <p style={{ fontSize: 18, margin: "0 0 28px", lineHeight: 1.4 }}>
          Create strong and secure passwords to keep your account safe online.
        </p>
      </div>

      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <div style={{ position: "relative"}}>
          <input
            type="text"
            readOnly
            value={password}
            style={{
              width: "100%",
              height: 52,
              padding: "0 50px 0 20px",
              fontSize: 17,
              color: "black",
              borderRadius: 26,
              background: "white",
            }}
          />
          
          <button
            onClick={() => setNonce((n) => n + 1)}
            style={{
              position: "absolute",
              right: 14,
              top: "50%",
              transform: "translateY(-50%)",
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "black",
            }}
          >
            <RefreshIcon />
          </button>
        </div>

        <button
          onClick={handleCopy}
          style={{
            height: 52,
            padding: "0 22px",
            background: "#48d9d9",
            border: "none",
            borderRadius: 26,
            fontSize: 16,
            fontWeight: 700,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 8,
            color: "black",
            minWidth: 110,
            justifyContent: "center",
          }}
        >
          <CopyIcon />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

      <div style={{ color: strength.color, fontWeight: 700, fontSize: 18, margin: "6px 0 24px" }}>
        {strength.label}
      </div>


      <label htmlFor="length" style={{ fontSize: 18, display: "block", marginBottom: 12 }}>
        Password Length: {length}
      </label>
      <input
        id="length"
        type="range"
        min={4}
        max={32}
        value={length}
        onChange={(e) => setLength(Number(e.target.value))}
        style={{ width: "100%", accentColor: "#48d9d9", marginBottom: 24 }}
      />

      
      {ORDER.map((key) => (
        <div
          key={key}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <label htmlFor={key} style={{ fontSize: 17 }}>
            {LABELS[key]}
          </label>
          <input
            id={key}
            type="checkbox"
            checked={options[key]}
            onChange={() => toggle(key)}
            style={{ width: 24, height: 24, accentColor: "#48d9d9", cursor: "pointer" }}
          />
        </div>
      ))}
    </div>
  );
}