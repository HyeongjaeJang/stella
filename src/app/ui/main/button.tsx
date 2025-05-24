"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import Steps from "@/app/ui/signUp/steps";
import SignIn from "@/app/ui/signIn/signIn";

const Button = ({ showButtons }: { showButtons: boolean }) => {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  // Switch from Sign In to Sign Up
  const switchToSignUp = () => {
    setShowSignIn(false); // Close current Sign In modal
    setShowSignUp(true); // Open Sign Up modal
  };
  // Close Sign Up modal after completing registration
  const closeSignUp = () => {
    setShowSignUp(false);
  };

  return (
    <>
      {showSignUp &&
        createPortal(
          <Steps action={closeSignUp} />, // Close modal after successful sign-up
          document.body,
        )}

      {showSignIn &&
        createPortal(
          <SignIn
            action={() => setShowSignIn(!showSignIn)}
            switchToSignUp={switchToSignUp} // Pass function to switch to Sign Up
          />,
          document.body,
        )}

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
          Sign In
        </button>
      </motion.div>
    </>
  );
};

export default Button;
