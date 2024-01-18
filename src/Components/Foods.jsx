import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { foodPagination } from "../Helpers/helper";
import { paginationPages } from "../Utility/utility";
import "../styles/Foods.css";
import FoodCard from "./FoodCard";

const Foods = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    category: "breakfast",
  });
  const [pagination, setPagination] = useSearchParams({
    skip: 0,
    limit: 4,
  });

  const { accessToken } = useSelector((state) => state.authSlice);

  const skip = parseInt(pagination.get("skip"));
  const limit = parseInt(pagination.get("limit"));
  const category = searchParams.get("category");

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["pagination-food", skip.toString(), category],
    queryFn: async () => foodPagination(limit, skip, accessToken, category),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 30,
  });

  const handleMove = (moveCount) => {
    setPagination((prv) => {
      prv.set("skip", Math.max(skip + moveCount, 0));
      return prv;
    });
  };
  const handleCategory = (arg) => {
    setSearchParams((prv) => {
      prv.set("category", arg);
      return prv;
    });
  };

  return (
    <>
      {/*Menu Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Food Menu
            </h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div
            className="tab-class text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <div
                  type="button"
                  onClick={() => handleCategory("breakfast")}
                  className={`d-flex align-items-center text-start mx-3 ms-0 pb-3 ${
                    category === "breakfast" ? "active" : ""
                  }`}
                  // data-bs-toggle="pill"
                >
                  <i className="fa fa-coffee fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Popular</small>
                    <h6 className="mt-n1 mb-0">Breakfast</h6>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div
                  type="button"
                  className={`d-flex align-items-center text-start mx-3 pb-3 ${
                    category === "lunch" ? "active" : ""
                  }`}
                  // data-bs-toggle="pill"
                  onClick={() => handleCategory("lunch")}
                >
                  <i className="fa fa-hamburger fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Special</small>
                    <h6 className="mt-n1 mb-0">Lunch</h6>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div
                  type="button"
                  className={`d-flex align-items-center text-start mx-3 pb-3 ${
                    category === "dinner" ? "active" : ""
                  }`}
                  // data-bs-toggle="pill"
                  onClick={() => handleCategory("dinner")}
                >
                  <i className="fa fa-utensils fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Lovely</small>
                    <h6 className="mt-n1 mb-0">Dinner</h6>
                  </div>
                </div>
              </li>
            </ul>
            <div className="tab-content">
              {/* Breakfast Start */}
              {category === "breakfast" && (
                <div id="tab-1" className={` fade show p-0`}>
                  <div className="row g-4">
                    <section>
                      <div className="container">
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                          {data && data.result.length > 0 ? (
                            data.result.map((item, i) => (
                              <FoodCard
                                key={i}
                                itemNo={i + 1}
                                foodName={item.name}
                                category={item.category}
                                subCategory={item.subCategory}
                                shallPrice={item?.shallPrice}
                                price={item.price}
                                description={item.description}
                                img={item.img}
                                food={item}
                              />
                            ))
                          ) : (
                            <div>
                              <h2>Data Not found..!</h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {/* Breakfast End */}
              {/* LAUNCH START*/}
              {category === "lunch" && (
                <div id="tab-2" className={`fade show p-0 `}>
                  <div className="row g-4">
                    <section>
                      <div className="container">
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                          {data && data.result.length > 0 ? (
                            data.result.map((item, i) => (
                              <FoodCard
                                key={i}
                                itemNo={i + 1}
                                foodName={item.name}
                                category={item.category}
                                subCategory={item.subCategory}
                                shallPrice={item?.shallPrice}
                                price={item.price}
                                description={item.description}
                                img={item.img}
                                food={item}
                              />
                            ))
                          ) : (
                            <div>
                              <h2>Data Not found..!</h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {/* LUNCH END */}
              {category === "dinner" && (
                <div id="tab-3" className={` fade show p-0 `}>
                  <div className="row g-4">
                    {/* DINNER START */}
                    <section>
                      <div className="container">
                        <div className="d-flex flex-wrap justify-content-center gap-3">
                          {data && data.result.length > 0 ? (
                            data.result.map((item, i) => (
                              <FoodCard
                                key={i}
                                itemNo={i + 1}
                                foodName={item.name}
                                category={item.category}
                                subCategory={item.subCategory}
                                shallPrice={item?.shallPrice}
                                price={item.price}
                                description={item.description}
                                img={item.img}
                                food={item}
                              />
                            ))
                          ) : (
                            <div>
                              <h2>Data Not found..!</h2>
                            </div>
                          )}
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              )}
              {/* DINNER END */}
            </div>
          </div>
          {/* PAGINATION */}
          <nav aria-label="..." className="mt-4 d-flex justify-content-center">
            <ul className="pagination">
              <li
                type="button"
                className="page-item disabled"
                onClick={() => handleMove(-limit)}
              >
                <div className="page-link">Previous</div>
              </li>
              {Array.from({
                length: parseInt(paginationPages(data, limit)),
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
                type="button"
                className="page-item"
                onClick={() => data?.result.length > 0 && handleMove(limit)}
              >
                <div className="page-link">Next</div>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      {/* <!-- Menu End --> */}
    </>
  );
};

export default Foods;
