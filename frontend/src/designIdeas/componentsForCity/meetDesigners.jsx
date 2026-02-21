import { useState } from "react";
import centres from "./centres";

const MeetDesigners = ({ cityName }) => {
  const [activeCentre, setActiveCentre] = useState("bello");
  const data = centres[activeCentre];

  return (
    <div className="container my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-start mb-4 flex-wrap">
        <div>
          <h2 className="fw-bold">Home Interior Designers in {cityName}</h2>
          <p className="text-muted">
            Visit our Experience Centre in Jaipur to explore the best interior
            design in Jaipur for your home.
          </p>
        </div>

        <button className="btn btn-danger rounded-pill px-4">
          MEET YOUR DESIGNER
        </button>
      </div>

      {/* Buttons */}
      <div className="d-flex gap-3 mb-4 flex-wrap">
        <button
          className={`btn rounded-pill px-4 ${
            activeCentre === "bello"
              ? "btn-danger"
              : "btn-outline-secondary"
          }`}
          onClick={() => setActiveCentre("bello")}
        >
          Bello by Livspace, Vaishali Nagar
        </button>

        <button
          className={`btn rounded-pill px-4 ${
            activeCentre === "vaishali"
              ? "btn-danger"
              : "btn-outline-secondary"
          }`}
          onClick={() => setActiveCentre("vaishali")}
        >
          Vaishali Nagar, Jaipur
        </button>
      </div>

      {/* Content */}
      <div className="row g-4 align-items-start">
        {/* Image */}
        <div className="col-lg-7">
          <div className="position-relative">
            <img
              src={data.image}
              alt={data.location}
              className="img-fluid rounded-3 shadow-sm"
            />
            <span className="badge bg-dark position-absolute top-0 start-0 m-3">
              {data.location}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="col-lg-5">
          <h6 className="text-uppercase text-muted">Address</h6>
          <p>{data.address}</p>

          <h6 className="text-uppercase text-muted mt-3">Timings</h6>
          <p>{data.timings}</p>

          <h6 className="text-uppercase text-muted mt-3">
            Appointment Types
          </h6>
          <ul className="ps-3">
            {data.appointments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h6 className="text-uppercase text-muted mt-3">
            Contact Number
          </h6>
          <p>{data.phone}</p>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline-danger rounded-pill px-4">
              Schedule Visit
            </button>
            <button className="btn btn-outline-secondary rounded-circle">
              📞
            </button>
            <button className="btn btn-outline-success rounded-circle">
              💬
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MeetDesigners