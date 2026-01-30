import { motion } from "framer-motion";
import { Terminal } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface ScannerInputProps {
  value: string;
  onChange: (value: string) => void;
  isScanning: boolean;
}

const ScannerInput = ({ value, onChange, isScanning }: ScannerInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.5 }}
      className="relative"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 rounded-t-xl border border-border/50 border-b-0">
        <Terminal className="w-4 h-4 text-primary" />
        <span className="font-mono text-xs text-muted-foreground">threat_analyzer.exe</span>
        <div className="flex gap-1.5 ml-auto">
          <div className="w-3 h-3 rounded-full bg-destructive/60" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
          <div className="w-3 h-3 rounded-full bg-success/60" />
        </div>
      </div>

      {/* Textarea */}
      <div className={`relative ${isScanning ? 'scan-line' : ''}`}>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="// Paste suspicious email or SMS content here...&#10;&#10;Example:&#10;URGENT: Your account has been compromised! Click here immediately to verify your identity and claim your $1000 reward..."
          className="terminal-input min-h-[200px] rounded-t-none resize-none p-4 text-foreground placeholder:text-muted-foreground/50"
          disabled={isScanning}
        />
        
        {/* Scanning overlay */}
        {isScanning && (
          <motion.div
            className="absolute inset-0 bg-primary/5 rounded-b-lg pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}
      </div>

      {/* Character count */}
      <div className="flex justify-end mt-2">
        <span className="font-mono text-xs text-muted-foreground">
          {value.length} characters
        </span>
      </div>
    </motion.div>
  );
};

export default ScannerInput;
