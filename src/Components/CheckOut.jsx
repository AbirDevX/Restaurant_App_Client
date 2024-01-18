import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { FcCheckmark } from "react-icons/fc";
import { IoMdAddCircle } from "react-icons/io";
import { LuShieldCheck } from "react-icons/lu";
import { MdAddBox } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { placeOrder } from "../Helpers/helper";
import {
  addToCart,
  decrementCartItem,
  removeCartItem,
  resetCart,
} from "../Redux/Slice/cartSlice";

function CheckOut() {
  const { cartItems, cartTotalAmount, cartTotalQuantity, gst } = useSelector(
    (state) => state.cart
  );
  const { user, accessToken } = useSelector((state) => state.authSlice);
  const disPatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationKey: ["place-order"],
    mutationFn: ({ payload, accessToken }) =>
      placeOrder({
        accessToken,
        payload,
      }),
    onSuccess: (data) => {
      toast.success("Order successfully");
      queryClient.invalidateQueries(["pagination-order-list"]);
      navigate("/view-orders");
      disPatch(resetCart());
    },
    onError: (err) => {
      console.log(err);
      toast.error("Order failed...! try again");
    },
  });

  const handlePlaceOrder = () => {
    const items = [];
    cartItems?.forEach((value) => {
      items?.push({ foodId: value?._id, quantity: value?.cartItemQuantity });
    });
    const payload = {
      userId: user?._id,
      items,
      shippingAddress: `${user?.name} ${defaultAddress[0]?.village}, ${defaultAddress[0]?.landMark}, ${defaultAddress[0]?.ps}, ${defaultAddress[0]?.district} District, ${defaultAddress[0]?.state}, -${defaultAddress[0]?.pin}`,
      subTotal: cartTotalAmount,
      gst,
      total: cartTotalAmount + gst,
    };
    mutate({ accessToken, payload });
  };

  // FOR ADDRESS
  if (
    cartItems.length < 1 &&
    cartTotalAmount === 0 &&
    cartTotalQuantity === 0
  ) {
    return <Navigate to={"/foods"} />;
  }
  const defaultAddress =
    user && user?.address?.filter((v) => v.defaultLocation);

  return (
    <section className="h-100 gradient-custom">
      <div className="container py-5">
        <div className="row d-flex justify-content-center my-4">
          {/* LEFT SIDE BOX */}
          <div className="col-md-8">
            <hr className="my-2" />
            <span className="text-center fw-bold fs-4 d-block my-3">
              Order summary
            </span>
            {cartItems &&
              cartItems?.map((item) => (
                <div className="card mb-4 mt-2" key={item?._id}>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-3 col-md-12 mb-4 mb-lg-0">
                        <div
                          className="bg-image hover-overlay hover-zoom ripple rounded"
                          data-mdb-ripple-color="light"
                        >
                          <img
                            src={`${process.env.REACT_APP_SERVER_URL}/foods/${item?.img}`}
                            className="w-100"
                            alt="food"
                          />
                          <span
                            className={` fw-medium badge ${
                              item?.subCategory === "Veg".toUpperCase() &&
                              "bg-success"
                            }`}
                          >
                            {item?.subCategory?.split("_")?.join(" ")}
                          </span>
                          <a href="#!">
                            <div
                              className="mask"
                              style={{
                                backgroundColor: "rgba(251, 251, 251, 0.2)",
                              }}
                            ></div>
                          </a>
                        </div>
                      </div>
                      <div className="col-lg-5 col-md-6 mb-4 mb-lg-0">
                        {/* NAME */}
                        <p>
                          <strong>{item?.name}</strong>
                        </p>
                        <p>{item?.description.slice(0, 60)}...</p>
                        <button
                          type="button"
                          className="btn btn-primary btn-sm me-1 mb-2"
                          data-mdb-toggle="tooltip"
                          title="Remove item"
                          onClick={() => disPatch(removeCartItem(item))}
                        >
                          <RiDeleteBin6Line size={20} />
                        </button>
                      </div>
                      <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
                        <div
                          className="d-flex mb-4"
                          style={{ maxWidth: "300px" }}
                        >
                          <button
                            type="button"
                            className="btn btn-primary px-3 me-2 h-50 w-25"
                            title="Decrement item quantity"
                            onClick={() => disPatch(decrementCartItem(item))}
                          >
                            <i className="fas fa-minus"></i>
                          </button>

                          <div className="form-outline">
                            <input
                              id="form1"
                              min="0"
                              value={item?.cartItemQuantity}
                              type="number"
                              className="form-control"
                              onChange={() => {}}
                            />
                            <label className="form-label" htmlFor="form1">
                              Quantity
                            </label>
                          </div>

                          <button
                            type="button"
                            title="Increment item quantity"
                            className="btn btn-primary px-3 ms-2 h-50 w-25"
                            onClick={() => disPatch(addToCart(item))}
                          >
                            <i className="fas fa-plus"></i>
                          </button>
                        </div>
                        <p className="text-start text-md-center d-flex flex-row gap-2 justify-content-end">
                          <span className="text-secondary text-decoration-line-through">
                            <strong>₹{item?.shallPrice}</strong>
                          </span>
                          <span className="text-success">
                            <strong>₹{item?.price}</strong>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            {cartItems && cartItems.length < 1 && (
              <h2 className="text-center">Item not Found..!</h2>
            )}
            <div className="d-flex justify-content-end">
              <Link
                to={"/foods"}
                type="button"
                className="btn btn-primary btn-lg btn-block text-center mt-2 mb-3 text-capitalize"
              >
                <MdAddBox size={24} /> Add Item
              </Link>
            </div>
            {/* ORDER ADDRESS */}
            <div className="card mb-4">
              <div className="card-header bg-primary py-3">
                <h5 className="mb-0 text-uppercase text-white ">
                  Shipping ADDRESS
                </h5>
              </div>
              <div className="card-body">
                <ul className="list-group list-group-flush">
                  {/* Existing list items */}
                </ul>
                {/* Radio boxes for addresses */}
                <div>
                  <div className="form-check">
                    {defaultAddress &&
                      defaultAddress.length > 0 &&
                      defaultAddress.map((location, i) => (
                        <div
                          className="d-flex align-items-center"
                          key={location._id}
                        >
                          <span>
                            <span className="fw-bold text-capitalize">
                              <FcCheckmark
                                className="fw-bolder m-2"
                                size={20}
                              />{" "}
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
                      ))}
                    {defaultAddress && defaultAddress.length < 1 && (
                      <span className="d-flex justify-content-center">
                        <IoMdAddCircle
                        type="button"
                          onClick={() => {
                            navigate(`/profile/${user?._id}`);
                          }}
                          size={38}
                          color="#682773"
                        />
                      </span>
                    )}
                    {defaultAddress?.length < 1 && (
                      <div className="alert alert-warning fw-bold" role="alert">
                        Default address Not found..! go to profile & add default
                        address
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* RIGHT SIDE BOX */}
          <div className="col-md-4">
            <div className="card mb-4">
              <div className="card-header bg-primary py-3">
                <h5 className="mb-0 text-uppercase text-white">
                  Price Details
                </h5>
              </div>
              <div className="card-body">
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
                  {/* DELIVERY GST EN */}
                  {/* GST START */}
                  <div
                    className=" p-2 mb-2  d-flex align-items-center justify-content-between "
                    role="alert"
                  >
                    <span className="fw-bold">Gst:</span>
                    <span className={`fw-bold text-capitalize `}>₹{gst}</span>
                  </div>
                  {/* GST END */}
                  {/* SUB-TOTAL START */}
                  <div
                    className=" p-2 mb-2  d-flex align-items-center justify-content-between "
                    role="alert"
                  >
                    <span className="fw-bold">Sub-Total:</span>
                    <span className={`fw-bold text-capitalize `}>
                      ₹{cartTotalAmount}
                    </span>
                  </div>
                  {/* SUB-TOTAL END */}
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
                      ₹{cartTotalAmount + gst}
                    </span>
                  </div>
                  {/* TOTAL AMOUNT EN */}
                  <span className="text-success fw-bold">
                    You will save ₹135 on this order
                  </span>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-end">
              {isPending ? (
                <div className="spinner-border text-warning" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                <button
                  disabled={defaultAddress.length < 1 ? true : false}
                  onClick={handlePlaceOrder}
                  type="button"
                  className="btn btn-success btn-lg btn-block text-center mt-2 mb-2"
                >
                  Place Order
                </button>
              )}
            </div>
            {defaultAddress?.length < 1 && (
              <div className="alert alert-warning fw-bold" role="alert">
                Default address Not found..!
              </div>
            )}
            <div className="d-flex align-items-center gap-2">
              <LuShieldCheck size={38} stroke="green" />
              <span
                className="text-sm fw-bold text-secondary"
                style={{ fontSize: "13px" }}
              >
                Safe and Secure Payments.Easy returns.100% Authentic products.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckOut;
