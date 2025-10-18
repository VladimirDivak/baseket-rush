import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./utils/protectedLocalStorage.ts";
import { type ProtectedLocalStorageProps } from "./utils/protectedLocalStorage.ts";

declare global {
  interface Window {
    protectedLocalStorage: ProtectedLocalStorageProps;
  }
}

createRoot(document.getElementById("root")!).render(<App />);
