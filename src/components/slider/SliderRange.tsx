import { useState, useRef, useEffect } from "react";
import Paragraph from "../typography/Paragraph";

type SliderProps = {
  min?: number;
  max?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
};

const SliderRange = ({
  min = 0,
  max = 150,
  defaultValue = 30,
  onChange,
}: SliderProps) => {
  const [value, setValue] = useState(defaultValue);
  const sliderRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const progress = ((value - min) / (max - min)) * 100;

  const updateValueFromEvent = (
    e: MouseEvent | React.MouseEvent | TouchEvent | React.TouchEvent
  ) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let clientX: number;
  
    // Check if it's a touch event
    if ('touches' in e && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
    } else {
      clientX = (e as MouseEvent | React.MouseEvent).clientX;
    }
  
    let newProgress = ((clientX - rect.left) / rect.width) * 100;
    newProgress = Math.min(Math.max(newProgress, 0), 100);
    const newValue = Math.round((newProgress / 100) * (max - min) + min);
    setValue(newValue);
    if (onChange) onChange(newValue);
  };
  

  const handleMouseDown = (e: React.MouseEvent) => {
    dragging.current = true;
    updateValueFromEvent(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (dragging.current) {
      updateValueFromEvent(e);
    }
  };

  const handleMouseUp = () => {
    dragging.current = false;
  };
  const handleTouchStart = (e: React.TouchEvent) => {
    dragging.current = true;
    updateValueFromEvent(e);
  };
  const handleTouchMove = (e: TouchEvent) => {
    if (dragging.current) {
      updateValueFromEvent(e);
    }
  };

  const handleTouchEnd = () => {
    dragging.current = false;
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);
  return (
    <div className="col-span-2 spinOnce flex items-center gap-2 flex-nowrap  w-full m-auto mt-12">
      <div className="py-1 relative w-full" ref={sliderRef}>
        <div className="h-2 bg-secondary-200 rounded-full relative">
          <div
            className="absolute h-2 rounded-full bg-primary"
            style={{ width: `${progress}%` }}
          ></div>
          <div
            className="absolute h-4 flex items-center justify-center w-4 rounded-full bg-white shadow border border-secondary-500 -ml-2 -top-1 cursor-pointer select-none"
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            style={{ left: `${progress}%` }}
          >
            <div className="relative -mt-2 w-1">
              <div
                className="absolute z-40 opacity-100 bottom-full mb-2 left-0 min-w-full"
                style={{ marginLeft: "-20.5px" }}
              >
                <div className="relative shadow-md">
                  <div className="bg-black -mt-8 text-white truncate text-xs rounded py-1 px-4">
                    {value} GB
                  </div>
                  <svg
                    className="absolute text-black w-full h-2 left-0 top-full"
                    viewBox="0 0 255 255"
                    xmlSpace="preserve"
                  >
                    <polygon
                      className="fill-current"
                      points="0,0 127.5,127.5 255,0"
                    ></polygon>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Paragraph light className="text-nowrap">
        {max} GB
      </Paragraph>
    </div>
  );
};

export default SliderRange;
