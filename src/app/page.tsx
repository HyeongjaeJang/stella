"use client";

import { Logo } from "@/app/ui/components/logo";
import { motion } from "framer-motion";
import { useState } from "react";

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
          className="flex flex-col gap-10 justify-center items-center w-full"
        >
          <button className="bg-pink w-1/2 p-3 rounded-xl text-white font-bold text-lg">
            Sign Up
          </button>
          <button className="bg-pink w-1/2 p-3 rounded-xl text-white font-bold text-lg">
            Log In
          </button>
        </motion.div>
      </main>
    </div>
  );
}
