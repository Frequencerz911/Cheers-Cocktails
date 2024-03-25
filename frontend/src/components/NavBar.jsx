import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logoImg from "../assets/img/Logo.svg";
import logoBurger from "../assets/img/menu.png";
import logoClose from "../assets/img/close.png";
import Logout from "./Logout";
import { AuthContext } from "../contexts/AuthContext";

export default function NavBar() {
  const [click, setClick] = useState(false);
  const { user } = useContext(AuthContext);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <nav className="navbar">
      <section className="navbar-ctn">
        <Link to="/" className="nav-logo">
          <img className="logo" src={logoImg} alt="Logo" />
        </Link>
        <h1 className="title">Cheers&Cocktails</h1>
        <div className="menu-icon" onClick={handleClick} aria-hidden="true">
          <img
            src={click ? logoClose : logoBurger}
            alt={click ? logoClose : logoBurger}
          />
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          {user.id ? <p>Bonjour {user.nickname}</p> : ""}
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
          {user.role_id === 3 ? (
            <li className="nav-item">
              <Link
                to="/profil"
                className="nav-link"
                onClick={() => {
                  setClick(false);
                }}
              >
                Profil
              </Link>
            </li>
          ) : (
            ""
          )}
          {user.role_id === 1 ? (
            <li className="nav-item">
              <Link
                to="/user/recipe"
                className="nav-link"
                onClick={() => {
                  setClick(false);
                }}
              >
                Recipe
              </Link>
            </li>
          ) : (
            ""
          )}
          {user.role_id === 1 ? (
            <li className="nav-item">
              <Link
                to="/user/contact"
                className="nav-link"
                onClick={() => {
                  setClick(false);
                }}
              >
                Contact
              </Link>
            </li>
          ) : (
            ""
          )}
          {user.role_id === 1 ? (
            <li className="nav-item">
              <Link
                to="/user/profil"
                className="nav-link"
                onClick={() => {
                  setClick(false);
                }}
              >
                Profil
              </Link>
            </li>
          ) : (
            ""
          )}
          {user.id ? <Logout /> : ""}
          {user.role_id === 3 ? <Logout /> : ""}
        </ul>
      </section>
    </nav>
  );
}
