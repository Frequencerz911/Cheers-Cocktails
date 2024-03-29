import { Outlet } from "react-router-dom";
import "./styles/App.scss";
import "./styles/navBar.scss";
import "./styles/start.scss";
import "./styles/home.scss";
import "./styles/login.scss";
import "./styles/contact.scss";
import "./styles/card.scss";
import "./styles/register.scss";
import "./styles/food.scss";
import "./styles/drink.scss";
import "./styles/error.scss";
import "./styles/profile.scss";
import "./styles/recipe.scss";
import "./styles/ManageContact.scss";
import "./styles/profileU.scss";

function App() {
  return <Outlet />;
}

export default App;
