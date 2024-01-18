import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { orderDetails } from "../Helpers/helper";
import { OrderEnum } from "../config/enum";
import "../styles/OrderDetails.css";

function OrderDetails() {
  const { orderId } = useParams();
  const { user, accessToken } = useSelector((state) => state.authSlice);
  const { data } = useQuery({
    queryKey: ["order-details"],
    queryFn: async () => orderDetails({ accessToken, orderId }),
    placeholderData: keepPreviousData,
    throwOnError: false,
  });
  const orderedItems = data?.result?.items;
  const order = data?.result;
  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center mt-5 mb-5">
        <div className="col-lg-9 my-lg-0 my-1">
          <div id={"main-content"} className="bg-white border">
            <div className="d-flex flex-column justify-content-center ">
              <div className="h5">Hello {user?.name},</div>
              <div>Logged in as: {user?.email}</div>
            </div>
            <div className="d-flex my-4 flex-wrap gap-2">
              {orderedItems &&
                orderedItems?.map((order, i) => {
                  return (
                    <div className="box  my-1 bg-light" key={order?._id}>
                      <img
                        src={`${process.env.REACT_APP_SERVER_URL}/foods/${order?.foodId?.img}`}
                        alt="img"
                      />
                      <div className="d-flex align-items-center mt-2">
                        <div className="tag fw-bold">Orders No:</div>
                        <div className="ms-auto number">{++i}</div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <br />
            <div className="text-uppercase"> Order Details</div>
            <div className="order my-3 bg-light">
              <div className="row">
                <div className="col-lg-4">
                  <div className="d-flex flex-column justify-content-between order-summary">
                    <div className="d-flex align-items-center">
                      <div
                        className="text-uppercase"
                        style={{ fontSize: "12px" }}
                      >
                        Order id : <span>#{order?._id}</span>
                      </div>
                    </div>
                    <div className="fs-8">Products #03</div>
                    <div className="fs-8">
                      {new Date(order?.createdAt).toDateString()}
                    </div>
                    <div className="rating d-flex align-items-center pt-1">
                      <img
                        src="https://www.freepnglogos.com/uploads/like-png/like-png-hand-thumb-sign-vector-graphic-pixabay-39.png"
                        alt=""
                      />
                      <span className="px-2">Rating:</span>
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                      <span className="fas fa-star"></span>
                      <span className="far fa-star"></span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-8">
                  <div className="d-sm-flex align-items-sm-start justify-content-sm-between">
                    <div className="status fw-bolder">Status : {order?.orderStatus?.split("_").join(" ")}</div>
                    <div className="btn">
                      <span
                        style={{ padding: "1px 2px 1px 2px" }}
                        className={`text-white rounded-2 text-lowercase ${
                          OrderEnum.CANCEL === order?.orderStatus
                            ? "bg-danger"
                            : ""
                        } 
                        ${
                          OrderEnum.SUCCESS === order?.orderStatus
                            ? "bg-success"
                            : ""
                        } 
                        ${
                          OrderEnum.PROCESSED === order?.orderStatus
                            ? "bg-info"
                            : ""
                        }
                        ${
                          OrderEnum.OUT_FOR_DELIVERY === order?.orderStatus
                            ? "bg-waring"
                            : ""
                        }
                        ${
                          OrderEnum.SHIPPED === order?.orderStatus
                            ? "bg-info"
                            : ""
                        }`}
                      >
                        {order?.orderStatus?.split("_").join(" ")}
                      </span>
                    </div>
                  </div>
                  <div className="progressbar-track">
                    <ul className="progressbar fw-bolder">
                      <li
                        id="step-1"
                        className={`text-muted ${
                          OrderEnum.CANCEL === order?.orderStatus
                            ? ""
                            : [
                                OrderEnum.PROCESSED,
                                OrderEnum.SHIPPED,
                                OrderEnum.OUT_FOR_DELIVERY,
                                OrderEnum.SUCCESS,
                              ].includes(order?.orderStatus)
                            ? "green"
                            : ""
                        } `}
                      >
                        <span className="fas fa-gift"></span>
                      </li>
                      <li
                        id="step-2"
                        className={`text-muted ${
                          OrderEnum.CANCEL === order?.orderStatus
                            ? ""
                            : [
                                OrderEnum.SHIPPED,
                                OrderEnum.SUCCESS,
                                OrderEnum.OUT_FOR_DELIVERY,
                              ].includes(order?.orderStatus)
                            ? "green"
                            : ""
                        } `}
                      >
                        <span className="fas fa-check"></span>
                      </li>
                      <li
                        id="step-3"
                        className={`text-muted ${
                          OrderEnum.CANCEL === order?.orderStatus
                            ? ""
                            : [
                                OrderEnum.SHIPPED,
                                OrderEnum.SUCCESS,
                                OrderEnum.OUT_FOR_DELIVERY,
                              ].includes(order?.orderStatus)
                            ? "green"
                            : ""
                        } `}
                      >
                        <span className="fas fa-box"></span>
                      </li>
                      <li
                        id="step-4"
                        className={`text-muted ${
                          OrderEnum.CANCEL === order?.orderStatus
                            ? ""
                            : [
                                OrderEnum.SUCCESS,
                                OrderEnum.OUT_FOR_DELIVERY,
                              ].includes(order?.orderStatus)
                            ? "green"
                            : ""
                        } `}
                      >
                        <span className="fas fa-truck"></span>
                      </li>
                      <li
                        id="step-5"
                        className={`text-muted ${
                          OrderEnum.CANCEL === order?.orderStatus
                            ? ""
                            : [OrderEnum.SUCCESS].includes(order?.orderStatus)
                            ? "green"
                            : ""
                        } `}
                      >
                        <span className="fas fa-box-open"></span>
                      </li>
                    </ul>
                    <div id="tracker"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetails;
