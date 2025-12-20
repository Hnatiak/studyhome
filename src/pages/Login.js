import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(username, password);

    if (!success) {
      setError("Невірний логін або пароль");
      return;
    }

    navigate("/dashboard");
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Вхід</h2>

      <input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button>Увійти</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default Login;