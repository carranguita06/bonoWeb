"use client";

import { useState, type FormEvent } from "react";

export default function UserForm() {
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [sent, setSent] = useState<{ username: string; fullName: string; age: string } | null>(null);


  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent({ username, fullName, age });
  };

  const labelStyle = { display: "block", fontSize: 20 };
  const inputStyle = {
    marginBottom: 12,
    padding: "6px 12px",
    fontSize: 20,
    border: "1px solid #767676",
    borderRadius: 4,
    boxSizing: "border-box" as const,
  };

  return (
    <div style={{ padding: "40px 52px" }}>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" style={labelStyle}>
            Username:
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="fullname" style={labelStyle}>
            FullName:
          </label>
          <input
            id="fullname"
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label htmlFor="age" style={labelStyle}>
            Age:
          </label>
          <input
            id="age"
            type="number"
            min={0}
            value={age}
            onChange={(e) => setAge(e.target.value)}
            style={inputStyle}
          />
        </div>

        <button type="submit" style={{fontSize: 20 }}>
          Submit
        </button>
      </form>

       {sent && (
        <div style={{ marginTop: 48 }}>
          <h2 style={{ fontSize: 20 }}>
            Request Sent to DB with below request data
          </h2>
          <ul style={{ fontSize: 20}}>
            <li>UserName: {sent.username}</li>
            <li>FullName: {sent.fullName}</li>
            <li>Age: {sent.age}</li>
          </ul>
        </div>
      )}
    </div>
  );
}