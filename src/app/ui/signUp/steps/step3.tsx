import React from "react";
import { motion } from "framer-motion";

const Step3 = ({
  form,
  action,
  prevStep,
}: {
  form: { gender: string };
  action: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  prevStep: () => void;
}) => {
  return (
    <>
      <motion.div
        key="step3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
      >
        <h2 className="text-lg font-semibold mb-2">Step 3/3</h2>
        <p>What is your gender?</p>
        <select
          onChange={action}
          name="gender"
          value={form.gender}
          className="border p-2 w-full mt-3 rounded-md"
        >
          <option value="" disabled>
            Select your gender
          </option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <div className="flex justify-between mt-4">
          <button className="bg-gray-300 p-2 rounded-md" onClick={prevStep}>
            Back
          </button>
          <button
            className="bg-green-500 text-white p-2 rounded-md"
            onClick={() => console.log(form)}
          >
            Submit
          </button>
        </div>
      </motion.div>
    </>
  );
};

export default Step3;
