/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext } from "react";
import Header from "../../../Shared/Components/Header/Header";
import { Link } from "react-router-dom";
import imgHome from '../../../../assets/eating vegan food-rafiki.png'
import { AuthContext } from "../../../../Context/AuthContext";
export default function Dashboard() {
  let{loginData} = useContext(AuthContext);
  return (
    <>
      <Header
        title={`Welcome ${loginData?.userName}`}
        decsription={
          "This is a welcoming screen for the entry of the application ,you can now see the options"
        }
        imgHom={imgHome}
      />
       <div className="row home-sec  rounded-2 m-4 p-4 align-items-center">
        <div className="col-md-6">
          <div>
            <h4><strong>Fill the recipes !</strong> </h4>
            <p>
              you can now fill the meals easily using the table and form , click
              here and sill it with the table !
            </p>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <div>
           
           <button className="btn btn-success px-3">
           <Link to={"/dashboard/recipes"} className="text-white text-decoration-none">
              Fill Recipes &nbsp;
              <i className=" fa fa-arrow-right"></i>
              </Link>
              </button>
           
          
          </div>
        </div>
      </div>
    </>
  );
}
