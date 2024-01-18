import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../Components/Common/Footer";
import Navbar from "../Components/Common/Navbar";
import MenuSkeleton from "../Components/Skeleton/MenuSkeleton";

function Layout({
  children,
  isHome,
  isAbout,
  isService,
  isMenu,
  isContact,
  isOurTeam,
  isBooking,
  isTestimonial,
  isFoods,
  isCheckout,
  isCart,
  isOrderList,
  isOrderDetails,
}) {
  return (
    <div className="container-xxl bg-white p-0">
      <ToastContainer />
      {/* Spinner Start */}
      {/* <div
        id="spinner"
        className=" bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div
          className="spinner-border text-primary"
          style={{ width: "3rem", height: "3rem" }}
          role="status"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
      {/* Spinner End */}
      <Navbar
        isHome={isHome}
        isAbout={isAbout}
        isService={isService}
        isMenu={isMenu}
        isContact={isContact}
        isOurTeam={isOurTeam}
        isBooking={isBooking}
        isTestimonial={isTestimonial}
        isCheckout={isCheckout}
        isFoods={isFoods}
        isCart={isCart}
        isOrderList={isOrderList}
        isOrderDetails={isOrderDetails}
      />
      <ErrorBoundary fallback={<h2>Something went wrong..!</h2>}>
        <Suspense
          fallback={
            (isMenu && <MenuSkeleton />) ||
            (isFoods && <MenuSkeleton />) || <MenuSkeleton />
          }
        >
          {children}
        </Suspense>
      </ErrorBoundary>
      <Footer />
      {/* Back to Top  */}
      <a href="#" className="btn btn-lg btn-primary btn-lg-square back-to-top">
        <i className="bi bi-arrow-up"></i>
      </a>
    </div>
  );
}

export default Layout;
