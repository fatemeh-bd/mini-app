import React from "react";
import { ColorType } from "../../utils/constants";
import { ButtonProps } from "./types";

const themeClasses: Record<ColorType, string> = {
  [ColorType.PRIMARY]:
    "bg-primary dark:bg-gray-300 text-white dark:text-gray-800 border-primary",
  [ColorType.BLACK]: "bg-black text-white border-black",
  [ColorType.SUCCESS]: "bg-teal-500 text-white border-teal-500",
  [ColorType.ERROR]: "bg-error text-white border-error",
  [ColorType.SECONDARY]: "bg-purple text-white border-purple",
};

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  themeType = ColorType.PRIMARY,
  outline = false,
  full = false,
  Icon,
  loading = false,
  ...props
}) => {
  const baseClasses =
    "flex text-sm cursor-pointer border font-medium items-center justify-center gap-2 rounded-lg transition-all hover:opacity-80 p-2.5";
  const sizeClass = full ? "w-full" : "";
  const themeClass = themeClasses[themeType];
  const outlineClass = outline ? "!bg-transparent !text-current" : "";
  const combinedClasses = `${baseClasses} ${sizeClass} ${themeClass} ${outlineClass} ${className} ${
    loading ? "min-w-[100px] h-[45px] overflow-hidden" : ""
  } min-h-[45px]`;

  return (
    <button type="button" name="Button" className={combinedClasses} {...props}>
      {loading ? (
        <Loader />
      ) : (
        <>
          {Icon && <Icon className="size-5" />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
