import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useFormik } from "formik";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import React, { useState } from "react";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import OwlCarousel from "react-owl-carousel";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addTestimonials,
  checkUserCanAddTestimonials,
  getAllTestimonials,
} from "../Helpers/helper";

function Testimonial() {
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const { user, accessToken } = useSelector((state) => state.authSlice);

  const { data } = useQuery({
    queryKey: ["check-testimonials"],
    queryFn: async () =>
      checkUserCanAddTestimonials({ userId: user?._id, accessToken }),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 5,
  });

  const { data: allTestimonials } = useQuery({
    queryKey: ["all-testimonials"],
    queryFn: async () => getAllTestimonials({ accessToken }),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 5,
  });
  // readyToAddTestimonials

  const formik = useFormik({
    initialValues: {
      feedback: "",
    },
    validate: fromValidation,
    onSubmit: (values) => {
      setLoading(true);

      addTestimonials({
        userId: user?._id,
        values,
        accessToken,
        payload: values,
      })
        .then((data) => {
          // console.log(data);
          toast.success("Feedback sending successFully");
          setShowForm(false);
          formik.resetForm();
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Failed to send Feedback..!");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <>
      {/* Testimonial Start */}
      <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="text-center">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Testimonial
            </h5>
            <h1 className="mb-5">
              <span>Our Clients Say!!!</span>{" "}
              {data && data?.readyToAddTestimonials && showForm
                ? data?.readyToAddTestimonials && (
                    <IoMdClose
                      size={40}
                      className=" border border-danger rounded-3"
                      type="button"
                      title="close"
                      color="red"
                      onClick={() => setShowForm(false)}
                    />
                  )
                : data?.readyToAddTestimonials && (
                    <IoMdAdd
                      className=" border border-success rounded-3"
                      size={40}
                      type="button"
                      title="add feedback"
                      color="green"
                      onClick={() => setShowForm(true)}
                    />
                  )}
            </h1>
            {showForm && (
              <div className=" d-flex justify-content-center pb-4">
                <form className="w-50" onSubmit={formik.handleSubmit}>
                  <h3 className="pull-left">Add Feedback</h3>
                  <div className="form-group">
                    <div className="d-flex justify-content-end mb-1">
                      {loading ? (
                        <div
                          className="spinner-border text-warning"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-info text-lowercase rounded-3"
                        >
                          submit
                        </button>
                      )}
                    </div>
                    <textarea
                      className={`form-control ${
                        formik.errors.feedback &&
                        "form-control border border-danger"
                      }`}
                      id="exampleFormControlTextarea1"
                      placeholder="send your thoughts"
                      rows="3"
                      {...formik.getFieldProps("feedback")}
                    ></textarea>
                    <span
                      className="text-danger fw-bold"
                      style={{ fontSize: "12px" }}
                    >
                      {formik?.errors?.feedback && formik.touched.feedback
                        ? formik.errors.feedback
                        : ""}
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>

          <div className=" testimonial-carousel">
            <OwlCarousel
              className="owl-theme"
              loop
              margin={10}
              min={60}
              responsive={{
                0: {
                  items: 1,
                },
                600: {
                  items: 2,
                },
                1000: {
                  items: 3,
                },
              }}
              navText={100}
              dots={false}
              dotsEach={true}
            >
              {allTestimonials &&
                allTestimonials?.testimonials?.map((testimonial) => (
                  <div
                    key={testimonial?._id}
                    className="item testimonial-item bg-transparent border rounded p-4"
                  >
                    <i className="fa fa-quote-left fa-2x text-primary mb-3"></i>
                    <p>{testimonial?.feedback}</p>
                    <div className="mx-auto">
                      <img
                        className="img-fluid flex-shrink-0 rounded-circle"
                        src={`${process.env.REACT_APP_SERVER_URL}/user/avatar/${testimonial?.userId?.avatar}`}
                        style={{ width: "50px", height: "50px" }}
                        alt="img"
                      />
                      <div className="ps-3">
                        <h5 className="mb-1">{testimonial?.userId?.name}</h5>
                        <small>{testimonial?.userId?.role}</small>
                      </div>
                    </div>
                  </div>
                ))}
            </OwlCarousel>
          </div>
        </div>
      </div>
      {/* Testimonial End */}
    </>
  );
}

const fromValidation = (fromData) => {
  const error = {};

  if (!fromData?.feedback) {
    error.feedback = "The start feedback field is mandatory.*";
  }

  // Return true if there are no errors
  return error;
};
export default Testimonial;
