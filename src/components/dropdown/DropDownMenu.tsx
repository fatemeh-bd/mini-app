import React, { useState, useRef } from "react";
import useOutsideClick from "../../hooks/useOutsideClick";

const DropdownMenu = ({
  children,
  component,
  isOpenLeft,
}: {
  children: React.ReactNode;
  component: React.ReactNode;
  isOpenLeft?: boolean;
}) => {
  const [showProfileItem, setShowProfileItem] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  useOutsideClick(menuRef, () => setShowProfileItem(false), showProfileItem);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setShowProfileItem(!showProfileItem)}>
        {component}
      </div>
      <div
        className={`absolute ${
          isOpenLeft ? "left-0" : "right-0"
        } top-12 z-10 bg-white border border-gray-200 shadow-lg rounded-lg min-w-36 transition-all duration-300 ${
          showProfileItem ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default DropdownMenu;
