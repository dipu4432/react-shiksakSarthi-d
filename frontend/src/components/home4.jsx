import img1 from '/img1.jpg';
import img2 from '/img2.jpg';
import img3 from '/img3.jpg';

import img4 from '/colours-kitchen-img/colours-kitchen.jpg';
import img5 from '/colours-kitchen-img/colours-kitchen1.jpg';
import img6 from '/colours-kitchen-img/colours-kitchen2.jpg'; 

const Home4 = () => {
  return (
    <div className="container text-center py-5">
        <h2 className="fw-semibold">Smart Modular Kitchen Designs</h2>
        <div className="row g-4 justify-content-evenly">
          <div className="col-12 col-md-4">
            <img
              src={img4}
              className="img-fluid rounded shadow-sm"
              alt="Stylish Dining Hall Design"
            />
            <p>Stylish Dining Hall Design</p>
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img5}
              className="img-fluid rounded shadow-sm"
              alt="Stylish Bedroom Design"
            />
            <p>Stylish Bedroom Design</p>
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img6}
              className="img-fluid rounded shadow-sm"
              alt="A Minimal with Blue Toned Bedroom"
            />
            <p>A Minimal with Blue Toned Bedroom</p>
          </div>
        </div>
        <div className="container mt-4">
          <button  className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
                Book Your Dream Kitchen
            </button>
        </div>
        <h2 className="fw-semibold my-4">Bedroom Interiors For Comfort And Style</h2>
        <div className="row g-4 justify-content-evenly">
          <div className="col-12 col-md-4">
            <img
              src={img1}
              className="img-fluid rounded shadow-sm"
              alt="Stylish Dining Hall Design"
            />
            <p>Stylish Dining Hall Design</p>
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img2}
              className="img-fluid rounded shadow-sm"
              alt="Stylish Bedroom Design"
            />
            <p>Stylish Bedroom Design</p>
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img3}
              className="img-fluid rounded shadow-sm"
              alt="A Minimal with Blue Toned Bedroom"
            />
            <p>A Minimal with Blue Toned Bedroom</p>
          </div>
        </div>
        <div className="container mt-4">
          <button  className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
                Meet Our Designers
            </button>
        </div>
        <h2 className="fw-semibold my-4">Living Room Interiors For A Fabulous First Impression</h2>
        <div className="row g-4 justify-content-evenly">
          <div className="col-12 col-md-4">
            <img
              src={img1}
              className="img-fluid rounded shadow-sm"
              alt="Stylish Dining Hall Design"
            />
            <p>Stylish Dining Hall Design</p>
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img2}
              className="img-fluid rounded shadow-sm"
              alt="Stylish Bedroom Design"
            />
            <p>Stylish Bedroom Design</p>
          </div>
          <div className="col-12 col-md-4">
            <img
              src={img3}
              className="img-fluid rounded shadow-sm"
              alt="A Minimal with Blue Toned Bedroom"
            />
            <p>A Minimal with Blue Toned Bedroom</p>
          </div>
        </div>
        <div className="container mt-4">
          <button  className="btn btn-danger  shadow-sm" data-bs-dismiss="offcanvas">
                Book A Free Consultation
            </button>
        </div>
    </div>
  )
}

export default Home4