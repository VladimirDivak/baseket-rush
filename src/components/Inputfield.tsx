import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";

interface InputfieldProps {
  placeholder: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

function Inputfield({ placeholder, type, value, onChange }: InputfieldProps) {
  return (
    <input
      className="bg-[#202020] w-full px-4 py-2 border border-neutral-700 rounded-md outline-none transition-colors duration-300 focus:border-orange-500"
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}

export default Inputfield;
