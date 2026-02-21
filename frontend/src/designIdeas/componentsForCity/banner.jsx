
const Banner = ({ cityName }) => {
  return (
    <div>
      <img
        src="/hero.jpg"
        alt="Banner"
        className="banner-img img-fluid w-100" 
        style={{ height: "85vh", opacity: "0.7" }}
      />

      <div
        className="banner-text"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        <h1 className="text-primary" style={{ fontSize: "48px", marginBottom: "20px" }}>
          Interior Designers in {cityName}
        </h1>
        <p style={{ fontSize: "24px", marginBottom: "30px" }}>
          "Design your perfect home with expert interior designers in {cityName}"
        </p>
      </div>
    </div>
  )
}

export default Banner