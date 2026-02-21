import image1 from "/image1.png";
import image2 from "/image2.png";
import image3 from "/image3.png";
import image4 from "/image4.png";
import image5 from "/image5.png";
import image6 from "/image6.png";

const Service = () => {
  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2>What You Get</h2>
      </div>
      <div className="row g-4">
        {/* 1 — Innovative Storage */}
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <img src={image1} alt="Icon" width={95} className="me-3" />
          <div>
            <h6>Innovative Storage</h6>
            <p className="mb-0 small">
              TV Unit, TV Back Panelling, Crockery Unit, Bar Unit, Bookshelf.
            </p>
          </div>
        </div>
        {/* 2 — Bedroom */}
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <img src={image2} alt="Icon" width={95} className="me-3" />
          <div>
            <h6>Bedroom</h6>
            <p className="mb-0 small">
              Wardrobes, TV Unit, Bed with Storage, Dressing Unit, Study Unit.
            </p>
          </div>
        </div>
        {/* 3 — Kitchen */}
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <img src={image3} alt="Icon" width={95} style={{marginRight: "2rem"}} />
          <div>
            <h6>Kitchen</h6>
            <p className="mb-0 small">
              Countertops, Backsplashes, Accessories, Shutters, Storage.
            </p>
          </div>
        </div>

        {/* 4 — Innovative Storage 2 */}
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <img src={image4} alt="Icon" width={95} className="me-4" />
          <div>
            <h6>Innovative Storage</h6>
            <p className="mb-0 small">
              Janitor Unit, Skirting Drawer, Pantry Pull Out, Appliance Garage,
              Hidden Bar Cabinet, Magic Corner.
            </p>
          </div>
        </div>

        {/* 5 — Interior Design Services */}
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <img src={image5} alt="Icon" width={95} className="me-3" />
          <div>
            <h6>Interior Design Services</h6>
            <p className="mb-0 small">
              False Ceiling, Wall Panelling, Decor Accents, Lighting,
              Furnishing, Appliances.
            </p>
          </div>
        </div>

        {/* 6 — Home Improvement */}
        <div className="col-12 col-md-6 col-lg-4 d-flex">
          <img src={image6} alt="Icon" width={95} className="me-3" />
          <div>
            <h6>Home Improvement Services</h6>
            <p className="mb-0 small">
              Painting, Bathroom Remodelling, Tiling, Plumbing, Electrical,
              Civil Work, Deep Cleaning.
            </p>
          </div>
        </div>
      </div>
      <div className="container text-center mt-4">
        {/* <button className="btn btn-danger  shadow-sm">Get Free Estimate</button> */}
      </div>
    </div>
  );
};

export default Service;
