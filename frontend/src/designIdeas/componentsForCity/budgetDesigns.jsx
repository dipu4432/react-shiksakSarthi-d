const BudgetDesigns = () => {
  return (
    <div className="container text-start pb-5 mb-2">
      <h2>Homes for every budget</h2>
      <p>
        Our best interior designers in Jaipur work with you keeping in mind your
        requirements and budget
      </p>
      <div className="container my-5">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img src="/img1.jpg" className="card-img-top" alt="We design" />
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img src="/img2.jpg" className="card-img-top" alt="We curate" />
            </div>
          </div>

          {/* Card 3 */}
          <div className="col-md-4">
            <div className="card h-100 shadow-sm border-0">
              <img src="/img3.jpg" className="card-img-top" alt="We deliver" />
            </div>
          </div>
        </div>
      </div>
      <p>*The prices include only modular interiors for new homes.</p>
    </div>
  );
};

export default BudgetDesigns;
