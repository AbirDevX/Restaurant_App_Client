import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { getServices } from "../Helpers/helper";

function Service() {
  const { accessToken } = useSelector((state) => state.authSlice);
  const { data } = useQuery({
    queryKey: ["get-all-services"],
    queryFn: async () => getServices({ accessToken }),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 30,
  });
  return (
    <>
      {/* Service Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-4">
            {data &&
              data?.services?.map((service) => (
                <div
                  key={service?._id}
                  className="col-lg-3 col-sm-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                >
                  <div className="service-item rounded pt-3">
                    <div className="p-4">
                      <i className="fa fa-3x fa-utensils text-primary mb-4"></i>
                      <h5>{service?.title}</h5>
                      <p>{service?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Service End */}
    </>
  );
}

export default Service;
