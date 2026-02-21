const reviews = [
  {
    initials: "TP",
    name: "Tushar Pal",
    rating: 5.0,
    text:
      "Good quality modular furniture at reasonable price, varied design options, seamless experience in terms of customized furniture equipment arriving at doorstep within short timeline. Very satisfied...",
  },
  {
    initials: "SG",
    name: "Sarika Gupta",
    rating: 5.0,
    text:
      "Excellent Service! Everything was delivered on time. Installation was done meticulously without any hassles. Very professionally done by project manager Akhileshwar and his team...",
  },
  {
    initials: "RH",
    name: "Rohan Hodarkar",
    rating: 5.0,
    text:
      "Top class experience I had with Livspace for designing my home. My requirements were perfectly understood by the designer and the process was smooth from start to finish...",
  },
];

const Testimonials = () => {
  return (
    <div className="container my-5">
      {/* Header */}
      <div className="row align-items-start mb-4">
        <div className="col-lg-8">
          <h2 className="fw-bold">
            Colours Kitchen Home Interior Design Reviews
          </h2>
          <p className="text-muted mt-2">
            For a team that aims at making customers feel at home, these
            reviews motivate us to provide top-quality experiences to our
            customers every day.
          </p>
        </div>

        {/* Rating Box */}
        <div className="col-lg-4">
          <div className="border rounded-3 p-3 d-flex align-items-center gap-3">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
              width="40"
            />
            <div>
              <div className="fw-semibold">Average ratings</div>
              <div className="fs-4 fw-bold">
                4.9 <span className="text-warning">★★★★★</span>
              </div>
              <div className="fw-medium">675 reviews</div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Cards */}
      <div className="row g-4">
        {reviews.map((review, index) => (
          <div className="col-md-6 col-lg-4" key={index}>
            <div className="card h-100 shadow-sm border-0">
              <div className="card-body">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <div
                    className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center"
                    style={{ width: 50, height: 50 }}
                  >
                    <strong>{review.initials}</strong>
                  </div>
                  <div>
                    <div className="fw-semibold">{review.name}</div>
                    <div className="fw-bold">
                      {review.rating}{" "}
                      <span className="text-warning">★★★★★</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted small">
                  {review.text}
                </p>

                <a href="#" className="text-danger fw-medium text-decoration-none">
                  Read More ↗
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Testimonials