import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthContextProvider } from "./contexts/AuthContext";

import App from "./App";

import Start from "./pages/Start";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Drink from "./pages/Drink";
import Food from "./pages/Food";
import Contact from "./pages/Contact";
import ErrorPage from "./pages/ErrorPage";
import Register from "./pages/Register";
import Profile from "./pages/admin/ProfileA";
import { RecipeProvider } from "./contexts/RecipeContext";
import Logout from "./components/Logout";
import Recipes from "./pages/admin/AddRecipe";
import ManageContact from "./pages/admin/ManageContact";
import ProfileU from "./pages/ProfileU";

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Start />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/drink",
        element: <Drink />,
      },
      {
        path: "/food",
        element: <Food />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/user/profil",
        element: <Profile />,
      },
      {
        path: "/user/recipe",
        element: <Recipes />,
      },
      {
        path: "/user/contact",
        element: <ManageContact />,
      },
      {
        path: "/profil",
        element: <ProfileU />,
      },
      {
        path: "/user/logout",
        element: <Logout />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipeProvider>
        <RouterProvider router={router} />
      </RecipeProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
