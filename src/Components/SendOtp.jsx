import React, { useState } from "react";
import { MdMarkEmailRead } from "react-icons/md";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { sendUserOtpHelper } from "../Helpers/authHelper";
import { setHashOtp, setOtpEmail } from "../Redux/Slice/otpSlice";

function SendOtp({ handleIncrementComponent, handleDecrementComponent }) {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiErrors, setApiErrors] = useState("");
  const disPatch = useDispatch();
  const [fromData, setFromData] = useState({
    email: "",
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
    if (!fromData.email) {
      error.email = "Required*";
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
    sendUserOtpHelper(fromData.email)
      .then((data) => {
        setApiErrors("");
        disPatch(setOtpEmail(fromData.email));
        disPatch(setHashOtp(data?.OTP));
        toast.success("we send an OTP in your email.🥳 please check.!");
        handleIncrementComponent();
      })
      .catch((err) => {
        setApiErrors(err?.response?.data?.message || "error was occur");
        toast.error("failed to send otp.😭 try again.!");
        console.log(`Error was in sending OTP: ${err?.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <MdMarkEmailRead size={22} style={{ marginRight: "5px" }} />
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
        </div>
        <span className="text-danger text-sm fw-bold">
          {errors && errors?.email}
        </span>
      </div>
      {loading ? (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary">
          Send OTP
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

export default SendOtp;
