import React from "react";

const Paragraph = ({
  children,
  light,
  className,
  theme,
}: {
  theme?: "error";
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) => {
  return (
    <p
      className={`${
        theme === "error" ? "text-error" : "text-secondary-600"
      } text-base ${light ? "opacity-50" : ""} ${className || ""}`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
