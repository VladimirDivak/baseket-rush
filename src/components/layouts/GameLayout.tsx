import { Unity, useUnityContext } from "react-unity-webgl";
import { useBase } from "../../contexts/BaseContext";
import { useEffect } from "react";

function GameLayout() {
  const { setProgressBar } = useBase();
  const { unityProvider, loadingProgression, isLoaded } = useUnityContext({
    loaderUrl: "Build/BasketballGame.loader.js",
    dataUrl: "Build/BasketballGame.data",
    frameworkUrl: "Build/BasketballGame.framework.js",
    codeUrl: "Build/BasketballGame.wasm",
    streamingAssetsUrl: "StreamingAssets",
    companyName: "NullReference",
    productName: "BasketballGame",
    productVersion: "0.1",
  });

  useEffect(() => {
    if (!isLoaded) {
      setProgressBar(loadingProgression);
    } else setProgressBar(undefined);
  }, [loadingProgression, isLoaded]);

  return (
    <>
      <Unity
        className="absolute top-0 left-0 h-screen w-screen"
        unityProvider={unityProvider}
      />
    </>
  );
}

export default GameLayout;
