import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";

export default function ProfileU() {
  const { user, setUser } = useContext(AuthContext);
  const { handleLogout, userMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editInfo, setEditInfo] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    nickname: user.nickname,
    email: user.email,
    password: "",
    confirmPassword: "",
  });

  const handleEditInfo = (e) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });
  };

  const deleteUsers = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}`
      );

      if (response.status !== 200) {
        console.error("Server response:", response.statusText);
        return;
      }
      setUser({});
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <NavBar />
      <section className="Profile">
        <h1>Profile</h1>
        <form className="profil-form">
          <label>
            <input
              type="name"
              name="firstname"
              placeholder="Prenom"
              autoComplete="firstname"
              value={editInfo.firstname}
              onChange={handleEditInfo}
            />
          </label>
          <label>
            <input
              type="name"
              name="lastname"
              placeholder="Nom"
              autoComplete="lastname"
              value={editInfo.lastname}
              onChange={handleEditInfo}
            />
          </label>
          <label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="email"
              value={editInfo.email}
              onChange={handleEditInfo}
            />
          </label>
          <label>
            <input
              type="name"
              name="nickname"
              placeholder="Pseudo"
              autoComplete="nickname"
              value={editInfo.nickname}
              onChange={handleEditInfo}
            />
          </label>
          <label>
            <input
              type="text"
              name="password"
              placeholder="Mot de passe"
              autoComplete="off"
              value={editInfo.password}
              onChange={handleEditInfo}
            />
          </label>
          <label>
            <input
              type="text"
              name="confirmPassword"
              placeholder="Confirmer mot de passe"
              autoComplete="off"
              value={editInfo.confirmPassword}
              onChange={handleEditInfo}
            />
          </label>
          <button type="button">modifier le compte</button>
          <button type="button" onClick={deleteUsers(user.id)}>
            Supprimer le compte
          </button>
          <button
            type="button"
            className={userMode()}
            onClick={() => {
              handleLogout();
              navigate("/login");
            }}
          >
            Me déconnecter
          </button>
        </form>
      </section>
    </>
  );
}
