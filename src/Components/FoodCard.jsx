import React, { useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { MdAddShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCart } from "../Redux/Slice/cartSlice";

function FoodCard({
  foodName,
  category,
  subCategory,
  description,
  shallPrice,
  price,
  itemNo,
  img,
  food,
}) {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const disPatch = useDispatch();
  const navigate = useNavigate();
  // Maximum number of characters to show in the truncated description
  const maxLength = 80;

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };
  // HANDLE CART
  const handleCart = (item) => {
    disPatch(addToCart(item));
    navigate("/view-cart");
  };
  const handleCheckOut = (item) => {
    disPatch(addToCart(item));
    navigate("/checkout");
  };

  return (
    <div className="product-card">
      <div
        className={`badge ${
          subCategory === "Veg".toUpperCase() && "bg-success"
        }`}
      >
        {" "}
        {subCategory && subCategory?.split("_")?.join(" ")}
      </div>
      <div className="product-tumb">
        <img
          // src="https://i.imgur.com/xdbHo4E.png"
          src={`${process.env.REACT_APP_SERVER_URL}/foods/${img}`}
          alt="img"
          width={300}
          height={300}
        />
      </div>
      <div>
        <span className="product-catagory">{category && category}</span>
        <div className="product-details">
          <h4>
            <span className=" text-capitalize">{foodName && foodName}</span>
          </h4>
          <p>
            {showFullDescription
              ? description
              : `${description.slice(0, maxLength)}...`}
            {/* Show "Read More" button if description is longer than maxLength */}
            {description.length > maxLength && (
              <button
                className="btn btn-link text-capitalize"
                style={{ fontSize: "12px" }}
                onClick={toggleDescription}
              >
                {showFullDescription ? "Read Less" : "Read More"}
              </button>
            )}
          </p>
          <div className="pb-2">
            <div className="product-price badge2">
              <small className="text-decoration-line-through text-secondary">
                ₹{price && price}
              </small>
              <small className="fw-bolder text-success">
                ₹{shallPrice && shallPrice}
              </small>
            </div>
          </div>
          <div className="d-flex flex-row gap-2 justify-content-around align-items-center">
            {food?.isAvailable && (
              // <Link to={`/view-cart`}>
              <button
                type="button"
                className="btn btn-sm btn-warning fw-bold"
                onClick={() => handleCart(food)}
              >
                Add to cart <MdAddShoppingCart />
              </button>
              // </Link>
            )}
            {food?.isAvailable && (
              // <Link to={`/checkout`}>
              <button
                type="button"
                className="btn btn-sm btn-warning fw-bold "
                onClick={() => handleCheckOut(food)}
              >
                Order <AiOutlineThunderbolt />
              </button>
              // </Link>
            )}
            {!food?.isAvailable && (
              <button type="button" className="btn btn-sm btn-danger fw-bold ">
                Not Available
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodCard;
