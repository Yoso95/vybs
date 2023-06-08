import { useToken } from "./token";
import { useNavigate } from "react-router-dom";
import "./user.css";

function Logout() {
  const { logout } = useToken();
  const navigate = useNavigate();

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  return (
    <div
      className="user_component"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Leaving?</h1>
        <button
          type="button"
          className="btn btn-dark btn-lg"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Logout;
