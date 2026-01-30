import { motion } from "framer-motion";
import { Shuffle } from "lucide-react";
import { Button } from "@/components/ui/button";

const TEST_CASES = {
  spam: [
    "URGENT: Your bank account is locked. Click bit.ly/verify to unlock now.",
    "Congrats! You won a $5000 Amazon Gift Card. Call 888-999-0000 to claim.",
    "Lose 10kg in 10 days! Buy these magic pills now. 50% OFF.",
    "Hot singles waiting for you! Text LOVE to 556677. 18+ only.",
    "You have a tax refund pending. Click here to update your details or face legal action.",
    "Crypto Alert: Bitcoin is crashing! Move your funds to this secure wallet immediately.",
    "Part-time job: Earn $500/day from home. No experience needed. WhatsApp +919876543210.",
    "FINAL NOTICE: Your package delivery failed. Pay $2 shipping fee here to reschedule.",
  ],
  ham: [
    "Hey, are we still on for the movie tonight? Let me know by 6 PM.",
    "Mom, I reached the hostel safely. Will call you after dinner.",
    "Your OTP for HDFC Netbanking is 458921. Valid for 10 mins.",
    "Meeting reminder: Project discussion at 10 AM in the conference room.",
    "Can you send me the notes from today's lecture? I missed the class.",
    "Your Amazon order #405-112 has been delivered. Check your mailbox.",
    "Happy Birthday bhai! Have a great year ahead. Party when?",
    "The electricity bill for January is generated. Amount: Rs 1200. Due date: 5th Feb.",
  ],
};

interface QuickTestButtonProps {
  onSelect: (message: string) => void;
  disabled?: boolean;
}

const QuickTestButton = ({ onSelect, disabled }: QuickTestButtonProps) => {
  const handleClick = () => {
    const allCases = [...TEST_CASES.spam, ...TEST_CASES.ham];
    const randomIndex = Math.floor(Math.random() * allCases.length);
    onSelect(allCases[randomIndex]);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button
        onClick={handleClick}
        disabled={disabled}
        variant="outline"
        className="relative group px-6 py-6 text-sm font-medium bg-secondary/50 border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 rounded-xl overflow-hidden"
      >
        <span className="relative flex items-center gap-2">
          <Shuffle className="w-4 h-4" />
          <span className="tracking-wide">RANDOM TEST</span>
        </span>
      </Button>
    </motion.div>
  );
};

export default QuickTestButton;
