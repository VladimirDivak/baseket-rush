interface LoadingBarProps {
  enabled: boolean;
}

function LoadingBar({ enabled }: LoadingBarProps) {
  const OpacityStyle = enabled
    ? "opacity-100"
    : "opacity-0 pointer-events-none";

  return (
    <div
      className={`${OpacityStyle} absolute top-0 left-0 h-screen w-screen transition-opacity duration-300 ease-in-out bg-black/60 flex flex-col justify-center items-center`}
    >
      <div className="h-12 aspect-square rounded-full border-l border-r border-orange-500 animate-spin"></div>
    </div>
  );
}

export default LoadingBar;
