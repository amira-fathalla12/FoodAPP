/* eslint-disable no-unused-vars */
import React from 'react'
import imgNotFound from "../../../../assets/Not-Found.png";
import logo from "../../../../assets/logoLogin.svg";
export default function NotFound() {
  return (
    <>
      <div className="logo">
        <img src={logo} alt="logo" className="px-5 py-4" />
      </div>

      <div className="vh-100 container  ">
        <div className=" row">
          <div className=" col-md-6 mt-5">
            <h1>Oops.</h1>
            <h2 className=" text-success">Page not found</h2>
            <h2>...</h2>
            <p>This Page doesn’t exist or was removed!</p>
            <p>We suggest you back to home.</p>
            <a className='btn btn-success px-5 py-3 w-50' href='/dashboard'><div><i className='fa fa-arrow-left '></i> <span className='ps-2 bg-transparent fw-bold '>Back To Home</span></div></a>

          </div>

          <div className=" col-md-6 mt-5">
            <img style={{width:"100%"}} className=" " src={ imgNotFound  }/>

            </div>

        </div>
      </div>
    </>
  );
}