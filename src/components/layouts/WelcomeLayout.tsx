import { useEffect, useState } from "react";
import Authentication from "../windows/Authentication";
import Registration from "../windows/Registration";
import { WelcomeLayoutProvider } from "../../contexts/WelcomeLayoutContext";
import type { Account } from "../../models/Accounts";
import { SECRETKEY } from "../../utils/protectedLocalStorage";
import { initData, type User } from "@telegram-apps/sdk";
import { useBase } from "../../contexts/BaseContext";

export type WelcomeStep = "authentication" | "registration";

function WelcomeLayout() {
  const { setLoadingBar, setCurrentLayout } = useBase();
  const [isLoginWindow, setIsLoginWindow] = useState(true);
  const showRegistrationWindow = () => setIsLoginWindow(false);
  const showLoginWindow = () => setIsLoginWindow(true);

  useEffect(() => {
    let timeoutResource: number;

    const user: User | undefined = initData.user() as User;
    if (!user) return;

    const account: Account = {
      isTelegramUser: true,
      username: user.username ? user.username : user.first_name,
      avatar: user.photo_url ? user.photo_url : undefined,
    };

    window.protectedLocalStorage
      .setItemAsync("account", JSON.stringify(account), SECRETKEY)
      .then(() => {
        setLoadingBar(true);
        timeoutResource = setTimeout(() => {
          setLoadingBar(false);
          setCurrentLayout("main");
        }, 2000);
      });

    return () => clearTimeout(timeoutResource);
  }, []);

  return (
    <WelcomeLayoutProvider>
      <div className="h-min-1/2 w-[80%] lg:w-1/3 p-4 bg-[#171717] rounded-xl border-neutral-700 border flex flex-col justify-center items-center gap-6">
        <h1 className="text-2xl text-orange-500 font-semibold m-2">Welcome!</h1>

        {isLoginWindow ? (
          <Authentication OnCreateAccountClick={showRegistrationWindow} />
        ) : (
          <Registration OnCreateAccountClick={showLoginWindow} />
        )}

        <h2 className="text-xs text-neutral-500 text-center">
          By continuing, you consent to the use of{" "}
          <u className="text-orange-500">Your Data</u> in accordance with our{" "}
          <u className="text-orange-500">Terms of Service</u> and accept our{" "}
          <u className="text-orange-500">Privacy Policy</u>.
        </h2>
      </div>
    </WelcomeLayoutProvider>
  );
}

export default WelcomeLayout;
