/* eslint-disable jsx-a11y/img-redundant-alt */
import JsCookie from "js-cookie";
import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { MdAlternateEmail, MdMarkEmailRead } from "react-icons/md";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signInHelper } from "../Helpers/authHelper";

import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../Redux/Slice/authSclice";
import Styles from "../styles/Login.module.css";

function Login() {
  const [showPw, setShowPw] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState({
    userName: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState("");

  const disPatch = useDispatch();

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
    if (!fromData.userName) {
      error.userName = "The user name field is mandatory*";
    }
    if (!fromData.password) {
      error.password = "The password field is mandatory.*";
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
    const result = signInHelper(fromData);
    result
      .then((data) => {
        // console.log(data);
        JsCookie.set("user_accessToken", data?.accessToken, {
          // domain: "localhost",
          secure: true,
          expires: 1,
        });
        toast.success(`${data?.message}`);
        disPatch(setIsAuthenticate(true));
        disPatch(setAccessToken(data?.accessToken));
        disPatch(setUser(data?.user));
      })
      .catch((err) => {
        // console.log(err?.response?.data?.error);
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
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="image"
            />
          </div>
          <div className={`col-md-7 col-lg-5 col-xl-5 offset-xl-1`}>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <MdMarkEmailRead size={20} style={{ marginRight: "5px" }} />
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>

                <div className="d-flex align-items-center gap-2">
                  <input
                    type="text"
                    name="userName"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    className="form-control"
                    id="exampleInputEmail1"
                    autoComplete="off"
                    aria-describedby="emailHelp"
                  />
                  <MdAlternateEmail size={22} />
                </div>
                <span
                  className="text-danger fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {errors && errors?.userName}
                </span>
              </div>
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
                </span>
              </div>
              <div className="mb-3 form-check">
                <div className="d-flex justify-content-between">
                  <div>
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
                  </div>
                  <Link to="/reset-password" className="text-body">
                    Forgot password?
                  </Link>
                </div>
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
                  Sign In
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
                Don't have an account?{" "}
                <Link to="/sing-up" className="link-danger">
                  Register
                </Link>
              </p>
              <div
                className={`${Styles.divider} d-flex align-items-center my-4`}
              >
                <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
              </div>
              <div className="d-flex flex-column gap-2">
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
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
