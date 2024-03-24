import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
  const { handleLogout, userMode } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="backdrop">
      <div className="logout">
        <button
          type="button"
          className={userMode()}
          onClick={() => {
            handleLogout();
            navigate("/");
          }}
        >
          Me déconnecter
        </button>
      </div>
    </section>
  );
}
