import { Link } from "react-router-dom";

import NavBar from "../components/NavBar";

export default function Register() {
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
            <input type="text" name="firstname" placeholder="Prénom" />
            <label htmlFor="lastname">
              Nom <span className="field">:</span>
            </label>
            <input type="text" name="lastname" placeholder="Nom" />
            <label htmlFor="nickname">
              Pseudo <span className="field">:</span>
            </label>
            <input type="text" name="nickname" placeholder="Pseudo" />
            <label htmlFor="email">
              Adresse email <span className="field">:</span>
            </label>
            <input type="text" name="email" placeholder="example@gmail.com" />
            <label htmlFor="password">
              Mot de passe <span className="field">:</span>
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Mot de passe"
            />
          </form>
        </main>
        <div className="footer-register">
          <button type="button">S'inscrire</button>
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
