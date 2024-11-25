/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import NoData from "../../../Shared/Components/NoData/NoData";
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Header from '../../../Shared/Components/Header/Header';
import imgRes from "../../../../assets/eating a variety of foods-amico.svg";
import Nodata from "../../../../assets/No-Data.png";


export default function Favorite() {
    const [favList, setFavList] = useState([]);
    const [arrayOfPages, setArrayOfPages] = useState([]); 
    const [hearts, setHearts] = useState({});
    const getFavList = async (pageNo, pageSize) => {
      try {
        const response = await axios.get(
            `https://upskilling-egypt.com:3006/api/v1/userRecipe/`,
            {
              params: {
                pageSize: pageSize,
                pageNumber: pageNo,
              },
              headers: { Authorization: localStorage.getItem("token") },
            }
        );
        setFavList(response.data.data);
        setArrayOfPages(
          Array(response.data.totalNumberOfPages).fill(0).map((_, i) => i + 1)
        );
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };
  
    const RemoveFromFav = async (favId) => {
      try {
        const response = await axios.delete(
          `https://upskilling-egypt.com:3006/api/v1/userRecipe/${favId}`,
          {
            headers: { Authorization: localStorage.getItem("token") },
          }
        );
        
        getFavList();
        toast.success("Item removed from your favorites successfully!");
      } catch (error) {
        console.log(
          error?.response?.data?.message ||
            "Failed to remove the item from your favorites. Please try again."
        );
      }
    };
    const toggleHeart = (recipeId) => {
      setHearts((prevHearts) => ({
        ...prevHearts,
        [recipeId]: !prevHearts[recipeId],
      }));
    };
  
    useEffect(() => {
      getFavList();
    }, []);
  
    return (
      <>
        <Header
          title={"Favorite Itmes!"}
          decsription={
            "You can now add your items that any user can order it from the Application and you can edit"
          }
          imgHom={imgRes}
        />
  
        {favList.length > 0 ? (
          <div className="container-fluid pt-4 px-4">
            <div className="row gy-4">
              {favList.map((fav) => (
                <div key={fav.id} className="col-md-4">
                  <div className="card rounded-4 border-0 shadow-sm">
                    <div className="img-fav position-relative">
                    {fav.recipe.imagePath ? (
                      <img
                        src={`https://upskilling-egypt.com:3006/${fav.recipe.imagePath}`}
                        alt={fav.recipe.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <img
                        src={Nodata}
                        alt={fav.recipe.name}
                        style={{
                          width: "150px",
                          height: "150px",
                          objectFit: "cover",
                        }}
                      />
                    )}
                      <div className="icon-layer bg-white position-absolute top-0 end-0 m-3 py-1 px-2 rounded-2 ">
                        <i
                          onClick={() => RemoveFromFav(fav.id)}
                          className={`fa-solid fa-heart text-success  ${
                            hearts[fav.id] ? "fa-regular" : ""
                          }`}
                        ></i>
                      </div>
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{fav.recipe.name}</h5>
                      <p className="card-text">{fav.recipe.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
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
                onClick={() => getFavList(pageNo, 3)}
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
        </>
    );
  }
