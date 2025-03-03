import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Steps from "@/app/ui/signUp/steps";

const Button = ({ showButtons }: { showButtons: boolean }) => {
  const [up, setUp] = useState(false);
  return (
    <>
      {up && createPortal(<Steps />, document.body)}
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={showButtons ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0 }}
        className="flex flex-col gap-5 justify-center items-center w-full"
      >
        <button
          onClick={() => setUp(!up)}
          className="bg-button w-1/2 p-3 rounded-xl text-white font-bold text-xl"
        >
          Sign Up
        </button>
        <button className="bg-button w-1/2 p-3 rounded-xl text-white font-bold text-xl">
          Log In
        </button>
      </motion.div>
    </>
  );
};

export default Button;
