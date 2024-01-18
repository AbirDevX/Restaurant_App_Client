import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaSave } from "react-icons/fa";
import { TbPasswordFingerprint } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { resetUserPassWordHelper } from "../Helpers/authHelper";

function UpdatePw({ handleIncrementComponent, handleDecrementComponent }) {
  const [showPw, setShowPw] = useState(false);
  const [showCPw, setShowCPw] = useState(false);
  const [apiErrors, setApiErrors] = useState("");
  const { otpToken } = useSelector((state) => state.otpSlice);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState({
    cPassword: "",
    password: "",
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

  const fromValidation = (fromData) => {
    const error = {};

    if (!fromData?.password) {
      error.password = "Required*";
    }
    if (!fromData?.cPassword) {
      error.cPassword = "Required*";
    }
    if (fromData?.password !== fromData?.cPassword) {
      error.cPassword = "Both password are not same*";
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
    resetUserPassWordHelper(fromData.password, otpToken)
      .then((data) => {
        setApiErrors("");
        toast.success("Password updated successfully🥳");
        navigate("/login", { replace: true });
      })
      .catch((err) => {
        console.log(err);
        setApiErrors(err?.response?.data?.message || "error was occur");
        toast.error("failed to updated password.😭 try again.!");
        console.log(`Error was in sending OTP: ${err?.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <TbPasswordFingerprint size={24} />
        <label htmlFor="newPassword" className="form-label">
          Enter Your Password
        </label>
        <div className="d-flex align-items-center gap-2">
          <input
            type={`${showPw ? "text" : "password"}`}
            className="form-control"
            name="password"
            onChange={handleChange}
            placeholder="enter your password"
            id="newPassword"
          />
          {showPw ? (
            <FaEyeSlash size={22} onClick={() => setShowPw(false)} />
          ) : (
            <FaEye size={22} onClick={() => setShowPw(true)} />
          )}
        </div>

        <div>
          <span className="text-danger text-sm fw-bold">
            {errors && errors?.password}
          </span>
        </div>
      </div>
      <div className="mb-3">
        <TbPasswordFingerprint size={24} />
        <label htmlFor="confirmPassword" className="form-label">
          Enter Your Confirm Password
        </label>
        <div className="d-flex align-items-center gap-2">
          <input
            type={`${showCPw ? "text" : "password"}`}
            className="form-control"
            name="cPassword"
            onChange={handleChange}
            placeholder="enter your confirm password"
            id="confirmPassword"
          />
          {showCPw ? (
            <FaEyeSlash size={22} onClick={() => setShowCPw(false)} />
          ) : (
            <FaEye size={22} onClick={() => setShowCPw(true)} />
          )}
        </div>

        <div>
          <span className="text-danger text-sm fw-bold">
            {errors && errors?.cPassword}
          </span>
        </div>
      </div>
      {/* <div className="d-flex align-items-center "> */}
      {loading ? (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button
          type="submit"
          className=" btn btn-primary d-flex align-items-center gap-2"
        >
          <span>save</span> <FaSave size={20} />
        </button>
      )}

      {apiErrors && (
        <div className="alert alert-danger mt-4 ml-4" role="alert">
          {JSON.stringify(apiErrors)}
        </div>
      )}
    </form>
  );
}

export default UpdatePw;
