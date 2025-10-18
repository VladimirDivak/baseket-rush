import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { WelcomeStep } from "../components/layouts/WelcomeLayout";

interface WelcomeLayoutType {
  currentStep: WelcomeStep;
  setCurrentStep: (step: WelcomeStep) => void;
}

const WelcomeLayoutContext = createContext<WelcomeLayoutType | undefined>(
  undefined
);

export function WelcomeLayoutProvider({ children }: { children: ReactNode }) {
  const [currentStepState, setCurrentStepState] = useState<WelcomeStep>("authentication");

  const setCurrentStep = (step: WelcomeStep) => {
    setCurrentStepState(step);
  };

  return (
    <WelcomeLayoutContext.Provider
      value={{ currentStep: currentStepState, setCurrentStep: setCurrentStep }}
    >
      {children}
    </WelcomeLayoutContext.Provider>
  );
}

export function useWelcomeLayout() {
  const context = useContext(WelcomeLayoutContext);
  if (context === undefined) {
    throw new Error(
      "useWelcomeLayout must be used within a WelcomeLayoutProvider"
    );
  }
  return context;
}
