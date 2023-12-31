import {
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useState } from "react";

export default function IngredientList({
  editMode,
  ingredients,
  recipe,
  setRecipe,
}) {
  const [newIngName, setNewIngName] = useState("");
  const [newIngQty, setNewIngQty] = useState("");

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

  return (
    <>
      <List
        sx={{
          width: "95%",
        }}
        dense={true}
      >
        {ingredients?.map(
          (value, index) =>
            value && (
              <ListItem
                key={index}
                disableGutters
                secondaryAction={
                  editMode && (
                    <IconButton
                      aria-label="comment"
                      onClick={() => {
                        deleteIngredient(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemText
                  primary={`${index + 1}. ${value.ingName} - ${value.ingQty}`}
                />
              </ListItem>
            )
        )}
      </List>
      {editMode && (
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
          <IconButton aria-label="Add" size="medium" onClick={addIngredient}>
            <PlaylistAddIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )}
    </>
  );
}
