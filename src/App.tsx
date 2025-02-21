
import { useEffect, useState } from "react";
      {/*  @ts-ignore */}
import { WebApp } from "@twa-dev/sdk";


const App = () => {
  const [user, setUser] = useState<{ first_name?: string } | null>(null);

  useEffect(() => {
      {/*  @ts-ignore */}
    if (window.WebApp) {
      {/*  @ts-ignore */}

      window.WebApp.ready();
      {/*  @ts-ignore */}

      window.WebApp.expand();
      {/*  @ts-ignore */}

      setUser(window.WebApp.initDataUnsafe.user);
      {/*  @ts-ignore */}

      document.body.style.backgroundColor = window.WebApp.themeParams.bg_color;
      // document.body.style.color = window.WebApp.themeParams.text_color;
    } else {
      console.error("WebApp is not loaded");
    }
  }, []);
  
  return (
    <div
    // style={{
    //   backgroundColor: WebApp.themeParams.bg_color,  
    //   color: WebApp.themeParams.text_color,
    //   padding: "20px",
    //   textAlign: "center",
    // }}
  >
    <h1 style={{color:"red"}}>وب اپ تلگرام</h1>
    <p>{JSON.stringify(user)}</p>
    {user ? <p>سلام {user?.first_name}!</p> : <p>در حال دریافت اطلاعات...</p>}
  </div>  
  )
}  

export default App

