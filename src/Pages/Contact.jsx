import { useFormik } from "formik";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { contactUsMsg } from "../Helpers/helper";

function Contact() {
  const [loading, setLoading] = useState(false);
  const { accessToken } = useSelector((state) => state.authSlice);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
    validate: fromValidation,
    onSubmit: (values) => {
      setLoading(true);

      contactUsMsg(values, accessToken)
        .then((data) => {
          // console.log(data);
          toast.success("Message sending successFully");
          formik.resetForm();
        })
        .catch((err) => {
          // console.log(err);
          toast.error("Failed to send message..!");
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });
  return (
    <>
      {/* Contact Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Contact Us
            </h5>
            <h1 className="mb-5">Contact For Any Query</h1>
          </div>
          <div className="row g-4">
            <div className="col-12">
              <div className="row gy-4">
                <div className="col-md-4">
                  <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                    Booking
                  </h5>
                  <p>
                    <i className="fa fa-envelope-open text-primary me-2"></i>
                    book@example.com
                  </p>
                </div>
                <div className="col-md-4">
                  <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                    General
                  </h5>
                  <p>
                    <i className="fa fa-envelope-open text-primary me-2"></i>
                    info@example.com
                  </p>
                </div>
                <div className="col-md-4">
                  <h5 className="section-title ff-secondary fw-normal text-start text-primary">
                    Technical
                  </h5>
                  <p>
                    <i className="fa fa-envelope-open text-primary me-2"></i>
                    tech@example.com
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-6 wow fadeIn" data-wow-delay="0.1s">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3681.4532423467454!2d87.99669311236131!3d22.67416542473216!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39f877715490352d%3A0xad171e4ad1519f6!2zTWFoYXByYWJodSBmdXJuaXR1cmUgKOCmruCmueCmvuCmquCnjeCmsOCmreCngSDgpqvgpr7gprDgp43gpqjgpr_gpprgpr7gprAp!5e0!3m2!1sen!2sin!4v1703739319339!5m2!1sen!2sin"
                width="500"
                height="400"
                style={{ minHeight: "350px", border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mahaprabhu furniture (মহাপ্রভু ফার্নিচার)"
              ></iframe>
            </div>
            <div className="col-md-6">
              <div className="wow fadeInUp" data-wow-delay="0.2s">
                <form onSubmit={formik.handleSubmit}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          {...formik.getFieldProps("name")}
                          placeholder="Your Name"
                        />
                        <label htmlFor="name">Your Name</label>
                        <span
                          className="text-danger fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          {formik?.errors?.name && formik.touched.name
                            ? formik.errors.name
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-floating">
                        <input
                          type="email"
                          {...formik.getFieldProps("email")}
                          className="form-control"
                          id="email"
                          placeholder="Your Email"
                        />
                        <label htmlFor="email">Your Email</label>
                        <span
                          className="text-danger fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          {formik?.errors?.email && formik.touched.email
                            ? formik.errors.email
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <input
                          type="text"
                          className="form-control"
                          id="subject"
                          {...formik.getFieldProps("subject")}
                          placeholder="Subject"
                        />
                        <label htmlFor="subject">Subject</label>
                        <span
                          className="text-danger fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          {formik?.errors?.subject && formik.touched.subject
                            ? formik.errors.subject
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-floating">
                        <textarea
                          className="form-control"
                          placeholder="Leave a message here"
                          id="message"
                          {...formik.getFieldProps("message")}
                          style={{ height: "150px" }}
                        ></textarea>
                        <label htmlFor="message">Message</label>
                        <span
                          className="text-danger fw-bold"
                          style={{ fontSize: "12px" }}
                        >
                          {formik?.errors?.message && formik.touched.message
                            ? formik.errors.message
                            : ""}
                        </span>
                      </div>
                    </div>
                    <div className="col-12">
                      {loading ? (
                        <div
                          className="spinner-border text-warning"
                          role="status"
                        >
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        <button
                          className="btn btn-primary w-100 py-3"
                          type="submit"
                        >
                          Send Message
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}
    </>
  );
}

const fromValidation = (fromData) => {
  const error = {};
  if (!fromData?.name) {
    error.name = "The name field is mandatory.*";
  }
  if (!fromData?.email) {
    error.email = "The email field is mandatory.*";
  }
  if (!fromData?.subject) {
    error.subject = "The booking subject field is mandatory.*";
  }
  if (!fromData?.message) {
    error.message = "The start message field is mandatory.*";
  }

  // Return true if there are no errors
  return error;
};
export default Contact;
