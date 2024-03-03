import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";

import NavBar from "../components/NavBar";

export default function Register() {
  const [registerInfo, setRegisterInfo] = useState({
    firstname: "",
    lastname: "",
    nickname: "",
    email: "",
    password: "",
    is_admin: false,
  });
  const [errMessage, setErrMessage] = useState("");

  const navigate = useNavigate();

  const handleChangeRegister = (event) => {
    const { name, value } = event.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };

  useEffect(() => {
    setErrMessage("");
  }, [registerInfo]);

  const handleRegister = async (event) => {
    event.preventDefault();
    const { firstname, lastname, nickname, password, email } = registerInfo;
    console.info(registerInfo);
    if (
      firstname === "" ||
      lastname === "" ||
      nickname === "" ||
      password === "" ||
      email === ""
    ) {
      setErrMessage("Merci de remplir tous les champs");
      return;
    }

    setErrMessage("");
    try {
      const resregister = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/register`,
        registerInfo
      );

      if (resregister.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <NavBar />
      <section className="register">
        <header>
          <h2>Inscription</h2>
        </header>
        <main className="content-register">
          <form>
            <label htmlFor="firstname">
              Prénom <span className="field">:</span>
            </label>
            <input
              type="text"
              name="firstname"
              placeholder="Prénom"
              value={registerInfo.firstname}
              onChange={handleChangeRegister}
            />
            <label htmlFor="lastname">
              Nom <span className="field">:</span>
            </label>
            <input
              type="text"
              name="lastname"
              placeholder="Nom"
              value={registerInfo.lastname}
              onChange={handleChangeRegister}
            />
            <label htmlFor="nickname">
              Pseudo <span className="field">:</span>
            </label>
            <input
              type="text"
              name="nickname"
              placeholder="Pseudo"
              value={registerInfo.pseudo}
              onChange={handleChangeRegister}
            />
            <label htmlFor="email">
              Adresse email <span className="field">:</span>
            </label>
            <input
              type="text"
              name="email"
              placeholder="example@gmail.com"
              value={registerInfo.email}
              onChange={handleChangeRegister}
            />
            <label htmlFor="password">
              Mot de passe <span className="field">:</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mot de passe"
              value={registerInfo.password}
              onChange={handleChangeRegister}
            />
          </form>
        </main>
        <div className="footer-register">
          <p className="err-msg">{errMessage}</p>
          <button type="button" onClick={handleRegister}>
            S'inscrire
          </button>
          <p>
            J'ai déjà un compte :{" "}
            <Link className="text-link" to="/login">
              connexion
            </Link>{" "}
          </p>
        </div>
      </section>
    </>
  );
}
