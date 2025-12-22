import { useState, useEffect, useRef } from "react";
import "./image.css";

// import img1 from "/colours-kitchen-img/colours-kitchen.jpg";
// import img2 from "/colours-kitchen-img/colours-kitchen1.jpg";
// import img3 from "/colours-kitchen-img/colours-kitchen2.jpg";
// import img4 from "/colours-kitchen-img/colours-kitchen3.jpg";
// import img5 from "/colours-kitchen-img/colours-kitchen4.jpg";

// All real images (do NOT repeat them here)
// const images = [img1, img2, img3, img4, img5];

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Home7() {
  const [images, setImages] = useState([]); // uploaded images
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Desktop default = 3
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);


  useEffect(() => {
    if (fetchedRef.current) return;   // ⛔ prevent second call
  fetchedRef.current = true;        // ✅ mark as fetched
    fetchImages();
  }, []);

  // Responsive images count
  useEffect(() => {
    const updateView = () => {
      if (window.innerWidth < 768) {
        setVisibleCount(1); // Mobile = 1 image
      } else {
        setVisibleCount(3); // Desktop = 3 images
      }
    };

    updateView();
    window.addEventListener("resize", updateView);
    return () => window.removeEventListener("resize", updateView);
  }, []);

  async function fetchImages() {
    try {
      setLoading(true);
      const res = await fetch(`${API}/api/media?category=livingroom`);
      const data = await res.json();

      console.log("API DATA", data); // debug

      const uploadedImages = data.items.map((item) => ({
        id: item._id,
        url: item.url,
        description: item.description,
      }));
      /*
      const resources = data.resources || [];

      // take only images
      const uploadedImages = resources
        .filter((r) => r.resource_type === "image")
        .map((r) => ({
          id: r.asset_id || r.public_id,
          url: r.secure_url,
          descriptions: r.description || "",
        }));
*/
      setImages(uploadedImages);
    } catch (err) {
      console.error("Failed to load images", err);
    } finally {
      setLoading(false);
    }
  }

  // Next Slide
  const next = () => {
    setStartIndex((prev) => (prev + 1) % images.length);
  };

  // Previous Slide
  const prev = () => {
    setStartIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Compute visible images dynamically
  const visibleImages = Array.from({ length: visibleCount }).map(
    (_, i) => images[(startIndex + i) % images.length]
  );

  // Change slide by clicking dot
  const goToSlide = (i) => setStartIndex(i);

  return (
    <div className="container text-center py-5">
      <h2 className="fw-semibold">
        51040 Design Possibilities In Our Experience Centres
      </h2>
      <p className="text-muted mb-4">1 Cities | 10 Experience Centres</p>

      {loading && <div>Loading images...</div>}
      {!loading && images.length === 0 && <div>No images found</div>}

      {images.length > 0 && (
        <div className="position-relative">
          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="btn btn-light shadow rounded-circle position-absolute top-50 start-0 translate-middle-y"
            style={{ zIndex: 10 }}
          >
            ❮
          </button>

          {/* SLIDER */}
          <div className="d-flex justify-content-center gap-3">
            {visibleImages.map((img, i) => (
              <div
                key={img.id}
                style={{ width: visibleCount === 1 ? "90%" : "30%" }}
              >
                {/* <img
                  src={img.url}
                  className="img-fluid shadow-sm p-2"
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                  alt="Uploaded"
                /> */}
                <div className="image-box">
                  <img src={img.url} className="img-fluid shadow-sm" alt="Uploaded" />
                </div>

                {/* DESCRIPTION */}

                <p className="mt-2 text-muted">{img.description}</p>
              </div>
            ))}
          </div>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="btn btn-light shadow rounded-circle position-absolute top-50 end-0 translate-middle-y"
            style={{ zIndex: 10 }}
          >
            ❯
          </button>
        </div>
      )}

      {/* DOTS — MOBILE ONLY */}
      {visibleCount === 1 && images.length > 0 && (
        <div className="d-flex justify-content-center mt-3 gap-2">
          {images.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === startIndex ? "12px" : "10px",
                height: i === startIndex ? "12px" : "10px",
                borderRadius: "50%",
                backgroundColor: i === startIndex ? "#6c757d" : "#d3d3d3",
                cursor: "pointer",
                transition: "0.3s",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
