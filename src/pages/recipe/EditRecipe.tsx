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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import DeleteIcon from "@mui/icons-material/Delete";
import CustomDialog from "../../components/Dialog";
import Recipe from "../../types/RecipeType";

const EditRecipe = () => {
  const navigate = useNavigate();
  let { id } = useParams<"id">();
  const [recipe, setRecipe] = useState<Recipe>({});
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

  // return (
  //   <Container component="main" maxWidth="xs">
  //     <CssBaseline />
  //     <div>
  //       <div>{recipe ? recipe.name : ""}</div>
  //     </div>
  //   </Container>
  // );

  return (
    <Container component="main" maxWidth="lg" sx={{ padding: "3rem" }}>
      <CssBaseline />

      <Card sx={{ minWidth: "100%" }}>
        <CardHeader
          //   sx={{ marginBottom: "0px", zIndex: "100" }}
          action={
            <CardActions disableSpacing>
              <IconButton aria-label="edit">
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleConfirmDialogOpen}>
                <DeleteIcon />
              </IconButton>
            </CardActions>
          }
          title={recipe?.name}
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
            alt="Paella dish"
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
          <Typography variant="body2" color="text.secondary">
            {recipe?.description}
          </Typography>
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
              <List
                sx={{
                  width: "100%",
                  //   maxWidth: "80%",
                  // paddingLeft: "10%",
                  //   maxHeight: "10rem",
                  //   overflow: "scroll",
                }}
                dense={true}
              >
                {recipe?.ingredients?.map(
                  (value, index) =>
                    value && (
                      <ListItem
                        key={index}
                        disableGutters
                        //   secondaryAction={
                        //     <IconButton aria-label="comment">
                        //       <DeleteIcon
                        //         onClick={() => {
                        //           deleteIngredient(index);
                        //         }}
                        //       />
                        //     </IconButton>
                        //   }
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
              <List
                sx={{
                  width: "100%",
                  //   maxWidth: "80%",
                  // paddingLeft: "10%",
                  //   maxHeight: "10rem",
                  //   overflow: "scroll",
                }}
                dense={true}
              >
                {recipe?.instructions?.map(
                  (value, index) =>
                    value && (
                      <ListItem
                        key={index}
                        disableGutters
                        //   secondaryAction={
                        //     <IconButton aria-label="comment">
                        //       <DeleteIcon
                        //         onClick={() => {
                        //           deleteIngredient(index);
                        //         }}
                        //       />
                        //     </IconButton>
                        //   }
                      >
                        <ListItemText primary={`${index + 1}. ${value}`} />
                      </ListItem>
                    )
                )}
              </List>
            </AccordionDetails>
          </Accordion>
          {/* <Accordion disabled>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>Disabled Accordion</Typography>
            </AccordionSummary>
          </Accordion> */}
        </CardContent>
      </Card>
    </Container>
  );
};
export default EditRecipe;
