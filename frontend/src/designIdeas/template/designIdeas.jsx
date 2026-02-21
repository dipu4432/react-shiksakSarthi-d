import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import pageConfig from "../data/designIdeas.json";
import { fetchData } from "../api/api";

import "./template.css";

const Template = ({ pageKey, imageFolder, onQuoteClick }) => {
  const config = pageConfig[pageKey];
  const [data, setData] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const navigate = useNavigate();

  const DESC_LIMIT = 160;

  useEffect(() => {
    if (config?.api) {
      fetchData(config.api).then(setData);
    }
  }, [config]);

  if (!config) return <h2>Page not found</h2>;

  const imageCount = Array.isArray(config.images)
    ? config.images.length
    : config.img
      ? 1
      : 0;


  const handleClick = (item) => {
    navigate(`/designDetails/${pageKey}/${item.id}`, {
      state: { imageFolder },
    });
  };
  
  return (
    <div className="container text-start py-4 mt-3">
      <p className="text-body-secondary">Showing {imageCount} Results for</p>
      <h1 className="section-heading">{config.title}</h1>
      {/* <p>{config.description}</p> */}
      <div>
        <p>
          {showFullDesc || config.description.length <= DESC_LIMIT
            ? config.description
            : config.description.slice(0, DESC_LIMIT) + "..."}
        </p>

        {config.description.length > DESC_LIMIT && (
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="btn btn-link p-0 text-danger text-decoration-none"
          >
            {showFullDesc ? (
              <>
                Read Less <FaChevronUp size={10} />
              </>
            ) : (
              <>
                Read More <FaChevronDown size={10} />
              </>
            )}
          </button>
        )}
      </div>
      <div className="row g-4 mt-2">
        {Array.isArray(config.images) &&
          config.images.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div
                className="card h-100 shadow-sm floating-card"
                onClick={() => handleClick(item)}
                style={{ cursor: "pointer" }}
              >
                {/* IMAGE */}
                <div className="card-img-wrapper">
                  <img
                    src={
                      new URL(
                        `../../assets/designIddea/${imageFolder}/${item.src}`,
                        import.meta.url,
                      ).href
                    }
                    alt={item.shortDesc}
                    loading="lazy"
                  />
                </div>

                {/* CONTENT */}
                <div className="card-body">
                  <p className="mb-1">{item.shortDesc}</p>
                  {item.size && (
                    <p className="mb-1 text-body-secondary">
                      Size: {item.size}
                    </p>
                  )}
                </div>

                {/* FIXED BUTTONS (PER IMAGE) */}
                <div className="d-flex justify-content-center">
                  {/* <button
                    className="btn btn-outline-danger btn-sm ms-2 mb-2 w-50"
                    onClick={() => handleConsult(item)}
                  >
                    Book Free Consultation
                  </button> */}

                  <button
                    className="btn btn-danger btn-sm mb-2 w-50 rounded-pill"
                    // onClick={() => handleQuote(item)}
                    onClick={(e) => {
                      e.stopPropagation();
                      // handleQuote(item);
                      onQuoteClick();
                    }}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {/* CARD LAYOUT */}
      {config.layout === "card" && (
        <div className="grid">
          {data.map((item) => (
            <div key={item._id} className="card">
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      )}

      {/* TEXT LAYOUT */}
      {config.layout === "text" && (
        <div>
          {data.map((item) => (
            <p key={item._id}>{item.content}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default Template;
