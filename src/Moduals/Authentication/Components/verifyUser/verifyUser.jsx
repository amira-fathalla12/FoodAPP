/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import styleVerify from "./VerifyUser.module.css";
import imgLogo from "../../../../assets/logoLogin.svg";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";

export default function VerifyUser() {
  const navigate = useNavigate();
  const [loadingBtn, setloadingBtn] = useState(false);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // data => شايل data for inputs
  async function onSubmit(data) {
    try {
      let DtaApi = await axios.put(
        "https://upskilling-egypt.com:3006/api/v1/Users/verify",
        data
      );
      // console.log(DtaApi.data.token)
      let ResultToen = DtaApi.data.token;
      // console.log(ResultToen);

      toast.success("Your code is correct");
      navigate("/login");
    } catch (error) {
      // console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
    setloadingBtn(false);

    // console.log(data)
  }
  return (
    <>
      <ToastContainer />
      <section className={`${styleVerify.secVerify}`}>
        <div className="auth-container vh-100">
          <div className="bg-overlay vh-100 container-fluid">
            <div className=" row vh-100 justify-content-center  align-items-center">
              <div className=" col-md-5">
                <div className=" bg-white rounded-3 px-5 py-4">
                  <div className="  text-center">
                    <img className=" w-50 " src={imgLogo} alt=" logo food" />
                  </div>

                  <h5> verify account </h5>
                  <p className=" text-muted">
                    Please Enter Your Code or Check Your Inbox
                  </p>

                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-group mb-3">
                      <span
                        className={`${styleVerify.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-envelope"></i>
                      </span>
                      <input
                        className={`${styleVerify.InputVerify} form-control`}
                        type="email"
                        placeholder=" E-mail"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /[A-Za-z0-9._%+-]+@(gmail|yahoo|email)\.com/,
                            message: "Email Not vaild",
                          },
                        })}
                      />
                      {errors.email && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.email.message}
                        </div>
                      )}
                    </div>

                    {/* code */}

                    <div className="input-group mb-3">
                      <span
                        className={`${styleVerify.IconInput} input-group-text`}
                        id="basic-addon1"
                      >
                        <i className="fa-solid fa-lock"></i>
                      </span>
                      <input
                        className={`${styleVerify.InputVerify} form-control`}
                        type="text"
                        placeholder="code"
                        {...register("code", {
                          required: "code is required",
                        })}
                      />
                      {errors.code && (
                        <div className="alert alert-danger  d-inline-block w-100 mt-1">
                          {errors.code.message}
                        </div>
                      )}
                    </div>

                    <button className=" w-100 btn btn-success">
                      {" "}
                      {loadingBtn ? (
                        <RotatingLines
                          visible={true}
                          height="20"
                          width="20"
                          color="grey"
                          strokeWidth="5"
                          animationDuration="0.75"
                          ariaLabel="rotating-lines-loading"
                          wrapperStyle={{}}
                          wrapperClass=""
                        />
                      ) : (
                        "Submit"
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>{" "}
    </>
  );
}
