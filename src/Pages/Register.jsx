/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState } from "react";
import {
  FaEye,
  FaEyeSlash,
  FaLock,
  FaMobile,
  FaPhone,
  FaUser,
} from "react-icons/fa";
import { MdAlternateEmail, MdMarkEmailRead } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpHelper } from "../Helpers/authHelper";
import Styles from "../styles/Register.module.css";
function Register() {
  const navigation= useNavigate();
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState("");

  const [fromData, setFromData] = useState({
    email: "",
    password: "",
    cPassword: "",
    mobile: "",
    name: "",
  });
  const [errors, setErrors] = useState({});
  const handleChange = (event) => {
    // console.log(event.target);
    const name = event?.target?.name;
    const value = event?.target?.value;
    setFromData((prv) => {
      return { ...prv, [name]: value };
    });
  };
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const fromValidation = (fromData) => {
    const error = {};
    if (!fromData?.email) {
      error.email = "The email field is mandatory.*";
    }
    if (!fromData?.password) {
      error.password = "The password field is mandatory.*";
    }
    if (!fromData?.cPassword) {
      error.cPassword = "The confirm password field is mandatory.*";
    }
    if (!fromData?.name) {
      error.name = "The name field is mandatory.*";
    }
    if (fromData?.password !== fromData?.cPassword) {
      error.cPassword = "Both password are not same*";
    }
    if (!fromData?.mobile) {
      error.mobile = "The mobile field is mandatory.*";
    }
    if (!isChecked) {
      error.rememberMe = "The checkbox field is mandatory.*";
    }
    setErrors(error);
    // Return true if there are no errors
    return Object.keys(error).length === 0;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const valid = fromValidation(fromData);
    if (!valid) return;
    setLoading(true);
    const result = signUpHelper(fromData);
    result
      .then((data) => {
        toast.success("You are sign up successfully");
        navigation("/login");
      })
      .catch((err) => {
        console.log(err);
        setApiErrors((prev) => {
          prev = err?.response?.data?.error;
          return prev;
        });
      })
      .finally(() => setLoading(false));
  };
  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://preview.colorlib.com/theme/bootstrap/login-form-07/images/undraw_remotely_2j6y.svg"
              className="img-fluid"
              alt="image"
            /> 
          </div>
          <div className={`col-md-7 col-lg-5 col-xl-5 offset-xl-1`}>
            <form onSubmit={handleSubmit}>
              {/* NAME */}
              <div className="mb-3">
                <FaUser size={20} style={{ marginRight: "5px" }} />
                <label htmlFor="exampleInputName1" className="form-label">
                  Name
                </label>

                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputName1"
                    aria-describedby="emailHelp"
                  />
                  <MdAlternateEmail size={22} />
                </div>
                <span
                  className="text-danger text-sm fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {errors && errors?.name}
                  {apiErrors && apiErrors?.name?.message}
                </span>
              </div>
              {/* EMAIL */}
              <div className="mb-3">
                <MdMarkEmailRead size={20} style={{ marginRight: "5px" }} />
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>

                <div className="d-flex align-items-center gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  />
                  <MdAlternateEmail size={22} />
                </div>
                <span
                  className="text-danger text-sm fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {errors && errors?.email}
                  {apiErrors && apiErrors?.email?.message}
                </span>
              </div>
              {/* MOBILE NO */}
              <div className="mb-3">
                <FaMobile size={20} style={{ marginRight: "5px" }} />
                <label htmlFor="exampleInputMobile1" className="form-label">
                  Mobile No:
                </label>

                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Enter your Mobile no"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputMobile1"
                  />
                  <FaPhone size={22} />
                </div>
                <span
                  className="text-danger text-sm fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {errors && errors?.mobile}
                  {apiErrors && apiErrors?.mobile?.message}
                </span>
              </div>
              {/* PASSWORD */}
              <div className="mb-3">
                <FaLock style={{ marginRight: "5px" }} />
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type={`${showPw ? "text" : "password"}`}
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword1"
                  />
                  {showPw ? (
                    <FaEyeSlash size={22} onClick={() => setShowPw(false)} />
                  ) : (
                    <FaEye size={22} onClick={() => setShowPw(true)} />
                  )}
                </div>
                <span
                  className="text-danger text-sm fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {errors && errors?.password}
                  {apiErrors && apiErrors?.password?.message}
                </span>
              </div>
              {/* CONFIRM PASSWORD */}
              <div className="mb-3">
                <FaLock style={{ marginRight: "5px" }} />
                <label htmlFor="exampleInputPassword2" className="form-label">
                  Confirm Password
                </label>
                <div className="d-flex align-items-center gap-2">
                  <input
                    type={`${showCPw ? "text" : "password"}`}
                    name="cPassword"
                    placeholder="Enter your confirm password"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputPassword2"
                  />
                  {showCPw ? (
                    <FaEyeSlash size={22} onClick={() => setShowCPw(false)} />
                  ) : (
                    <FaEye size={22} onClick={() => setShowCPw(true)} />
                  )}
                </div>
                <span
                  className="text-danger text-sm fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {errors && errors?.cPassword}
                  {apiErrors && apiErrors?.cPassword?.message}
                </span>
              </div>
              {/* REMEMBER ME */}
              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                  className="form-check-input"
                  id="exampleCheck1"
                />
                <label
                  className={`form-check-label ${
                    isChecked ? "text-warning fw-bold" : ""
                  }`}
                  htmlFor="exampleCheck1"
                >
                  Remember me
                </label>
                <div>
                  <span
                    className="text-danger text-sm fw-bold"
                    style={{ fontSize: "12px" }}
                  >
                    {errors && errors?.rememberMe}
                  </span>
                </div>
              </div>

              {loading ? (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              )}
              {apiErrors && (
                <div
                  className="alert alert-danger mt-2 text-center fw-bolder"
                  role="alert"
                >
                  {JSON.stringify(apiErrors)}
                </div>
              )}
              <p className="small fw-bold mt-2 pt-1 mb-0">
                I'm already register?{" "}
                <Link to="/login" className="link-danger">
                  Login
                </Link>
              </p>
              <div
                className={`${Styles.divider} d-flex align-items-center my-4`}
              >
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              {/* <div className="d-flex flex-column gap-2">
                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#3b5998" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-facebook-f me-2"></i>Continue with
                  Facebook
                </a>
                <a
                  className="btn btn-primary btn-lg btn-block"
                  style={{ backgroundColor: "#55acee" }}
                  href="#!"
                  role="button"
                >
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter
                </a>
              </div> */}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
