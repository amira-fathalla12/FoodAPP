import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import ForgetPass from "./Moduals/Authentication/Components/ForgetPass/ForgetPass";
import Login from "./Moduals/Authentication/Components/Login/Login";
import Registration from "./Moduals/Authentication/Components/Registration/Registration";
import ResetPass from "./Moduals/Authentication/Components/RestePass/RestePass";
import Categoriedata from "./Moduals/Categories/Components/Categoriedata/Categoriedata";
import CategoriesList from "./Moduals/Categories/Components/Categorielist/Categorielist";
import Dashboard from "./Moduals/dashboard/Components/Dashboard/Dashboard";
import Recipedata from "./Moduals/Recipes/Components/Recipedata/Recipedata";
import RecipesList from "./Moduals/Recipes/Components/Recipelist/Recipelist";
import AuthLayout from "./Moduals/Shared/Components/AuthLayout/AuthLayout";
import MasterLayout from "./Moduals/Shared/Components/MasterLayout/MasterLayout";
import NotFound from "./Moduals/Shared/Components/NotFound/NotFound";
import UsersList from "./Moduals/Users/Components/UsersList/UsersList";

import ChangePass from "./Moduals/Authentication/Components/ChangePass/ChangePass";
import Favorite from "./Moduals/Recipes/Components/Favorite/Favorite";
import Recipesform from "./Moduals/Recipes/Components/Recipesform/Recipesform";
import ProtectedRoute from "./Moduals/Shared/Components/ProtectedRoute/ProtectedRoute";
import VerifyUser from "./Moduals/Authentication/Components/verifyUser/verifyUser";

function App() {
  // Routing
  const routes = createBrowserRouter([
    {
      path: "",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login  /> },
        { path: "register", element: <Registration /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: 'verifyuser', element: <VerifyUser/> },

      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute >
          <MasterLayout  />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard  /> },
        { path: "recipes", element: <RecipesList  /> },
        { path: "recipes/new-recipe", element: <Recipesform /> }, 
        {path: "recipes/:recipeId",element: <Recipesform />},
        { path: "recipe-data", element: <Recipedata /> },
        { path: "Categories", element: <CategoriesList /> },
        { path: "Category-data", element: <Categoriedata /> },
        { path: "users", element: <UsersList /> },
        { path: "favorites", element: <Favorite /> },
        { path: "change-password", element: <ChangePass /> },
      ],
    }
  ]);

  return (
    <>
      <ToastContainer />

      <RouterProvider router={routes} />
    </>
  );
}

export default App;
// <Link to={`/recipes/${recipe?.id}`}></Link>