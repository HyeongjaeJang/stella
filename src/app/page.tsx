"use client";

import { Logo } from "@/app/ui/main/logo";
import { motion } from "framer-motion";
import { useState } from "react";
import ParticlesBackground from "@/app/ui/main/particlesBackground";

export default function Home() {
  const [showButtons, setShowButtons] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center">
      <main className="w-full">
        <Logo complete={() => setShowButtons(true)} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={showButtons ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col gap-5 justify-center items-center w-full"
        >
          <button className="bg-button w-1/2 p-3 rounded-xl text-white font-bold text-xl">
            Sign Up
          </button>
          <button className="bg-button w-1/2 p-3 rounded-xl text-white font-bold text-xl">
            Log In
          </button>
        </motion.div>
        <ParticlesBackground />
      </main>
    </div>
  );
}
