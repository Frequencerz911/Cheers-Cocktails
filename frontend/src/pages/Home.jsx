import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import RecipeCtn from "../components/recipeCtn";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <h1 className="title-home">Les derniers ajouts du mois. </h1>
      <RecipeCtn />
      <Footer />
    </div>
  );
}
