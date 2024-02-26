import Footer from "../components/Footer";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Drink() {
  return (
    <div className="drink">
      <header>
        <NavBar />
      </header>
      <SearchBar />
      <main className="drink-main">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
