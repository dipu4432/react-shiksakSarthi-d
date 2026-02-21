import { CiMail, CiPhone, CiLocationOn } from "react-icons/ci";

const Contact = () => {
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

      <div className="container my-5 py-5 text-center">
        {/* Icon */}
        <div className="mb-3">
          <img
            src="/contact-icon.jpg"
            alt="Support"
            style={{ height: "50px" }}
          />
        </div>

        {/* Heading */}
        <h2 className="fw-bold mb-2">Contact Us</h2>

        {/* Subheading */}
        <h5 className="fw-semibold mb-1">Help is just a click away</h5>
        <p className="text-muted mb-5">
          Call us anytime between 10am - 7pm
        </p>

        {/* Contact Card */}
        <div className="row justify-content-center">
          <div className="col-lg-6 col-md-8 col-11">
            <div
              className="bg-white p-4 rounded shadow-sm d-flex flex-column gap-3"
              style={{ border: "1px solid #eee" }}
            >
              {/* Email */}
              <div className="d-flex justify-content-between align-items-center">
                <span>Colourskitchengallery@gmail.com</span>
                <span style={{ color: "#f15a59", fontSize: "20px" }}>
                  <CiMail />
                </span>
              </div>

              <hr className="my-1" />

              {/* Phone */}
              <div className="d-flex justify-content-between align-items-center">
                <span>8770813848</span>
                <span style={{ color: "#f15a59", fontSize: "20px" }}>
                  <CiPhone />
                </span>
              </div>

              <hr className="my-1" />

              {/* Head Office Address */}
              <div className="d-flex justify-content-between align-items-start">
                <div className="text-start">
                  <strong>Address</strong>
                  <p className="mb-0 text-muted small">
                    SHOP NO.- GS-3, REAL HEAVEN,<br />
                    BEHINDE BACHPAN, School Rd,<br />
                    Sendri, Narmada Nagar,<br />
                    Bilaspur, Chhattisgarh 495009
                  </p>
                </div>
                <span style={{ color: "#f15a59", fontSize: "20px" }}>
                  <CiLocationOn />
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
