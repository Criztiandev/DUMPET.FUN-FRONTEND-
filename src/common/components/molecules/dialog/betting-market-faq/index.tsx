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
import { Badge } from "@/common/components/atoms/ui/badge";

const steps = [
  {
    title: "Step 1: Access Balance",
    description: "Click the Balance Button",
    content: (
      <div className="space-y-4">
        <p>
          First, locate and click the "Balance" button. You'll see two
          checkboxes:
        </p>
        <ul className="list-disc pl-4 space-y-2">
          <li>1. Deposit checkbox</li>
          <li>2. Withdraw checkbox</li>
        </ul>
      </div>
    ),
  },
  {
    title: "Step 2: Manage Your Balance",
    description: "Choose Deposit or Withdraw",
    content: (
      <div className="space-y-4">
        <p>Choose your balance management option:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li className="flex gap-2">
            <strong className="underline">
              <Badge className="bg-green-800">Deposit:</Badge>
            </strong>
            <p className="text-sm">Enter the amount you want to add</p>
          </li>
          <li className="flex gap-2">
            <strong className="underline">
              <Badge className="bg-green-800">Withdraw:</Badge>
            </strong>
            <p className="text-sm">
              All your balance will be automatically converted to{" "}
              <Badge>AO</Badge> tokens and save to your wallet
            </p>
          </li>
        </ul>
      </div>
    ),
  },
  {
    title: "Step 3: Place Your Vote",
    description: "Select Side and Amount",
    content: (
      <div className="space-y-4">
        <p>After your deposit is confirmed:</p>
        <ul className="list-disc pl-4 space-y-2">
          <li>Select which side you want to vote for</li>
          <li>Enter your voting amount</li>
          <li>Confirm to start voting</li>
        </ul>
      </div>
    ),
  },
];

const VotingMarketFaq = () => {
  const [open, setOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [initialized, setInitialized] = useState(false);
  const { setItem, getItem } = useLocalStorage("hasSeenFaqVote");

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

export default VotingMarketFaq;
