/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import logo from "../../../../assets/icon.png";
import axios from "axios";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ResetPass() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State for toggling confirm password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch, // Watch the password value to check for matching passwords
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let response = await axios.post(
        "https://upskilling-egypt.com:3006/api/v1/Users/Reset",
        data
      );
      toast.success(response?.message || "Password changed successfully", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      navigate("/login");
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

  // Check if password and confirm password match
  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <div className="auth-container bg-info">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 justify-content-center align-items-center">
          <div className="col-lg-4 col-md-6 bg-white rounded rounded-2 px-5 py-3 shadow">
            <div>
              <div className="logo-container text-center mb-4">
                <img src={logo} alt="logo" className="img-fluid" />
              </div>
              <div className="title text-center mb-4">
                <h2 className="h5">Reset Password</h2>
                <p className="text-muted">Please enter your OTP or check your inbox</p>
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
                      required: "Email is required",
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
                {errors.email && (
                  <span className="text-danger p-2">{errors.email.message}</span>
                )}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon2">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type="text"
                    placeholder="OTP"
                    {...register("seed", { required: "OTP is required" })}
                    className="form-control"
                  />
                </div>
                {errors.seed && (
                  <span className="text-danger p-2">{errors.seed.message}</span>
                )}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon3">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="New Password"
                    aria-label="password"
                    aria-describedby="password-input"
                    {...register("password", { required: "New password is required" })}
                    className="form-control"
                  />
                  <span
                    className="input-group-text cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i className={`fa ${showPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                </div>
                {errors.password && (
                  <span className="text-danger p-2">{errors.password.message}</span>
                )}

                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon4">
                    <i className="fa fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm New Password"
                    aria-label="password"
                    aria-describedby="password-input"
                    {...register("confirmPassword", {
                      required: "Confirm new password is required",
                      validate: value =>
                        value === password || "Passwords do not match",
                    })}
                    className="form-control"
                  />
                  <span
                    className="input-group-text cursor-pointer"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <i className={`fa ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}></i>
                  </span>
                </div>
                {errors.confirmPassword && (
                  <span className="text-danger p-2">{errors.confirmPassword.message}</span>
                )}

                <button className="btn btn-success w-100 my-2 mt-5">Reset Password</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
