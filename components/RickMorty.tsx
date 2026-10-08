"use client";

import { useEffect, useState } from "react";

type Character = {
  id: number;
  name: string;
  status: string;
  species: string;
  image: string;
};


export default function CharacterList() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("https://rickandmortyapi.com/api/character");
        if (!res.ok) throw new Error("No se pudo cargar la información");


        const data = await res.json();
        if (!cancelled) setCharacters(data.results); // la lista viene en "results"
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "Error desconocido");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p>Cargando...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ padding: "40px 32px" }}>
      <h1 style={{ fontSize: 40, fontWeight: 700, margin: "0 0 24px" }}>
        Rick and Morty - Personajes
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
          gap: 20,
        }}
      >
        {characters.map((c) => (
          <div
            key={c.id}
            style={{
              border: "1px solid #555",
              borderRadius: 8,
              overflow: "hidden",
            }}
          >
            <img
              src={c.image}
              alt={c.name}
              style={{ width: "100%", display: "block" }}
            />
            <div>
              <h3 style={{ margin: "0 0 4px", fontSize: 18 }}>{c.name}</h3>
              <p style={{ margin: 0, fontSize: 14 }}>
                {c.status} - {c.species}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>


  );
}