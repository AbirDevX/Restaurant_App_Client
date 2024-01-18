import JsCookie from "js-cookie";
import React, { useState } from "react";
import { FaFolderOpen, FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { IoClose, IoExit } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { logOutHelper } from "../../Helpers/authHelper";
import {
  setAccessToken,
  setIsAuthenticate,
  setUser,
} from "../../Redux/Slice/authSclice";
import "../../styles/UserDetailsCard.css";

function Navbar({
  isHome,
  isAbout,
  isService,
  isMenu,
  isContact,
  isOurTeam,
  isBooking,
  isTestimonial,
  isCheckout,
  isFoods,
  isCart,
  isOrderList,
  isOrderDetails,
}) {
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const { isAuthenticated, user, accessToken } = useSelector(
    (state) => state.authSlice
  );
  const disPatch = useDispatch();
  const logOut = async () => {
    try {
      setLoading(true);
      const result = await logOutHelper(accessToken);
      toast.success(`${result?.message}`);
      JsCookie.remove("user_accessToken");
      disPatch(setUser(null));
      disPatch(setAccessToken(null));
      disPatch(setIsAuthenticate(false));
      setLoading(false);
      setShowProfileCard(false);
    } catch (error) {
      setLoading(false);
      toast.error(`Logout failed try again..!`);
    }
  };
  return (
    <>
      {/* Navbar & Hero Start */}
      <div className="container-xxl position-relative p-0">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4 px-lg-5 py-3 py-lg-0">
          <a href="" className="navbar-brand p-0">
            <h1 className="text-primary m-0">
              <i className="fa fa-utensils me-3"></i>Restoran
            </h1>
            {/* <img src="/assets/img/logo.png" alt="Logo" /> */}
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0 pe-4">
              <NavLink
                to={"/"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Home
              </NavLink>
              <NavLink
                to={"/about"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                About
              </NavLink>
              <NavLink
                to={"/service"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Service
              </NavLink>
              <NavLink
                to={"/menu"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Menu
              </NavLink>
              <NavLink
                to={"/testimonial"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Testimonial
              </NavLink>
              <div className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  Features
                </a>
                <div className="dropdown-menu m-0">
                  <NavLink
                    to={"/booking"}
                    className={({ isActive }) =>
                      `dropdown-item ${isActive && "active"}`
                    }
                  >
                    Booking
                  </NavLink>
                  <NavLink
                    to={"/our-team"}
                    className={({ isActive }) =>
                      `dropdown-item ${isActive && "active"}`
                    }
                  >
                    Our Team
                  </NavLink>
                  {/* <NavLink
                    to={"/testimonial"}
                    className={({ isActive }) =>
                      `dropdown-item ${isActive && "active"}`
                    }
                  >
                    Testimonial
                  </NavLink> */}
                  <NavLink
                    to={"/foods"}
                    className={({ isActive }) =>
                      `dropdown-item ${isActive && "active"}`
                    }
                  >
                    Foods
                  </NavLink>
                  <NavLink
                    to={"/view-orders"}
                    className={({ isActive }) =>
                      `dropdown-item ${isActive && "active"}`
                    }
                  >
                    Orders
                  </NavLink>
                </div>
              </div>
              <NavLink
                to={"/contact"}
                className={({ isActive, isPending }) =>
                  `nav-item nav-link ${isActive && "active"}`
                }
              >
                Contact
              </NavLink>
            </div>
            {!isAuthenticated ? (
              location?.pathname === "/login" ? (
                <Link to="/sing-up" className="btn btn-primary py-2 px-4">
                  Sign Up
                </Link>
              ) : (
                <Link to="/login" className="btn btn-primary py-2 px-4">
                  Sign In
                </Link>
              )
            ) : (
              <div className=" position-relative">
                <img
                  className="border border-3 border-warning rounded-circle"
                  width={45}
                  height={45}
                  src={`${process.env.REACT_APP_SERVER_URL}/user/avatar/${user.avatar}`}
                  alt="Avatar"
                  onClick={() => setShowProfileCard((prv) => !prv)}
                />
                {/* USR ACCOUNT DETAILS START */}
                {showProfileCard && (
                  <div className="notification">
                    <ul>
                      <li>
                        <div className=" d-flex justify-content-between align-items-center ">
                          <Link
                            to={`/profile/${user?._id}`}
                            style={{ color: "aliceblue" }}
                            onClick={() => setShowProfileCard(false)}
                          >
                            <FaUser size={22} /> Profile
                          </Link>
                          <span
                            type="button"
                            onClick={() => setShowProfileCard(false)}
                          >
                            <IoClose size={24} color="###" />
                          </span>
                        </div>
                        <div className="dropdown-divider"></div>
                        <div type="button">
                          <FaFolderOpen size={22} /> My Wallet
                        </div>
                        <div className="dropdown-divider"></div>
                        <Link
                          onClick={() => setShowProfileCard(false)}
                          to={`/profile/${user?._id}`}
                          style={{ color: "aliceblue" }}
                        >
                          <IoMdSettings size={22} /> Settings
                        </Link>
                        <div className="dropdown-divider"></div>
                        {loading ? (
                          <div
                            className="spinner-border text-warning"
                            role="status"
                          >
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          <div type="button" onClick={logOut}>
                            <IoExit size={22} /> Logout
                          </div>
                        )}
                      </li>
                    </ul>
                  </div>
                )}
                {/* USER ACCOUNT DETAILS END */}
                {/*  */}
              </div>
            )}
          </div>
        </nav>

        <div className="container-xxl py-5 bg-dark hero-header ">
          {/* FOR HOME ST */}
          {isHome && (
            <div className="container my-5 py-5">
              <div className="row align-items-center g-5">
                <div className="col-lg-6 text-center text-lg-start">
                  <h1 className="display-3 text-white animated slideInLeft">
                    Enjoy Our
                    <br />
                    Delicious Meal
                  </h1>
                  <p className="text-white animated slideInLeft mb-4 pb-2">
                    Tempor erat elitr rebum at clita. Diam dolor diam ipsum sit.
                    Aliqu diam amet diam et eos. Clita erat ipsum et lorem et
                    sit, sed stet lorem sit clita duo justo magna dolore erat
                    amet
                  </p>
                  <a
                    href=""
                    className="btn btn-primary py-sm-3 px-sm-5 me-3 animated slideInLeft"
                  >
                    Book A Table
                  </a>
                </div>
                <div className="col-lg-6 text-center text-lg-end overflow-hidden">
                  <img
                    className="img-fluid"
                    src="/assets/img/hero.png"
                    alt="img"
                  />
                </div>
              </div>
            </div>
          )}
          {/* FOR HOME END */}
          {/* FOR ABOUT ST */}
          {isAbout && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                About Us
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Pages</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    About
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR ABOUT EN */}
          {/* FOR SERVICE ST */}
          {isService && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Services
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="/">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Service
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR SERVICE EN */}
          {/* FOR MENU ST */}
          {isMenu && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Food Menu
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Pages</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Menu
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR MENU EN */}
          {/* FOR CONTACT ST */}
          {isContact && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Contact Us
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Pages</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Contact
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR CONTACT EN */}
          {/* FOR BOOKING ST*/}
          {isBooking && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Booking
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link to="#">Pages</Link>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Booking
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR BOOKING EN */}
          {/* FOR OUR-TEAM ST */}
          {isOurTeam && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Our Team
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Team
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR OUR-TEAM EN */}
          {/* FOR Testimonial ST */}
          {isTestimonial && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Testimonial
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Testimonial
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR Testimonial EN */}
          {/* FOR OUR-TEAM EN */}
          {/* FOR ORDER ST */}
          {isCheckout && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Checkout
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Checkout
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR ORDER EN */}
          {/* FOR FOODS ST */}
          {isFoods && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Foods
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Foods
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR FOODS EN */}
          {/* FOR CART ST */}
          {isCart && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                View Cart
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    View Cart
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR CART EN */}
          {/* FOR ORDER LIST ST */}
          {isOrderList && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Order List
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Order List
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR ORDER LIST EN */}
          {/* FOR ORDER LIST ST */}
          {isOrderDetails && (
            <div className="container text-center my-5 pt-5 pb-4">
              <h1 className="display-3 text-white mb-3 animated slideInDown">
                Order Details
              </h1>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb justify-content-center text-uppercase">
                  <li className="breadcrumb-item">
                    <Link to="/">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="#">Pages</a>
                  </li>
                  <li
                    className="breadcrumb-item text-white active"
                    aria-current="page"
                  >
                    Order Details
                  </li>
                </ol>
              </nav>
            </div>
          )}
          {/* FOR ORDER LIST EN */}
        </div>
      </div>
      {/* Navbar & Hero End */}
    </>
  );
}

export default Navbar;
