import Footer from "../components/Footer";
import Card from "../components/Card";
import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Food() {
  return (
    <div className="food">
      <header>
        <NavBar />
      </header>
      <SearchBar />
      <main className="food-main">
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
