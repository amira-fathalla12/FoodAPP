/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../../assets/icon.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

export default function Login() {
  let { saveLoginData } = useContext(AuthContext);
  const navigate = useNavigate();

  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  // ************validate***************
  const {
    register, //btsheel el values ui inputs
    handleSubmit, //integration
    formState: { errors }, //errors
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Login",
        data
      );
      localStorage.setItem("token", response.data.token);
      saveLoginData();

      toast.success("Login successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });

      navigate("/Dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "An error occurred. Please try again.",
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
              <div className="title">
                <h2 className="h5">Login</h2>
                <p className="text-muted">Welcome Back! Please enter your details</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
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
                  <span className="text-danger p-2">Email is required</span>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <span className="text-danger p-2">Invalid email</span>
                )}
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    placeholder="Password"
                    aria-label="password"
                    aria-describedby="basic-addon1"
                    {...register("password", { required: true })}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={`fa-regular fa-eye${
                        showPassword ? "-slash" : ""
                      }`}
                    ></i>
                  </button>
                </div>
                {errors.password && errors.password.type === "required" && (
                  <span className="text-danger p-2">Password is required</span>
                )}

                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/register" className="text-muted text-decoration-none">
                    Register now?
                  </Link>
                  <Link
                    to="/forget-pass"
                    className="text-success text-decoration-none"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button className="btn btn-success w-100 my-2">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
