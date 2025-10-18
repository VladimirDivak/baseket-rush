import Inputfield from "../../components/Inputfield.tsx";
import IconGoogle from "../../icons/IconGoogle.tsx";
import IconApple from "../../icons/IconApple.tsx";
import Button from "../../components/Button.tsx";
import { useState } from "react";
import { useBase } from "../../contexts/BaseContext.tsx";

interface AuthenticationProps {
  OnCreateAccountClick: () => void;
}

function Authentication({ OnCreateAccountClick }: AuthenticationProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const isEmailValid = /\S+@\S+\.\S+/.test(email);
  const isPasswordValid = password.length >= 4;
  const ableToSignIn = isEmailValid && isPasswordValid;

  const { setLoadingBar, setCurrentLayout } = useBase();

  const handleOnSigninButton = () => {
    setLoadingBar(true);
    setTimeout(() => {
      setLoadingBar(false);
      setCurrentLayout("main");
    }, 2000);
  };

  return (
    <>
      <h2 className="text-sm text-neutral-500 text-center">
        We're glad to see you again!
        <br />
        First time in the game? Then create an account and get on the court!
      </h2>
      <div className="w-full border-b border-neutral-700"></div>
      <div className="w-full flex flex-col gap-2">
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
          OnClick={handleOnSigninButton}
          disabled={!ableToSignIn}
          fill={true}
        >
          Sign In
        </Button>
        <Button className="text-sm" OnClick={OnCreateAccountClick}>
          Sign Up
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

export default Authentication;
