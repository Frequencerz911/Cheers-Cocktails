import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="home">
      <header>
        <NavBar />
      </header>
      <SearchBar />
      <main className="home-main">
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
