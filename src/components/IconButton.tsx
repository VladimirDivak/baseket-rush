interface IconButtonProps {
  className?: string;
  selected?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

function IconButton({ className, selected, children, onClick }: IconButtonProps) {
  const selectedStyle = selected ? "text-orange-500/70" : "text-neutral-600";

  return (
    <button
      onClick={onClick}
      className={`transition-colors duration-300 h-full aspect-square ${selectedStyle} ${className}`}
    >
      {children}
    </button>
  );
}

export default IconButton;
