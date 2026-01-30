import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ShieldAlert, Code, ChevronDown } from "lucide-react";
import { useState } from "react";
import ConfidenceGauge from "./ConfidenceGauge";

interface ScanResult {
  prediction: string;
  confidence_score: string;
  is_spam: boolean;
}

interface ResultsDashboardProps {
  result: ScanResult | null;
}

const ResultsDashboard = ({ result }: ResultsDashboardProps) => {
  const [showJson, setShowJson] = useState(false);

  if (!result) return null;

  const isSpam = result.is_spam;
  const confidence = parseFloat(result.confidence_score.replace('%', ''));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        layout: { duration: 0.4, ease: "easeInOut" }
      }}
      className={`glass-card-glow p-8 mt-8 ${isSpam ? 'border-destructive/50' : 'border-success/50'}`}
      style={{
        boxShadow: isSpam 
          ? '0 0 60px -10px hsla(0, 85%, 55%, 0.3)' 
          : '0 0 60px -10px hsla(145, 100%, 45%, 0.3)',
      }}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Verdict */}
        <motion.div
          className="flex items-center gap-4"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {isSpam ? (
            <ShieldAlert className="w-16 h-16 text-destructive text-glow-red" strokeWidth={1.5} />
          ) : (
            <ShieldCheck className="w-16 h-16 text-success text-glow-green" strokeWidth={1.5} />
          )}
          <div>
            <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">
              Analysis Complete
            </p>
            <h2
              className={`text-3xl md:text-4xl font-bold tracking-tight ${isSpam ? 'text-destructive text-glow-red' : 'text-success text-glow-green'}`}
            >
              {isSpam ? 'SPAM DETECTED' : 'LEGITIMATE'}
            </h2>
          </div>
        </motion.div>

        {/* Confidence Gauge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <ConfidenceGauge value={confidence} isSpam={isSpam} />
        </motion.div>
      </div>

      {/* Status Indicator */}
      <motion.div
        className="mt-6 p-4 rounded-lg bg-background/50 border border-border/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isSpam ? 'bg-destructive' : 'bg-success'} animate-pulse`} />
          <span className="font-mono text-sm text-muted-foreground">
            Threat Level: <span className={isSpam ? 'text-destructive' : 'text-success'}>{isSpam ? 'HIGH' : 'NONE'}</span>
          </span>
          <span className="text-muted-foreground/50 mx-2">|</span>
          <span className="font-mono text-sm text-muted-foreground">
            Classification: <span className="text-foreground">{result.prediction}</span>
          </span>
        </div>
      </motion.div>

      {/* Developer Mode Toggle */}
      <motion.div
        className="mt-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button
          onClick={() => setShowJson(!showJson)}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
        >
          <Code className="w-4 h-4" />
          <span>Developer Mode</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${showJson ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {showJson && (
            <motion.pre
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 p-4 rounded-lg bg-background/80 border border-border/50 font-mono text-xs text-muted-foreground overflow-x-auto"
            >
              {JSON.stringify(result, null, 2)}
            </motion.pre>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default ResultsDashboard;
