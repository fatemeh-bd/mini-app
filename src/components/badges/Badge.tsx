import React from "react";

const Badge = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`bg-secondary-100 shadow-[0px_0px_4px] shadow-secondary-500/60 rounded-full p-2 text-secondary-600 ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Badge;
