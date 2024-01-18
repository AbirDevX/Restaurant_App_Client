import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { bookingATable } from "../Helpers/helper";

function BookingTableFrom({ selectedTable }) {
  const { user, accessToken } = useSelector((state) => state.authSlice);
  const [loading, setLoading] = useState(false);
  const [value, onChange] = useState(new Date());
  const formik = useFormik({
    initialValues: {
      bookingName: "",
      bookingEmail: "",
      bookingDate: "",
      startTime: "",
      durationTime: "",
      specialRequest: "",
    },
    validate: fromValidation,
    onSubmit: (values) => {
      setLoading(true);
      const payload = {
        ...values,
        tableId: selectedTable?._id,
        bookingId: user?._id,
      };
      bookingATable(payload, accessToken)
        .then((data) => {
          // console.log(data);
          toast.success("Table booking successFully");
          formik.resetForm();
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Failed to book table..!");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-white">
        You choose our popular: {selectedTable?.name} table & No is:{" "}
        {selectedTable?.no}
      </h2>
      <div className="row g-3">
        {/* NAME START */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Your Name"
              {...formik.getFieldProps("bookingName")}
            />
            <label htmlFor="name">Your Name</label>
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.bookingName && formik.touched.bookingName
                ? formik.errors.bookingName
                : ""}
            </span>
          </div>
        </div>
        {/* NAME END */}
        {/* EMAIL START */}
        <div className="col-md-6">
          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Your Email"
              {...formik.getFieldProps("bookingEmail")}
            />
            <label htmlFor="email">Your Email</label>
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.bookingEmail && formik.touched.bookingEmail
                ? formik.errors.bookingEmail
                : ""}
            </span>
          </div>
        </div>
        {/* EMAIL END */}
        {/* STATING TIME */}
        <div className="col-md-6">
          <div
            className="form-floating date"
            id="date3"
            data-target-input="nearest"
          >
            <input
              type="date"
              className="form-control datetimepicker-input"
              id="datetime"
              placeholder="Booking Date"
              {...formik.getFieldProps("bookingDate")}
            />
            <label htmlFor="datetime">Booking Date</label>
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.bookingDate && formik.touched.bookingDate
                ? formik.errors.bookingDate
                : ""}
            </span>
          </div>
        </div>
        {/* STATING TIME END */}
        {/* DURATION START */}
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="selectStartTime"
              {...formik.getFieldProps("startTime")}
            >
              <option value="">select time</option>
              <option value="08:AM">08 AM</option>
              <option value="10:AM">10 AM</option>
              <option value="12:PM">12 PM</option>
              <option value="02:PM">02 PM</option>
              <option value="07:PM">07 PM</option>
              <option value="08:PM">08 PM</option>
              <option value="10:PM">10 PM</option>
            </select>
            <label htmlFor="selectStartTime">Start Time</label>
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.startTime && formik.touched.startTime
                ? formik.errors.startTime
                : ""}
            </span>
          </div>
        </div>
        {/* DURATION END */}
        <div className="col-md-6">
          <div className="form-floating">
            <select
              className="form-select"
              id="selectDuration"
              {...formik.getFieldProps("durationTime")}
            >
              <option value="">choose duration hours</option>
              <option value="1hr">1 HR</option>
              <option value="2hr">2 HR</option>
              <option value="3hr">3 HR</option>
              <option value="4hr">4 HR</option>
            </select>
            <label htmlFor="selectDuration">Duration</label>
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.durationTime && formik.touched.durationTime
                ? formik.errors.durationTime
                : ""}
            </span>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-floating">
            <select className="form-select" id="select1">
              <option value={selectedTable?.capacity}>
                {selectedTable?.capacity}
              </option>
            </select>
            <label htmlFor="select1">No Of People</label>
          </div>
        </div>
        <div className="col-12">
          <div className="form-floating">
            <textarea
              className={`form-control`}
              placeholder="Special Request"
              id="message"
              style={{ height: "100px" }}
              {...formik.getFieldProps("specialRequest")}
            ></textarea>
            <label htmlFor="message">Special Request</label>
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.specialRequest && formik.touched.specialRequest
                ? formik.errors.specialRequest
                : ""}
            </span>
          </div>
        </div>
        <div className="col-12">
          {loading ? (
            <div className="spinner-border text-warning" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <button className="btn btn-primary w-100 py-3" type="submit">
              Book Now
            </button>
          )}
        </div>
      </div>
    </form>
  );
}

const fromValidation = (fromData) => {
  const error = {};
  if (!fromData?.bookingName) {
    error.bookingName = "The name field is mandatory.*";
  }
  if (!fromData?.bookingEmail) {
    error.bookingEmail = "The email field is mandatory.*";
  }
  if (!fromData?.bookingDate) {
    error.bookingDate = "The booking date field is mandatory.*";
  }
  if (!fromData?.startTime) {
    error.startTime = "The start time field is mandatory.*";
  }
  if (!fromData?.startTime) {
    error.durationTime = "The duration time field is mandatory.*";
  }
  if (!fromData?.specialRequest) {
    error.specialRequest = "The special request field is mandatory.*";
  }
  if (!fromData?.durationTime) {
    error.durationTime = "The duration time field is mandatory.*";
  }

  // Return true if there are no errors
  return error;
};
export default BookingTableFrom;
