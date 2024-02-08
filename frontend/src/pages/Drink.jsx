import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Drink() {
  return (
    <div className="drink">
      <header>
        <NavBar />
      </header>
      <main>
        <SearchBar />
      </main>
    </div>
  );
}
