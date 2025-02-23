import Lottie from "lottie-react";
import emoji from "../../assets/splash.json";
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
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(hideSplashScreen);
    };
  }, []);
  return (
    showSplashScreen && (
      <div className="p-10 fixed z-50 flex items-center justify-center inset-0 w-full h-screen bg-white">
        <Lottie animationData={emoji} loop={true} className="w-[270px]" />
      </div>
    )
  );
};

export default SplashScreen;
