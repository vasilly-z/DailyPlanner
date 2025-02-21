import { useState, useEffect } from "react";
import Schedule from "./Schedule";
import Login from "./Login";
import axios from "axios";

const App = () => {
  const [token, setToken] = useState<string | null >(localStorage.getItem("token"));

  useEffect(() => {
    if (!token || token !== 'guest') return;
    axios
      .get("http://localhost:5000/check-session", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        if (!res.data.valid) {
          localStorage.removeItem("token");
          setToken(null);
        }
      });
  }, [token]);

  return <div>{token? <Schedule token={token} setToken={setToken} /> : <Login setToken={setToken} />}
         </div>;
};

export default App;
