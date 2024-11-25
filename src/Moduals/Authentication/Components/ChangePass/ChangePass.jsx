/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styles from "../verifyUser/VerifyUser.module.css";
import imgLogo from "../../../../assets/logoLogin.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangePass({ handleClose }) {
  const [loadingBtn, setLoadingBtn] = useState(false);
  const [massageError, setMassageError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleNewPasswordVisibility = () => setShowNewPassword((prev) => !prev);
  const togglePasswordConfirmVisibility = () =>
    setShowPasswordConfirm((prev) => !prev);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    setLoadingBtn(true);

    if (data.newPassword === data.confirmNewPassword) {
      try {
        await axios.put(
          "https://upskilling-egypt.com:3006/api/v1/Users/ChangePassword",
          data,
          { headers: { Authorization: localStorage.getItem("token") } }
        );
        handleClose();
        toast.success("You have changed your password successfully");
      } catch (error) {
        toast.error(error.response?.data?.message || "Error occurred");
      }
      setLoadingBtn(false);
    } else {
      setMassageError("Your New Password doesn't match the Confirm Password");
      setLoadingBtn(false);
    }
  }

  return (
    <div className="row justify-content-center align-items-center">
      <div className="col-md-12">
        <div className="bg-white rounded-3 px-5 py-4">
          <div className="text-center">
            <img className="w-50" src={imgLogo} alt="Logo" />
          </div>

          <h5 className="mt-3">Change Your Password</h5>
          <p className="text-muted">Enter your details below</p>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <span
                className={`${styles.IconInput} input-group-text`}
                id="basic-addon1"
              >
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                className={`${styles.InputChangePass} form-control`}
                type={showPassword ? "text" : "password"}
                placeholder="Old Password"
                {...register("oldPassword", {
                  required: "Old Password is required",
                })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordVisibility}
              >
                <i
                  className={`fa-regular fa-eye${showPassword ? "-slash" : ""}`}
                ></i>
              </button>
              {errors.oldPassword && (
                <div className="alert alert-danger d-inline-block w-100 mt-1">
                  {errors.oldPassword.message}
                </div>
              )}
            </div>

            <div className="input-group mb-3">
              <span
                className={`${styles.IconInput} input-group-text`}
                id="basic-addon1"
              >
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                className={`${styles.InputVerify} form-control`}
                type={showNewPassword ? "text" : "password"}
                placeholder="New Password"
                {...register("newPassword", {
                  required: "New Password is required",
                })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={toggleNewPasswordVisibility}
              >
                <i
                  className={`fa-regular fa-eye${
                    showNewPassword ? "-slash" : ""
                  }`}
                ></i>
              </button>
              {errors.newPassword && (
                <div className="alert alert-danger d-inline-block w-100 mt-1">
                  {errors.newPassword.message}
                </div>
              )}
            </div>

            <div className="input-group mb-3">
              <span
                className={`${styles.IconInput} input-group-text`}
                id="basic-addon1"
              >
                <i className="fa-solid fa-lock"></i>
              </span>
              <input
                className={`${styles.InputVerify} form-control`}
                type={showPasswordConfirm ? "text" : "password"}
                placeholder="Confirm New Password"
                {...register("confirmNewPassword", {
                  required: "Confirm Password is required",
                })}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={togglePasswordConfirmVisibility}
              >
                <i
                  className={`fa-regular fa-eye${
                    showPasswordConfirm ? "-slash" : ""
                  }`}
                ></i>
              </button>
              {errors.confirmNewPassword && (
                <div className="alert alert-danger d-inline-block w-100 mt-1">
                  {errors.confirmNewPassword.message}
                </div>
              )}
            </div>

            <button
              className="btn btn-success w-100 mt-3"
              type="submit"
              disabled={loadingBtn} // Use loadingBtn to disable the button while loading
            >
              {loadingBtn ? (
                <span>
                  Please wait...{" "}
                  <i className="fa-solid fa-spinner fa-spin mx-1"></i>
                </span>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
