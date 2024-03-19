import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Contact() {
  const { user } = useContext(AuthContext);

  const [contactMail, setContactMail] = useState({
    email: user.email ? user.email : "",
    object: "",
    message: "",
  });

  const handleChangeMail = (e) => {
    const { name, value } = e.target;
    setContactMail({ ...contactMail, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, object, message } = contactMail;

    if (email === "" || object === "" || message === "") {
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/contacts`,
        contactMail
      );
    } catch (error) {
      console.warn("Une erreur est survenue!", error);
    }
  };

  return (
    <div className="contact">
      <NavBar />
      <h1>Contactez-nous</h1>
      <form className="form-ctn" method="post">
        <label form="email">
          <h2>Email:</h2>
          <input
            type="text"
            placeholder="Adresse Email"
            name="email"
            autoComplete="off"
            value={contactMail.email}
            onChange={handleChangeMail}
          />
        </label>
        <label form="name">
          <h2>Objet:</h2>
          <input
            type="text"
            placeholder="Objet"
            name="object"
            autoComplete="off"
            value={contactMail.object}
            onChange={handleChangeMail}
          />
        </label>
        <label form="message">
          <h2>Message:</h2>
          <textarea
            placeholder="Message"
            name="message"
            autoComplete="off"
            value={contactMail.message}
            onChange={handleChangeMail}
          />
        </label>
        <button
          type="button"
          className="btn-send"
          onClick={handleSubmit}
          aria-hidden="true"
        >
          Envoyer
        </button>
      </form>
      <Footer />
    </div>
  );
}
