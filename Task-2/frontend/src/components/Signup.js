import axios from "axios";
import { useState } from "react";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      const response = axios.post("/register", {
        name,
        username: email,
        password,
      });
      console.log(response);
    }
  };

  return (
    <div className="signup-container text-center">
      <form onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setconfirmPassword(e.target.value)}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
