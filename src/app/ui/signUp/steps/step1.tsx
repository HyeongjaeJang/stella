import React from "react";
import { motion } from "framer-motion";

const Step1 = ({
  form,
  action,
  nextStep,
}: {
  form: { name: string };
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
}) => {
  return (
    <>
      <motion.div
        key="step1"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <h2 className="text-lg font-semibold mb-2">Step 1/3</h2>
        <p>What is your name?</p>
        <input
          type="text"
          name="name"
          value={form.name}
          placeholder="Enter name"
          className="border p-2 w-full mt-3"
          onChange={action}
        />
        <button
          className="mt-4 bg-purple-300 w-full p-2 rounded-md"
          onClick={nextStep}
        >
          Next
        </button>
      </motion.div>
    </>
  );
};

export default Step1;
