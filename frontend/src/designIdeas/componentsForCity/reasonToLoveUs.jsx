const ReasonToLoveUs = () => {
  return (
    <div className=" bg-body-secondary">
      <div className="container text-start pb-5 mb-2">
        <h2>Reasons to love us</h2>
        <div className="container my-5">
          <div className="row g-4">
            {/* Card 1 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/image1.png"
                  className="card-img-top"
                  style={{ width: "10vw", height: "20vh" }}
                  alt="We design"
                />
                <div className="card-body">
                  <h6>India's only full home warranty*</h6>
                  <p className="text-muted mb-0">
                    10-yrs for products & services
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/image1.png"
                  className="card-img-top"
                  style={{ width: "10vw", height: "20vh" }}
                  alt="We design"
                />
                <div className="card-body">
                  <h6>146 quality checks</h6>
                  <p className="text-muted mb-0">To give your home the best</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/image1.png"
                  className="card-img-top"
                  style={{ width: "10vw", height: "20vh" }}
                  alt="We design"
                />
                <div className="card-body">
                  <h6>45-day installation^</h6>
                  <p className="text-muted mb-0">
                    Swift kitchens, wardrobes & storage
                  </p>
                </div>
              </div>
            </div>
            {/* Card 4 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/image1.png"
                  className="card-img-top"
                  style={{ width: "10vw", height: "20vh" }}
                  alt="We design"
                />
                <div className="card-body">
                  <h6>Personalised designs</h6>
                  <p className="text-muted mb-0">That are as unique as you</p>
                </div>
              </div>
            </div>
            {/* Card 5 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/image1.png"
                  className="card-img-top"
                  style={{ width: "10vw", height: "20vh" }}
                  alt="We design"
                />
                <div className="card-body">
                  <h6>One-stop shop</h6>
                  <p className="text-muted mb-0">For all home interior needs</p>
                </div>
              </div>
            </div>
            {/* Card 6 */}
            <div className="col-md-4">
              <div className="card h-100 shadow-sm border-0">
                <img
                  src="/image1.png"
                  className="card-img-top"
                  style={{ width: "10vw", height: "20vh" }}
                  alt="We design"
                />
                <div className="card-body">
                  <h6>No hidden costs</h6>
                  <p className="text-muted mb-0">
                    Ensures shock-free quotations
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p>
          T&Cs apply: *Flat 10 years for products & 1 year for services. For
          full scope on warranty, please visit www.livspace.com/in/service |
          ^For select finishes on modular products
        </p>
      </div>
    </div>
  );
};

export default ReasonToLoveUs;
