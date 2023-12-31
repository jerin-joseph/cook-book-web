import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDialog from "../../components/Dialog";
import Recipe from "../../types/RecipeType";
import { TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ClearIcon from "@mui/icons-material/Clear";
import IngredientList from "../../components/IngredientsList";
import InstructionsList from "../../components/InstructionsList";

const ShowRecipe = () => {
  const navigate = useNavigate();
  const { id } = useParams<"id">();
  const [recipe, setRecipe] = useState<Recipe>({});
  const [tempRecipe, setTempRecipe] = useState<Recipe>({});
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    axios
      // .get("http://api.cookbook.rsoclabs.com/recipes")
      .get("http://localhost:8080/recipe?id=" + id)
      .then((response) => {
        console.log(response.data);
        setRecipe(response.data);
        // setTempRecipe(response.data);
      })
      .catch(() => {
        console.log("error in getting data from api");
      });
  }, []);

  //   useEffect(() => {
  //     console.log(recipe, tempRecipe);
  //   }, [recipe, tempRecipe, editMode]);

  const [openConfirm, setOpenConfirm] = React.useState(false);

  const handleConfirmDialogOpen = () => {
    setOpenConfirm(true);
  };

  const handleConfirmDialogClose = () => {
    setOpenConfirm(false);
  };

  const handleDeleteRecipe = () => {
    console.log("delete recipe");
    axios
      .delete(`http://localhost:8080/recipe?id=${recipe.id}`)
      .then((response) => {
        console.log(`Deleted post with ID ${recipe.id}`);
        handleConfirmDialogClose();
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  function handleEditMode() {
    console.log("In edit mode");
    setEditMode(true);
    setTempRecipe(structuredClone(recipe));
  }

  function handleSave() {
    console.log("saving updated recipe", recipe, tempRecipe);
    axios
      .put("http://localhost:8080/recipe", tempRecipe)
      .then(function (response) {
        console.log(response);
        //   navigate(`/recipe/${response.data.id}`);
        setEditMode(false);
        console.log("save successful");
        setRecipe(tempRecipe);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  function handleClear() {
    console.log(
      "before Cancel > not saving updated recipe",
      "recipe",
      recipe,
      "temp",
      tempRecipe
    );
    setEditMode(false);
    console.log(
      "after Cancel > not saving updated recipe",
      "recipe",
      recipe,
      "temp",
      tempRecipe
    );
  }

  return (
    <Container component="main" maxWidth="lg" sx={{ padding: "3rem" }}>
      <CssBaseline />

      <Card sx={{ minWidth: "100%" }}>
        <CardHeader
          //   sx={{ marginBottom: "0px", zIndex: "100" }}
          action={
            <CardActions disableSpacing>
              {editMode ? (
                <>
                  <IconButton aria-label="edit" onClick={handleClear}>
                    <ClearIcon />
                  </IconButton>
                  <IconButton aria-label="edit" onClick={handleSave}>
                    <SaveIcon />
                  </IconButton>
                </>
              ) : (
                <>
                  <IconButton aria-label="edit" onClick={handleEditMode}>
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={handleConfirmDialogOpen}
                  >
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </CardActions>
          }
          //   title={<>{recipe?.name}</>}
          title={
            editMode ? (
              <TextField
                required
                id="standard-required"
                // placeholder="Recipe Title"
                fullWidth
                label="Recipe Title"
                InputLabelProps={{ shrink: tempRecipe.name?.length > 0 }}
                name="name"
                value={tempRecipe?.name}
                onChange={(e) =>
                  setTempRecipe({ ...tempRecipe, name: e.target.value })
                }
                variant="standard"
                margin="dense"
              />
            ) : (
              <>{recipe?.name}</>
            )
          }

          //   subheader="September 14, 2016"
        />

        {recipe?.videoURL ? (
          <CardMedia
            component="iframe"
            //   className={classes.media}
            height="360"
            src={`http://www.youtube.com/embed/${recipe?.videoURL}`}
          />
        ) : (
          <CardMedia
            component="img"
            height="360"
            //   image="https://source.unsplash.com/random?food"
            image={
              recipe?.thumbnail
                ? recipe?.thumbnail
                : "https://source.unsplash.com/random?food"
            }
            alt="Dish"
          />
        )}

        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {recipe?.authorName?.match(/\b(\w)/g).join("")}
            </Avatar>
          }
          action={
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </CardActions>
          }
          title={recipe?.authorName}
          //   title={"Author Name"}
          subheader={new Date(recipe?.date).toDateString()}
        />
        <CustomDialog
          open={openConfirm}
          handleClose={handleConfirmDialogClose}
          text={{
            // title: "Are you sure you want to delete this recipe?",
            content: "Are you sure you want to delete this recipe?",
          }}
          actions={[
            { text: "Yes", action: handleDeleteRecipe },
            { text: "No", action: handleConfirmDialogClose },
          ]}
        />
        <CardContent>
          {editMode ? (
            <TextField
              required
              type="text"
              label="Description"
              InputLabelProps={{ shrink: tempRecipe.description?.length > 0 }}
              fullWidth
              name="description"
              // defaultValue={recipe.description}
              // placeholder="Description"
              value={tempRecipe?.description}
              onChange={(e) =>
                setTempRecipe({ ...tempRecipe, description: e.target.value })
              }
              multiline
              variant="standard"
              margin="dense"
            />
          ) : (
            <Typography variant="body2" color="text.secondary">
              {recipe?.description}
            </Typography>
          )}
        </CardContent>
        <CardContent>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Ingredients</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {editMode ? (
                <IngredientList
                  ingredients={tempRecipe?.ingredients}
                  editMode={editMode}
                  recipe={tempRecipe}
                  setRecipe={setTempRecipe}
                  //   addIngredient={addIngredient}
                  //   deleteIngredient={deleteIngredient}
                  //   setNewIngName={setNewIngName}
                  //   setNewIngQty={setNewIngQty}
                />
              ) : (
                <IngredientList
                  ingredients={recipe?.ingredients}
                  editMode={editMode}
                  recipe={recipe}
                  setRecipe={setRecipe}
                  //   addIngredient={addIngredient}
                  //   deleteIngredient={deleteIngredient}
                  //   setNewIngName={setNewIngName}
                  //   setNewIngQty={setNewIngQty}
                />
              )}
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>Preparation Steps</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {editMode ? (
                <InstructionsList
                  editMode={editMode}
                  recipe={tempRecipe}
                  setRecipe={setTempRecipe}
                />
              ) : (
                <InstructionsList
                  editMode={editMode}
                  recipe={recipe}
                  setRecipe={setRecipe}
                />
              )}
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    </Container>
  );
};
export default ShowRecipe;
