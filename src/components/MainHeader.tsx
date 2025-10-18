import { useEffect, useState } from "react";
import { useMainLayout } from "../contexts/MainLayoutContext";
import IconNotifications from "../icons/IconNotifications";
import IconWallet from "../icons/IconWallet";
import type { Account } from "../models/Accounts";
import { SECRETKEY } from "../utils/protectedLocalStorage";
import IconButton from "./IconButton";

export type HeaderButton = "notifications" | "wallet" | undefined;

function MainHeader() {
  const {
    headerSelectedButton: selectedButton,
    setHeaderSelectedButton: setSelectedButton,
  } = useMainLayout();

  const [avatar, setAvatar] = useState<string | undefined>();

  useEffect(() => {
    window.protectedLocalStorage
      .getItemAsync("account", SECRETKEY)
      .then((data) => {
        const account = JSON.parse(data!) as Account;
        console.log(account.username);
        if (account && account.avatar) {
          setAvatar(account.avatar);
        } else {
          setAvatar(
            "https://img-webcalypt.ru/storage/memes/107256/20258/oBaFthMRKDU6yZfBqop10mXenkt9K6jcQCyuda3e4qntJii8M551NCjHFgtcV7FbPIKnC2s0et5q9xTJGFB2Kb1f66gugfL5k4EOBp8MrudkX28XpZMgb14KyU2pu3s1.jpeg"
          );
        }

        console.log(avatar);
      });
  }, [avatar]);

  return (
    <>
      <IconButton
        selected={selectedButton === "notifications"}
        onClick={() => setSelectedButton("notifications")}
      >
        <IconNotifications />
      </IconButton>
      {avatar && (
        <img
          className="text-sm h-full aspect-square border border-neutral-500 rounded-full flex flex-col justify-center items-center"
          src={avatar}
          alt="acc"
        />
      )}
      <IconButton
        selected={selectedButton === "wallet"}
        onClick={() => setSelectedButton("wallet")}
      >
        <IconWallet />
      </IconButton>
    </>
  );
}

export default MainHeader;
