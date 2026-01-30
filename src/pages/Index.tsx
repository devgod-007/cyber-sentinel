import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { toast } from "sonner";
import CyberGrid from "@/components/CyberGrid";
import ShieldIcon from "@/components/ShieldIcon";
import ScannerInput from "@/components/ScannerInput";
import ScanButton from "@/components/ScanButton";
import QuickTestButton from "@/components/QuickTestButton";
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
  const [isFlashing, setIsFlashing] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);

  const handleScan = useCallback(async () => {
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

      // Auto-scroll to results after DOM updates with smooth animation
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 150);

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
  }, [inputText]);

  const handleQuickTest = useCallback((message: string) => {
    setInputText(message);
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 600);
  }, []);

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
        <LayoutGroup>
          <motion.main
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            layout
          >
            <motion.div layout className="glass-card-glow p-6 md:p-8">
              <ScannerInput
                value={inputText}
                onChange={setInputText}
                isScanning={isScanning}
                isFlashing={isFlashing}
              />

              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                <QuickTestButton 
                  onSelect={handleQuickTest} 
                  disabled={isScanning} 
                />
                <ScanButton
                  onClick={handleScan}
                  isLoading={isScanning}
                  disabled={!inputText.trim()}
                />
              </div>
            </motion.div>

            {/* Results */}
            <motion.div ref={resultsRef} layout>
              <AnimatePresence mode="wait">
                {result && <ResultsDashboard result={result} />}
              </AnimatePresence>
            </motion.div>
          </motion.main>
        </LayoutGroup>

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
