import Card from "../components/Card";
import SearchBar from "../components/SearchBar";

import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="home">
      <header>
        <NavBar />
      </header>
      <SearchBar />
      <main>
        <Card />
        <Card />
        <Card />
        <Card />
      </main>
      <footer>blabla</footer>
    </div>
  );
}
