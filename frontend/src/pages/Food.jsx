import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import RecipeCtn from "../components/recipeCtn";

export default function Food() {
  return (
    <div className="food">
      <NavBar />
      <SearchBar />
      <h1>Vous avez faim ? Alors vous êtes au bon endroit.</h1>
      <RecipeCtn />
      <Footer />
    </div>
  );
}
