import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  addToCart,
  decrementCartItem,
  removeCartItem,
} from "../Redux/Slice/cartSlice";
import Styles from "../styles/ViewCart.module.css";

function Cart() {
  const { cartItems, cartTotalAmount, cartTotalQuantity } = useSelector(
    (state) => state.cart
  );
  const disPatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="container mt-4 mb-4">
      {cartItems && cartItems.length > 0 && (
        <div className="row">
          {/* LEFT SIDE */}
          <div className="col-xl-8 gap-2">
            {cartItems?.map((item) => (
              <div
                className={`${Styles["card"]} border shadow-none`}
                key={item._id}
              >
                <div className="card-body">
                  <div className="d-flex align-items-start border-bottom pb-3">
                    <div className="me-4">
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/foods/${item?.img}`}
                        alt="tmg"
                        className={`rounded ${Styles["avatar-lg"]}`}
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center overflow-hidden">
                      <div>
                        <h5
                          className={`${
                            Styles[("text-truncate", Styles["font-size-18"])]
                          }`}
                        >
                          <a href="#" className="text-dark">
                            {item?.name}
                          </a>
                        </h5>
                        {/* RATING START START */}
                        <p className="text-muted mb-0">
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star text-warning"></i>
                          <i className="bx bxs-star-half text-warning"></i>
                        </p>
                        {/* RATING START EDND */}
                        <p className="mb-0 mt-1">
                          <span style={{ fontSize: "12px", color: "gray" }}>
                            {item?.description}
                          </span>
                          {/* BADGE */}
                          <span
                            className={` fw-medium badge ${
                              item?.subCategory === "Veg".toUpperCase() &&
                              "bg-success"
                            }`}
                          >
                            {item?.subCategory?.split("_")?.join(" ")}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="flex-shrink-0 ms-2">
                      <ul className="list-inline mb-0 font-size-16">
                        <li className="list-inline-item">
                          <div
                            onClick={() => {
                              disPatch(removeCartItem(item));
                              toast.warning("remove from cart");
                            }}
                            type="button"
                            className="text-muted px-1"
                          >
                            <RiDeleteBin6Line color="black" size={22} />
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div>
                    <div className="row">
                      <div className="col-md-4">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Price</p>
                          <h5 className="mb-0 mt-2">
                            <span className="text-muted me-2">
                              <del className="font-size-16 fw-normal">
                                ₹{item?.price}
                              </del>
                            </span>
                            ₹{item?.shallPrice}
                          </h5>
                        </div>
                      </div>
                      <div className="col-md-5">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Quantity</p>
                          <div className="d-inline-flex">
                            <div
                              className={` ${Styles["w-xl"]} d-flex gap-4 align-items-center  justify-content-center`}
                            >
                              <FaMinus
                                color="black"
                                type="button"
                                onClick={() =>
                                  disPatch(decrementCartItem(item))
                                }
                              />
                              <span className="fw-bold">
                                {item?.cartItemQuantity}
                              </span>
                              <FaPlus
                                color="black"
                                type="button"
                                onClick={() => disPatch(addToCart(item))}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-3">
                        <div className="mt-3">
                          <p className="text-muted mb-2">Total</p>
                          <h5>₹{item?.shallPrice * item?.cartItemQuantity}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            {/* end card */}
          </div>
          {/* RIGHT SIDE */}
          <div className="col-xl-4">
            <div className="mt-5 mt-lg-0">
              <div className={`${Styles["card"]} border shadow-none`}>
                <div className="card-header bg-transparent border-bottom py-3 px-4">
                  <h5 className="font-size-16 mb-0 text-capitalize">
                    Price Details
                  </h5>
                </div>
                <div className="card-body p-4 pt-2">
                  <div className="table-responsive">
                    <div
                      className=" p-2 mb-2  d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <span className="fw-bold">
                        Price ({cartTotalQuantity} item)
                      </span>
                      <span className="fw-bold"> ₹{cartTotalAmount}</span>
                    </div>
                    {/* DISCOUNT ST */}
                    <div
                      className=" p-2 mb-2  d-flex align-items-center justify-content-between"
                      role="alert"
                    >
                      <span className="fw-bold">Discount</span>
                      <span className="fw-bold text-success"> -₹20</span>
                    </div>
                    {/* DISCOUNT EN */}
                    {/* DELIVERY CHARGE ST */}
                    <div
                      className=" p-2 mb-2  d-flex align-items-center justify-content-between "
                      role="alert"
                    >
                      <span className="fw-bold">Delivery Charges:</span>
                      <span
                        className={`fw-bold text-capitalize ${
                          cartTotalAmount > 300 && "text-success"
                        }`}
                      >
                        {cartTotalAmount > 300 ? "free" : "₹40"}
                      </span>
                    </div>
                    {/* DELIVERY CHARGE EN */}
                    {/* TOTAL AMOUNT ST */}
                    <div
                      className=" p-2 mb-2  text-black d-flex align-items-center justify-content-between"
                      role="alert"
                      style={{
                        borderTop: "1px dashed green",
                        borderBottom: "1px dashed green",
                      }}
                    >
                      <span
                        className="fw-bold pt-3 pb-3"
                        style={{ color: "black", fontSize: "18px" }}
                      >
                        Total Amount
                      </span>
                      <span
                        className="fw-bold"
                        style={{ color: "black", fontSize: "18px" }}
                      >
                        {" "}
                        ₹{cartTotalAmount}
                      </span>
                    </div>
                    {/* TOTAL AMOUNT EN */}
                    <span className="text-success fw-bold">
                      You will save ₹135 on this order
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      {cartItems.length < 1 && (
        <h2 className="text-center">Item not Found..!</h2>
      )}
      {/* NAVIGATION BUTTON */}
      <div className="row my-4">
        <div className="col-sm-6">
          <button
            onClick={() => navigate(-1)}
            type="button"
            title="Go-Back"
            className="btn btn-outline-secondary"
          >
            {" "}
            <i className="mdi mdi-arrow-left me-1"></i> Continue Shopping
          </button>
        </div>
        <div className="col-sm-6">
          <div className="text-sm-end mt-2 mt-sm-0">
            <Link to="/checkout" className="btn btn-lg btn-success">
              <i className="mdi mdi-cart-outline me-1"></i> Checkout{" "}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
