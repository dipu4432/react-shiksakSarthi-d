import profile1 from "/Deepak-Kumar.jpg";
import profile2 from "/Aditya-Sinha.jpg";
import family1 from "/family1.jpg";
import family2 from "/family2.jpg";

const Home6 = () => {
  return (
    <div className="bg-dark-subtle">
      <div className="container text-center py-5">
        <h2 className="fw-semibold">15000+ Happy Homes</h2>
        <div className="row justify-content-center mb-5">
          <div className="col-12 col-md-6 text-center mb-4">
            <img
              src={profile1}
              alt="Deepak Kumar"
              className="rounded-circle mb-3"
              width={134}
              height={125}
            />
            <h5 className="fw-semibold">Deepak Kumar</h5>
            <p className="text-muted">Bilaspur, Chhattisgarh</p>

            <p className="px-3">
              Colours Kitchen gave us a home we always wanted. The journey from
              idea to execution was smooth and having them on board transform
              our home was a great decision.
            </p>
          </div>
          <div className="col-12 col-md-6 text-center mb-4">
            <img
              src={profile2}
              alt="Aditya Sinha"
              className="rounded-circle mb-3"
              width={134}
              height={125}
            />
            <h5 className="fw-semibold">Aditya Sinha</h5>
            <p className="text-muted">Korba, Chhattisgarh</p>

            <p>
              Overall an excellent job done by Colours Kitchen. Truly
              overwhelmed by the complete design and execution of the project.
              Love the storage solutions provided in the kitchen.
            </p>
          </div>
        </div>
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-md-6 col-lg-5">
            <img
              src={family1}
              alt="Family Happy Home"
              className="img-fluid rounded shadow-sm"
            />
          </div>

          <div className="col-12 col-md-6 col-lg-5">
            <img
              src={family2}
              alt="Family Happy Home"
              className="img-fluid rounded shadow-sm"
            />
          </div>

          <div className="container mt-4 pb-4">
            <button className="btn btn-danger shadow-sm">Book A Free Consultation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home6;
