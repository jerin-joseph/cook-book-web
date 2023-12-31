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

export default function InstructionsList({ editMode, recipe, setRecipe }) {
  const [newInstruction, setNewInstruction] = useState("");

  function addInstruction(e) {
    e.preventDefault();
    if (newInstruction) {
      let instructionsList: [] = [];
      if (recipe.instructions) {
        instructionsList = recipe?.instructions;
      }
      instructionsList.push(newInstruction);
      setNewInstruction(""); //need to check why form is not reset
      setRecipe({ ...recipe, instructions: instructionsList });
    } else {
      console.log("instruction empty");
    }
  }

  function deleteInstruction(index: number) {
    let instructionsList: [] = recipe?.instructions;
    console.log(instructionsList, index);
    instructionsList.splice(index, 1);
    console.log(instructionsList);
    setRecipe({ ...recipe, instructions: instructionsList });
  }

  return (
    <>
      <List
        sx={{
          width: "95%",
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
                  editMode && (
                    <IconButton
                      aria-label="comment"
                      onClick={() => {
                        deleteInstruction(index);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  )
                }
              >
                <ListItemText primary={`${index + 1}. ${value}`} />
              </ListItem>
            )
        )}
      </List>
      {editMode && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            type="text"
            placeholder="Preparation Steps"
            InputLabelProps={{
              shrink: recipe?.instructions?.length > 0,
            }}
            fullWidth
            name="description"
            onChange={(e) => setNewInstruction(e.target.value)}
            variant="standard"
            margin="dense"
          />
          <IconButton aria-label="Add" size="medium" onClick={addInstruction}>
            <PlaylistAddIcon fontSize="inherit" />
          </IconButton>
        </Stack>
      )}
    </>
  );
}
