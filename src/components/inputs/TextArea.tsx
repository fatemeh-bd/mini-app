import { FC, forwardRef } from "react";
import Paragraph from "../typography/Paragraph";
import { TextAreaType } from "./types";
import { inputClass } from "./Input";
const TextArea: FC<TextAreaType> = forwardRef<
  HTMLTextAreaElement,
  TextAreaType
>(({ className, value, errorText, label, ...rest }, ref) => {
  return (
    <div className={`my-2 relative ${className || ""}`}>
      {label && (
        <label
          htmlFor="floating_outlined"
          className={`absolute input_label text-sm text-secondary-500 duration-300 transform -translate-y-4 scale-90 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-90 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 ${
            errorText ? "!text-error" : ""
          }`}
        >
          {label}
        </label>
      )}
      <textarea
        value={value}
        ref={ref}
        className={`resize-none min-h-[180px] ${inputClass}`}
        {...rest}
      />
      {errorText && <Paragraph theme="error">{errorText}</Paragraph>}
    </div>
  );
});

TextArea.displayName = "TextArea";

export default TextArea;
