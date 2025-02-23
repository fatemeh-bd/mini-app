import Lottie from "lottie-react";
import emoji from "../../assets/splash.json";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3500);

    const hideTimer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 4000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!showSplashScreen) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center w-full h-screen bg-white 
      transition-opacity duration-500 ${fadeOut ? "opacity-0" : "opacity-100 z-50"}`}
    >
      <Lottie animationData={emoji} loop={true} className="w-[220px]" />
    </div>
  );
};

export default SplashScreen;
