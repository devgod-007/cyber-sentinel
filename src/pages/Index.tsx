import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import CyberGrid from "@/components/CyberGrid";
import ShieldIcon from "@/components/ShieldIcon";
import ScannerInput from "@/components/ScannerInput";
import ScanButton from "@/components/ScanButton";
import ResultsDashboard from "@/components/ResultsDashboard";
import { Activity } from "lucide-react";

interface ScanResult {
  prediction: string;
  confidence_score: string;
  is_spam: boolean;
}

const Index = () => {
  const [inputText, setInputText] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScan = async () => {
    if (!inputText.trim()) {
      toast.error("Input Required", {
        description: "Please enter text to analyze.",
      });
      return;
    }

    setIsScanning(true);
    setResult(null);

    try {
      const response = await fetch("http://52.205.66.113:8000/predict_spam", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputText }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data: ScanResult = await response.json();
      setResult(data);

      // Auto-scroll to results after DOM updates
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);

      if (data.is_spam) {
        toast.error("Threat Detected", {
          description: "This message has been classified as SPAM.",
        });
      } else {
        toast.success("All Clear", {
          description: "This message appears to be legitimate.",
        });
      }
    } catch (error) {
      console.error("Scan failed:", error);
      toast.error("Connection Failed", {
        description: "Unable to reach the analysis server. Please check your network connection and try again.",
      });
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <CyberGrid />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <motion.header
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex justify-center mb-6">
            <ShieldIcon />
          </div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold tracking-tight mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-foreground">Shield</span>
            <span className="text-primary text-glow-blue">AI</span>
            <span className="text-foreground"> Defense System</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Real-time Natural Language Threat Analysis
          </motion.p>

          {/* Status bar */}
          <motion.div
            className="flex items-center justify-center gap-2 mt-6 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Activity className="w-4 h-4 text-success animate-pulse" />
            <span className="font-mono text-muted-foreground">
              System Status: <span className="text-success">ONLINE</span>
            </span>
          </motion.div>
        </motion.header>

        {/* Scanner Section */}
        <motion.main
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="glass-card-glow p-6 md:p-8">
            <ScannerInput
              value={inputText}
              onChange={setInputText}
              isScanning={isScanning}
            />

            <div className="flex justify-center mt-6">
              <ScanButton
                onClick={handleScan}
                isLoading={isScanning}
                disabled={!inputText.trim()}
              />
            </div>
          </div>

          {/* Results */}
          <div ref={resultsRef}>
            <AnimatePresence mode="wait">
              {result && <ResultsDashboard result={result} />}
            </AnimatePresence>
          </div>
        </motion.main>

        {/* Footer */}
        <motion.footer
          className="text-center mt-16 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p className="font-mono">
            <span className="text-primary">▶</span> Powered by Advanced Machine Learning
          </p>
        </motion.footer>
      </div>
    </div>
  );
};

export default Index;
