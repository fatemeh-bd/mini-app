import React from "react";

const Title = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-lg font-medium">{children}</h1>;
};

export default Title;
