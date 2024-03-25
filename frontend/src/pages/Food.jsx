import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import RecipeCtn from "../components/recipeCtn";

export default function Food() {
  return (
    <div className="food">
      <NavBar />
      <h1 className="title-food">
        Vous avez faim ? Alors vous êtes au bon endroit.
      </h1>
      <RecipeCtn />
      <Footer />
    </div>
  );
}
