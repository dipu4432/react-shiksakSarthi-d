import { Link, useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import logo from "../assets/colours-kitchen-logo.png";

import "./image.css";

const Navigation = ({ onQuoteClick }) => {
  const navigate = useNavigate();
  // const gradientTextStyle = {
  //   fontSize: "40px",
  //   background: "radial-gradient(circle, red, yellow)",
  //   WebkitBackgroundClip: "text",
  //   WebkitTextFillColor: "transparent",
  // };

  const goToServices = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("services");
      el?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {/* navbar-expand-lg → ONLY desktop shows horizontal menu */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-1">
        <div className="container-fluid">
          {/* BRAND */}
          {/* <Link
            className="navbar-brand fw-bold py-4"
            to="/"
            style={gradientTextStyle}
          >
            Colors Kitchen
          </Link> */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src={logo}
              alt="Colors Kitchen Logo"
              style={{
                height: "100px",
                width: "auto",
                objectFit: "contain",
              }}
            />
          </Link>

          {/* TOGGLER → MOBILE + TABLET */}
          <button
            className="navbar-toggler d-lg-none"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileMenu"
            aria-controls="mobileMenu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* DESKTOP MENU ONLY */}
          <div className="collapse navbar-collapse d-none d-lg-flex">
            <ul className="navbar-nav ms-auto align-items-center gap-4 flex-nowrap">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  HOME
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">
                  ABOUT
                </Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/project">
                  PROJECT
                </Link>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link" to="/home5">SERVICES</Link>
              </li> */}

              <li className="nav-item">
                <button
                  className="nav-link btn btn-link"
                  onClick={goToServices}
                >
                  SERVICES
                </button>
              </li>

              <li className="nav-item">
                <a
                  className="nav-link fs-4"
                  href="https://wa.me/9993690392"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaWhatsapp />
                </a>
              </li>

              {/* DESKTOP CTA */}
              <li className="nav-item">
                <button
                  onClick={onQuoteClick}
                  className="btn btn-danger px-4 py-2 rounded-3 shadow-sm"
                >
                  Get Free Quote
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* ================= OFFCANVAS (MOBILE + TABLET) ================= */}
      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="mobileMenu"
        aria-labelledby="mobileMenuLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="mobileMenuLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>

        <div className="offcanvas-body">
          <ul className="navbar-nav gap-0.5">
            <li className="nav-item">
              <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/about"
                data-bs-dismiss="offcanvas"
              >
                ABOUT
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                to="/project"
                data-bs-dismiss="offcanvas"
              >
                PROJECT
              </Link>
            </li>

            {/* <li className="nav-item">
              <Link
                className="nav-link"
                to="/home5"
                data-bs-dismiss="offcanvas"
              >
                SERVICES
              </Link>
            </li> */}
            <li className="nav-item">
              <button
                className="nav-link btn btn-link"
                onClick={goToServices}
                data-bs-dismiss="offcanvas"
              >
                SERVICES
              </button>
            </li>

            <li className="nav-item">
              <a
                className="nav-link fs-4"
                href="https://wa.me/9993690392"
                target="_blank"
                rel="noreferrer"
              >
                <FaWhatsapp />
              </a>
            </li>

            {/* MOBILE + TABLET CTA */}
            <li className="mt-2">
              <button
                onClick={onQuoteClick}
                className="btn btn-danger w-100 shadow-sm"
                data-bs-dismiss="offcanvas"
              >
                Get Free Quote
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navigation;
