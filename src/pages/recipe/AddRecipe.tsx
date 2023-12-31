import { Button, FormControl, Stack, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import FetchRecipe from "./fetchRecipe";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

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

          <List
            sx={{
              width: "100%",
              maxWidth: "80%",
              paddingLeft: "10%",
              // maxHeight: "10rem",
              // overflow: "scroll",
            }}
            dense={true}
          >
            {recipe?.ingredients?.map(
              (value, index) =>
                value && (
                  <ListItem
                    key={index}
                    disableGutters
                    secondaryAction={
                      <IconButton aria-label="comment" size="small">
                        <DeleteIcon
                          onClick={() => {
                            deleteIngredient(index);
                          }}
                        />
                      </IconButton>
                    }
                  >
                    <ListItemText
                      primary={`${index + 1}. ${value.ingName} - ${
                        value.ingQty
                      }`}
                    />
                  </ListItem>
                )
            )}
          </List>
          {/* <input
            type="text"
            name="ingName"
            onChange={(e) => setNewIngName(e.target.value)}
            placeholder="Item"
          />
          <input
            type="text"
            name="ingQty"
            onChange={(e) => setNewIngQty(e.target.value)}
            placeholder="Quantity"
          />
          <button onClick={addIngredient}>Add Ingredient</button> */}

          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              variant="standard"
              sx={{ width: "70%" }}
              type="text"
              name="ingName"
              placeholder="Ingredient"
              onChange={(e) => setNewIngName(e.target.value)}
            />
            <TextField
              variant="standard"
              sx={{ width: "25%" }}
              placeholder="Qty"
              onChange={(e) => setNewIngQty(e.target.value)}
            />
            {/* <Button
              sx={{ width: "25%" }}
              color="primary"
              onClick={addIngredient}
            >
              Add
            </Button> */}
            <IconButton aria-label="Add" size="medium" onClick={addIngredient}>
              <PlaylistAddIcon fontSize="inherit" />
            </IconButton>
          </Stack>
        </FormControl>

        <FormControl fullWidth={true} margin="dense">
          {/* <label>Instructions</label>
          <input type="text" name="instructions" /> */}

          <List
            sx={{
              width: "100%",
              maxWidth: "80%",
              paddingLeft: "10%",
              // maxHeight: "10rem",
              // overflow: "scroll",
            }}
            dense={true}
          >
            {recipe?.instructions?.map(
              (value: string, index: number) =>
                value && (
                  <ListItem
                    key={index}
                    disableGutters
                    secondaryAction={
                      <IconButton aria-label="comment">
                        <DeleteIcon
                          onClick={() => {
                            deleteInstruction(index);
                          }}
                        />
                      </IconButton>
                    }
                  >
                    <ListItemText primary={`${index + 1}. ${value}`} />
                  </ListItem>
                )
            )}
          </List>
          <Stack direction="row" alignItems="center" spacing={1}>
            <TextField
              type="text"
              placeholder="Preparation Steps"
              InputLabelProps={{ shrink: recipe.instructions?.length > 0 }}
              fullWidth
              name="description"
              // defaultValue={recipe.description}
              // placeholder="Description"
              onChange={(e) => setNewInstruction(e.target.value)}
              variant="standard"
              margin="dense"
            />
            <IconButton aria-label="Add" size="medium" onClick={addInstruction}>
              <PlaylistAddIcon fontSize="inherit" />
            </IconButton>
          </Stack>
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
