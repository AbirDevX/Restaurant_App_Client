import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useFormik } from "formik";
import React, { useState } from "react";
import { FaCameraRetro, FaCartPlus, FaSave } from "react-icons/fa";
import { GiShoppingCart, GiStabbedNote } from "react-icons/gi";
import { ImProfile } from "react-icons/im";
import { IoClose, IoFastFoodSharp } from "react-icons/io5";
import { MdVerified } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import AddressFrom from "../Components/AddressFrom";
import { getProfileInfo, updateProfile } from "../Helpers/authHelper";
import { setUser } from "../Redux/Slice/authSclice";
import { convertToBase64 } from "../Utility/convertToBase64";
import "../styles/Profile.css";
import Styles from "../styles/profile.module.css";

function Profile() {
  const [base64, setBase64] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { id } = useParams();
  const { accessToken } = useSelector((state) => state.authSlice);

  const disPatch = useDispatch();
  const queryClient = useQueryClient();

  const { mutate: profileMutate, isPending: profileIsPending } = useMutation({
    mutationKey: ["add-address"],
    mutationFn: (payload) =>
      updateProfile({
        accessToken: payload.accessToken,
        userId: payload.userId,
        payload: payload.data,
      }),
    onSuccess: (data) => {
      data?.user && disPatch(setUser(data.user));
      toast.success("Profile Update successfully");
      queryClient.invalidateQueries(["profile-info"]);
    },
    onError: (err) => {
      console.log(err);
      toast.error("Failed to update profile...! try again");
    },
  });

  const { data } = useQuery({
    queryKey: ["profile-info"],
    queryFn: async () => getProfileInfo(id, accessToken),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 30,
  });
  const user = data?.user;
  //
  const formik = useFormik({
    initialValues: {
      name: user?.name,
      email: user?.email,
      mobile: user?.mobile,
    },
    validate: fromValidation,
    onSubmit: (values) => {
      const data1 = JSON.stringify({
        name: values.name,
        email: values.email,
        mobile: values.mobile,
        avatar: base64 || user.avatar,
      });
      const data2 = JSON.stringify({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        avatar: user.avatar,
      });
      let payload;

      if (base64) {
        payload = Object.assign(values, { ...values, avatar: base64 });
      } else if (user.avatar) {
        payload = Object.assign(values, { ...values, avatar: user.avatar });
      } else {
        payload = Object.assign(values, { ...values });
      }
      if (data1 !== data2) {
        setShowAlert(false);
        profileMutate({ data: payload, userId: user._id, accessToken });
        // console.log(payload);
      } else {
        setShowAlert(true);
      }
      // alert(JSON.stringify(values, null, 2));
    },
  });
  const upload = async (event) => {
    const imgType = ["image/jpeg", "image/jpg", "image/png"];

    if (event.target.files?.length && event.target.files?.length > 0) {
      if (event.target.files[0].size <= 5000000) {
        const typeArray = imgType.filter(
          //@ts-ignore
          (v) => v === event.target.files[0].type
        );
        if (typeArray.length === 1) {
          const base64Format = await convertToBase64(event.target.files[0]);
          setBase64(base64Format);
        } else {
          toast.error("Only JPG/PNG/JPEG accepted!");
        }
      } else {
        toast.error("File Is too Large! (highest 5Mb accepted) ");
      }
    } else {
      toast.error("avatar not select!");
    }
  };
  return (
    <div className="container rounded bg-white mt-5 mb-5">
      <div className="row">
        <div className="col-md-3 border-right">
          <aside className={Styles["user-info-wrapper"]}>
            <div
              className={Styles["user-cover"]}
              style={{
                backgroundImage: "url(https://bootdey.com/img/Content/bg1.jpg)",
              }}
            ></div>
            <div className={Styles["user-info"]}>
              <label htmlFor="profile_img">
                <div className={Styles["user-avatar"]}>
                  <a className={Styles["edit-avatar"]} style={{ zIndex: 23 }}>
                    {" "}
                    <FaCameraRetro color="black" size={24} />
                  </a>

                  <img
                    className="border border-3 border-warning rounded-circle position-relative"
                    src={
                      base64 ||
                      `${process.env.REACT_APP_SERVER_URL}/user/avatar/${user?.avatar}`
                    }
                    alt="User"
                  />
                </div>
              </label>

              <div className={Styles["user-data"]}>
                <h4>
                  {" "}
                  <span
                    className="fw-bolder text-capitalize"
                    style={{ color: "black", fontSize: "16px" }}
                  >
                    <span className="d-flex gap-1 align-items-center">
                      <span style={{ color: "black" }}>{user?.name} </span>
                      <MdVerified
                        size={20}
                        color="blue"
                        className="rounded-3 inline"
                      />
                    </span>
                  </span>
                </h4>
                <span
                  className="fw-bolder text-black-50"
                  style={{ fontSize: "10px" }}
                >
                  Joined {new Date(user.createdAt).toDateString()}
                </span>
                <span
                  className=" d-flex justify-content-around fw-bold text-success"
                  style={{ fontSize: "12px" }}
                >
                  <MdVerified style={{ margin: "auto" }} />{" "}
                  <span className=" text-success">{user?.email}</span>
                </span>
              </div>
            </div>
          </aside>
          <nav className={Styles["list-group"]}>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "text-white"
                }`
              }
              style={{ backgroundColor: "#682773" }}
              to="/profile"
            >
              <ImProfile size={20} style={{ marginRight: "6Px" }} />
              Profile
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/view-orders"
            >
              <GiShoppingCart
                color="#682773"
                size={20}
                className="fw-bolder"
                style={{ marginRight: "6Px" }}
              />
              Orders
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/foods"
            >
              <IoFastFoodSharp
                color="#682773"
                size={20}
                style={{ marginRight: "6Px" }}
              />
              Foods
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/menu"
            >
              <GiStabbedNote
                color="#682773"
                size={20}
                style={{ marginRight: "6Px" }}
              />
              Menu
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/view-cart"
            >
              <FaCartPlus
                color="#682773"
                size={20}
                style={{ marginRight: "6Px" }}
              />
              Cart
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `${Styles["list-group-item"]} ${
                  isActive && "bg-primary text-white"
                }`
              }
              style={{ color: "#682773" }}
              to="/wishlist"
            >
              <i className="fa fa-heart"></i>Wishlist
            </NavLink>
          </nav>
        </div>
        {/* USER UPDATE FROM START */}
        <div className="col-md-5 border-right">
          <form onSubmit={formik.handleSubmit}>
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-12">
                  <input
                    type="file"
                    autoComplete="off"
                    name="avatar"
                    id="profile_img"
                    accept="image/jpeg, image/png, image/jpg"
                    className=" d-none"
                    onChange={upload}
                  />
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik?.errors?.name && formik.touched.name
                        ? "border border-1 border-danger"
                        : ""
                    }`}
                    placeholder="Enter you name"
                    {...formik.getFieldProps("name")}
                  />
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "12px" }}
                  >
                    {formik?.errors?.name && formik.touched.name
                      ? formik.errors.name
                      : ""}
                  </span>
                </div>
              </div>
              <div className="col-md-12">
                <label className="labels">Email ID</label>
                <input
                  type="text"
                  className={`form-control ${
                    formik?.errors?.email && formik.touched.email
                      ? "border border-1 border-danger"
                      : ""
                  }`}
                  placeholder="Enter your email"
                  {...formik.getFieldProps("email")}
                />
                <span
                  className="text-danger fw-bold"
                  style={{ fontSize: "12px" }}
                >
                  {formik?.errors?.email && formik.touched.email
                    ? formik.errors.email
                    : ""}
                </span>
              </div>
              <div className="row mt-3">
                <div className="col-md-12">
                  <label className="labels">Mobile Number</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik?.errors?.mobile && formik.touched.mobile
                        ? "border border-1 border-danger"
                        : ""
                    }`}
                    placeholder="Enter phone mobile no"
                    {...formik.getFieldProps("mobile")}
                  />
                  <span
                    className="text-danger fw-bold"
                    style={{ fontSize: "12px" }}
                  >
                    {formik?.errors?.mobile && formik.touched.mobile
                      ? formik.errors.mobile
                      : ""}
                  </span>
                </div>
              </div>
              <div className="mt-5">
                {profileIsPending ? (
                  <div className="spinner-border text-warning" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                ) : (
                  <button
                    className="btn btn-primary profile-button text-capitalize"
                    type="submit"
                  >
                    <FaSave className="" />
                    <span> Save Profile</span>
                  </button>
                )}
              </div>
            </div>
          </form>
          {/* ALERT TOST */}
          {showAlert && (
            <div
              className="alert alert-primary fw-bold d-flex justify-content-between"
              role="alert"
              style={{
                color: "#0c5460",
                backgroundColor: "#d1ecf1",
                borderColor: "#bee5eb",
              }}
              aria-label="Close"
            >
              <span>No changes are there!</span>
              <IoClose
                className=" fw-bol"
                size={26}
                type="button"
                onClick={() => setShowAlert(false)}
              />
            </div>
          )}
        </div>
        {/* USER UPDATE FROM END */}
        <div className="col-md-4">
          {/* ADDRESS FROM START */}
          <AddressFrom address={user?.address} user={user} />
          {/* ADDRESS FROM END */}
        </div>
      </div>
    </div>
  );
}

const fromValidation = (fromData) => {
  const error = {};
  if (!fromData?.email) {
    error.email = "The email field is mandatory.*";
  }
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(fromData.email)) {
    error.email = "invalid email address..!";
  }
  if (!fromData?.name) {
    error.name = "The name field is mandatory.*";
  }
  if (!fromData?.mobile) {
    error.mobile = "The mobile field is mandatory.*";
  }
  if (!/^(\+\d{1,3}[- ]?)?\d{10}$/.test(fromData.mobile)) {
    error.mobile = "invalid mobile no.!";
  }

  // Return true if there are no errors
  return error;
};
export default Profile;
