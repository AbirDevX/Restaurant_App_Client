import React, { useState } from "react";
import { MdArrowBack } from "react-icons/md";
import SendOtp from "../Components/SendOtp";
import UpdatePw from "../Components/UpdatePw";
import VerifyOtp from "../Components/VerifyOtp";
import Styles from "../styles/ResetPw.module.css";

function ResetPw() {
  const [component, setComponent] = useState(0);

  const handleIncrementComponent = () => {
    setComponent((prevCount) => {
      if (prevCount >= 2) return Math.max(prevCount, 2);
      return prevCount + 1;
    });
  };
  const handleDecrementComponent = () => {
    setComponent((prevCount) => {
      if (prevCount === 0) return Math.max(prevCount, 0);
      return prevCount - 1;
    });
  };
  const resetCompo = [
    {
      compo: (
        <SendOtp
          handleIncrementComponent={handleIncrementComponent}
          handleDecrementComponent={handleDecrementComponent}
        />
      ),
    },
    {
      compo: (
        <VerifyOtp
          handleIncrementComponent={handleIncrementComponent}
          handleDecrementComponent={handleDecrementComponent}
        />
      ),
    },
    {
      compo: (
        <UpdatePw
          handleIncrementComponent={handleIncrementComponent}
          handleDecrementComponent={handleDecrementComponent}
        />
      ),
    },
  ];
  return (
    <>
      <div className={Styles.resetPasswordContainer}>
        <div className="row">
          <div className="col-md-6 mx-auto">
            <div className="form-container">
              <h2 className="text-center mb-4">Reset Password</h2>
              {resetCompo[component].compo}
              {component > 0 && (
                <div
                  onClick={handleDecrementComponent}
                  className="mt-4 btn btn-info"
                >
                  <MdArrowBack color="white" size={24} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResetPw;
