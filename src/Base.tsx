import { useBase } from "./contexts/BaseContext";
import LoadingBar from "./components/layouts/LoadingBar";
import ProgressBar from "./components/layouts/ProgressBar";
import WelcomeLayout from "./components/layouts/WelcomeLayout";
import MainLayout from "./components/layouts/MainLayout";
import GameLayout from "./components/layouts/GameLayout";
import { useEffect, type ComponentType } from "react";
import { validateAcountAsync } from "./modules/AccountValidationService";
import SplashscreenLayout from "./components/layouts/SplashscreenLayout";
import { init, isTMA, viewport, miniApp } from "@telegram-apps/sdk";
import { validateTelegramAndPersistAccountAsync } from "./modules/TelegramValidationService";
import { init as initMiniAppSdk } from "@farcaster/miniapp-sdk";

export type LayoutState = "splash" | "welcome" | "main" | "game";

const layoutComponents: Record<LayoutState, ComponentType> = {
  splash: SplashscreenLayout,
  welcome: WelcomeLayout,
  main: MainLayout,
  game: GameLayout,
};

function Base() {
  const {
    loadingBarValue: loading,
    progressBarValue: progress,
    currentLayout: layoutState,
    setCurrentLayout,
    setLoadingBar,
  } = useBase();

  const setLayout = async () => {
    if (CurrentLayout === SplashscreenLayout) {
      if (isTMA()) {
        setLoadingBar(true);
        await validateTelegramAndPersistAccountAsync();
        setLoadingBar(false);
      }
      validateAcountAsync().then((haveAccount) => {

        setTimeout(() => {
          setCurrentLayout(haveAccount ? "main" : "welcome");
        }, 3000);
      });
    }
  };

  useEffect(() => {
    const sdk = initMiniAppSdk();
    sdk.actions.ready();

    if (isTMA()) {
      const cleanup = init();

      if (viewport.mount.isAvailable()) {
        viewport.mount().then(() => {
          viewport.requestFullscreen();
          miniApp.ready();
          console.log("Telegram Mini Apps SDK initialized");

          setLayout();
          return cleanup;
        });
      }

      return;
    }

    setLayout();
  }, []);

  const CurrentLayout = layoutComponents[layoutState];

  return (
    <>
      {CurrentLayout && <CurrentLayout />}
      <LoadingBar enabled={loading} />
      <ProgressBar
        enabled={progress !== undefined && progress > 0}
        progress={progress}
      />
    </>
  );
}

export default Base;
