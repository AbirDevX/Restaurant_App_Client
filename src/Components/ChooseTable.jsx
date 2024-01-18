import React from "react";
import { MdTableBar } from "react-icons/md";
import "../styles/TableCart.css";

const colorArray = [
  "table-bg-indigo",
  "table-bg-green",
  "table-bg-orange",
  "table-bg-red",
  "table-bg-blue",
  "table-bg-purple",
  "table-bg-rose",
  "table-bg-aqua",
  "table-bg-violet",
  "table-bg-sandybrown",
];
function ChooseTable({ handleSelectTable, tables }) {
  return (
    <div className="container">
      <div className="row">
        {tables &&
          tables?.map((table) => (
            <div className="col-lg-3 col-sm-6" key={table?._id}>
              <div
                className={`card-box ${
                  colorArray[Math.floor(Math.random() * 10)]
                }`}
              >
                <div className="inner">
                  <h3 className="text-white">No: {table?.no} </h3>
                  <p
                    className="text-uppercase fw-bolder"
                    style={{ fontSize: "12px" }}
                  >
                    Capacity {table?.capacity}{" "}
                  </p>
                  <p className="text-uppercase fw-bolder"> {table?.name} </p>
                </div>
                <div className="icon">
                  <MdTableBar />
                </div>
                <a
                  type="button"
                  onClick={() => handleSelectTable(table)}
                  className="card-box-footer"
                >
                  Book Table <i className="fa fa-arrow-circle-right"></i>
                </a>
              </div>
            </div>
          ))}
      </div>
      <div className="row">
        <div className="col-lg-3 col-sm-6">
          <a href="#">uiuxstream</a>
        </div>
      </div>
    </div>
  );
}

export default ChooseTable;
