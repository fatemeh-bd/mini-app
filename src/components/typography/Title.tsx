import React from "react";

const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <h1 className={`text-lg font-medium ${className || ""}`}>{children}</h1>
  );
};

export default Title;
