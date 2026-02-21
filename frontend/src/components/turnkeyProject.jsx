import React from "react";
import { useNavigate } from "react-router-dom";

const TurnkeyProject = () => {
  return (
    <section className="py-5 bg-white">
      <div className="container">

        {/* Section Heading */}
        <div className="text-center mb-5">
          <h2 className="fw-bold display-6">Turnkey Interior Services</h2>
          <p className="text-muted fs-5 mx-auto" style={{ maxWidth: "750px" }}>
            Complete interior solutions — from concept to final handover.
            We manage everything so you can move into a beautifully finished
            space without stress.
          </p>
        </div>

        {/* Top Image Row (Unsplash Images) */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80"
              alt="Interior Planning"
              className="img-fluid rounded shadow-sm"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
              alt="Modern Modular Kitchen"
              className="img-fluid rounded shadow-sm"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-4">
            <img
              src="https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&w=800&q=80"
              alt="Finished Living Room Interior"
              className="img-fluid rounded shadow-sm"
              style={{ height: "250px", objectFit: "cover", width: "100%" }}
            />
          </div>
        </div>

        {/* Description */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <p className="text-muted fs-5">
              At <strong>Colours Kitchen Gallery</strong>, we offer complete
              turnkey interior solutions that take care of everything —
              from design planning and material selection to execution and
              final installation. Our team ensures seamless coordination,
              premium quality materials, and timely delivery so you receive
              a fully ready, move-in space.
            </p>
          </div>
        </div>

        {/* Services Included */}
        <div className="row g-4 text-center mb-5">
          {[
            "Interior Design & 3D Visualization",
            "Modular Kitchens & Wardrobes",
            "Electrical & Plumbing Work",
            "False Ceiling & Lighting",
            "Custom Furniture Manufacturing",
            "Final Installation & Handover",
          ].map((service, index) => (
            <div className="col-md-4" key={index}>
              <div className="p-4 border rounded shadow-sm h-100">
                <h6 className="fw-semibold">{service}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">Our Turnkey Process</h3>
        </div>

        <div className="row g-4 text-center">
          {[
            {
              step: "1",
              title: "Consultation",
              desc: "Understanding your requirements and budget.",
            },
            {
              step: "2",
              title: "Design & Planning",
              desc: "Creating layouts and 3D concepts.",
            },
            {
              step: "3",
              title: "Execution",
              desc: "Professional production and installation.",
            },
            {
              step: "4",
              title: "Handover",
              desc: "Delivering a ready-to-use finished space.",
            },
          ].map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className="p-4 bg-light rounded shadow-sm h-100">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                >
                  {item.step}
                </div>
                <h6 className="fw-semibold">{item.title}</h6>
                <p className="text-muted small">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};



export default TurnkeyProject;
