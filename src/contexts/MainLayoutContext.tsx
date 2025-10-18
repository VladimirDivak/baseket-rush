import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { FooterButton } from "../components/MainFooter";
import type { HeaderButton } from "../components/MainHeader";

interface MainLayoutContextType {
  footerSelectedButton: FooterButton;
  setFooterSelectedButton: (id: FooterButton) => void;

  headerSelectedButton: HeaderButton;
  setHeaderSelectedButton: (id: HeaderButton) => void;
}

const MainLayoutContext = createContext<MainLayoutContextType | undefined>(
  undefined
);

export function MainLayoutProvider({ children }: { children: ReactNode }) {
  const [footerSelectedButton, setFooterSelectedButtonState] = useState<FooterButton>("ball");
  const [headerSelectedButton, setHeaderSelectedButtonState] = useState<HeaderButton>();

  const setFooterSelectedButton = (id: FooterButton) => {
    setFooterSelectedButtonState(id);
  };

  const setHeaderSelectedButton = (id: HeaderButton) => {
    setHeaderSelectedButtonState(id);
  };

  return (
    <MainLayoutContext.Provider
      value={{
        footerSelectedButton: footerSelectedButton,
        setFooterSelectedButton: setFooterSelectedButton,
        headerSelectedButton: headerSelectedButton,
        setHeaderSelectedButton: setHeaderSelectedButton,
      }}
    >
      {children}
    </MainLayoutContext.Provider>
  );
}

export function useMainLayout() {
  const context = useContext(MainLayoutContext);
  if (context === undefined) {
    throw new Error("useMainLayout must be used within a MainLayoutProvider");
  }
  return context;
}
