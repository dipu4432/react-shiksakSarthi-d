const WorkProcess = () => {
  return (
    <div className="bg-dark-subtle">
      <div className="container text-start pb-5 mb-2">
        <h2>Bought a new home?</h2>
        <p>
          Get interiors that your family members and friends would love. Our
          interior designers in Jaipur can make that happen!
        </p>
        <div className="container my-5">
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/img1.jpg" className="card-img-top" alt="We design" />
                <div className="card-body">
                  <h5 className="fw-bold">We design</h5>
                  <p className="text-muted mb-0">
                    We take the time to understand your lifestyle and needs,
                    before translating your vision in 3D
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img src="/img2.jpg" className="card-img-top" alt="We curate" />
                <div className="card-body">
                  <h5 className="fw-bold">We curate</h5>
                  <p className="text-muted mb-0">
                    Modular kitchens, wardrobes and storage - find everything
                    you need in our extensive catalogue
                  </p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/img3.jpg"
                  className="card-img-top"
                  alt="We deliver"
                />
                <div className="card-body">
                  <h5 className="fw-bold">We deliver</h5>
                  <p className="text-muted mb-0">
                    We'll do all the heavy-lifting–flooring, painting, false
                    ceiling, plumbing and everything else in between
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkProcess;
