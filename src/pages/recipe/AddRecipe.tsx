import { Button, FormControl, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FetchRecipe from "./fetchRecipe";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import IngredientList from "../../components/IngredientsList";
import InstructionsList from "../../components/InstructionsList";

function AddRecipe() {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});
  const [newIngName, setNewIngName] = useState("");
  const [newIngQty, setNewIngQty] = useState("");
  const [newInstruction, setNewInstruction] = useState("");
  // const [ingredientsList, setIngredientsList] = useState([]);
  // const [instructionsList, setInstructionsList] = useState([]);
  useEffect(() => {
    console.log(recipe);
  }, [recipe]);

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
    if (!recipe.authorName) {
      recipe.authorName = "CB Author";
    }
    axios
      // .post("http://api.cookbook.rsoclabs.com/recipe", recipe)
      .post("http://localhost:8080/recipe", recipe)
      .then(function (response) {
        console.log(response);
        navigate(`/recipe/${response.data.id}`);
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
    console.log(newIngName);
    if (newIngName && newIngQty) {
      let ingredientslist: [] = [];
      if (recipe.ingredients) {
        ingredientslist = recipe?.ingredients;
      }
      ingredientslist.push({ ingName: newIngName, ingQty: newIngQty });
      setRecipe({ ...recipe, ingredients: ingredientslist });
    } else {
      console.log("ingredient empty");
    }
  }

  function deleteInstruction(index: number) {
    let instructionsList: [] = recipe?.instructions;
    console.log(instructionsList, index);
    instructionsList.splice(index, 1);
    console.log(instructionsList);
    setRecipe({ ...recipe, instructions: instructionsList });
  }

  function addInstruction(e) {
    e.preventDefault();
    console.log(newIngName);
    if (newInstruction) {
      let instructionsList: [] = [];
      if (recipe.instructions) {
        instructionsList = recipe?.instructions;
      }
      instructionsList.push(newInstruction);
      setNewInstruction("");
      setRecipe({ ...recipe, instructions: instructionsList });
    } else {
      console.log("instruction empty");
    }
  }

  function handleCancel() {
    navigate("/home");
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Typography
        component="h5"
        variant="h5"
        align="center"
        color="text.primary"
        gutterBottom
      >
        AddRecipe
      </Typography>
      {/* <Divider /> */}
      <FetchRecipe setRecipe={setRecipe} />
      {/* <Divider /> */}
      <form onSubmit={handleAddRecipe}>
        {/* <label>Recipe Name</label> */}
        {/* <input type="text" name="name" defaultValue={recipe.name} /> */}
        <TextField
          required
          id="standard-required"
          // placeholder="Recipe Title"
          fullWidth
          label="Recipe Title"
          InputLabelProps={{ shrink: recipe.name?.length > 0 }}
          name="name"
          value={recipe.name}
          onChange={(e) => setRecipe({ ...recipe, name: e.target.value })}
          variant="standard"
          margin="dense"
        />
        {/* <label>Description</label>
        <input
          type="text"
          name="description"
          defaultValue={recipe.description}
        /> */}

        <FormControl fullWidth={true}>
          <TextField
            required
            type="text"
            label="Description"
            InputLabelProps={{ shrink: recipe.description?.length > 0 }}
            fullWidth
            name="description"
            // defaultValue={recipe.description}
            // placeholder="Description"
            value={recipe.description}
            onChange={(e) =>
              setRecipe({ ...recipe, description: e.target.value })
            }
            multiline
            variant="standard"
            margin="dense"
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          {/* <label>Ingredients</label> */}
          <IngredientList
            ingredients={recipe?.ingredients}
            editMode={true}
            recipe={recipe}
            setRecipe={setRecipe}
          />
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          <InstructionsList
            editMode={true}
            recipe={recipe}
            setRecipe={setRecipe}
          />
        </FormControl>
        <FormControl fullWidth={true} margin="dense">
          <Stack direction="row" alignItems="center" spacing={1} width="100%">
            <Button type="reset" fullWidth color="error" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" fullWidth>
              Submit
            </Button>
          </Stack>
        </FormControl>
      </form>
    </Container>
  );
}

export default AddRecipe;
