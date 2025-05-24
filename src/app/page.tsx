"use client";

import { useState } from "react";
import { Logo } from "@/app/ui/main/logo";
import Button from "@/app/ui/main/button";
import ParticlesBackground from "@/app/ui/main/particlesBackground";

export default function Home() {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center relative">
      <ParticlesBackground />
      <main className="w-full">
        <Logo complete={() => setShowButtons(true)} />
        <Button showButtons={showButtons} />
      </main>
    </div>
  );
}
