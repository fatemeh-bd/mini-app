import Lottie from "lottie-react";
import emoji from "../../assets/splash.json";
import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      setShowSplashScreen(false);
    }, 4500);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!showSplashScreen) return null;

  return (
    <div
      className={`fixed flex-col inset-0 flex items-center justify-center w-full h-[100svh] bg-white 
      transition-opacity duration-1000 ${fadeOut ? "opacity-0" : "opacity-100 z-50"}`}
    >
      <Lottie animationData={emoji} loop={true} className="w-[220px]" />
      <h1 className="mt-2 text-secondary-800 text-3xl text-center mx-auto font-bold">
        Nexo
      </h1>
    </div>
  );
};

export default SplashScreen;
