export default function NavBar() {
  return (
    <section className="navbar-ctn">
      <img className="logo" src="./src/assets/img/Logo.png" alt="Logo" />
      <h1>Cheers&Cocktails</h1>
      <nav>
        <ul>
          <li>
            <a href="/#">Acceuil</a>
          </li>
          <li>
            <a href="/#">Boisson</a>
          </li>
          <li>
            <a href="/#">Apéritif</a>
          </li>
          <li>
            <a href="/#">Contact</a>
          </li>
        </ul>
      </nav>
    </section>
  );
}
