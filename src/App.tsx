import { useEffect, useState } from "react";
import WebApp from "@twa-dev/sdk"; // اصلاح وارد کردن WebApp به صورت default

const App = () => {
  const [user, setUser] = useState<{ first_name?: string } | null>(null);

  useEffect(() => {
    if (WebApp) {
      WebApp.ready();
      WebApp.expand();
  
      console.log("WebApp initDataUnsafe:", WebApp.initDataUnsafe); // لاگ کردن داده‌ها
  
      if (WebApp.initDataUnsafe) {
        if (WebApp.initDataUnsafe.user) {
          setUser(WebApp.initDataUnsafe.user);
        }
      }
      
      document.body.style.backgroundColor = WebApp.themeParams.bg_color;
      // document.body.style.color = WebApp.themeParams.text_color;
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
    <p>{JSON.stringify(user, null, 2)}</p>

    {user ? <p>سلام {user?.first_name}!</p> : <p>در حال دریافت اطلاعات...</p>}
  </div>  
  );
};

export default App;
