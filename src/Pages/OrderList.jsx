import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { CgMenuGridR } from "react-icons/cg";
import { FaChevronDown } from "react-icons/fa";
import { TfiMenuAlt } from "react-icons/tfi";
import { useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ordersListPagination } from "../Helpers/helper";
import { paginationPages } from "../Utility/utility";
import { OrderEnum } from "../config/enum";
import "../styles/OrderList.css";

function OrderList() {
  const { accessToken } = useSelector((state) => state.authSlice);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams({
    orderStatus: "",
  });
  const [pagination, setPagination] = useSearchParams({
    skip: 0,
    limit: 4,
  });

  const skip = parseInt(pagination.get("skip"));
  const limit = parseInt(pagination.get("limit"));
  const orderStatus = searchParams.get("orderStatus");

  const { data } = useQuery({
    queryKey: ["pagination-order-list", skip.toString(), orderStatus],
    queryFn: async () =>
      ordersListPagination(limit, skip, accessToken, orderStatus),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 5,
  });

  const handleMove = (moveCount) => {
    setPagination((prv) => {
      prv.set("skip", Math.max(skip + moveCount, 0));
      return prv;
    });
  };
  // filter handle change
  const handleSelectChange = (event) => {
    const value = event?.target?.value?.split(" ").join("_");
    setSearchParams((prv) => {
      prv.set("orderStatus", value);
      return prv;
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12 card-margin">
          <h2 className="text-center mt-4">Your Order List</h2>
          <div className="card search-form">
            <div className="card-body p-0">
              <form id="search-form">
                <div className="row">
                  <div className="col-12">
                    <div className="row no-gutters">
                      <div className="col-lg-3 col-md-3 col-sm-12 p-0 ">
                        <div className="d-flex align-items-center bg-primary text-white rounded-3">
                          <select
                            className="form-control rounded-3 text-center bg-primary text-white"
                            id="exampleFormControlSelect1"
                            onChange={handleSelectChange}
                          >
                            <option value={""} className="text-white">
                              All
                            </option>
                            <option value={"success"}>Delivered</option>
                            <option value={"cancel"}>Cancel</option>
                            <option value={"shipped"}>Shipped</option>
                            <option value={"processed"}>Progress</option>
                            <option value={"out for delivery"}>
                              On the way
                            </option>
                          </select>
                          <label htmlFor="exampleFormControlSelect1">
                            <FaChevronDown className="m-2" />
                          </label>
                        </div>
                      </div>
                      <div className="col-lg-8 col-md-6 col-sm-12 p-0">
                        <label htmlFor="exampleFormControlSelect1">
                          <input
                            type="text"
                            placeholder="Search..."
                            className="form-control"
                            id="search"
                            value={orderStatus?.split("_").join(" ")}
                            onChange={() => {}}
                          />
                        </label>
                      </div>
                      <div className="col-lg-1 col-md-3 col-sm-12 p-0">
                        <button type="button" className="btn btn-base">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-search"
                          >
                            <circle cx="11" cy="11" r="8"></circle>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-12">
          <div className="card card-margin">
            <div className="card-body">
              <div className="row search-body">
                <div className="col-lg-12">
                  <div className="search-result">
                    <div className="result-header">
                      <div className="row">
                        <div className="col-lg-6">
                          <div className="records">
                            Showing:{" "}
                            <b>
                              {skip + 1}-{2}
                            </b>{" "}
                            of <b>{data?.totalLength}</b> result
                          </div>
                        </div>
                        {/* HANBURGAR GRID ICONE */}
                        <div className="col-lg-6 ">
                          <div className="result-actions justify-content-end">
                            <div className="result-views">
                              <button
                                type="button"
                                className="btn btn-soft-base btn-icon"
                              >
                                <TfiMenuAlt size={26} color="black" />
                              </button>
                              <button
                                type="button"
                                className="btn btn-soft-base btn-icon"
                              >
                                <CgMenuGridR size={32} color="black" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="result-body">
                      <div className="table-responsive">
                        <table className="table widget-26">
                          <tbody>
                            {data &&
                              data?.result?.length > 0 &&
                              data.result?.map((order) => (
                                <tr
                                  className="tr-r-l"
                                  key={order._id}
                                  onClick={() =>
                                    navigate(`/orders-details/${order?._id}`)
                                  }
                                >
                                  <td>
                                    <div className="widget-26-job-emp-img">
                                      <Link
                                        to={`/orders-details/${order?._id}`}
                                      >
                                        <img
                                          src={`${process.env.REACT_APP_SERVER_URL}/foods/${order?.foodInfo[0]?.img}`}
                                          alt="Company"
                                        />
                                      </Link>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="widget-26-job-title">
                                      <a href="#">{order?.foodInfo[0]?.name}</a>
                                      <p className="m-0">
                                        <a href="#" className="employer-name">
                                          {order?.foodInfo[0]?.subCategory
                                            ?.split("_")
                                            ?.join(" ")}
                                        </a>{" "}
                                        <span className="text-muted time fw-bold">
                                          {new Date(
                                            order?.createdAt
                                          ).toDateString()}
                                        </span>
                                      </p>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="widget-26-job-salary">
                                      ₹ {order?.total}
                                    </div>
                                  </td>
                                  <td>
                                    <div
                                      className={`widget-26-job-category ${
                                        order?.orderStatus ===
                                          OrderEnum.CANCEL && "bg-soft-danger"
                                      } ${
                                        order?.orderStatus ===
                                          OrderEnum.PROCESSED && "bg-soft-info"
                                      } ${
                                        order?.orderStatus ===
                                          OrderEnum.SUCCESS && "bg-soft-success"
                                      } ${
                                        order?.orderStatus ===
                                          OrderEnum.OUT_FOR_DELIVERY &&
                                        "bg-soft-warning"
                                      } ${
                                        order?.orderStatus ===
                                          OrderEnum.SHIPPED && "bg-soft-info"
                                      }`}
                                    >
                                      <i
                                        className={`indicator ${
                                          order?.orderStatus ===
                                            OrderEnum.CANCEL && "bg-danger"
                                        } ${
                                          order?.orderStatus ===
                                            OrderEnum.PROCESSED && "bg-info"
                                        } ${
                                          order?.orderStatus ===
                                            OrderEnum.SUCCESS && "bg-success"
                                        } ${
                                          order?.orderStatus ===
                                            OrderEnum.OUT_FOR_DELIVERY &&
                                          "bg-warning"
                                        } ${
                                          order?.orderStatus ===
                                            OrderEnum.SHIPPED && "bg-info"
                                        }`}
                                      ></i>
                                      <span>
                                        {order?.orderStatus
                                          ?.split("_")
                                          ?.join(" ")}
                                      </span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="widget-26-job-starred">
                                      <a href="#">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width="24"
                                          height="24"
                                          viewBox="0 0 24 24"
                                          fill="none"
                                          stroke="currentColor"
                                          strokeWidth="2"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          className="feather feather-star"
                                        >
                                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                                        </svg>
                                      </a>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        {data && data?.result?.length < 1 && (
                          <h2 className=" text-center">Order Not exist..!</h2>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* PAGINATION START */}
              <nav className="d-flex justify-content-center">
                <ul className="pagination pagination-base pagination-boxed pagination-square mb-0">
                  <li className="page-item" onClick={() => handleMove(-limit)}>
                    <a className="page-link no-border">
                      <span aria-hidden="true">«</span>
                      <span className="sr-only">Previous</span>
                    </a>
                  </li>
                  {Array.from({
                    length: parseInt(
                      paginationPages({ totalLength: data?.totalLength }, limit)
                    ),
                  }).map((v, i) => {
                    let value = ++i;
                    let currentPageNo = limit * value - limit; // 4 * 2 - 4 = 4
                    return (
                      <li
                        type="button"
                        className={`page-item ${
                          currentPageNo === skip ? "active" : ""
                        }`}
                        key={i}
                        onClick={() =>
                          setPagination((prv) => {
                            prv.set("skip", limit * value - limit);
                            return prv;
                          })
                        }
                      >
                        <div className="page-link ">{value}</div>
                      </li>
                    );
                  })}
                  <li
                    className="page-item"
                    onClick={() => data?.result.length > 0 && handleMove(limit)}
                  >
                    <a className="page-link no-border">
                      <span aria-hidden="true">»</span>
                      <span className="sr-only">Next</span>
                    </a>
                  </li>
                </ul>
              </nav>
              {/* PAGINATION END */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderList;
