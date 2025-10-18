import IconBallSplashscreen from "../../icons/IconBallSplashscreen";

function SplashscreenLayout() {
  return (
    <div className="absolute top-0 left-0 h-screen w-screen flex flex-col justify-center items-center">
      <div className="text-orange-500 w-1/3 aspect-square animate-bounce">
        <IconBallSplashscreen className="animate-spin" />
      </div>
    </div>
  );
}

export default SplashscreenLayout;
