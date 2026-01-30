import { motion } from "framer-motion";
import { Scan, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ScanButtonProps {
  onClick: () => void;
  isLoading: boolean;
  disabled?: boolean;
}

const ScanButton = ({ onClick, isLoading, disabled }: ScanButtonProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={onClick}
        disabled={disabled || isLoading}
        className="relative group px-8 py-6 text-lg font-semibold bg-primary/10 border-2 border-primary/50 text-primary hover:bg-primary/20 hover:border-primary transition-all duration-300 rounded-xl overflow-hidden"
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1,
          }}
        />
        
        <span className="relative flex items-center gap-3">
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span className="font-mono">SCANNING...</span>
            </>
          ) : (
            <>
              <Scan className="w-5 h-5" />
              <span className="tracking-wider">INITIATE SCAN</span>
            </>
          )}
        </span>
      </Button>
    </motion.div>
  );
};

export default ScanButton;
