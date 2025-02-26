import { useEffect } from "react";
import NavBar from "../components/navBar/NavBar";

const Setting = () => {
  useEffect(() => {
    let meta = document.querySelector('meta[name="theme-color"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "theme-color";
      document.head.appendChild(meta);
    }
    
    meta.setAttribute("content", "#007bff");

    return () => {
      meta.setAttribute("content", "#ffffff");
    };
    
  }, []);

  return (
    <div>
      <div className="curvyHeader bg-primary p-10 -mt-4"></div>
      <NavBar />
    </div>
  );
};

export default Setting;
