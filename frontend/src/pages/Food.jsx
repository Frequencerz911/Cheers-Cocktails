import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";

export default function Food() {
  return (
    <div className="food">
      <header>
        <NavBar />
      </header>
      <main>
        <SearchBar />
      </main>
    </div>
  );
}
