import React, { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const RecipeContext = createContext();

function RecipeProvider({ children }) {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async (url, setData) => {
      try {
        const response = await axios.get(url);

        if (response.status === 200) {
          setData(response.data);
        } else if (response.status === 401) {
          setData([]);
        } else {
          console.error(
            `Error fetching data from ${url}: ${response.statusText}`
          );
        }
      } catch (error) {
        console.error(`Error fetching data from ${url}: ${error}`);
      }
    };

    fetchData(`${import.meta.env.VITE_BACKEND_URL}/api/recipes`, setRecipes);
  }, []);

  const updateRecipe = async (id, recipe) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}`,
        recipe,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Failed to update recipe. ${JSON.stringify(recipe)}`);
      }

      return response.data;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const updateRecipes = async (Recipe) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
        {
          ...Recipe,
          is_shared: Recipe.isShared ? 1 : 0,
          is_approved: Recipe.isShared ? 1 : 0,
        }
      );

      if (response.status === 200) {
        setRecipes(response.data);
      } else {
        console.error(`Error fetching recipes: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error fetching recipes: ${error}`);
    }
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes/${id}`
      );

      if (response.status !== 200) {
        throw new Error(`Failed to delete recipe. ${id}`);
      }

      await updateRecipes();
    } catch (error) {
      console.error(error.message);
    }
  };

  const addRecipe = async (recipe) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/recipes`,
        {
          ...recipe,
          is_shared: recipe.isShared ? 1 : 0,
          is_approved: recipe.isShared ? 1 : 0,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        throw new Error(`Failed to add recipe. ${JSON.stringify(recipe)}`);
      }

      setRecipes([...recipes]);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  };

  const value = useMemo(
    () => ({
      recipes,
      deleteRecipe,
      addRecipe,
      updateRecipe,
      updateRecipes,
    }),
    [recipes]
  );

  return (
    <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>
  );
}

RecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { RecipeContext, RecipeProvider };
