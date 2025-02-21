import { useState } from "react";
import axios from "axios";


const Login = ({ setToken }: { setToken: (token: string | null) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
    } catch (error) {
      alert("Ошибка авторизации");
    }
  };
  const handleNoSessionLogin = async () => {
      try {
        localStorage.setItem('token','guest');
        setToken('guest');
      } catch (error) {
        alert("Ошибка авторизации");
      }
  }

  return (
    <div className="m-3 w-50 m-auto">
      <h2>Вход</h2>
      <input type="email" placeholder="Email"  className="form-control mb-3 w-25" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" className="form-control mb-3 w-25" value={password} onChange={(e) => setPassword(e.target.value)} />
      <div className="mb-2 d-flex">
      <button className="btn btn-info" onClick={handleLogin}>Войти с полными правами</button>
      <button className="btn btn-warning" onClick={handleNoSessionLogin}>Войти как гость</button>
      </div>
    </div>
  );
};

export default Login;
