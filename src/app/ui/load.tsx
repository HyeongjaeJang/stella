import { motion } from "framer-motion";
import React from "react";
import Image from "next/image";

const Load = () => {
  return (
    <div className="flex gap-3 justify-center items-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      >
        <Image src="/Stella.png" alt="logo" width={64} height={64} />
      </motion.div>
      <h1>Loading...</h1>
    </div>
  );
};

export default Load;
