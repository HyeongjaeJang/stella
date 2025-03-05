"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Step1 from "@/app/ui/signUp/steps/step1";
import Step2 from "@/app/ui/signUp/steps/step2";
import Step5 from "./steps/step5";
import Step3 from "./steps/step3";

export default function Steps() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: "",
    dateOfBirth: "",
    time: "",
    gender: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 6));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/30 backdrop-blur-sm z-50 p-5">
      <div className="relative w-full p-6 bg-white shadow-lg rounded-lg text-center">
        <AnimatePresence mode="wait">
          {step === 1 && (
            <Step1
              form={form}
              action={handleChange}
              nextStep={() => nextStep()}
            />
          )}
          {step === 2 && (
            <Step2
              form={form}
              action={handleChange}
              nextStep={() => nextStep()}
              prevStep={() => prevStep()}
            />
          )}
          {step === 3 && (
            <Step3
              form={form}
              action={handleChange}
              nextStep={() => nextStep()}
              prevStep={() => prevStep()}
            />
          )}
          {step === 4 && (
            <Step5
              form={form}
              action={handleChange}
              prevStep={() => prevStep()}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
