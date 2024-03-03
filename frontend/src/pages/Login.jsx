import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { AuthContext } from "../contexts/AuthContext";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Login() {
  const { handleAuth } = useContext(AuthContext);

  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const redirectTo = async () => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      const decodeToken = jwtDecode(getToken);
      const userId = decodeToken.user_id;

      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`
        );

        if (data) {
          return navigate("/home");
        }
      } catch (error) {
        console.warn("Une erreur est survenue!", error);
      }
    }
    return navigate("/home");
  };

  const handleLoginRegister = (event) => {
    const { name, value } = event.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (email === "" || password === "") {
      return;
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth`,
        loginInfo
      );
      await localStorage.setItem("token", res.data.token);
      await handleAuth();
      redirectTo();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <NavBar />
      <section className="login-ctn">
        <header>
          <h2>Connexion</h2>
        </header>
        <main className="content-login">
          <form>
            <h3>Email:</h3>
            <input
              type="text"
              name="email"
              placeholder="votremail@gmail.com"
              value={loginInfo.email}
              onChange={handleLoginRegister}
            />
            <h3>Mot de Passe :</h3>
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
              value={loginInfo.password}
              onChange={handleLoginRegister}
            />
          </form>
        </main>
        <button type="button" onClick={handleLogin}>
          Se connecter
        </button>
        <div className="Sign-up">
          Tu n'as pas encore de compte ?{" "}
          <Link className="text-link" to="/register">
            Inscrit toi ici !
          </Link>{" "}
        </div>
      </section>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
