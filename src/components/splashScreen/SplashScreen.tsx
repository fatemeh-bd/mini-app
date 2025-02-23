import Lottie from "lottie-react";
import emoji from "../../assets/_DUCK8_SAD_OUT.json";
import { useEffect, useRef, useState } from "react";

const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (ref.current) {
        ref.current.style.opacity = "0";
      }
    }, 1000);

    const hideSplashScreen = setTimeout(() => {
      setShowSplashScreen(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideSplashScreen);
    };
  }, []);
  return (
    showSplashScreen && (
      <div>
        <Lottie animationData={emoji} loop={true} />
      </div>
    )
  );
};

export default SplashScreen;
