import { Link } from "react-router-dom";
import "../styles/start.scss";

export default function Start() {
  return (
    <section className="start-ctn">
      <h1>Cheers & Cocktails</h1>
      <img src="./src/assets/img/pool-bar.jpg" alt="Bar ambiance détente" />
      <div className="btn-ctn">
        <Link to="/home" className="btn-link">
          <button type="button">Bienvenu</button>
        </Link>
      </div>
      <p>Des amis, des cocktails, du bonheur !</p>
    </section>
  );
}
