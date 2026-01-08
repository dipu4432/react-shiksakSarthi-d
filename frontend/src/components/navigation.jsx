// import { Link } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";

// const Navigation = ({ onQuoteClick }) => {
//   const gradientTextStyle = {
//     fontSize: '40px',
//     background: 'radial-gradient(circle, red, yellow)',
//     WebkitBackgroundClip: 'text',
//     WebkitTextFillColor: 'transparent',
//   };

//   return (
//     <>
//       {/* NAVBAR FOR DESKTOP + TABLET */}
//       <nav className="navbar navbar-expand-md bg-white shadow-sm px-3">
//         <div className="container-fluid">

//           {/* Brand */}
//           <Link className="navbar-brand fw-bold py-4" to="/" style={gradientTextStyle}>
//             Colors Kitchen
//           </Link>

//           {/* TOGGLER (MOBILE ONLY) */}
//           <button
//             className="navbar-toggler d-md-none"
//             type="button"
//             data-bs-toggle="offcanvas"
//             data-bs-target="#mobileMenu"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>

//           {/* DESKTOP + TABLET MENU */}
//           <div className="collapse navbar-collapse d-none d-md-flex" id="desktopMenu">
//             <ul className="navbar-nav ms-auto gap-4">

//               <li className="nav-item">
//                 <Link className="nav-link" to="/">HOME</Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/about">ABOUT</Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/project">PROJECT</Link>
//               </li>

//               <li className="nav-item">
//                 <Link className="nav-link" to="/services">SERVICES</Link>
//               </li>

//               <li className="nav-item">
//                 <a
//                   className="nav-link fs-4 d-flex align-items-center"
//                   href="https://wa.me/9993690392"
//                   target="_blank"
//                 >
//                   <FaWhatsapp />
//                 </a>
//               </li>

//               <li>
//                 <button
//                   onClick={onQuoteClick}
//                   className="btn btn-danger px-4 py-2 rounded-3 shadow-sm"
//                 >
//                   Get Free Quote
//                 </button>
//               </li>

//             </ul>
//           </div>
//         </div>
//       </nav>

//       {/* MOBILE SIDEBAR MENU */}
//       <div className="offcanvas offcanvas-end" tabIndex={-1} id="mobileMenu">
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title">Menu</h5>
//           <button type="button" className="btn-close" data-bs-dismiss="offcanvas"></button>
//         </div>

//         <div className="offcanvas-body">
//           <ul className="navbar-nav gap-3">

//             <li className="nav-item">
//               <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">HOME</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">ABOUT</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/project" data-bs-dismiss="offcanvas">PROJECT</Link>
//             </li>

//             <li className="nav-item">
//               <Link className="nav-link" to="/services" data-bs-dismiss="offcanvas">SERVICES</Link>
//             </li>

//             <li className="nav-item">
//               <a className="nav-link fs-4" href="https://wa.me/987654123" target="_blank">
//                 <FaWhatsapp />
//               </a>
//             </li>

//             <li>
//               <button
//                 onClick={onQuoteClick}
//                 className="btn btn-danger w-100 shadow-sm"
//                 data-bs-dismiss="offcanvas"
//               >
//                 Get Free Quote
//               </button>
//             </li>

//           </ul>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navigation;
import { Link } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";

const Navigation = ({ onQuoteClick }) => {
  const gradientTextStyle = {
    fontSize: "40px",
    background: "radial-gradient(circle, red, yellow)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  };

  return (
    <>
      {/* ================= NAVBAR ================= */}
      {/* navbar-expand-lg → ONLY desktop shows horizontal menu */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm px-3">
        <div className="container-fluid">

          {/* BRAND */}
          <Link className="navbar-brand fw-bold py-4" to="/" style={gradientTextStyle}>
            Colors Kitchen
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
                <Link className="nav-link" to="/">HOME</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/about">ABOUT</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/project">PROJECT</Link>
              </li>

              <li className="nav-item">
                <Link className="nav-link" to="/services">SERVICES</Link>
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
          <ul className="navbar-nav gap-3">

            <li className="nav-item">
              <Link className="nav-link" to="/" data-bs-dismiss="offcanvas">
                HOME
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/about" data-bs-dismiss="offcanvas">
                ABOUT
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/project" data-bs-dismiss="offcanvas">
                PROJECT
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/services" data-bs-dismiss="offcanvas">
                SERVICES
              </Link>
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
