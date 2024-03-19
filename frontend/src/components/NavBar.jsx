import { useState } from "react";
import { Link } from "react-router-dom";
import Logout from "./Logout";

export default function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <nav className="navbar">
      <section className="navbar-ctn">
        <Link to="/" className="nav-logo">
          <img className="logo" src="./src/assets/img/Logo.svg" alt="Logo" />
        </Link>
        <h1>Cheers&Cocktails</h1>
        <div className="menu-icon" onClick={handleClick} aria-hidden="true">
          <img
            src={
              click ? "./src/assets/img/close.png" : "./src/assets/img/menu.png"
            }
            alt={
              click ? "./src/assets/img/close.png" : "./src/assets/img/menu.png"
            }
          />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link
              to="/home"
              className="nav-link"
              onClick={() => {
                setClick(false);
              }}
            >
              Accueil
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/drink"
              className="nav-link"
              onClick={() => {
                setClick(false);
              }}
            >
              Boisson
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/food"
              className="nav-link"
              onClick={() => {
                setClick(false);
              }}
            >
              Nourriture
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className="nav-link"
              onClick={() => {
                setClick(false);
              }}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-link"
              onClick={() => {
                setClick(false);
              }}
            >
              Connexion
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/profile"
              className="nav-link"
              onClick={() => {
                setClick(false);
              }}
            >
              Profil
            </Link>
          </li>
          <Logout />
        </ul>
      </section>
    </nav>
  );
}
