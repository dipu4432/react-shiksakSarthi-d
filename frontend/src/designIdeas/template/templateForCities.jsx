import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import pageConfig from "../data/city.json";
import { fetchData } from "../api/api";
import "./template.css";

import Banner from "../componentsForCity/banner";
import MeetDesigners from "../componentsForCity/meetDesigners";
import WorkProcess from "../componentsForCity/workProcess";
import BudgetDesigns from "../componentsForCity/budgetDesigns";
import PriceEstimator from "../componentsForCity/priceEstimator";
import Testimonials from "../componentsForCity/testimonials";
import ReasonToLoveUs from "../componentsForCity/reasonToLoveUs";
import DesignModules from "../componentsForCity/designModules";
import Magazine from "../componentsForCity/magazine";
import FAQ from "../componentsForCity/faq";

const Template = ({ cityKey }) => {
  const config = pageConfig[cityKey];
  const [data, setData] = useState([]);
  const [showFullDesc, setShowFullDesc] = useState(false);

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

  return (
    <section>
      <Banner cityName={config.cityName} />
      <div style={{ marginTop: "40px", marginBottom: "20px" }}>
        <MeetDesigners cityName={config.cityName} />
      </div>
      <WorkProcess />
      <BudgetDesigns />
      <PriceEstimator />
      <Testimonials />
      <ReasonToLoveUs />
      <DesignModules />
      <Magazine />
      <FAQ />
      <div className="row g-4 mt-3">
        {Array.isArray(config.images) &&
          config.images.map((item, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                {/* IMAGE */}
                <img
                  src={item.src}
                  className="card-img-top"
                  alt={item.title}
                  loading="lazy"
                />

                {/* CONTENT */}
                <div className="card-body">
                  <p className="mb-1">{item.shortDesc}</p>
                  {item.size && (
                    <p className="mb-2 text-body-secondary">
                      Size: {item.size}
                    </p>
                  )}
                </div>

                {/* FIXED BUTTONS (PER IMAGE) */}
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-outline-danger btn-sm w-50"
                    onClick={() => handleConsult(item)}
                  >
                    Book Free Consultation
                  </button>

                  <button
                    className="btn btn-danger btn-sm w-50"
                    onClick={() => handleQuote(item)}
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
    </section>
  );
};

export default Template;
