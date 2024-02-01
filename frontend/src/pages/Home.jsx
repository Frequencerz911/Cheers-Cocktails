import SearchBarHome from "../components/homepage/SearchBarHome";

import NavBar from "../components/NavBar";

export default function Home() {
  return (
    <div className="home">
      <header>
        <NavBar />
      </header>
      <main>
        <SearchBarHome />
      </main>
    </div>
  );
}
