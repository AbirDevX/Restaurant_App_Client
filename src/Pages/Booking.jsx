import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import BookingTableFrom from "../Components/BookingTableFrom";
import ChooseTable from "../Components/ChooseTable";
import { getTables } from "../Helpers/helper";

function Booking() {
  const { accessToken } = useSelector((state) => state.authSlice);
  const [renderCompo, setRenderCompo] = useState(0);
  const [selectedTable, setSelectedTable] = useState({});
  const { data } = useQuery({
    queryKey: ["get-all-tables"],
    queryFn: async () => getTables({ accessToken }),
    placeholderData: keepPreviousData,
    throwOnError: false,
  });
  const tables = data?.tables;

  const handleSelectTable = (table) => {
    // console.log(table);
    setSelectedTable((prv) => {
      prv = table;
      return prv;
    });
    handleIncrement();
  };
  const handleIncrement = () => {
    setRenderCompo((prv) => {
      return (prv = Math.min(prv + 1, 1));
    });
  };
  const handleDecrement = () => {
    setRenderCompo((prv) => {
      return (prv = Math.max(prv - 1, 0));
    });
  };
  const tableCompo = [
    <ChooseTable tables={tables} handleSelectTable={handleSelectTable} />,
    <BookingTableFrom selectedTable={selectedTable} />,
  ];
  return (
    <>
      {/* Reservation Start  */}
      <div
        className="container-xxl py-5 px-0 wow fadeInUp"
        data-wow-delay="0.1s"
      >
        <div className="row g-0">
          <div className="col-md-6">
            <div className="video">
              <button
                type="button"
                className="btn-play"
                data-bs-toggle="modal"
                data-src="https://www.youtube.com/embed/DWRcNpR6Kdc"
                data-bs-target="#videoModal"
              >
                <span></span>
              </button>
            </div>
          </div>
          <div className="col-md-6 bg-dark d-flex align-items-center">
            <div className="p-5 wow fadeInUp" data-wow-delay="0.2s">
              {renderCompo === 1 && (
                <div
                  className="btn btn-primary mb-2"
                  role="button"
                  onClick={() => handleDecrement()}
                >
                  <IoArrowBackSharp size={20} /> <span>go back</span>
                </div>
              )}{" "}
              <br />
              <h5 className="section-title ff-secondary text-start text-primary fw-normal">
                Reservation
              </h5>
              <h1 className="text-white mb-4">Book A Table Online</h1>
              {tableCompo[renderCompo]}
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="videoModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content rounded-0">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Youtube Video
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* 16:9 aspect ratio */}
              <div className="ratio ratio-16x9">
                <iframe
                  title="any"
                  className="embed-responsive-item"
                  src=""
                  id="video"
                  allowFullScreen
                  allow="autoplay"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reservation Start */}
    </>
  );
}

export default Booking;
