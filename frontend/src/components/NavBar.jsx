import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <section className="navbar-ctn">
      <img className="logo" src="./src/assets/img/Logo.svg" alt="Logo" />
      <h1>Cheers&Cocktails</h1>
      <nav>
        <ul>
          <li>
            <Link to="/home" className="btn-link">
              Acceuil
            </Link>
          </li>
          <li>
            <Link to="/drink" className="btn-link">
              Boisson
            </Link>
          </li>
          <li>
            <Link to="/food" className="btn-link">
              Nourriture
            </Link>
          </li>
          <li>
            <Link to="/contact" className="btn-link">
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login" className="btn-link">
              Connexion
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  );
}
