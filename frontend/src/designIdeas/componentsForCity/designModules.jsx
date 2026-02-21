const DesignModules = () => {
  return (
    <div className="bg-body-secondary">
      <div className="container text-start pb-5 mb-2">
        <h2>Need some design inspiration?</h2>
        <p>
          Let our interior design ideas be the stepping stone towards your dream
          home. From modular kitchens to stunning full home interiors, we've got
          it all!
        </p>
        <div className="container my-5">
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/img1.jpg" className="card-img-top" alt="We design" />
                <div className="card-body">
                  <h5 className="fw-bold">Modular Kitchens</h5>
                </div>
                <button className="btn text-danger fw-semibold p-0 d-flex align-items-center gap-2">
                  Explore
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/img2.jpg" className="card-img-top" alt="We design" />
                <div className="card-body">
                  <h5 className="fw-bold">Bedrooms</h5>
                </div>
                <button className="btn text-danger fw-semibold p-0 d-flex align-items-center gap-2">
                  Explore
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/img3.jpg" className="card-img-top" alt="We design" />
                <div className="card-body">
                  <h5 className="fw-bold">Living Rooms</h5>
                </div>
                <button className="btn text-danger fw-semibold p-0 d-flex align-items-center gap-2">
                  Explore
                  <span style={{ fontSize: "18px", lineHeight: 1 }}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignModules;
