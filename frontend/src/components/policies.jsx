const policyData = [
  {
    title: "Terms of use",
    icon: "/icons/designing_with_colourKitchen.jpg",
    items: [
      "This section explains the meaning of key terms used across the website, including “Company,” “User,” “Services,” and “Platform.” It helps clarify how the terms should be understood while using our services.",
    ],
    viewMore: true,
  },
  {
    title: "Designing with Colours kitchen Gallery",
    icon: "/icons/designing_with_colourKitchen.jpg",
    items: [
      "Designing my dream home",
      "Managing my home project",
      "Delivery and installation",
      "Paying for my home interiors",
    ],
  },
  {
    title: "Payments",
    icon: "/icons/designing_with_colourKitchen.jpg",
    items: [
      "We offer multiple secure payment options including bank transfer, UPI, credit/debit cards, and approved financing partners.",
    ],
    viewMore: true,
  },
  {
    title: "Cancellations",
    icon: "/icons/designing_with_colourKitchen.jpg",
    items: "Orders may be cancelled before production begins, subject to applicable cancellation charges.",
  },
  {
    title: "Return, Exchange & Refund",
    icon: "/icons/designing_with_colourKitchen.jpg",
    items: ["Returns or exchanges are applicable only under specific conditions such as manufacturing defects or transit damage, in accordance with our policy guidelines.Return, exchange & refund", "Delay penalty"],
  },
   {
    title: "Care Instructions",
    icon: "/icons/designing_with_colourKitchen.jpg",
    items: ["To maintain the longevity of your interiors, follow recommended cleaning and maintenance guidelines. Avoid harsh chemicals and excessive moisture on surfaces."],
  },
];

const Policies = () => {
  return (
    <div>
      {/* Banner */}
      <div className="position-relative w-100" style={{ height: "75vh" }}>
        <img
          src="/policy.jpg"
          alt="Policy Banner"
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        />
      </div>

      {/* Content */}
      <div className="container text-center my-5">
        {/* Heading + Red Line */}
        <div className="d-flex justify-content-center align-items-start mb-2">
          <span
            style={{
              width: "4px",
              height: "42px",
              backgroundColor: "red",
              marginRight: "12px",
              display: "inline-block",
            }}
          ></span>

          <div className="text-start">
            <h1
              className="fw-bold mb-1"
              style={{
                lineHeight: 1.1,
                fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
              }}
            >
              Policies
            </h1>
          </div>
        </div>
        <p
          className="text-muted"
          style={{
            fontSize: "1.2rem",
            margin: 0,
          }}
        >
          Get all the information you need
        </p>
      </div>

      <div className="container my-5">
      <div className="row g-4">
        {policyData.map((policy, index) => (
          <div key={index} className="col-12 col-md-6 col-lg-4">
            <div className="h-100">
              {/* Icon from DB */}
              <div className="mb-2">
                <img
                  src={policy.icon}
                  alt={policy.title}
                  style={{
                    width: "40px",
                    height: "40px",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Title */}
              <h6 className="fw-bold mb-2">{policy.title}</h6>

              {/* List */}
              <ul className="ps-3 mb-2" style={{ fontSize: "0.9rem" }}>
                {Array.isArray(policy.items) ? (
                  policy.items.map((item, i) => (
                    <li key={i} className="mb-1 text-muted">
                      {item}
                    </li>
                  ))
                ) : (
                  <li className="mb-1 text-muted">{policy.items}</li>
                )}
              </ul>

              {policy.viewMore && (
                <p
                  className="fw-semibold"
                  style={{
                    color: "red",
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Policies;
