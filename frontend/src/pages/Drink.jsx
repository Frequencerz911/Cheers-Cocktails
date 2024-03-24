import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import RecipeCtn from "../components/recipeCtn";

export default function Drink() {
  return (
    <div className="drink">
      <NavBar />
      <h1>Vous avez soif ? Alors vous êtes au bon endroit.</h1>
      <RecipeCtn />
      <Footer />
    </div>
  );
}
