import { useCallback, useEffect, useState } from "react";
import { Button } from "@/common/components/atoms/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/common/components/atoms/ui/dialog";
import { YStack } from "@/common/components/atoms/ui/stack";
import { CircleHelp, ArrowLeft, ArrowRight } from "lucide-react";
import useLocalStorage from "@/common/hooks/utils/useLocalStorage";

const steps = [
  {
    title: "Welcome to DUMPET.FUN! 🎲",
    description:
      "Where silly debates meet serious bets. Create markets for life's most entertaining arguments or join existing ones!",
    content:
      "Get ready to turn trivial arguments into winning bets! Choose from existing debates like '🐱 Cats vs 🐕 Dogs' or create your own market for anything you can imagine.",
  },
  {
    title: "Step 1: Join or Create",
    description: "Select a market or start your own debate",
    content:
      "Browse active markets to participate in, or create your own debate. The possibilities are endless - from settling age-old arguments to predicting the most random outcomes!",
  },
  {
    title: "Step 2: Place Your Bet",
    description: "Deposit tokens to join the fun",
    content:
      "Deposit the specified token to become eligible for voting. Your deposit is your bet - back your opinion with real stakes!",
  },
  {
    title: "Step 3: Cast Your Vote",
    description: "Support your chosen side",
    content:
      "Vote for your preferred option or vote with your bias. Remember, there are NO RULES! It's all about what the community decides.",
  },
  {
    title: "Step 4: Wait & Win",
    description: "Let the community decide",
    content: (
      <div className="space-y-4">
        <p>
          Once the market duration ends, anyone can conclude the market process.
          Winners get rewarded!
        </p>
        <div className="text-sm text-muted-foreground">
          <p>Additional Info:</p>
          <ul className="list-disc pl-4 space-y-2">
            <li>
              Tokens from losing votes are distributed proportionally to winners
            </li>
            <li>1% fee applies for early vote cancellation</li>
            <li>First-time users eligible for one-time airdrop</li>
            <li>Market creators can earn AO rewards from user deposits</li>
          </ul>
        </div>
      </div>
    ),
  },
];

const FaqDialog = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const { setItem, getItem } = useLocalStorage("hasSeenFaq");

  // Separate initialization effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const value = getItem();

      const hasSeenFaq = value === "true" || value === (true as any);

      if (!hasSeenFaq) {
        setOpen(true);
      }
      setInitialized(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleClose = useCallback(() => {
    try {
      setItem("true");
    } catch (error) {
      console.error("Error saving FAQ state:", error);
    }
    setOpen(false);
    setCurrentStep(0);
  }, [setItem]);

  if (!initialized) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        if (!newOpen) handleClose();
        setOpen(newOpen);
      }}
    >
      <DialogTrigger asChild>
        <Button size="icon" variant="ghost">
          <CircleHelp size={18} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{steps[currentStep].title}</DialogTitle>
          <DialogDescription>
            {steps[currentStep].description}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <YStack className="space-y-4">{steps[currentStep].content}</YStack>
        </div>

        <DialogFooter className="flex justify-between mt-6">
          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button type="button" onClick={handleClose}>
                Get Started
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FaqDialog;
