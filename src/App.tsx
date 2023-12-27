import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import PrimarySearchAppBar from "./components/AppBar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AddRecipe from "./pages/recipe/AddRecipe";
import ShowRecipe from "./pages/recipe/ShowRecipe";

function App() {
  const defaultTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={defaultTheme}>
        <BrowserRouter>
          <PrimarySearchAppBar />
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
            <Route path="/addRecipe" element={<AddRecipe />} />
            <Route path="/recipe/:id" element={<ShowRecipe />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
