import React, { useState } from "react";
import { motion } from "framer-motion";

const Step5 = ({
  form,
  action,
  prevStep,
  onSubmit, // 회원가입 완료시 실행 (모달 닫기)
}: {
  form: {
    name: string;
    dateOfBirth: string;
    time: string;
    city: string;
    gender: string;
  };
  action: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  prevStep: () => void;
  onSubmit: () => void; // 모달 닫기로
}) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    setMessage("");

    console.log(form);

    // const response = await fetch("/api/users", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     name: form.name,
    //     email: `${form.name.toLowerCase()}@example.com`, // 임시 이메일 값 (UI에서 입력받도록 수정 가능)
    //     password: "test1234", // 임시 비밀번호 값
    //     birth_date: form.dateOfBirth,
    //     birth_time: form.time,
    //     city_country: form.city,
    //     gender: form.gender,
    //     z_sign: "Unknown", // 별자리 자동 계산 가능
    //   }),
    // });

    // const data = await response.json();
    // setLoading(false);

    // if (response.ok) {
    //   setMessage("🎉 회원가입 성공!");
    //   setTimeout(() => {
    //     onSubmit(); // 모달 닫기 실행
    //   }, 2000);
    // } else {
    //   setMessage(`❌ 오류: ${data.message}`);
    // }
  };

  return (
    <motion.div key="step5" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
      <h2 className="text-lg font-semibold mb-2">Step 5/5</h2>
      <p>What is your gender?</p>
      <select onChange={action} name="gender" value={form.gender} className="border p-2 w-full mt-3">
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
        <button className="bg-purple-500 text-white p-2 rounded-md" onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
      {message && <p className="mt-4">{message}</p>}
    </motion.div>
  );
};

export default Step5;