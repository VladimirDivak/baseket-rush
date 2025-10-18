import Inputfield from "../Inputfield.tsx";
import IconGoogle from "../../icons/IconGoogle.tsx";
import IconApple from "../../icons/IconApple.tsx";
import Button from "../Button.tsx";
import { useState } from "react";
import { useBase } from "../../contexts/BaseContext.tsx";
import { setItemAsync, SECRETKEY } from "../../utils/protectedLocalStorage.ts";
import type { Account } from "../../models/Accounts.ts";

interface RegistrationProps {
  OnCreateAccountClick: () => void;
}

function Registration({ OnCreateAccountClick }: RegistrationProps) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setLoadingBar, setCurrentLayout } = useBase();

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 4;
  const isUsernameValid = username.length >= 4;
  const ableToSignUp = isEmailValid && isPasswordValid && isUsernameValid;

  const handleOnSignUpButton = () => {
    var account: Account = {
      username: username,
      email: email,
      password: password,
      isTelegramUser: false
    };

    setLoadingBar(true);
    setItemAsync("account", JSON.stringify(account), SECRETKEY);

    setTimeout(() => {
      setLoadingBar(false);
      setCurrentLayout("main");
    }, 2000);
  };

  return (
    <>
      <h2 className="text-sm text-neutral-500 text-center">
        We always welcome new players!
        <br />
        Already have an account? Then log in now and hit the court!
      </h2>
      <div className="w-full border-b border-neutral-700"></div>
      <div className="w-full flex flex-col gap-2">
        <Inputfield
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Inputfield
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Inputfield
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex justify-between items-center w-full gap-2">
        <Button
          className="text-sm"
          OnClick={handleOnSignUpButton}
          disabled={!ableToSignUp}
          fill={true}
        >
          Sign Up
        </Button>
        <Button className="text-sm" OnClick={OnCreateAccountClick}>
          Sign In
        </Button>
      </div>
      <div className="flex w-full justify-between items-center gap-2">
        <div className="w-full border-b border-neutral-700"></div>
        <h2 className="text-sm text-neutral-500 text-center">Or</h2>
        <div className="w-full border-b border-neutral-700"></div>
      </div>
      <div className="w-full h-9 flex justify-center items-center gap-2">
        <div className="h-full aspect-square p-2 bg-[#202020] rounded-sm border-neutral-700 border">
          <IconGoogle></IconGoogle>
        </div>
        <div className="h-full aspect-square p-2 bg-[#202020] rounded-sm border-neutral-700 border">
          <IconApple></IconApple>
        </div>
      </div>
    </>
  );
}

export default Registration;
