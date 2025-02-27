import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

export const Logo = ({ complete }: { complete: () => void }) => {
  const [start, setStart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStart(true), 500);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      animate={start ? { y: -100 } : { y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
      onAnimationComplete={complete}
      style={{
        position: "absolute",
        top: "35%",
        left: "25%",
      }}
    >
      <Image src="/Stella.png" alt="logo" width={200} height={250} />
    </motion.div>
  );
};
