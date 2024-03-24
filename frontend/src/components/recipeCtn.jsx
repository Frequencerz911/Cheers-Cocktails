import React, { useContext, useState } from "react";
import { RecipeContext } from "../contexts/RecipeContext";
import { AuthContext } from "../contexts/AuthContext";

export default function RecipeCtn() {
  const { recipes } = useContext(RecipeContext);
  const { user } = useContext(AuthContext);
  const [currentIndex, setCurrentIndex] = useState(0);

  const isMobile = () => window.innerWidth <= 768;

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => Math.min(prevIndex + 1, recipes.length - 5));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
  };

  const filteredrecipes = recipes.filter((recipe) =>
    user ? true : recipe.is_approved
  );

  const visiblerecipes = filteredrecipes.slice(
    currentIndex,
    currentIndex + (isMobile() ? 1 : 4)
  );

  return (
    <section className="recipes-home">
      <button type="button" className="carousel" onClick={prevSlide}>
        Précédent
      </button>
      {visiblerecipes.map((recipe) => (
        <div
          key={recipe.id}
          className={recipe.id === currentIndex ? "active" : "inactive"}
        >
          <h3>{recipe.title}</h3>
          <img
            src="src/assets/img/martini.jpg"
            alt="martini"
            height="150"
          />{" "}
          <p>Difficulté: {recipe.difficulty}</p>
          <p>Temps de préparation: {recipe.preparation_time}</p>
        </div>
      ))}
      <button type="button" className="carousel" onClick={nextSlide}>
        suivant
      </button>
    </section>
  );
}
