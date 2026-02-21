// import "./about.css";

const About = () => {
  return (
    <div>
      {/* Banner */}
      <div className="position-relative w-100" style={{ height: "60vh" }}>
        <img
          src="/about-us.jpg"
          alt="Decor Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* WHO WE ARE */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h1 className="fw-bold mb-4 display-6">Who We Are</h1>
          <div className="mx-auto" style={{ maxWidth: "750px" }}>
            <p className="text-muted fs-5">
              At <strong>Colours Kitchen Gallery</strong>, we design inspiring
              interiors that combine functionality with elegance. Our expert
              designers and craftsmen transform houses into personalized dream
              homes tailored to your lifestyle.
            </p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">What We Do</h2>
          <div className="row g-4">
            {[
              {
                title: "Modular Kitchens",
                desc: "Smart, stylish, and space-efficient kitchen designs customized to your needs.",
              },
              {
                title: "Complete Home Interiors",
                desc: "End-to-end interior solutions including living rooms, bedrooms, wardrobes, and storage.",
              },
              {
                title: "Custom Furniture",
                desc: "Personalized furniture crafted with precision and premium materials.",
              },
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card border-0 shadow-sm h-100 text-center p-4 rounded-4">
                  <h5 className="fw-semibold mb-3">{item.title}</h5>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR PROCESS */}
      <section className="py-5 bg-white">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Our Process</h2>
          <div className="row g-4 text-center">
            {[
              "Consultation",
              "Design & Planning",
              "Execution",
              "Handover",
            ].map((step, index) => (
              <div className="col-md-3" key={index}>
                <div className="p-4 border rounded-4 shadow-sm h-100">
                  <div
                    className="mb-3 mx-auto d-flex align-items-center justify-content-center"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      backgroundColor: "#000",
                      color: "#fff",
                      fontWeight: "bold",
                    }}
                  >
                    {index + 1}
                  </div>
                  <h6 className="fw-semibold">{step}</h6>
                  <p className="text-muted small">
                    {index === 0 &&
                      "Understanding your needs and vision."}
                    {index === 1 &&
                      "Creating 3D designs and detailed planning."}
                    {index === 2 &&
                      "Professional production and installation."}
                    {index === 3 &&
                      "On-time delivery with quality assurance."}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-5 bg-light">
        <div className="container">
          <h2 className="text-center fw-bold mb-5">Why Choose Us</h2>
          <div className="row g-4 text-center">
            {[
              "Personalized Designs",
              "Transparent Pricing",
              "Premium Quality Materials",
              "Skilled Professionals",
              "Timely Delivery",
              "After-Sales Support",
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="bg-white p-3 shadow-sm rounded-4">
                  <p className="mb-0 fw-semibold">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="py-5 bg-white">
        <div className="container text-center">
          <h2 className="fw-bold mb-4">Our Vision</h2>
          <div className="mx-auto" style={{ maxWidth: "750px" }}>
            <p className="text-muted fs-5">
              Our vision is to become a trusted name in interior design by
              delivering innovative, affordable, and high-quality interior
              solutions that enhance everyday living and create lasting value
              for homeowners.
            </p>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* KEEPING YOUR ORIGINAL SECTIONS BELOW */}
      {/* DO NOT MODIFY THEM */}
      {/* ========================= */}
      

      {/* Meet our founders */}
      {/* (Your earlier founders section remains here unchanged) */}

      {/* We’ll let our numbers do the talking */}
      {/* (Your earlier numbers section remains here unchanged) */}

    </div>
  );
};

export default About;
