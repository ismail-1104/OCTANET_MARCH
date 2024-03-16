import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post("/login", { username, password });
  };

  return (
    <div className="signup-container text-center">
      <form onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>User name</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>
      </form>
    </div>
  );
};

export default Login;
