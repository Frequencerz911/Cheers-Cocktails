import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="error">
      <h1>404</h1>
      <video autoPlay muted loop className="background-video404">
        <source src="src/assets/video/404.mp4" type="video/mp4" />
      </video>
      <p>Oupss!! j'ai glissé chef</p>
      <Link to="/home">
        <button type="button" className="button404">
          Retour à l'acceuil
        </button>
      </Link>
    </div>
  );
}
