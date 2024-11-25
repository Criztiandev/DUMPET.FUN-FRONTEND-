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
  DialogClose,
} from "@/common/components/atoms/ui/dialog";
import { YStack } from "@/common/components/atoms/ui/stack";
import { CircleHelp, ArrowLeft, ArrowRight } from "lucide-react";
import useLocalStorage from "@/common/hooks/utils/useLocalStorage";

const steps = [
  {
    title: "Welcome to Create Market",
    description: "Your Platform for Prediction Markets & Social Betting",
    content: (
      <div className="space-y-4">
        <p>
          Welcome to Create Market, where you can participate in or create
          prediction markets on any topic! Whether you want to:
        </p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Join existing markets like "🐱 Cats vs 🐕 Dogs"</li>
          <li>Create your own market on any debatable topic</li>
          <li>Turn friendly arguments into engaging bets</li>
          <li>Earn rewards for accurate predictions</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Step 1: Token Selection",
    description: "Choose Your Betting Token",
    content: (
      <div className="space-y-4">
        <p>Before creating or joining a market:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>
            Select a token by entering its Token ID in the TokenTxId field
          </li>
          <li>Or choose from the available token list in the dropdown</li>
          <li>Create market is free, so feel free to create any</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Step 2: Market Creation & Management",
    description: "Set Up and Monitor Your Markets",
    content: (
      <div className="space-y-4">
        <p>Creating and managing your market is simple:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Define your market question and options</li>
          <li>Set the market duration and initial liquidity</li>
          <li>Monitor your markets through the "My Markets" dashboard</li>
          <li>Track both pending and successful markets</li>
        </ul>
        <div className="mt-6 bg-muted p-4 rounded-lg">
          <p className="font-medium mb-2">Important Market Rules:</p>
          <ul className="list-disc pl-4 space-y-2 text-sm text-muted-foreground">
            <li>Winners receive proportional rewards from the losing votes</li>
            <li>Market creators earn AO rewards based on user participation</li>
            <li>
              Markets can be concluded by any user after the duration ends
            </li>
          </ul>
        </div>
      </div>
    ),
  },
];

const CreateMarketFAQ = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const { setItem, getItem } = useLocalStorage("hasSeenFaqCreate");

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
    <Dialog open={open} onOpenChange={setOpen}>
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
              <DialogClose asChild>
                <Button type="button" onClick={handleClose}>
                  Get Started
                </Button>
              </DialogClose>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateMarketFAQ;
