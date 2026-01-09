import profile1 from "/Deepak-Kumar.jpg";
import profile2 from "/Aditya-Sinha.jpg";
import family1 from "/family1.jpg";
import family2 from "/family2.jpg";

const Home6 = () => {
  return (
    <div className="bg-dark-subtle py-4">
      <div className="container">
        <h2 className="text-center fw-semibold mb-5">15000+ Happy Homes</h2>

        <div className="row justify-content-center g-4">
          {/* CARD 1 */}
          <div className="col-12 col-md-10 col-lg-6">
            <div className="bg-white p-3 rounded shadow-sm h-100 text-center">
              <img
                src={profile1}
                alt="Deepak Kumar"
                className="rounded-circle mb-2"
                width={100}
                height={100}
              />

              <h6 className="fw-semibold mb-1">Deepak Kumar</h6>
              <p className="text-muted small mb-2">Bilaspur, Chhattisgarh</p>

              <p className="small px-lg-3 mb-2" style={{ lineHeight: "1.4" }}>
                Colours Kitchen gave us a home we always wanted. The journey
                from idea to execution was smooth and having them on board
                transform our home was a great decision.
              </p>

              <img
                src={family1}
                alt="Family Home"
                className="img-fluid rounded mt-2"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>

          {/* CARD 2 */}
          <div className="col-12 col-md-10 col-lg-6">
            <div
              className="bg-white p-3 rounded shadow-sm h-100 text-center"
              style={{ boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)" }}
            >
              <img
                src={profile2}
                alt="Aditya Sinha"
                className="rounded-circle mb-2"
                width={100}
                height={100}
              />

              <h5 className="fw-semibold mb-1">Aditya Sinha</h5>
              <p className="text-muted mb-2">Korba, Chhattisgarh</p>

              <p className="small px-lg-3 mb-2" style={{ lineHeight: "1.4" }}>
                Overall an excellent job done by Colours Kitchen. Truly
                overwhelmed by the complete design and execution of the project.
                Love the storage solutions provided in the kitchen.
              </p>

              <img
                src={family2}
                alt="Family Home"
                className="img-fluid rounded mt-2"
                style={{
                  maxHeight: "300px",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          </div>
        </div>

        <div className="text-center mt-4">
          <button className="btn btn-danger px-4 py-2 shadow">
            Book A Free Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home6;
