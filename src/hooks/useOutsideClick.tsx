import { useEffect } from "react";

function useOutsideClick(
  ref: React.RefObject<HTMLElement | null>,
  onOutsideClick: () => void,
  isActive: boolean
) {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isActive &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, onOutsideClick, isActive]);
}

export default useOutsideClick;
