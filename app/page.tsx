"use client";

import Navbar from "@/components/Navbar";
import ProgressBar from "@/components/ProgressBar"; 
import Formulario from "@/components/formulario";
import Timer from "@/components/Timer";
import PasswordGenerator from "@/components/PasswordGenerator";
import RickMorty from "@/components/RickMorty";


export default function Home() {
  return (
    <>
      <Navbar />
      <div style={{ transform: "scaleX(-1)", marginTop: 20 }}>
        <Navbar />
      </div>
      <ProgressBar />
      <Formulario />
      <Timer />
      <PasswordGenerator />
      <RickMorty />
    </>
  );
}