import { useToken } from "./token";
import { useState } from "react";

function BootstrapInput(props) {
  const { id, placeholder, labelText, value, onChange, type } = props;

  return (
    <div className="mb-1">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      ></input>
    </div>
  );
}

function Login() {
  const { token, login } = useToken();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    login(username, password);
    localStorage.setItem(token, "tokenValue");
  }

  return (
    <div className="user_component" style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}></div>
        <div className="accountpagecontainer">
          <div className="card">
            <form onSubmit={handleSubmit}>
              <h3 className="card-title">Log in</h3>
              <BootstrapInput
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <BootstrapInput
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button type="submit" className="btn btn-dark">
                LOG IN
              </button>
            </form>
          </div>
        </div>
    </div>
  );
}
export default Login;
