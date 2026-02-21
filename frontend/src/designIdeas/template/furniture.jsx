import pageConfig from "../data/furniture.json";
import "./template.css";

const Furniture = ({ furnitureKey }) => {
  const config = pageConfig[furnitureKey];

  if (!config) return <h2>Page not found</h2>;

  const items = Array.isArray(config.images)
    ? config.images
    : [];

  return (
    <div className="container text-start pb-5 mb-2">
      <div className="container my-5">
        <div className="row g-4">
          <h1 className="text-center mb-4">Furniture section which you can explore</h1>
          {items.map((item) => (
            <div className="col-md-4" key={item.id}>
              <div className="card h-100 shadow-sm border-0">
                {/* IMAGE */}
                <img
                  src={
                    new URL(
                      `../../assets/furniture/${furnitureKey}/${item.src}`,
                      import.meta.url
                    ).href
                  }
                  className="card-img-top"
                  alt={config.name}
                  style={{ height: "220px", objectFit: "cover" }}
                  loading="lazy"
                />

                {/* DESCRIPTION */}
                <div className="card-body">
                  <p className="card-text mb-0">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Furniture;
