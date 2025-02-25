import React from "react";

const Badge = ({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  return (
    <div
      onClick={onClick}
      className={`bg-secondary-100 shadow-[0px_0px_4px] shadow-secondary-500/60 rounded-full p-2 text-secondary-600 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Badge;
