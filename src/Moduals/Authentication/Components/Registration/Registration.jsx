/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styleRegister from "../Registration/Registration.module.css";
import logo from "../../../../assets/icon.png";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { RotatingLines } from "react-loader-spinner";

// Error Message Component
const ErrorMessage = ({ message }) =>
  message ? <div className="alert alert-danger mt-1">{message}</div> : null;

export default function Registration() {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const togglePasswordVisibilityConfirm = () =>
    setShowPasswordConfirm(!showPasswordConfirm);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  // Create form data
  const appendFormData = (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };

  // Submit data to the server
  async function onSubmit(data) {
    setLoadingBtn(true);

    const registerForm = appendFormData(data);

    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Register",
        registerForm
      );
      toast.success("Registration successful!");
      navigate("/verifyuser");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred during registration.";
      toast.error(errorMessage);
    }
    setLoadingBtn(false);
  }

  // Validate username
  const validateUserName = (value) => {
    if (value.length < 4) {
      return "Username must be at least 4 characters.";
    }
    const pattern = /^[a-zA-Z]+\d+$/;
    if (!pattern.test(value)) {
      return "Username must contain letters and end with numbers without spaces.";
    }
    return true;
  };

  // Validate password
  const validatePassword = (value) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    if (!pattern.test(value)) {
      return "Password must contain at least one lowercase, one uppercase letter, one digit, one special character, and be at least 6 characters long.";
    }
    return true;
  };

  // Validate confirm password
  const validateConfirmPassword = (value) => {
    const password = getValues("password");
    if (value !== password) {
      return "Passwords do not match.";
    }
    return true;
  };

  return (
    <section className={`${styleRegister.secLogin}`}>
      <div className="auth-container vh-100">
        <div className="container-fluid vh-100 bg-overlay">
          <div className="row vh-100 justify-content-center align-items-center">
            <div className="col-md-6">
              <div className="bg-white rounded-3 px-5 py-4">
                <div className="text-center">
                  <img className="w-50" src={logo} alt="logo" />
                </div>
                <h5>Register</h5>
                <p className="text-muted">Welcome Back! Please enter your details</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      {/* Username */}
                      <div className="input-group mb-3">
                        <span className={`${styleRegister.IconInput} input-group-text`}>
                          <i className="fa-solid fa-user"></i>
                        </span>
                        <input
                          className={`${styleRegister.InputLogin} form-control`}
                          type="text"
                          placeholder="Username"
                          {...register("userName", {
                            required: "Username is required.",
                            validate: validateUserName,
                          })}
                        />
                        <ErrorMessage message={errors.userName?.message} />
                      </div>

                      {/* Country */}
                      <div className="input-group mb-3">
                        <span className={`${styleRegister.IconInput} input-group-text`}>
                          <i className="fa-solid fa-flag"></i>
                        </span>
                        <input
                          className={`${styleRegister.InputLogin} form-control`}
                          type="text"
                          placeholder="Country"
                          {...register("country", {
                            required: "Country is required.",
                          })}
                        />
                        <ErrorMessage message={errors.country?.message} />
                      </div>

                      {/* Password */}
                      <div className="input-group mb-3">
                        <span className={`${styleRegister.IconInput} input-group-text`}>
                          <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                          className={`${styleRegister.InputLogin} form-control`}
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...register("password", {
                            required: "Password is required.",
                            validate: validatePassword,
                          })}
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
                        <ErrorMessage message={errors.password?.message} />
                      </div>
                    </div>

                    {/* Second column */}
                    <div className="col-md-6">
                      {/* Email */}
                      <div className="input-group mb-3">
                        <span className={`${styleRegister.IconInput} input-group-text`}>
                          <i className="fa-solid fa-envelope"></i>
                        </span>
                        <input
                          className={`${styleRegister.InputLogin} form-control`}
                          type="email"
                          placeholder="Email"
                          {...register("email", {
                            required: "Email is required.",
                            pattern: {
                              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                              message: "Invalid email format.",
                            },
                          })}
                        />
                        <ErrorMessage message={errors.email?.message} />
                      </div>
                      {/* phone Number */}
                      <div className="input-group mb-3">
                        <span className={`${styleRegister.IconInput} input-group-text`}>
                          <i className="fa-solid fa-mobile-screen-button"></i>
                        </span>
                        <input
                          className={`${styleRegister.InputLogin} form-control`}
                          type="tel"
                          placeholder="Phone Number"
                          {...register("Phone Number", {
                            required: "Phone Number.",
                            pattern: {},
                          })}
                        />
                        <ErrorMessage message={errors.email?.message} />
                      </div>

                      {/* Confirm Password */}
                      <div className="input-group mb-3">
                        <span className={`${styleRegister.IconInput} input-group-text`}>
                          <i className="fa-solid fa-lock"></i>
                        </span>
                        <input
                          className={`${styleRegister.InputLogin} form-control`}
                          type={showPasswordConfirm ? "text" : "password"}
                          placeholder="Confirm Password"
                          {...register("confirmPassword", {
                            required: "Confirm Password is required.",
                            validate: validateConfirmPassword,
                          })}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={togglePasswordVisibilityConfirm}
                        >
                          <i
                            className={`fa-regular fa-eye${
                              showPasswordConfirm ? "-slash" : ""
                            }`}
                          ></i>
                        </button>
                        <ErrorMessage message={errors.confirmPassword?.message} />
                      </div>
                    </div>
                  </div>
                   {/* input img */}

                   <div className="input-group mb-3">
                      <input
                        className={`${styleRegister.inputs} form-control`}
                        type="file"
                        {...register("profileImage")}
                        // {...register("profileImage", {
                        //   required: "profileImage is required",
                        // })}
                      />
                      {/* {errors.profileImage && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.profileImage.message}
                        </div>
                      )} */}
                    </div>

                  <div className="text-end my-2">
                    <Link to="/login" className="text-success">
                       Login Now?
                    </Link>
                  </div>

                  <button className="w-100 btn btn-success" disabled={loadingBtn}>
                    {loadingBtn ? (
                      <RotatingLines
                        visible={true}
                        height="20"
                        width="20"
                        color="grey"
                        strokeWidth="5"
                        animationDuration="0.75"
                        ariaLabel="rotating-lines-loading"
                      />
                    ) : (
                      "Register"
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
