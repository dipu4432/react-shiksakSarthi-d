import { useState } from "react";

export default function ConsultationForm({ onSuccess }) {
  const [bhk, setBhk] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(false);
  const [loading, setLoading] = useState(false);

  const API = import.meta.env.VITE_API_URL || "https://react-shiksak-sarthi-d.vercel.app";

  // list of cities used for the location select
  const cities = [
    { id: 1, name: "Balod" },
    { id: 2, name: "Baloda Bazar" },
    { id: 3, name: "Balrampur" },
    { id: 4, name: "Bastar" },
    { id: 5, name: "Bijapur" },
    { id: 6, name: "Bilaspur" },
    { id: 7, name: "Dehradun" },
    { id: 8, name: "Dantewada" },
    { id: 9, name: "Dhamtari" },
    { id: 10, name: "Durg" },
    { id: 11, name: "Gariaband" },
    { id: 12, name: "Janjgir-Champa" },
    { id: 13, name: "Jashpur" },
    { id: 14, name: "Kabirdham" },
    { id: 15, name: "Kanker" },
    { id: 16, name: "Kondagaon" },
    { id: 17, name: "Korba" },
    { id: 18, name: "Koriya" },
    { id: 19, name: "Mahasamund" },
    { id: 20, name: "Manendragarh" },
    { id: 21, name: "Mungeli" },
    { id: 22, name: "Narayanpur" },
    { id: 23, name: "Raigarh" },
    { id: 24, name: "Raipur" },
    { id: 25, name: "Rajnandgaon" },
    { id: 26, name: "Sakti" },
    { id: 27, name: "Sukma" },
    { id: 28, name: "Surajpur" },
    { id: 29, name: "Surguja" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    // BASIC VALIDATION
    if (!bhk || !location || !name || !phone) {
      alert("Please fill all required fields");
      return;
    }

    const formData = { bhk, location, name, phone, whatsapp };

    try {
      setLoading(true);

      const res = await fetch(`${API}/api/enquiry`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      alert("Enquiry sent successfully!");

      // RESET FORM
      setBhk("");
      setLocation("");
      setName("");
      setPhone("");
      setWhatsapp(false);

      // CLOSE POPUP
      onSuccess?.();

    } catch (err) {
      alert("Failed to send enquiry. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="py-1 px-2 p-md-4 rounded bg-white"
      style={{ width: "100%", margin: "0" }}
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
          {cities.map((c) => (
            <option key={c.id} value={c.name}>
              {c.name}
            </option>
          ))}
        </select>

        {/* NAME */}
        <input
          type="text"
          className="form-control mt-3"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* MOBILE */}
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

        {/* WHATSAPP */}
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

        {/* SUBMIT */}
        <button
          className="btn btn-danger mt-4 w-100 fw-bold"
          disabled={loading}
        >
          {loading ? "Sending..." : "Book a Free Consultation"}
        </button>

        <p className="text-center mt-2" style={{ fontSize: "12px" }}>
          By submitting, you consent to our{" "}
          <a href="#">privacy policy</a> & <a href="#">terms of use</a>.
        </p>
      </form>
    </div>
  );
}
