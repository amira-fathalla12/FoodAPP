/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import Header from "../../../Shared/Components/Header/Header";
import axios from "axios";
import imgRes from "../../../../assets/eating a variety of foods-amico.svg";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Nodata from "../../../../assets/No-Data.png";
import DeleteConfirmations from "../../../Shared/Components/DeleteConfirmations/DeleteConfirmations";
import NoData from "../../../Shared/Components/NoData/NoData";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";

export default function Recipelist() {
  let { loginData } = useContext(AuthContext);
  const [recipesList, setRecipesList] = useState([]);
  const [favList, setFavList] = useState([]);
  const [hearts, setHearts] = useState({});
  const [Categorieslist, setCategorieslist] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [nameValue, setNameValue] = React.useState("");
  const [tagValue, setTagValue] = React.useState("");
  const [catValue, setCatValue] = React.useState("");

  const [arrayOfPages, seAtrrayOfPages] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const handleShow = (id) => {
    setSelectedId(id);
    setShow(true);
  };

  const getRecipes = async (pageNo, pageSize, name, tag, category) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/`,
        {
          params: {
            pageSize: pageSize,
            pageNumber: pageNo,
            name: name,
            tagId: tag,
            categoryId: category,
          },
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      seAtrrayOfPages(
        Array(response.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
      setRecipesList(response.data.data);
    } catch (error) {
      toast.error("Error fetching recipes");
    }
  };
  let getTages = async () => {
    try {
      let response = await axios.get(
        "https://upskilling-egypt.com:3006/api/v1/tag/"
      );
      console.log(response);
      setTags(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  let getCategorieslist = async () => {
    try {
      let response = await axios.get(
        " https://upskilling-egypt.com:3006/api/v1/Category/?pageSize=10&pageNumber=1",
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      setCategorieslist(response.data.data);
    } catch (error) {
      toast.error("Error fetching categories");
    }
  };

  const deleteRecipe = async () => {
    try {
      await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${selectedId}`,
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      );
      toast.success("Recipe deleted successfully");
      getRecipes();
    } catch (error) {
      toast.error("Failed to delete Recipe");
    }
    handleClose();
  };
  const toggleHeart = (recipeId) => {
    setHearts((prevHearts) => ({
      ...prevHearts,
      [recipeId]: !prevHearts[recipeId],
    }));
  };

  const addToFav = async (id) => {
    try {
      const response = await axios.post(
        `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
        { recipeId: id },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      
      toggleHeart(id);
      setFavList(response.data);
      toast.success("Recipe added to your favorites!");
    } catch (error) {
      toast.error(error.response.data.message) ||
        "Oops! We couldn’t save the recipe to your favorites";
    }
  };

  // fillteriation-Name
  const getNameValue = (input) => {
    setNameValue(input.target.value);
    getRecipes(1, 3, input.target.value.tagValue.catValue);
  };
  //fillteriation-Tag
  const getTagValue = (input) => {
    setTagValue(input.target.value);
    getRecipes(1, 3, nameValue, input.target.value, catValue);
  };
  // fillteriation-Category
  const getCatValue = (input) => {
    setCatValue(input.target.value);
    getRecipes(1, 3, nameValue, tagValue, input.target.value);
  };

  useEffect(() => {
    getRecipes(1, 3);
    getTages();
    getCategorieslist();
  }, []);

  return (
    <>
      <Header
        title={"Recipes List"}
        decsription={
          "You can now add your items that any user can order from the Application and you can edit."
        }
        imgHom={imgRes}
      />
      <DeleteConfirmations
        show={show}
        handleClose={handleClose}
        deleteItem={"Recipe"}
        deleteFuncation={deleteRecipe}
      />
      <div className="d-flex justify-content-between p-4">
        <h5>Recipes Table Details</h5>
        {loginData?.userGroup == "SuperAdmin" ? (
        <Link to="/dashboard/recipes/new-recipe" className="btn btn-success">
          Add new Recipe
        </Link>
        ) : (
          ""
        )}
      </div>
      <div className="p-4">
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              placeholder="Search here ...."
              className="form-control"
              onChange={getNameValue}
            />
          </div>
          <div className="col-md-3">
            <select className="form-control" onChange={getTagValue}>
              <option value="">Tag</option>
              {tags.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-3">
            <select className="form-control" onChange={getCatValue}>
              <option value="">Category</option>
              {Categorieslist.map(({ id, name }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className="table-responsive p-4">
        {recipesList.length > 0 ? (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Image</th>
                <th scope="col">Price</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Tag</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recipesList.map((recipe) => (
                <tr key={recipe.id}>
                  <td className="px-3">{recipe.name}</td>
                  <td className="px-3">
                    {recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com:3006/${recipe.imagePath}`}
                        alt={recipe.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={Nodata}
                        alt={recipe.name}
                        style={{
                          width: "70px",
                          height: "70px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                  </td>
                  <td className="px-3">{recipe.price}</td>
                  <td className="px-3">{recipe.description}</td>
                  <td className="px-3">
                    {recipe.category[0]?.name || "No Category"}
                  </td>
                  <td className="px-3">{recipe.tag?.name}</td>
                  {loginData?.userGroup == "SuperAdmin" ? (
                  <td className="px-3">
                    <button
                      className="border-0 bg-transparent dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="fa-solid fa-ellipsis"></i>
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <li>
                        <a className="dropdown-item">
                          <i className="mx-2 text-success fa-regular fa-eye"></i>
                          View
                        </a>
                      </li>
                      <li>
                        <Link
                          to={`/dashboard/recipes/${recipe.id}`}
                          state={{ recipeData: recipe, type: "edit" }}
                          className="dropdown-item"
                        >
                          <i className="mx-2 text-success fa-regular fa-pen-to-square"></i>
                          Edit
                        </Link>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            handleShow(recipe.id);
                          }}
                          className="dropdown-item"
                        >
                          <i className="mx-2 text-success fa-solid fa-trash-can"></i>
                          Delete
                        </button>
                      </li>
                    </ul>
                  </td>
                  ):(
                    <td>
                    <button
                      className={`border-0 bg-transparent`}
                    >
                      <i
                         onClick={() => addToFav(recipe.id)}
                        className={`fa-regular fa-heart ${
                          hearts[recipe.id] ? "fa-solid text-success" : ""
                        }`}
                      ></i>
                    </button>
                  </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <NoData />
        )}
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            {arrayOfPages.map((pageNo) => (
              <li
                className="page-item"
                key={pageNo}
                onClick={() => getRecipes(pageNo, 3)}
              >
                <a className="page-link" href="#">
                  {pageNo}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <ToastContainer />
    </>
  );
}
