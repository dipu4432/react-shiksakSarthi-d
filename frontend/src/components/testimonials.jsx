import React, { useEffect, useState } from "react";
import { fetchData } from "../designIdeas/api/api";
import axios from "axios";
import profile1 from "/Deepak-Kumar.jpg";
import profile2 from "/Aditya-Sinha.jpg";
import family1 from "/family1.jpg";
import family2 from "/family2.jpg";
import { uploadToCloudinary } from "../utils/cloudinaryUpload";
import { useAuth } from "../designIdeas/context/userContext";

const DEFAULT_TESTIMONIALS = [
  {
    name: "Deepak Kumar",
    location: "Bilaspur, Chhattisgarh",
    description:
      "Colours Kitchen completely transformed our home interiors. The team understood our requirements perfectly and delivered beyond expectations. The quality and finish are outstanding.",
    profileImage: profile1,
    image: family1,
  },
  {
    name: "Aditya Sinha",
    location: "Korba, Chhattisgarh",
    description:
      "We are extremely satisfied with the modular kitchen design and smart storage solutions. Every space has been utilized beautifully and the execution was seamless.",
    profileImage: profile2,
    image: family2,
  },
];


const API_BASE = import.meta.env.VITE_API_URL

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [form, setForm] = useState({
    profileImage: "",
    name: "",
    location: "",
    description: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [uploading, setUploading] = useState(false);

  const { user } = useAuth();

  // Fetch testimonials from backend
  useEffect(() => {
    const fetchTestimonials = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchData("/api/testimonials");
        setTestimonials(data.length ? data : []);
        if (data.length === 0) {
          for (const item of DEFAULT_TESTIMONIALS) {
            await axios.post(`${API_BASE}/api/testimonials`, {
              name: item.name,
              location: item.location,
              description: item.description,
              profileImage: item.profileImage,
              image: item.image,
            });
          }
          const data = await fetchData("/api/testimonials");
          setTestimonials(data.length ? data : []);
        }
      } catch (err) {
        setError("Failed to load testimonials");
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);


  // Handle text input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle file input for Cloudinary
  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    if (!files || !files[0]) return;
    setUploading(true);
    try {
      const url = await uploadToCloudinary(files[0]);
      setForm((prev) => ({ ...prev, [name]: url }));
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Add or update testimonial
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/api/testimonials/${editingId}`, form);
        setEditingId(null);
      } else {
        await axios.post(`${API_BASE}/api/testimonials`, form);
      }
      setForm({ profileImage: "", name: "", location: "", description: "", image: "" });
      // Refresh testimonials
      const data = await fetchData("/api/testimonials");
      setTestimonials(data.length ? data : []);
    } catch (err) {
      setError("Failed to save testimonial");
    }
  };

  // Edit testimonial
  const handleEdit = (t, idx) => {
    setForm({ ...t });
    setEditingId(t._id || `default-${idx}`);
  };

  // Delete testimonial
  const handleDelete = async (t, idx) => {
    if (t._id) {
      try {
        const res = await axios.delete(`${API_BASE}/api/testimonials/${t._id}`);
        console.log("res: ", res);
        if (res.data.success) {
          const data = await fetchData("/api/testimonials");
          setTestimonials(data.length ? data : []);
        }
        console.log(res.data);
        // setError(res.data.)
      } catch (err) {
        setError("Failed to delete testimonial");
      }
    }
  };

  // Render testimonials (show both default and backend)

  const testimonialsToShow = testimonials;

  return (
    <div className="bg-dark-subtle py-4">
      <div className="container">
        <h2 className="text-center fw-semibold mb-5">1000+ Happy Homes</h2>

        {error && <div className="alert alert-danger">{error}</div>}
        {user && (
          <form className="mb-5" onSubmit={handleSubmit}>
            <div className="row g-2 align-items-end">
              <div className="col-md-2">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-1"
                  name="profileImage"
                  onChange={handleFileChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="profileImage"
                  placeholder="Profile Image URL"
                  value={form.profileImage}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  placeholder="Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="text"
                  className="form-control"
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3">
                <input
                  type="text"
                  className="form-control"
                  name="description"
                  placeholder="Description"
                  value={form.description}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2">
                <input
                  type="file"
                  accept="image/*"
                  className="form-control mb-1"
                  name="image"
                  onChange={handleFileChange}
                />
                <input
                  type="text"
                  className="form-control"
                  name="image"
                  placeholder="Family Image URL"
                  value={form.image}
                  onChange={handleChange}
                />
              </div>
              <div className="col-md-1 d-flex flex-column gap-2">
                <button type="submit" className="btn btn-success w-100" disabled={uploading}>
                  {editingId ? "Update" : "Add"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary w-100"
                    onClick={() => {
                      setEditingId(null);
                      setForm({ profileImage: "", name: "", location: "", description: "", image: "" });
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </form>
        )}


        <div className="row justify-content-center g-4">
          {testimonialsToShow.map((t, idx) => (
            <div className="col-12 col-md-10 col-lg-6" key={t._id || `default-${idx}`}>
              <div className="bg-white p-3 rounded shadow-sm h-100 text-center">
                <img
                  src={t.profileImage || profile1}
                  alt={t.name}
                  className="rounded-circle mb-2"
                  width={100}
                  height={100}
                />
                <h6 className="fw-semibold mb-1">{t.name}</h6>
                <p className="text-muted small mb-2">{t.location}</p>
                <p className="small px-lg-3 mb-2" style={{ lineHeight: "1.4" }}>{t.description}</p>
                <img
                  src={t.image || family1}
                  alt="Family Home"
                  className="img-fluid rounded mt-2"
                  style={{ maxHeight: "300px", width: "100%", objectFit: "cover" }}
                />
                {user && (
                  <div>
                    <button className="btn btn-link mt-2" onClick={() => handleEdit(t, idx)}>
                      Edit
                    </button>
                    <button className="btn btn-link text-danger mt-2" onClick={() => handleDelete(t, idx)}>
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-4">
          {/* <button className="btn btn-danger px-4 py-2 shadow">
            Book A Free Consultation
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
