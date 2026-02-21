import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const ConstructionServices = () => {
  const navigate = useNavigate();

  // stable inline SVG fallback (used if remote images fail)
  const fallbackSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900"><rect width="100%" height="100%" fill="#e9ecef"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#6c757d" font-family="Arial, Helvetica, sans-serif" font-size="32">Image unavailable</text></svg>`;
  const fallbackDataUri = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(fallbackSvg);

  // hero carousel slides (construction-focused) — updated image URLs only
  const heroImages = [
    {
      // Construction site / installation
      src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
      title: "Construction Installation",
      desc: "Site mobilisation & civil works to prepare the site."
    },
    {
      // Electrical / electrician / wiring
      src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&w=1200&q=80",
      title: "Electrical",
      desc: "Electrical routing, conduits and MEP coordination."
    },
    {
      // Carpentry / woodworking
      src: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1200&q=80",
      title: "Carpentry",
      desc: "Custom joinery, cabinets and precision installations."
    },
    {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2200&q=80",
      title: "Modular Kitchen",
      desc: "Factory-made modules assembled and installed on-site."
    },
    {
      // Finishes / tiles / flooring
      src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
      title: "Finishes",
      desc: "High-quality tiling, flooring and final finishes."
    },
    {
      // replaced with a different reliable Unsplash image for "Handover Ready"
      src: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2200&q=80",
      title: "Handover Ready",
      desc: "Final QA, snag closure and clean handover."
    },
  ];

  // validated slides (preload & fallback)
  const [slides, setSlides] = useState(heroImages);

  useEffect(() => {
    let mounted = true;
    const loadImage = (src) =>
      new Promise((res) => {
        const img = new Image();
        img.onload = () => res(src);
        img.onerror = () => res(null);
        img.src = src;
      });

    (async () => {
      const results = await Promise.all(heroImages.map((h) => loadImage(h.src)));
      if (!mounted) return;
      const validated = heroImages.map((h, i) => ({ ...h, src: results[i] || fallbackDataUri }));
      setSlides(validated);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // carousel ref + ensure autoplay via bootstrap JS if available
  const carouselRef = useRef(null);
  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const BS = window.bootstrap?.Carousel;
    if (BS) {
      let inst = BS.getInstance(el);
      if (!inst) inst = new BS(el, { interval: 4200, ride: "carousel", pause: "hover", touch: true });
      else inst.cycle();
    }
  }, []);

  return (
    <section className="py-5 bg-light">
      <style>{`
        /* full-bleed hero: use calc centering so it isn't constrained by ancestor layout */
        .cs-hero-full {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw); /* robust centering */
          margin-right: calc(50% - 50vw);
          overflow: hidden;
          margin-bottom: 2rem;
          box-sizing: border-box;
        }
        .cs-hero-full .carousel { width:100%; }
        .cs-hero-full .carousel-inner { width:100%; }

        /* ensure hero carousel items are not constrained by other styles (eg. max-width:600px)
           hide non-active slides (Bootstrap shows only .active) */
        .cs-hero-full .carousel-item {
          height: 72vh;
          min-height: 520px;
          /* override any external max-width/width constraints */
          flex: 0 0 auto;
          width: 100% !important;
          max-width: none !important;
          margin-right: 0 !important;
          /* if scroll-snap was applied elsewhere, unset it for the hero */
          scroll-snap-align: unset !important;
          border-radius: 0; /* keep full-bleed edges — adjust if you want rounded corners */
          display: none; /* hide by default; show only .active below */
        }
        .cs-hero-full .carousel-item.active {
          display: block; /* only active slide visible */
        }
        .cs-hero-full .carousel-item img {
          width: 100vw;      /* fill full viewport width */
          max-width: none;   /* override bootstrap's max-width */
          height: 72vh;
          object-fit: cover;
          filter: contrast(.98) saturate(.98);
          display: block;
        }

        /* bootstrap .carousel-caption styled for readability */
        .cs-hero-full .carousel-caption {
          position: absolute;
          right: 6%;
          bottom: 6%;
          left: auto;
          text-align: right;
          background: rgba(0,0,0,0.28);
          padding: 1rem 1.25rem;
          border-radius: 8px;
          color: #fff;
        //   max-width: 480px;
        }
        /* Ensure caption text remains white even if other rules override it */
        .cs-hero-full .carousel-caption h3 {
          font-size: clamp(1.25rem, 2.6vw, 1.8rem);
          margin: 0 0 .25rem;
          font-weight: 700;
          color: #fff !important;
        }
        .cs-hero-full .carousel-caption p {
          margin: 0 0 .5rem;
          opacity: .95;
          color: #fff !important;
        }

        .cs-features { display:grid; grid-template-columns: repeat(auto-fit,minmax(220px,1fr)); gap:1rem; margin-bottom:2rem; }
      `}</style>

      {/* HERO — place carousel in a full-width container-fluid so it spans the viewport */}
      <div className="container-fluid px-0">
        <div className="cs-hero-full">
          <div
            id="csHeroCarousel"
            ref={carouselRef}
            className="carousel slide"
            data-bs-ride="carousel"
            data-bs-interval="4500"
            data-bs-pause="hover"
            data-bs-keyboard="true"
          >
            <div className="carousel-indicators">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  data-bs-target="#csHeroCarousel"
                  data-bs-slide-to={idx}
                  className={idx === 0 ? "active" : ""}
                  aria-current={idx === 0 ? "true" : undefined}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="carousel-inner">
              {slides.map((slide, idx) => (
                <div
                  key={idx}
                  className={`carousel-item ${idx === 0 ? "active" : ""}`}
                >
                  <img
                    src={slide.src}
                    className="d-block w-100"
                    alt={slide.title}
                    // image already prevalidated; keep a small onError handler as last-resort
                    onError={(e) => {
                      console.warn("Carousel image failed at runtime:", slide.src);
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = fallbackDataUri;
                      e.currentTarget.style.objectFit = "cover";
                    }}
                  />
                  <div className="carousel-caption d-none d-md-block">
                    <h3>{slide.title}</h3>
                    <p>{slide.desc}</p>
                    <div>
                      <button
                        className="btn btn-danger me-2"
                        onClick={() => navigate("/turnkey-project")}
                      >
                        Explore Turnkey Projects
                      </button>
                      <button
                        className="btn btn-outline-light"
                        onClick={() => navigate("/contact-us")}
                      >
                        Request Consultation
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#csHeroCarousel"
              data-bs-slide="prev"
            >
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#csHeroCarousel"
              data-bs-slide="next"
            >
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Intro */}
        <div className="row mb-4 mt-4">
          <div className="col-lg-8">
            <h3 className="fw-bold">What we handle</h3>
            <p className="text-muted">
              From civil groundwork to final finishes, our construction teams
              coordinate closely with design and production to ensure
              installations match the design intent and quality standards.
            </p>
          </div>
        </div>

        {/* Features Section */}
        <div className="row g-4 text-center mb-5">
          {[
            "Residential & Commercial Projects",
            "Strong RCC & Structural Work",
            "Quality Materials & Skilled Labor",
            "Electrical & Plumbing Setup",
            "On-Time Project Delivery",
            "End-to-End Project Supervision",
          ].map((feature, index) => (
            <div className="col-md-4" key={index}>
              <div className="bg-white p-4 rounded shadow-sm h-100">
                <h6 className="fw-semibold">{feature}</h6>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="text-center mb-4">
          <h3 className="fw-bold">Our Construction Process</h3>
        </div>

        <div className="row g-4 text-center">
          {[
            {
              step: "1",
              title: "Planning & Design",
              desc: "Detailed project planning, approvals and budgeting.",
            },
            {
              step: "2",
              title: "Foundation & Structure",
              desc: "Strong structural execution with high-grade materials.",
            },
            {
              step: "3",
              title: "Execution & Finishing",
              desc: "Plumbing, electrical, flooring and final finishes.",
            },
            {
              step: "4",
              title: "Final Handover",
              desc: "Quality inspection and ready-to-use delivery.",
            },
          ].map((item, index) => (
            <div className="col-md-3" key={index}>
              <div className="p-4 border rounded shadow-sm h-100 bg-white">
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    backgroundColor: "#000",
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "18px",
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

export default ConstructionServices;
