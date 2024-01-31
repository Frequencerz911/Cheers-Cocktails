import { Outlet } from "react-router-dom";
import "./App.css";
import "./styles/navBar.scss";
import "./styles/start.scss";
import "./styles/home.scss";

function App() {
  return (
    <main>
      <Outlet />
    </main>
  );
}

export default App;
