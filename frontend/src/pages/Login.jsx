import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import NavBar from "../components/NavBar";

export default function Login() {
  const [isLoginFormVisible, setLoginFormVisible] = useState(true);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLoginRegister = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;

    if (email === "" || password === "") {
      return;
    }

    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/api/login`, loginInfo, {
        withCredentials: true,
      })
      .then(() => navigate("/login"))
      .catch((err) => {
        console.error(err);
      });
  };
  return (
    <>
      <NavBar />
      <div className="wrapper">
        <div className="title-text">
          <div className={`title ${isLoginFormVisible ? "login" : "signup"}`}>
            {isLoginFormVisible ? "Se connecter" : "S'inscrire"}
          </div>
        </div>
        <div className="form-container">
          <div className="slide-controls">
            <input
              type="radio"
              name="slide"
              id="login"
              checked={isLoginFormVisible}
              onChange={() => setLoginFormVisible(true)}
            />
            <input
              type="radio"
              name="slide"
              id="signup"
              checked={!isLoginFormVisible}
              onChange={() => setLoginFormVisible(false)}
            />
            <label htmlFor="login" className="slide login">
              Connexion
            </label>
            <label htmlFor="signup" className="slide signup">
              Inscription
            </label>
            <div className="slider-tab" />
          </div>
          <div className="form-inner">
            {isLoginFormVisible ? (
              <form action="#" className="login">
                <div className="field">
                  <input
                    type="text"
                    placeholder="Adresse Email"
                    name="email"
                    value={loginInfo.email}
                    onChange={handleLoginRegister}
                  />
                </div>
                <div className="field">
                  <input
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={loginInfo.password}
                    onChange={handleLoginRegister}
                  />
                </div>
                <div className="pass-link">
                  <a href="/forgot-password">Mot de passe oublié ?</a>
                </div>
                <div className="field btn" onClick={handleLogin} aria-hidden>
                  <div
                    type="button"
                    className="btn-layer"
                    onClick={handleLogin}
                    aria-hidden
                  />
                  <input type="submit" value="Se Connecter" />
                </div>
                <div className="signup-link">
                  Pas encore membre ? <a href="/signup">S'inscrire</a>
                </div>
              </form>
            ) : (
              <form action="#" className="signup">
                <div className="field">
                  <input type="text" placeholder="Adresse Email" required />
                </div>
                <div className="field">
                  <input type="password" placeholder="Mot de passe" required />
                </div>
                <div className="field">
                  <input
                    type="password"
                    placeholder="Confirmer mot de passe"
                    required
                  />
                </div>
                <div className="field btn">
                  <div className="btn-layer" />
                  <input
                    type="submit"
                    value="S'Inscrire"
                    className="submit btn"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
