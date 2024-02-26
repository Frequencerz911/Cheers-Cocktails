import Footer from "../components/Footer";
import NavBar from "../components/NavBar";

export default function Contact() {
  return (
    <>
      <NavBar />
      <div className="contact">
        <h1>Contactez-nous</h1>
        <form className="form-ctn" method="post">
          <label form="name">
            <h2>Nom:</h2>
            <input type="text" placeholder="Nom" name="nom" />
          </label>
          <label form="email">
            <h2>Email:</h2>
            <input type="text" placeholder="Adresse Email" name="email" />
          </label>
          <label form="message">
            <h2>Message:</h2>
            <textarea placeholder="Message" name="message" />
          </label>
          <button type="button" className="btn-send">
            Envoyer
          </button>
        </form>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
}
