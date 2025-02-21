import { useEffect, useState } from "react";
import { WebApp } from "@twa-dev/sdk";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    setUser(WebApp.initDataUnsafe.user);
  }, []);

  return (
    <div style={{ backgroundColor: WebApp.themeParams.bg_color, color: WebApp.themeParams.text_color, padding: "20px", textAlign: "center" }}>
      <h1>وب اپ تلگرام</h1>
      
      {user ? <p>سلام {user?.first_name}!</p> : <p>در حال دریافت اطلاعات...</p>}
    </div>
  );
}

export default App;
