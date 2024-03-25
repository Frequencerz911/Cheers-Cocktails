import React, { useEffect, useState } from "react";
import axios from "axios";
import NavBar from "../../components/NavBar";

export default function Recipes() {
  const [recipes, setrecipes] = useState([]);
  const [filter, setFilter] = useState({ title: "" });

  const recipesData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`
      );

      setrecipes(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  const deleterecipes = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}`
      );

      if (response.status !== 200) {
        console.error("Server response:", response.statusText);
        return;
      }
      setrecipes(recipes.filter((currentrecipe) => currentrecipe.id !== id));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleFilterChange = (e, field) => {
    setFilter({
      ...filter,
      [field]: e.target.value,
    });
  };

  const filteredrecipes = recipes.filter((recipe) => {
    return Object.keys(filter).every((field) => {
      if (filter[field] === "") return true;
      return String(recipe[field])
        .toLowerCase()
        .includes(filter[field].toLowerCase());
    });
  });

  useEffect(() => {
    recipesData();
  }, []);

  return (
    <section className="List-recipes">
      <NavBar />
      <h2>Liste des recettes enregistrés</h2>
      <input
        className="filter-recipes"
        type="text"
        placeholder="Filtrer par Titre"
        value={filter.firstname}
        onChange={(e) => handleFilterChange(e, "title")}
      />
      <div className="title-recipes">
        <h3>Id</h3>
        <h3>Titre</h3>
        <h3>Difficulté</h3>
        <h3>Temps de préparation</h3>
        <h3>Partagé</h3>
        <h3>Approuvé</h3>
        <h3>Utilisateur</h3>
        <h3>Supression</h3>
      </div>
      {filteredrecipes?.map((currentrecipe) => {
        return (
          <div className="body-recipes" key={currentrecipe.id}>
            <p>{currentrecipe.id}</p>
            <p>{currentrecipe.title}</p>
            <p>{currentrecipe.difficulty}</p>
            <p>{currentrecipe.preparation_time}</p>
            <p>{currentrecipe.is_shared ? "Oui" : "Non"}</p>
            <p>{currentrecipe.is_approved ? "Oui" : "Non"}</p>
            <p>{currentrecipe.nickname}</p>
            <button
              type="button"
              onClick={() => deleterecipes(currentrecipe.id)}
            >
              Supprimer
            </button>
          </div>
        );
      })}
    </section>
  );
}
