import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ConfidenceGaugeProps {
  value: number;
  isSpam: boolean;
}

const ConfidenceGauge = ({ value, isSpam }: ConfidenceGaugeProps) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (value / 100) * circumference;
  
  const color = isSpam ? "hsl(var(--destructive))" : "hsl(var(--success))";
  const glowClass = isSpam ? "text-glow-red" : "text-glow-green";

  useEffect(() => {
    const duration = 1500;
    const startTime = Date.now();
    const startValue = 0;
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + (value - startValue) * eased));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    animate();
  }, [value]);

  return (
    <div className="relative flex items-center justify-center">
      <svg width="200" height="200" className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
          className="opacity-30"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="100"
          cy="100"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{
            filter: `drop-shadow(0 0 10px ${color})`,
          }}
        />
      </svg>
      
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className={`text-4xl font-mono font-bold ${glowClass}`}
          style={{ color }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          {displayValue}%
        </motion.span>
        <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
          Confidence
        </span>
      </div>
    </div>
  );
};

export default ConfidenceGauge;
