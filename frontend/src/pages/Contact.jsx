export default function Contact() {
  return (
    <div className="contact">
      <h1>Contactez-nous</h1>
      <form name="contact" method="post">
        <label form="name">
          Nom:
          <input type="text" value="name" />
        </label>
        <label form="email">
          Email:
          <input type="email" value="email" />
        </label>
        <label form="message">
          Message:
          <textarea value="message" />
        </label>
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
}
