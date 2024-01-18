import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import MenuCard from "../Components/MenuCard";
import { menuPagination } from "../Helpers/helper";
import { paginationPages } from "../Utility/utility";
function Menu() {
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
  //
  const handleOnClick = (cate) => {
    setSearchParams((prv) => {
      prv.set("category", cate);
      return prv;
    });
  };
  const handleMove = (moveCount) => {
    setPagination((prv) => {
      prv.set("skip", Math.max(skip + moveCount, 0));
      return prv;
    });
  };

  const { data } = useQuery({
    queryKey: ["pagination-menu", skip.toString(), category],
    queryFn: async () => menuPagination(limit, skip, accessToken, category),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 30,
  });

  return (
    <>
      {/* Menu Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Food Menu
            </h5>
            <h1 className="mb-5">Most Popular Items</h1>
          </div>
          <div
            className="tab-className text-center wow fadeInUp"
            data-wow-delay="0.1s"
          >
            <ul className="nav nav-pills d-inline-flex justify-content-center border-bottom mb-5">
              <li className="nav-item">
                <div type="button"
                  className="d-flex align-items-center text-start mx-3 ms-0 pb-3 active"
                  data-bs-toggle="pill"
                  onClick={() => handleOnClick("breakfast")}
                >
                  <i className="fa fa-coffee fa-2x text-primary"></i>
                  <div className="ps-3">
                    <small className="text-body">Popular</small>
                    <h6 className="mt-n1 mb-0">Breakfast</h6>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <div type="button"
                  onClick={() => handleOnClick("lunch")}
                  className="d-flex align-items-center text-start mx-3 pb-3"
                  data-bs-toggle="pill"
                >
                  <i className="fa fa-hamburger fa-2x text-primary"></i>
                  <div className="ps-3" >
                    <small className="text-body">Special</small>
                    <h6 className="mt-n1 mb-0">Lunch</h6>
                  </div>
                </div>
              </li>
              <li className="nav-item" type="button">
                <div type="button"
                  onClick={() => handleOnClick("dinner")}
                  className="d-flex align-items-center text-start mx-3 me-0 pb-3"
                  data-bs-toggle="pill"
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
              {/* DATA */}
              <div id="tab-1" className="tab-pane fade show p-0 active">
                <div className="row g-4">
                  {data && data.result.length > 0 ? (
                    data.result.map((food, i) => (
                      <MenuCard food={food} key={food?._id} />
                    ))
                  ) : (
                    <div>
                      <h2>Data Not found..!</h2>
                    </div>
                  )}
                </div>
              </div>
              {/* BREAKFAST END */}
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
      {/* Menu End */}
    </>
  );
}

export default Menu;
