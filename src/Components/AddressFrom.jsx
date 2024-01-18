import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaCalendarMinus, FaSave } from "react-icons/fa";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addAddress, chooseDefaultLocation } from "../Helpers/authHelper";
import { setUser } from "../Redux/Slice/authSclice";

function AddressFrom({ address, user }) {
  const { accessToken } = useSelector((state) => state.authSlice);
  const [showAddressFrom, setShowAddressFrom] = useState(false);

  const disPatch = useDispatch();
  const queryClient = useQueryClient();

  // FOR CHOOSE DEFAULT ADDRESS
  const { mutate, isPending } = useMutation({
    mutationKey: ["choose-defaultLocation"],
    mutationFn: (payload) =>
      chooseDefaultLocation({
        accessToken: payload.accessToken,
        userId: payload.userId,
        addressId: payload.addressId,
      }),
    onSuccess: (data) => {
      disPatch(setUser(data?.user));
      toast.success("Address updated successfully");
      queryClient.invalidateQueries(["profile-info"]);
    },
    onError: (err) => {
      toast.error("failed...! try again");
    },
  });
  // FOR ADD ADDRESS
  const { mutate: addressMutate, isPending: addressIsPending } = useMutation({
    mutationKey: ["add-address"],
    mutationFn: (payload) =>
      addAddress({
        accessToken: payload.accessToken,
        userId: payload.userId,
        payload: payload.data,
      }),
    onSuccess: () => {
      toast.success("Address added successfully");
      queryClient.invalidateQueries(["profile-info"]);
    },
    onError: (err) => {
      if (err?.response?.status === 406) {
        toast.warning("Only 3 address can add 😭");
      } else {
        toast.error("adding address failed...! try again");
      }
    },
  });
  //   FORMIK
  const formik = useFormik({
    initialValues: {
      village: "",
      landMark: "",
      post: "",
      ps: "",
      pin: "",
      district: "",
      state: "",
    },
    validate: fromValidation,
    onSubmit: (values) => {
      addressMutate({ userId: user?._id, data: values, accessToken });
      setShowAddressFrom(false);
      formik.resetForm();
    },
  });
  // ON HANDLE CLICK
  const changeDefaultLocation = async ({ userId, addressId, accessToken }) => {
    mutate({ userId, addressId, accessToken });
  };
  return (
    <div className="p-3 py-5">
      <div className="d-flex justify-content-between align-items-center experience">
        <span>{!showAddressFrom ? "Edit" : "Add"} Address</span>
        <div
          onClick={() => setShowAddressFrom((prv) => !prv)}
          className="border p-2 px-3 add-experience text-white rounded-1 d-flex gap-2"
          style={{ backgroundColor: "#682773" }}
        >
          <span>
            {" "}
            {showAddressFrom ? (
              <FaCalendarMinus size={20} className="fw-bold" />
            ) : (
              <IoMdAdd size={20} className="fw-bold" />
            )}
          </span>
          <span>{showAddressFrom ? "Hide Address From" : "Add Address"}</span>
        </div>
      </div>
      <br />
      {showAddressFrom && (
        <form onSubmit={formik.handleSubmit}>
          <div className="col-md-12">
            <label className="labels">Village</label>
            <input
              type="text"
              className={`form-control ${
                formik?.errors?.village && formik.touched.village
                  ? "border border-1 border-danger"
                  : ""
              }`}
              placeholder="village"
              {...formik.getFieldProps("village")}
            />
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.village && formik.touched.village
                ? formik.errors.village
                : ""}
            </span>
          </div>
          <div className="col-md-12">
            <label className="labels">Land Mark</label>
            <input
              type="text"
              className={`form-control ${
                formik?.errors?.landMark && formik.touched.landMark
                  ? "border border-1 border-danger"
                  : ""
              }`}
              placeholder="landmark"
              {...formik.getFieldProps("landMark")}
            />
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.landMark && formik.touched.landMark
                ? formik.errors.landMark
                : ""}
            </span>
          </div>
          <div className="col-md-12">
            <label className="labels">Police Station</label>
            <input
              type="text"
              className={`form-control ${
                formik?.errors?.ps && formik.touched.ps
                  ? "border border-1 border-danger"
                  : ""
              }`}
              placeholder="police station"
              {...formik.getFieldProps("ps")}
            />
            <span className="text-danger fw-bold" style={{ fontSize: "12px" }}>
              {formik?.errors?.ps && formik.touched.ps ? formik.errors.ps : ""}
            </span>
          </div>
          <br />
          <div className="row mt-2">
            <div className="col-md-6">
              <label className="labels">District</label>
              <input
                type="text"
                className={`form-control ${
                  formik?.errors?.district && formik.touched.district
                    ? "border border-1 border-danger"
                    : ""
                }`}
                placeholder="district"
                {...formik.getFieldProps("district")}
              />
              <span
                className="text-danger fw-bold"
                style={{ fontSize: "12px" }}
              >
                {formik?.errors?.district && formik.touched.district
                  ? formik.errors.district
                  : ""}
              </span>
            </div>
            <div className="col-md-6">
              <label className="labels">Pin</label>
              <input
                type="text"
                className={`form-control ${
                  formik?.errors?.pin && formik.touched.pin
                    ? "border border-1 border-danger"
                    : ""
                }`}
                placeholder="pin code"
                {...formik.getFieldProps("pin")}
              />
              <span
                className="text-danger fw-bold"
                style={{ fontSize: "12px" }}
              >
                {formik?.errors?.pin && formik.touched.pin
                  ? formik.errors.pin
                  : ""}
              </span>
            </div>
          </div>
          <div className="row mt-2">
            <div className="col-md-6">
              <label className="labels">Post</label>
              <input
                type="text"
                className={`form-control ${
                  formik?.errors?.post && formik.touched.post
                    ? "border border-1 border-danger"
                    : ""
                }`}
                placeholder="post office"
                {...formik.getFieldProps("post")}
              />
              <span
                className="text-danger fw-bold"
                style={{ fontSize: "12px" }}
              >
                {formik?.errors?.post && formik.touched.post
                  ? formik.errors.post
                  : ""}
              </span>
            </div>
            <div className="col-md-6">
              <label className="labels">State</label>
              <input
                type="text"
                className={`form-control ${
                  formik?.errors?.state && formik.touched.state
                    ? "border border-1 border-danger"
                    : ""
                }`}
                placeholder="state"
                {...formik.getFieldProps("state")}
              />
              <span
                className="text-danger fw-bold"
                style={{ fontSize: "12px" }}
              >
                {formik?.errors?.state && formik.touched.state
                  ? formik.errors.state
                  : ""}
              </span>
            </div>
          </div>
          <div className="mt-5">
            {addressIsPending ? (
              <div className="spinner-border text-warning" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <button
                className="btn btn-primary profile-button text-capitalize"
                type="submit"
              >
                <FaSave className="" />
                <span> Save Address</span>
              </button>
            )}
          </div>
        </form>
      )}
      {!showAddressFrom && (
        <div className="card mb-4">
          <div className="card-header py-3" style={{ background: "#682773" }}>
            <h5 className="mb-0 text-uppercase text-white ">ORDER ADDRESS</h5>
          </div>
          <div className="card-body">
            <ul className="list-group list-group-flush">
              {/* Existing list items */}
            </ul>

            {/* Radio boxes for addresses */}
            <div className={`${isPending && "d-flex justify-content-center "}`}>
              {address && isPending ? (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                address?.map((location, index) => {
                  return (
                    <div className="form-check" key={location?._id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="address"
                        checked={location?.defaultLocation}
                        id={`${location?._id}`}
                        value={location?._id}
                        onChange={() => {}}
                      />
                      <label
                        type="button"
                        onClick={() =>
                          changeDefaultLocation({
                            userId: user._id,
                            addressId: location._id,
                            accessToken,
                          })
                        }
                        className="form-check-label"
                        htmlFor={`${location?._id}`}
                      >
                        Address {++index} :{" "}
                        <div className="">
                          <span>
                            <span className="fw-bold text-capitalize">
                              {user.name}{" "}
                            </span>
                            <span>
                              {location?.village} {location?.landMark},
                              {location?.ps}, {location?.district} District,{" "}
                              {location?.state} -{" "}
                              <span className="fw-bold">{location?.pin}</span>
                            </span>
                          </span>
                        </div>
                      </label>
                    </div>
                  );
                })
              )}
              {address.length < 1 && (
                <span className="d-flex justify-content-center">
                  <IoMdAddCircle
                    onClick={() => setShowAddressFrom(true)}
                    size={38}
                    color="#682773"
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      )}
      <br />
    </div>
  );
}

const fromValidation = (fromData) => {
  const error = {};
  if (!fromData?.village) {
    error.village = "The village field is mandatory.*";
  }
  if (!fromData?.landMark) {
    error.landMark = "The landMark field is mandatory.*";
  }
  if (!fromData?.post) {
    error.post = "The post field is mandatory.*";
  }
  if (!fromData?.ps) {
    error.ps = "The ps field is mandatory.*";
  }
  if (!fromData?.pin) {
    error.pin = "The pin field is mandatory.*";
  }
  if (!fromData?.district) {
    error.district = "The district field is mandatory.*";
  }
  if (!fromData?.state) {
    error.state = "The state field is mandatory.*";
  }

  // Return true if there are no errors
  return error;
};
export default AddressFrom;
