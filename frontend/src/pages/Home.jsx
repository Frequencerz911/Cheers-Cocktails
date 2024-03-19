import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import RecipeCtn from "../components/recipeCtn";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <SearchBar />
      <h1>Les derniers ajouts du mois. </h1>
      <RecipeCtn />
      <Footer />
    </div>
  );
}
