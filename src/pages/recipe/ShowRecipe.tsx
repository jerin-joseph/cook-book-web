import React, { useEffect, useState } from "react";
import Recipe from "../../types/RecipeType";
import { useParams } from "react-router-dom";
import axios from "axios";

const ShowRecipe = () => {
  let { id } = useParams<"id">();
  const [recipe, setRecipe] = useState(null);
  useEffect(() => {
    axios
      // .get("http://api.cookbook.rsoclabs.com/recipes")
      .get("http://localhost:8080/recipe?id=" + id)
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
      })
      .catch(() => {
        console.log("error in getting data from api");
      });
  }, []);

  return (
    <div>
      <div>{recipe ? recipe.name : ""}</div>
    </div>
  );
};

export default ShowRecipe;
