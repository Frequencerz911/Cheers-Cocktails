import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";

export default function Login() {
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
            <input type="text" name="email" placeholder="votremail@gmail.com" />
            <h3>Mot de Passe :</h3>
            <input
              type="password"
              name="password"
              placeholder="Votre mot de passe"
            />
          </form>
        </main>
        <button type="button">Se connecter</button>
        <div className="Sign-up">
          Tu n'as pas encore de compte ?{" "}
          <Link className="text-link" to="/register">
            Inscrit toi ici !
          </Link>{" "}
        </div>
      </section>
    </>
  );
}
