"use client";

import { useState, type FormEvent } from "react";

const titulos = ["Home", "Features", "Pricing", "About"];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <nav
      style={{
        display: "flex",
        alignItems: "center",
        background: "#30353b",
        fontFamily: "system-ui, sans-serif",
        padding: "8px 16px"
      }}>
        
      <span style={{ color: "white", 
                    fontSize: 20, 
                    fontWeight: "bold" }}>  Navbar </span>

      <ul style={{ display: "flex", listStyle: "none", margin: 0, padding: 0 }}>
        {titulos.map((titulo) => (
          <li key={titulo} 
             style={{padding: "8px 8px",
                background:"#30353b",
                border: "none",
                fontSize: 16}}> {titulo} </li>
        ))}
      </ul>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: 8, marginLeft: "auto" }}
      >
        <input
          type="search"
          placeholder="Search"
          style={{
            padding: "6px 12px",
            fontSize: 16,
            border: "1px solid #ced4da",
            borderRadius: 4,
          }}
        />
        <button
          type="submit"
          style={{
            padding: "6px 12px",
            fontSize: 16,
            background: "transparent",
            color: "#17a2b8",
            border: "1px solid #17a2b8"
          }}
        >
          Search
        </button>
      </form>
    </nav>
    

  );
}