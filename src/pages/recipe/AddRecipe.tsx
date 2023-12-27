import { Button } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import Recipe from "../../types/RecipeType";
import FetchRecipe from "./fetchRecipe";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import FolderIcon from "@mui/icons-material/Folder";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";

function AddRecipe() {
  const [recipe, setRecipe] = useState({});
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredientsList, setIngredientsList] = useState([]);
  useEffect(() => {
    console.log(recipe);
  }, [recipe, newIngredient]);

  function handleAddRecipe(e): void {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(Object.fromEntries(data.entries()));
    const formObject = Object.fromEntries(data.entries());
    // const newRecipe: Recipe = {
    //   name: formObject.name,
    //   description: formObject.description,
    //   ingredients: ingredientsList,
    //   // ingredients: [],
    //   instructions: formObject.instructions,
    //   date: "2000-08-19T23:15:30.000Z",
    //   authorId: "1",
    // };
    console.log(formObject);
    console.log("recipe________", recipe);
    axios
      // .post("http://api.cookbook.rsoclabs.com/recipe", recipe)
      .post("http://localhost:8080/recipe", recipe)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function deleteIngredient(index: number) {
    let ingredientslist: [] = recipe?.ingredients;
    console.log(ingredientslist, index);
    ingredientslist.splice(index, 1);
    console.log(ingredientslist);
    setRecipe({ ...recipe, ingredients: ingredientslist });
  }

  function addIngredient(e) {
    e.preventDefault();
    console.log(newIngredient);
    if (newIngredient) {
      if (recipe.ingredients) {
        let ingredientslist: [] = recipe?.ingredients;
        ingredientslist?.push(newIngredient);
        setRecipe({ ...recipe, ingredients: ingredientslist });
      } else {
        let ingredientslist: [] = [];
        ingredientslist.push(newIngredient);
        setRecipe({ ...recipe, ingredients: ingredientslist });
      }
    } else {
      console.log("ingredient empty");
    }
    setNewIngredient("");
  }

  return (
    <div>
      <FetchRecipe setRecipe={setRecipe} />
      <div>AddRecipe</div>
      <form onSubmit={handleAddRecipe}>
        <label>Recipe Name</label>
        <input type="text" name="name" defaultValue={recipe.name} />
        <br />
        <label>Description</label>
        <input
          type="text"
          name="description"
          defaultValue={recipe.description}
        />
        <br />
        <label>Ingredients</label>

        <List sx={{ width: "100%", maxWidth: "50%", bgcolor: "grey" }}>
          {recipe?.ingredients?.map(
            (value, index) =>
              value && (
                <ListItem
                  key={value}
                  disableGutters
                  secondaryAction={
                    <IconButton aria-label="comment">
                      <DeleteIcon
                        onClick={() => {
                          deleteIngredient(index);
                        }}
                      />
                    </IconButton>
                  }
                >
                  <ListItemText
                    primary={`${index}. ${value.ingName} - ${value.ingQty}`}
                  />
                </ListItem>
              )
          )}
        </List>
        <input
          type="text"
          name="ingredients"
          onChange={(e) => setNewIngredient(e.target.value)}
        />
        <button onClick={addIngredient}>Add</button>
        <br />
        <label>Instructions</label>
        <input type="text" name="instructions" />
        <Button type="submit">Add</Button>
      </form>
    </div>
  );
}

export default AddRecipe;
