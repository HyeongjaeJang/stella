import React, { useState } from "react";
import { motion } from "framer-motion";

const Step2 = ({
  form,
  action,
  nextStep,
  prevStep,
}: {
  form: { email: string; password: string };
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const regexEmail = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (regex.test(form.email)) {
      if (form.password.length < 6) {
        setError(true);
        setErrorMessage("Password must be at least 6 characters");
        return false;
      }
      nextStep();
      return true;
    } else {
      setError(true);
      setErrorMessage("Invalid email");
      return false;
    }
  };

  return (
    <>
      <motion.div
        key="step1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <h2 className="text-lg font-semibold mb-2">Step 2/6</h2>
        <p>What is your email?</p>
        <input
          type="text"
          name="email"
          value={form.email}
          placeholder="Email"
          className="border p-2 w-full mt-3"
          onChange={(e) => {
            action(e);
            setError(false);
          }}
        />
        {error && (
          <p className="text-red-500">
            {errorMessage.includes("Invalid") ? errorMessage : null}
          </p>
        )}
        <p>Password</p>
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Password"
          className="border p-2 w-full mt-3"
          onChange={(e) => {
            action(e);
            setError(false);
          }}
        />
        {error && (
          <p className="text-red-500">
            {errorMessage.includes("Password") ? errorMessage : null}
          </p>
        )}

        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 p-2 rounded-md" onClick={prevStep}>
            Back
          </button>
          <button className="bg-purple-300 p-2 rounded-md" onClick={regexEmail}>
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Step2;
