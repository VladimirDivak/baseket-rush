interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  disabled?: boolean;
  fill?: boolean;
  OnClick?: () => void;
}

function Button({ className, children, disabled, fill, OnClick }: ButtonProps) {
    const fillStyle = fill ? "bg-orange-500/70 border-orange-500" : "bg-[#202020] border-neutral-700";

  return (
    <button
      onClick={OnClick}
      disabled={disabled}
      className={`px-4 py-2 w-full ${fillStyle} disabled:text-neutral-400 disabled:bg-neutral-700 border disabled:border-neutral-700 rounded-md duration-300 transition-colors ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;
