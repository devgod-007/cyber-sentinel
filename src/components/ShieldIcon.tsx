import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const ShieldIcon = () => {
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      {/* Pulse rings */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute inset-0 rounded-full border-2 border-primary/30"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: [0.8, 1.5],
            opacity: [0.6, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.6,
            ease: "easeOut",
          }}
        />
      ))}
      
      {/* Shield glow */}
      <motion.div
        className="absolute inset-4 rounded-full bg-primary/20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Shield icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
      >
        <Shield className="w-16 h-16 text-primary text-glow-blue" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
};

export default ShieldIcon;
