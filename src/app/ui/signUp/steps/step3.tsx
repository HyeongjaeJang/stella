import React from "react";
import { motion } from "framer-motion";

const Step3 = ({
  form,
  action,
  nextStep,
  prevStep,
}: {
  form: { dateOfBirth: string };
  action: (e: React.ChangeEvent<HTMLInputElement>) => void;
  nextStep: () => void;
  prevStep: () => void;
}) => {
  return (
    <>
      <motion.div
        key="step2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <h2 className="text-lg font-semibold mb-2">Step 3/6</h2>
        <p>When is your date of birth?</p>
        <input
          type="date"
          name="dateOfBirth"
          onChange={action}
          value={form.dateOfBirth}
          className="border p-2 w-full mt-3 rounded-md bg-white text-black"
        />
        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 p-2 rounded-md" onClick={prevStep}>
            Back
          </button>
          <button
            disabled={form.dateOfBirth.length <= 0 ? true : false}
            className="bg-purple-300 p-2 rounded-md"
            onClick={nextStep}
          >
            Next
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Step3;
