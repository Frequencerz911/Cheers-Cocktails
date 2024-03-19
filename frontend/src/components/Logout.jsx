import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Logout() {
  const { handleLogout, userMode } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <section className="backdrop">
      <div className="logout">
        <h2 className={userMode()}>
          Etes-vous sûr de vouloir vous déconnecter ?
        </h2>
        <div>
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
      </div>
    </section>
  );
}
