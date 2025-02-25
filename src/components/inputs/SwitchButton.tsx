import React from "react";
import Paragraph from "../typography/Paragraph";
export type SwitchButtonProps = {
  label: string;
  onChange: (e: any) => void;
  name: string;
  className?: string;
  isChecked?: boolean;
  isDisabled?: boolean;
};

const SwitchButton: React.FC<SwitchButtonProps> = ({
  label,
  isChecked = false,
  className = "",
  name,
  onChange,
  isDisabled = false,
  ...rest
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isDisabled && onChange) {
      onChange(e);
    }
  };
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Paragraph>{label}</Paragraph>
      <label
        className={`w-10 h-6 flex items-center rounded-full p-1 cursor-pointer ${
          isChecked ? "bg-primary" : "bg-black"
        }`}
        htmlFor={name}
      >
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={isChecked}
          disabled={isDisabled}
          onChange={handleChange}
          className="sr-only"
          {...rest}
        />
        <div
          className={`w-5 h-5 border border-white  rounded-full transform transition-all duration-300 ease-in-out ${
            isChecked
              ? "translate-x-[-0.9rem] bg-white"
              : "translate-x-[0.09rem] bg-white"
          }`}
        >
          <div className="w-4 h-4 bg-black rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
        </div>
      </label>
    </div>
  );
};

export default SwitchButton;
