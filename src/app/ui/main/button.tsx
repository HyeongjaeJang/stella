import React from "react";
import { motion } from "framer-motion";

const Button = ({ showButtons }: { showButtons: boolean }) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 0 }}
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
    </>
  );
};

export default Button;
