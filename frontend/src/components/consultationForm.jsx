import { useState } from "react";

const ConsultationForm = () => {
  const [bhk, setBhk] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { bhk, location, name, phone, whatsapp };

    console.log("Form Submitted:", formData);

    alert("Form submitted successfully!");
  };

  return (
    <div
  className="py-1 px-2 p-md-4 rounded bg-white"
  style={{
    width: "100%",
    margin: "0"
  }}
>

      <h2 className="text-center fw-bold">Colours Kitchen</h2>
      <h4 className="text-center mt-2">Get a free design consultation</h4>

      <form onSubmit={handleSubmit} className="mt-4">

        {/* PROPERTY TYPE */}
        <label className="fw-semibold fs-5">Property Type</label>
        <div className="d-flex gap-2 my-2 flex-wrap">
          {["1 BHK", "2 BHK", "3 BHK", "4+ BHK/Duplex"].map((item) => (
            <button
              type="button"
              key={item}
              onClick={() => setBhk(item)}
              className={`btn ${
                bhk === item ? "btn-dark" : "btn-outline-secondary"
              } px-4`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* LOCATION */}
        <select
          className="form-select mt-3"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          <option value="">Property Location</option>
          <option value="Delhi">Delhi</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Bangalore">Bangalore</option>
        </select>

        {/* NAME */}
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* MOBILE NUMBER */}
        <div className="input-group mt-3">
          <span className="input-group-text">+91</span>
          <input
            type="tel"
            className="form-control"
            placeholder="Enter mobile number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {/* WHATSAPP CHECKBOX */}
        <div className="form-check mt-3 d-flex align-items-center">
          <input
            className="form-check-input"
            type="checkbox"
            checked={whatsapp}
            onChange={() => setWhatsapp(!whatsapp)}
          />
          <label className="form-check-label ms-2">
            Yes, send me updates via WhatsApp
          </label>
          <span className="ms-2 fs-4 text-success">💬</span>
        </div>

        {/* SUBMIT BUTTON */}
        <button className="btn btn-danger mt-4 w-100 fw-bold">
          Book a Free Consultation
        </button>

        <p className="text-center mt-2" style={{ fontSize: "12px" }}>
          By submitting, you consent to our{" "}
          <a href="#">privacy policy</a> & <a href="#">terms of use</a>.
        </p>
      </form>
    </div>
  );
};

export default ConsultationForm;
