import { useMainLayout } from "../contexts/MainLayoutContext";
import IconAccount from "../icons/IconAccount";
import IconBall from "../icons/IconBall";
import IconStore from "../icons/IconStore";
import IconLeaderboard from "../icons/IconLeaderboard";
import IconSettings from "../icons/IconSettings";
import IconButton from "./IconButton";

export type FooterButton =
  | "account"
  | "store"
  | "ball"
  | "leaderboards"
  | "settings"
  | undefined;

function MainFooter() {
  const {
    footerSelectedButton: selectedButton,
    setFooterSelectedButton: setSelectedButton,
  } = useMainLayout();

  return (
    <>
      <IconButton
        className="p-2"
        selected={selectedButton === "account"}
        onClick={() => setSelectedButton("account")}
      >
        <IconAccount />
      </IconButton>
      <IconButton
        className="p-2"
        selected={selectedButton === "store"}
        onClick={() => setSelectedButton("store")}
      >
        <IconStore />
      </IconButton>
      <IconButton
        selected={selectedButton === "ball"}
        onClick={() => setSelectedButton("ball")}
      >
        <IconBall />
      </IconButton>
      <IconButton
        className="p-2"
        selected={selectedButton === "leaderboards"}
        onClick={() => setSelectedButton("leaderboards")}
      >
        <IconLeaderboard />
      </IconButton>
      <IconButton
        className="p-2"
        selected={selectedButton === "settings"}
        onClick={() => setSelectedButton("settings")}
      >
        <IconSettings />
      </IconButton>
    </>
  );
}

export default MainFooter;
