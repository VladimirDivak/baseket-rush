interface ProgressBarProps {
  enabled: boolean;
  progress?: number | undefined;
}

function ProgressBar(props: ProgressBarProps) {
  const opacityStyle = props.enabled
    ? "opacity-100"
    : "opacity-0 pointer-events-none";

  const widthPercentage = props.progress !== undefined ? Math.round(props.progress * 100) : 0;

  return (
    <div
      className={`${opacityStyle} absolute top-0 left-0 h-screen w-screen transition-opacity duration-300 ease-in-out bg-black/60 flex flex-col justify-center items-center`}
    >
      <div className="h-1 w-1/2 bg-neutral-500 rounded-full">
        <div
          className="h-full transition-all duration-300 ease-in-out bg-orange-500 rounded-full"
          style={{ width: `${widthPercentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ProgressBar;
