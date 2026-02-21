import { useParams, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import pageConfig from "../data/designIdeas.json";

const DesignDetails = ({ onQuoteClick }) => {
  const { pageKey, imageId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pageKey, imageId]);

  const imageFolder = state?.imageFolder;

  const config = pageConfig[pageKey];
  if (!config) return <h2 className="text-center mt-5">Page not found</h2>;

  const images = config.images || [];

  // Support both string and number IDs
  const currentIndex = images.findIndex(
    (img) => String(img.id) === String(imageId),
  );

  if (currentIndex === -1)
    return <h2 className="text-center mt-5">Image not found</h2>;

  const item = images[currentIndex];
  const prevIndex = (currentIndex - 1 + images.length) % images.length;
  const nextIndex = (currentIndex + 1) % images.length;

  const prevItem = images[prevIndex];
  const nextItem = images[nextIndex];

  const resolveImageSrc = (src) => {
    if (!src) return "";
    if (src.startsWith("/")) return src;

    return new URL(
      `../../assets/designIddea/${imageFolder}/${src}`,
      import.meta.url,
    ).href;
  };

  const goTo = (id) => {
    navigate(`/designDetails/${pageKey}/${id}`, {
      state: { imageFolder },
    });
  };

  return (
    <div className="container-fluid py-3">
      <div className="row g-4">
        {/* LEFT IMAGE */}
        <div className="col-lg-8">
          <div
            className="rounded-4 overflow-hidden d-flex justify-content-center align-items-center"
            style={{
              height: "60vh",
              background: "#f5f5f5",
              padding: "25px",
            }}
          >
            <img
              src={resolveImageSrc(item.src)}
              alt={config.title}
              style={{
                width: "90%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>

          {/* PREV / NEXT */}
          <div className="d-flex justify-content-between align-items-center mt-3 px-2 border-top pt-3">
            {/* PREVIOUS */}
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => goTo(prevItem.id)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/designDetails/${pageKey}/${prevItem.id}`, {
                    state: { imageFolder },
                  });
                }}
                className="btn btn-light shadow-sm rounded-circle"
                style={{ width: "42px", height: "42px" }}
              >
                ❮
              </button>

              <img
                src={resolveImageSrc(prevItem.src)}
                alt="prev"
                style={{
                  width: "55px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <div>
                <small className="text-muted d-block">Previous</small>
                <b style={{ fontSize: "14px" }}>
                  {prevItem?.shortDesc?.slice(0, 22)}...
                </b>
              </div>
            </div>

            {/* NEXT */}
            <div
              className="d-flex align-items-center gap-2"
              style={{ cursor: "pointer" }}
              onClick={() => goTo(nextItem.id)}
            >
              <div className="text-end">
                <small className="text-muted d-block">Next</small>
                <b style={{ fontSize: "14px" }}>
                  {nextItem?.shortDesc?.slice(0, 22)}...
                </b>
              </div>

              <img
                src={resolveImageSrc(nextItem.src)}
                alt="next"
                style={{
                  width: "55px",
                  height: "40px",
                  objectFit: "cover",
                  borderRadius: "6px",
                }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  goTo(nextItem.id);
                }}
                className="btn btn-light shadow-sm rounded-circle"
                style={{ width: "42px", height: "42px" }}
              >
                ❯
              </button>
            </div>
          </div>
        </div>

        {/* RIGHT TEXT */}
        <div className="col-lg-4">
          <div
            className="ps-lg-3 d-flex flex-column"
            style={{
              height: "75vh",
              background: "#fff",
              padding: "15px",
              borderRadius: "12px",
            }}
          >
            <div style={{ overflowY: "auto", paddingRight: "6px" }}>
              <h2 className="fw-bold" style={{ fontSize: "30px" }}>
                {item.shortDesc}
              </h2>

              <h5 className="fw-bold mt-4 mb-3">{config.title} Details:</h5>

              <div>
                <p>
                  <b>Layout:</b> {item.layout}
                </p>
                <p>
                  <b>Room Dimension:</b> {item.size} feet
                </p>
                <p>
                  <b>Style:</b> {item.style}
                </p>
                <p>
                  <b>Colour:</b> {item.colour}
                </p>

                <p>
                  <b>Shutter finish:</b>
                  {Object.values(item.sutterFinish || {}).map(
                    (finish, index) => (
                      <div key={index}>{finish}</div>
                    ),
                  )}
                </p>

                <p>
                  <b>Countertop Material:</b> {item.countertopMaterial}
                </p>

                <p>
                  <b>Storage Features:</b>
                  {Object.values(item.storageFeature || {}).map(
                    (feature, index) => (
                      <div key={index}>{feature}</div>
                    ),
                  )}
                </p>

                <p>
                  <b>Special Features:</b>
                  {Object.values(item.specialFeature || {}).map(
                    (special, index) => (
                      <div key={index}>{special}</div>
                    ),
                  )}
                </p>

                <p>
                  <b>Ideal for:</b> {item.idealFor}
                </p>
              </div>
            </div>

            <button
              onClick={onQuoteClick}
              className="btn btn-outline-danger w-100 py-2 rounded-pill fw-semibold mt-auto"
            >
              Get Free Quote
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignDetails;
