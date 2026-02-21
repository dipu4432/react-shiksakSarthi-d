import { useState, useEffect, useRef } from "react";
import "./image.css";

const API =
  import.meta.env.VITE_API_URL || "https://react-shiksak-sarthi-d.vercel.app/";

export default function Gallery() {
  const [images, setImages] = useState([]); // uploaded images
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // Desktop default = 3
  const [loading, setLoading] = useState(false);
  const fetchedRef = useRef(false);

  useEffect(() => {
    if (fetchedRef.current) return; // prevent second call
    fetchedRef.current = true; //  mark as fetched
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
      const res = await fetch(`${API}/api/media`);
      const data = await res.json();

      console.log("API DATA", data); // debug

      const uploadedImages = data.items.map((item) => ({
        id: item._id,
        url: item.url,
        description: item.description,
      }));
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

  // -------- RELATIVE DOT LOGIC (SLIDING WINDOW) --------
  const MAX_DOTS = 5;

  // base index for current dot window
  const dotWindowStart = Math.floor(startIndex / MAX_DOTS) * MAX_DOTS;

  // dots always 0–4 (or less if images < 5)
  const visibleDots = Array.from(
    { length: Math.min(MAX_DOTS, images.length - dotWindowStart) },
    (_, i) => i
  );

  // active dot is RELATIVE
  const activeDot = startIndex - dotWindowStart;

  const goToSlide = (dotIndex) => {
    setStartIndex(dotWindowStart + dotIndex);
  };

  return (
    <div className="container text-center">
      <h2 className="fw-semibold mt-4">
        2000 Design Possibilities In Our Experience Centres
      </h2>
      {/* <p className="text-muted mb-4">1 Cities | 10 Experience Centres</p> */}

      {loading && <div>Loading images...</div>}
      {!loading && images.length === 0 && <div>No images found</div>}

      {images.length > 0 && (
        <>
          {/* IMAGE + BUTTON AREA */}
          <div className="position-relative">
            {/* LEFT BUTTON */}
            <button
              onClick={prev}
              className="btn btn-light shadow rounded-circle position-absolute top-50 start-0 translate-middle-y"
              style={{ zIndex: 10 }}
            >
              ❮
            </button>

            {/* IMAGES ONLY */}
            <div className="d-flex justify-content-center gap-3">
              {visibleImages.map((img) => (
                <div
                  key={img.id}
                  style={{ width: visibleCount === 1 ? "90%" : "30%" }}
                >
                  <div className="image-box">
                    <img src={img.url} className="image-full" alt="Uploaded" />
                  </div>
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

          {/* DESCRIPTION OUTSIDE */}
          <div className="d-flex justify-content-center gap-3 mt-2">
            {visibleImages.map((img) => (
              <p
                key={img.id}
                className="text-muted text-center"
                style={{ width: visibleCount === 1 ? "90%" : "30%" }}
              >
                {img.description}
              </p>
            ))}
          </div>
        </>
      )}
      
      {/* DOTS — MOBILE ONLY */}
      {visibleCount === 1 && images.length > 0 && (
        <div className="d-flex justify-content-center mt-2 gap-2">
          {visibleDots.map((_, i) => (
            <div
              key={i}
              onClick={() => goToSlide(i)}
              style={{
                width: i === activeDot ? "12px" : "10px",
                height: i === activeDot ? "12px" : "10px",
                borderRadius: "50%",
                backgroundColor: i === activeDot ? "#6c757d" : "#d3d3d3",
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
