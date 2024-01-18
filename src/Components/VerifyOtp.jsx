import React, { useState } from "react";
import { FcSms } from "react-icons/fc";
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyUserOtpHelper } from "../Helpers/authHelper";
import { setOtpToken } from "../Redux/Slice/otpSlice";

function VerifyOtp({ handleIncrementComponent, handleDecrementComponent }) {
  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState({ otp: "" });
  const [errors, setErrors] = useState({});
  const [apiErrors, setApiErrors] = useState("");
  const { email } = useSelector((state) => state.otpSlice);
  const disPatch = useDispatch();

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
    if (!fromData.otp) {
      error.otp = "Required*";
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
    verifyUserOtpHelper({ otp: fromData?.otp, email })
      .then((data) => {
        setApiErrors("");
        disPatch(setOtpToken(data?.token));
        toast.success("OTP verify successFull🥳");
        handleIncrementComponent();
      })
      .catch((err) => {
        // console.log(err);
        setApiErrors(err?.response?.data?.message || "error was occur");
        toast.error("failed to verify OTP.😭 try again.!");
        console.log(`Error was in sending OTP: ${err?.message}`);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <FcSms size={22} />
        <label htmlFor="newPassword" className="form-label">
          Enter Your OTP
        </label>
        <input
          type="text"
          name="otp"
          onChange={handleChange}
          className="form-control"
          id="newPassword"
          placeholder="enter your otp"
        />
        <div>
          <span className="text-danger text-sm fw-bold">
            {errors && errors?.otp}
          </span>
        </div>
      </div>
      {loading ? (
        <div className="spinner-border text-warning" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <button type="submit" className="btn btn-primary">
          <IoSendSharp size={24} />
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

export default VerifyOtp;
