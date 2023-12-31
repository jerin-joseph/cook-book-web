import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Footer from "../components/Footer";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Height } from "@mui/icons-material";
import Recipe from "../types/RecipeType";

export default function Home({ props }) {
  const [recipeList, setRecipeList] = useState(null);

  useEffect(() => {
    axios
      // .get("http://api.cookbook.rsoclabs.com/recipes")
      .get("http://localhost:8080/recipes")
      .then((response) => {
        console.log(response);
        setRecipeList(response.data);
      })
      .catch(() => {
        console.log("error in getting data from api");
      });
  }, []);

  const navigate = useNavigate();
  const handleClick = (recipe: Recipe) => {
    console.log(recipe);
    navigate("/recipe/" + recipe.id);
  };

  return (
    <div>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              All Recipes
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Cookbook offers all your favourite recipes organised at one place.
              Enjoy cooking!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button variant="contained">Favourites</Button>
              <Link component={ReactLink} to="/addRecipe">
                <Button variant="outlined">Add a Recipe</Button>
              </Link>
            </Stack>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {recipeList &&
              recipeList.map((recipe) => (
                <Grid item key={recipe.id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      // maxHeight: "30rem",
                    }}
                    onClick={() => {
                      handleClick(recipe);
                    }}
                  >
                    <CardMedia
                      component="div"
                      sx={{
                        // 16:9
                        pt: "56.25%",
                      }}
                      // image="https://source.unsplash.com/random?food"
                      image={
                        recipe.thumbnail
                          ? recipe.thumbnail
                          : "https://source.unsplash.com/random?food"
                      }
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {recipe.name}
                      </Typography>
                      <Typography>{recipe.description}</Typography>
                    </CardContent>
                    {/* <CardActions>
                      <Link component={ReactLink} to={"/recipe/" + recipe.id}>
                        <Button size="small">View</Button>
                      </Link>
                      <Fab
                        size="small"
                        aria-label="like"
                        sx={{ height: "1.1rem", width: "2.2rem" }}
                      >
                        <FavoriteIcon sx={{ height: "1rem" }} />
                      </Fab>
                    </CardActions> */}
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
