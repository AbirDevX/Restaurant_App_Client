import { keepPreviousData, useQuery } from "@tanstack/react-query";
import React from "react";
import { useSelector } from "react-redux";
import { getTeams } from "../Helpers/helper";

function Team() {
  const { accessToken } = useSelector((state) => state.authSlice);
  const { data } = useQuery({
    queryKey: ["get-all-teams"],
    queryFn: async () => getTeams({ accessToken }),
    placeholderData: keepPreviousData,
    throwOnError: false,
    staleTime: 1000 * 30,
  });
  return (
    <>
      {/* Team Start */}
      <div className="container-xxl pt-5 pb-3">
        <div className="container">
          <div className="text-center wow fadeInUp" data-wow-delay="0.1s">
            <h5 className="section-title ff-secondary text-center text-primary fw-normal">
              Team Members
            </h5>
            <h1 className="mb-5">Our Master Chefs</h1>
          </div>
          <div className="row g-4">
            {data &&
              data?.teams?.map((team) => (
                <div
                  className="col-lg-3 col-md-6 wow fadeInUp"
                  data-wow-delay="0.1s"
                  key={team?._id}
                >
                  <div className="team-item text-center rounded overflow-hidden">
                    <div className="rounded-circle overflow-hidden m-4">
                      <img
                        className="img-fluid"
                        src={`${process.env.REACT_APP_SERVER_URL}/team/${team?.avatar}`}
                        alt="img"
                      />
                    </div>
                    <h5 className="mb-0">{team?.name}</h5>
                    <small>{team?.designation}</small>
                    <div className="d-flex justify-content-center mt-3">
                      <a
                        className="btn btn-square btn-primary mx-1"
                        target="blank"
                        href={`${team?.socialMedia?.faceBookLik}`}
                      >
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a
                        className="btn btn-square btn-primary mx-1"
                        target="blank"
                        href={`${team?.socialMedia?.twitterLink}`}
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a
                        className="btn btn-square btn-primary mx-1"
                        target="blank"
                        href={`${team?.socialMedia?.instagramLink}`}
                      >
                        <i className="fab fa-instagram"></i>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Team End */}
    </>
  );
}

export default Team;
