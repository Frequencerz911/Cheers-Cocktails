import { Outlet } from "react-router-dom";
import "./App.css";
import "./styles/navBar.scss";
import "./styles/start.scss";
import "./styles/home.scss";
import "./styles/searchBarHome.scss";
import "./styles/login.scss";

function App() {
  return <Outlet />;
}

export default App;
