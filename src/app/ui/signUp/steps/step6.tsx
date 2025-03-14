"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { createUser } from "@/app/lib/actions";

type formType = {
  name: string;
  email: string;
  password: string;
  dateOfBirth: string;
  time: string;
  city: string;
  gender: string;
};

const Step6 = ({
  form,
  action,
  prevStep,
  close,
}: {
  form: formType;
  action: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  prevStep: () => void;
  close: () => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    const user = {
      name: form.name,
      email: form.email,
      password: form.password,
      birth_date: form.dateOfBirth,
      birth_time: form.time,
      gender: form.gender,
      city_country: form.city,
      z_sign: "testsign",
    };

    const res = await createUser(user);
    if (res.success) {
      console.log(res);
      setLoading(false);
      close();
    } else {
      setMessage(res.message || "");
    }
  };

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <h2 className="text-lg font-semibold mb-2">Step 6/6</h2>
      <p>What is your gender?</p>
      <select
        onChange={(e) => {
          action(e);
          setMessage("");
          setLoading(false);
        }}
        name="gender"
        value={form.gender}
        className="border p-2 w-full mt-3"
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
          className="bg-purple-500 text-white p-2 rounded-md"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {message && <p className="mt-4">{message}</p>}
    </motion.div>
  );
};

export default Step6;
