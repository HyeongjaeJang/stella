import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Steps from "@/app/ui/signUp/steps";
import SignIn from "@/app/ui/signIn/signIn";

const Button = ({ showButtons }: { showButtons: boolean }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  return (
    <>
      {showSignUp && createPortal(<Steps />, document.body)}
      {showSignIn && createPortal(<SignIn close={() => setShowSignIn(false)} />, document.body)}

      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={showButtons ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0 }}
        className="flex flex-col gap-5 justify-center items-center w-full"
      >
        <button
          onClick={() => setShowSignUp(!showSignUp)}
          className="bg-button w-1/2 p-3 rounded-xl text-white font-bold text-xl"
        >
          Sign Up
        </button>
        <button
          onClick={() => setShowSignIn(!showSignIn)}
          className="bg-button w-1/2 p-3 rounded-xl text-white font-bold text-xl"
        >
          Log In
        </button>
      </motion.div>
    </>
  );
};

export default Button;
