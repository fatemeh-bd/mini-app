import React from "react";

const Paragraph = ({
  children,
  light,
  className,
}: {
  children: React.ReactNode;
  light?: boolean;
  className?: string;
}) => {
  return (
    <p
      className={`${
        light ? "text-secondary-500" : "text-secondary-600"
      } text-base ${className || ""}`}
    >
      {children}
    </p>
  );
};

export default Paragraph;
