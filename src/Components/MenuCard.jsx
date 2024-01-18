import React, { useState } from "react";
import { Link } from "react-router-dom";

function MenuCard({ food }) {
  //  READ MORE FUNCTIONALITY
  const [showFullDescription, setShowFullDescription] = useState(false);
  const maxLength = 80;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  return (
    <div className="col-lg-6">
      <div className="d-flex align-items-center">
        <Link to={`/foods?category=${food?.category.toLowerCase()}`}>
          <img
            alt="img"
            className="flex-shrink-0 img-fluid rounded"
            src={`${process.env.REACT_APP_SERVER_URL}/foods/${food?.img}`}
            style={{ width: "80px" }}
          />
        </Link>

        <div className="w-100 d-flex flex-column text-start ps-4">
          <h5 className="d-flex justify-content-between border-bottom pb-2">
            <span>{food?.name}</span>
            <span className="text-primary">₹{food?.price}</span>
          </h5>
          <div className="d-flex justify-content-between">
            <small className="fst-italic">
              {showFullDescription
                ? food?.description
                : `${food.description.slice(0, maxLength)}...`}
              {/* Show "Read More" button if description is longer than maxLength */}
              {food.description.length > maxLength && (
                <button
                  className="btn btn-link text-capitalize"
                  style={{ fontSize: "12px" }}
                  onClick={toggleDescription}
                >
                  {showFullDescription ? "Read Less" : "Read More"}
                </button>
              )}
            </small>
            <span className="text-primary">{food?.category}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
