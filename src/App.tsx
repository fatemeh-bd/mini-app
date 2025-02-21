
import { useEffect, useState } from "react";
      {/*  @ts-ignore */}
import { WebApp } from "@twa-dev/sdk";


const App = () => {
  const [user, setUser] = useState<{ first_name?: string } | null>(null);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    setUser(WebApp.initDataUnsafe.user);
    document.body.style.backgroundColor = WebApp.themeParams.bg_color;
    // document.body.style.color = WebApp.themeParams.text_color;
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
    {user ? <p>سلام {user?.first_name}!</p> : <p>در حال دریافت اطلاعات...</p>}
  </div>  
  )
}  

export default App

