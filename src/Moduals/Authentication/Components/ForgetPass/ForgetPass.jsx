/* eslint-disable no-unused-vars */
import React from 'react';
import logo from "../../../../assets/icon.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function ForgetPass() {
  const navigate = useNavigate();
  // ************validate***************
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request",
        data
      );
      toast.success(
        response?.data?.message || "Code sent to your mail please check",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
      navigate("/reset-pass");
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "An error occurred. Please try again.",
        {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        }
      );
    }
  };
  return (
    <div className="auth-container bg-info">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3 ">
            <div>
              <div className="logo-container">
                <img src={logo} alt="logo" />
              </div>
              <div className="title p-4">
                <h2 className="h5">Forgot Your Password?</h2>
                <p className="text-muted ">
                  No worries! Please enter your email and we will send a
                  password reset link
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3 p-1">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-envelope" aria-hidden="true"></i>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Your E-mail"
                    aria-label="email"
                    aria-describedby="basic-addon1"
                    {...register("email", {
                      required: true,
                      pattern: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                    })}
                  />
                </div>
                {errors.email && errors.email.type === "required" && (
                    <span className=" text-danger my-1">email is required</span>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <span className=" text-danger my-1">invalid email</span>
                  )}
                <div>
                  <button className="btn btn-success w-100 my-2 mt-5">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

