import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { LayoutState } from "../Base";

interface BaseType {
  loadingBarValue: boolean;
  setLoadingBar: (isActive: boolean) => void;

  progressBarValue: number | undefined;
  setProgressBar: (progress: number | undefined) => void;

  currentLayout: LayoutState;
  setCurrentLayout: (layout: LayoutState) => void;
}

const BaseContext = createContext<BaseType | undefined>(undefined);

export function BaseProvider({ children }: { children: ReactNode }) {
  const [loadingBarValueBase, setLoadingBarBase] = useState(false);
  const [progressBarValueBase, setProgressBarBase] = useState<
    number | undefined
  >(0);
  const [currentLayoutBase, setCurrentLayoutBase] =
    useState<LayoutState>("splash");

  useEffect(() => {
    console.warn(currentLayoutBase);
  }, [currentLayoutBase]);

  return (
    <BaseContext.Provider
      value={{
        loadingBarValue: loadingBarValueBase,
        setLoadingBar: setLoadingBarBase,
        progressBarValue: progressBarValueBase,
        setProgressBar: setProgressBarBase,
        currentLayout: currentLayoutBase,
        setCurrentLayout: setCurrentLayoutBase,
      }}
    >
      {children}
    </BaseContext.Provider>
  );
}

export function useBase() {
  const context = useContext(BaseContext);
  if (context === undefined) {
    throw new Error("useBase must be used within a BaseProvider");
  }
  return context;
}
