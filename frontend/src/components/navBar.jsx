import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import logo from "/Colours_Kitchen_Logo.png";

import "./image.css";
import { useState, useEffect, useRef, useCallback } from "react";

const NavBar = ({ onQuoteClick }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [count, setCount] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const navRef = useRef(null);

  const closeAllDropdowns = useCallback(() => {
    if (!navRef.current) return;
    navRef.current.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
      const toggle = menu.previousElementSibling || menu.parentElement?.querySelector('.dropdown-toggle');
      if (toggle) toggle.classList.remove('show');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
    setOpenDropdown(null);
  }, []);

  const closeMobileMenu = useCallback(() => {
    const offcanvasEl = document.getElementById("mobileMenu");
    if (!offcanvasEl) return;
    const btnClose = offcanvasEl.querySelector('[data-bs-dismiss="offcanvas"]');
    if (btnClose) btnClose.click();
  }, []);

  const handleDropdownToggle = useCallback((dropdownName) => {
    if (openDropdown && openDropdown !== dropdownName) {
      closeAllDropdowns();
    }
    setOpenDropdown(prev => prev === dropdownName ? null : dropdownName);
  }, [openDropdown, closeAllDropdowns]);

  const handleItemClick = useCallback(() => {
    closeAllDropdowns();
  }, [closeAllDropdowns]);

  useEffect(() => {
    closeAllDropdowns();
    closeMobileMenu();
  }, [location, closeAllDropdowns, closeMobileMenu]);

  const isMagazineQueryActive = (query) => {
    return location.pathname.startsWith('/magazine') && location.search === `?query=${query}`;
  };

  // MOVED: make cities available to JSX (dropdown) by defining here
  const cities = [
    { id: 1, name: "Balod" },
    { id: 2, name: "Baloda Bazar" },
    { id: 3, name: "Balrampur" },
    { id: 4, name: "Bastar" },
    { id: 5, name: "Bijapur" },
    { id: 6, name: "Bilaspur" },
    { id: 7, name: "Dehradun" },
    { id: 8, name: "Dantewada" },
    { id: 9, name: "Dhamtari" },
    { id: 10, name: "Durg" },
    { id: 11, name: "Gariaband" },
    { id: 12, name: "Janjgir-Champa" },
    { id: 13, name: "Jashpur" },
    { id: 14, name: "Kabirdham" },
    { id: 15, name: "Kanker" },
    { id: 16, name: "Kondagaon" },
    { id: 17, name: "Korba" },
    { id: 18, name: "Koriya" },
    { id: 19, name: "Mahasamund" },
    { id: 20, name: "Manendragarh" },
    { id: 21, name: "Mungeli" },
    { id: 22, name: "Narayanpur" },
    { id: 23, name: "Raigarh" },
    { id: 24, name: "Raipur" },
    { id: 25, name: "Rajnandgaon" },
    { id: 26, name: "Sakti" },
    { id: 27, name: "Sukma" },
    { id: 28, name: "Surajpur" },
    { id: 29, name: "Surguja" }
  ];

  // Helper function to check if current path matches any design idea routes
  const isDesignIdeasActive = () => {
    const designPaths = [
      '/secondFront/modularKitchen', '/secondFront/wardrobe', '/secondFront/bathroom',
      '/secondFront/masterBedroom', '/secondFront/livingroom', '/secondFront/poojaroom',
      '/secondFront/tvUnit', '/secondFront/falseCelling', '/secondFront/kidsBedroom',
      '/secondFront/balcony', '/secondFront/diningRoom', '/secondFront/foyer',
      '/secondFront/homesByColoursKitchen', '/secondFront/homeOffice', '/secondFront/guestBedroom',
      '/secondFront/window', '/secondFront/flooring', '/secondFront/wallDecor',
      '/secondFront/wallPaint', '/secondFront/homeWallpaper', '/secondFront/tile',
      '/secondFront/studyroom', '/secondFront/kitchenSinks', '/secondFront/spaceSavingDesign',
      '/secondFront/door', '/secondFront/staircase', '/secondFront/crockeryUnit', '/secondFront/homeBar'
    ];
    return designPaths.some(path => location.pathname === path);
  };

  // Helper function to check if current path matches any magazine routes
  const isMagazineActive = () => {
    return location.pathname.startsWith('/magazine');
  };

  // Helper function to check if current path matches any city routes
  const isCitiesActive = () => {
    const cityPaths = cities.map(city => `/secondFront/${city.name.toLowerCase().replace(/\s+/g, "-")}`);
    return cityPaths.some(path => location.pathname === path);
  };

  // Helper function to check if current path matches any furniture routes
  const isFurnitureActive = () => {
    const furniturePaths = [
      '/secondFront/sofas', '/secondFront/diningTable',
      '/secondFront/tables', '/secondFront/occationalSetting'
    ];
    return furniturePaths.some(path => location.pathname === path);
  };

  // Helper function to check if current path matches any "More" routes
  const isMoreActive = () => {
    const morePaths = ['/refer-a-friend', '/about-us', '/contact-us', '/policies', '/turnkey-project', '/construction-services'];
    return morePaths.some(path => location.pathname === path);
  };
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

  const cityToPath = (name) =>
    `/secondFront/${name.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700;800&family=Poppins:wght@500;600&display=swap');

        .brand {
          text-align: center;
          white-space: nowrap;
        }

        .brand-colours {
          font-family: 'Baloo 2', cursive;
          font-weight: 800;
          font-size: clamp(14px, 2.2vw, 22px);
          letter-spacing: clamp(0.3px, 0.15vw, 1px);
          text-transform: uppercase;
          line-height: 1;
        }

        .brand-colours span {
          display: inline-block;
        }

        .c1 { color: #ff3b3b; }
        .c2 { color: #ffb703; }
        .c3 { color: #2ec4b6; }
        .c4 { color: #3a86ff; }
        .c5 { color: #8338ec; }
        .c6 { color: #ff006e; }
        .c7 { color: #38b000; }

        /* UPDATED COLOR HERE */
        .brand-sub {
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          font-size: clamp(10px, 1.8vw, 13px);
          letter-spacing: 0.4px;
          margin-top: 1px;
          color: #2b2b2b;
        }

        /* Active dropdown indicator */
        .nav-link.dropdown-toggle,
        .nav-link.active-dropdown {
          position: relative;
        }

        .nav-link.dropdown-toggle.active-dropdown::before,
        .nav-link.active-dropdown::before {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: #dc3545;
          border-radius: 0;
        }
      `}</style>
      {/* ================= NAVBAR ================= */}
      {/* navbar-expand-lg → ONLY desktop shows horizontal menu */}
      <nav ref={navRef} className="navbar navbar-expand-lg bg-white border-bottom border-light fixed-top py-0" style={{ boxShadow: '0 1px 12px rgba(0,0,0,0.06)' }}>
        <div className="container-fluid py-1 py-lg-0">
          {/* BRAND */}
          {/* <Link
            className="navbar-brand fw-bold py-4"
            to="/"
            style={gradientTextStyle}
          >
            Colors Kitchen
          </Link> */}
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img
              src={logo}
              alt="Colors Kitchen Logo"
              style={{
                height: "60px",
                width: "auto",
                objectFit: "contain",
              }}
            />
            <div className="brand">
              <div className="brand-colours">
                <span className="c1">C</span>
                <span className="c2">O</span>
                <span className="c3">L</span>
                <span className="c4">O</span>
                <span className="c5">U</span>
                <span className="c6">R</span>
                <span className="c7">S</span>
              </div>
              <div className="brand-sub">Kitchen Gallery</div>
            </div>
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
            <ul className="navbar-nav ms-auto align-items-center gap-3 flex-nowrap">
              <li className="nav-item dropdown mega-dropdown">
                <button
                  className={`nav-link fw-semibold dropdown-toggle btn btn-link ${isDesignIdeasActive() ? 'active-dropdown' : ''}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => handleDropdownToggle('designIdeas')}
                >
                  Design Ideas
                </button>

                <div className="dropdown-menu p-4 shadow-lg">
                  <div className="mega-grid">
                    <NavLink onClick={handleItemClick} to="/secondFront/modularKitchen" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Modular Kitchen Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/wardrobe" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Wardrobe Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/bathroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Bathroom Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/masterBedroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Master Bedroom Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/livingroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Living Room Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/poojaroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Pooja Room Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/tvUnit" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>TV Unit Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/falseCelling" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>False Ceiling Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/kidsBedroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Kids Bedroom Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/balcony" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Balcony Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/diningRoom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Dining Room Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/foyer" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Foyer Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/homesByColoursKitchen" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Homes by Colours Kitchen</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/homeOffice" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Home Office Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/guestBedroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Guest Bedroom Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/window" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Window Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/flooring" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Flooring Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/wallDecor" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Wall Decor Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/wallPaint" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Wall Paint Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/homeWallpaper" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Home Wallpaper Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/tile" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Tile Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/studyroom" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Study Room Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/kitchenSinks" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Kitchen Sinks</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/spaceSavingDesign" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Space Saving Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/door" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Door Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/staircase" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Staircase Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/crockeryUnit" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Crockery Unit Designs</NavLink>
                    <NavLink onClick={handleItemClick} to="/secondFront/homeBar" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Home Bar Designs</NavLink>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown mega-dropdown">
                <button
                  className={`nav-link fw-semibold dropdown-toggle btn btn-link ${isMagazineActive() ? 'active-dropdown' : ''}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => handleDropdownToggle('magazine')}
                >
                  Magazine
                </button>

                <div className="dropdown-menu p-4 shadow-lg">
                  <div className="mega-grid">
                    <Link onClick={handleItemClick} to="/magazine/?query=room-ideas" className={`mega-link ${isMagazineQueryActive('room-ideas') ? 'mega-active' : ''}`}>Room Ideas</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=decor-inspiration" className={`mega-link ${isMagazineQueryActive('decor-inspiration') ? 'mega-active' : ''}`}>Decor & Inspiration</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=ceiling-designs" className={`mega-link ${isMagazineQueryActive('ceiling-designs') ? 'mega-active' : ''}`}>Ceiling Designs</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=furniture-ideas" className={`mega-link ${isMagazineQueryActive('furniture-ideas') ? 'mega-active' : ''}`}>Furniture Ideas</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=home-decor" className={`mega-link ${isMagazineQueryActive('home-decor') ? 'mega-active' : ''}`}>Home Decor</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=lighting-ideas" className={`mega-link ${isMagazineQueryActive('lighting-ideas') ? 'mega-active' : ''}`}>Lighting Ideas</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=wall-design-ideas" className={`mega-link ${isMagazineQueryActive('wall-design-ideas') ? 'mega-active' : ''}`}>Wall Design Ideas</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=expert-advice" className={`mega-link ${isMagazineQueryActive('expert-advice') ? 'mega-active' : ''}`}>Expert Advice</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=interior-advice" className={`mega-link ${isMagazineQueryActive('interior-advice') ? 'mega-active' : ''}`}>Interior Advice</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=vastu-tips" className={`mega-link ${isMagazineQueryActive('vastu-tips') ? 'mega-active' : ''}`}>Vastu Tips</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=home-organisation" className={`mega-link ${isMagazineQueryActive('home-organisation') ? 'mega-active' : ''}`}>Home Organisation</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=materials-guide" className={`mega-link ${isMagazineQueryActive('materials-guide') ? 'mega-active' : ''}`}>Materials Guide</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=home-renovation-ideas" className={`mega-link ${isMagazineQueryActive('home-renovation-ideas') ? 'mega-active' : ''}`}>Home Renovation Ideas</Link>
                    <Link onClick={handleItemClick} to="/magazine/?query=commercial-interiors" className={`mega-link ${isMagazineQueryActive('commercial-interiors') ? 'mega-active' : ''}`}>Commercial Interiors</Link>
                  </div>
                </div>
              </li>
              <li className="nav-item dropdown mega-dropdown">
                <button
                  className={`nav-link fw-semibold dropdown-toggle btn btn-link ${isCitiesActive() ? 'active-dropdown' : ''}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => handleDropdownToggle('cities')}
                >
                  Cities
                </button>
                <div className="dropdown-menu p-4 shadow-lg">
                  <div className="mega-grid">
                    {cities.map((city) => (
                      <div key={city.id}>
                        <span
                          className="mega-link"
                        >
                          {city.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link fw-semibold" to="/about">
                  About
                </Link>
              </li> */}

              <li className="nav-item dropdown mega-dropdown-one">
                <button
                  className={`nav-link fw-semibold dropdown-toggle btn btn-link ${isFurnitureActive() ? 'active-dropdown' : ''}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => handleDropdownToggle('furniture')}
                >
                  Furniture
                </button>
                <div className="dropdown-menu p-4 shadow-lg">
                  <div>
                    <NavLink onClick={handleItemClick} to="secondFront/sofasAndSofaBed" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Sofas & Sofa Beds</NavLink>
                    <div>
                      <NavLink onClick={handleItemClick} className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"} to="/secondFront/diningTableAndSets">Dining Tables & Sets</NavLink>
                    </div>
                    <div>
                      <NavLink onClick={handleItemClick} className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"} to="/secondFront/tables">Tables</NavLink>
                    </div>
                    <div>
                      <NavLink onClick={handleItemClick} className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"} to="/secondFront/occasionalSeating">Occasional Seating</NavLink>
                    </div>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <NavLink className={({ isActive }) => `nav-link fw-semibold ${isActive ? 'active-dropdown' : ''}`} to="/project">
                  Project
                </NavLink>
              </li>

              {/* <li className="nav-item">
                <Link className="nav-link" to="/home5">SERVICES</Link>
              </li> */}


              <li className="nav-item dropdown mega-dropdown-one">
                <button
                  className={`nav-link fw-semibold dropdown-toggle btn btn-link ${isMoreActive() ? 'active-dropdown' : ''}`}
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  onClick={() => handleDropdownToggle('more')}
                >
                  More
                </button>

                <div className="dropdown-menu p-4 shadow-lg">
                  <div className="mega-grid-one">
                    <NavLink onClick={handleItemClick} to="/refer-a-friend" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Refer A Friend</NavLink>
                    <NavLink onClick={handleItemClick} to="/about-us" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>About Us</NavLink>
                    <NavLink onClick={handleItemClick} to="/turnkey-project" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Turnkey Projects</NavLink>
                    <NavLink onClick={handleItemClick} to="/construction-services" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Construction Services</NavLink>
                    <NavLink onClick={handleItemClick} to="/contact-us" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Contact Us</NavLink>
                    <NavLink onClick={handleItemClick} to="/policies" className={({ isActive }) => isActive ? "mega-link mega-active" : "mega-link"}>Policies</NavLink>
                  </div>
                </div>
              </li>

              <li className="nav-item">
                <a style={{ color: 'green' }}
                  className="nav-link fs-4"
                  href="https://wa.me/8770813848"
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
                  className="btn btn-danger px-4 py-2 rounded-3 shadow-sm fw-semibold"
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
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'mobile-nav-active' : ''}`} to="/" end onClick={closeMobileMenu}>
                Home
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${isDesignIdeasActive() ? 'mobile-nav-active' : ''}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Design Ideas
              </Link>
              <ul className="dropdown-menu">
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/modularKitchen" onClick={closeMobileMenu}>Modular Kitchen Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/wardrobe" onClick={closeMobileMenu}>Wardrobe Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/bathroom" onClick={closeMobileMenu}>Bathroom Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/masterBedroom" onClick={closeMobileMenu}>Master Bedroom Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/livingroom" onClick={closeMobileMenu}>Living Room Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/poojaroom" onClick={closeMobileMenu}>Pooja Room Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/tvUnit" onClick={closeMobileMenu}>TV Unit Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/falseCelling" onClick={closeMobileMenu}>False Ceiling Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/kidsBedroom" onClick={closeMobileMenu}>Kids Bedroom Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/balcony" onClick={closeMobileMenu}>Balcony Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/diningRoom" onClick={closeMobileMenu}>Dining Room Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/foyer" onClick={closeMobileMenu}>Foyer Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/homesByColoursKitchen" onClick={closeMobileMenu}>Homes by Colours Kitchen</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/homeOffice" onClick={closeMobileMenu}>Home Office Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/guestBedroom" onClick={closeMobileMenu}>Guest Bedroom Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/window" onClick={closeMobileMenu}>Window Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/flooring" onClick={closeMobileMenu}>Flooring Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/wallDecor" onClick={closeMobileMenu}>Wall Decor Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/wallPaint" onClick={closeMobileMenu}>Wall Paint Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/homeWallpaper" onClick={closeMobileMenu}>Home Wallpaper Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/tile" onClick={closeMobileMenu}>Tile Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/studyroom" onClick={closeMobileMenu}>Study Room Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/kitchenSinks" onClick={closeMobileMenu}>Kitchen Sinks</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/spaceSavingDesign" onClick={closeMobileMenu}>Space Saving Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/door" onClick={closeMobileMenu}>Door Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/staircase" onClick={closeMobileMenu}>Staircase Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/crockeryUnit" onClick={closeMobileMenu}>Crockery Unit Designs</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/homeBar" onClick={closeMobileMenu}>Home Bar Designs</NavLink></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${isMagazineActive() ? 'mobile-nav-active' : ''}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Magazine
              </Link>
              <ul className="dropdown-menu">
                <li><Link className={`dropdown-item ${isMagazineQueryActive('room-ideas') ? 'mobile-active' : ''}`} to="/magazine/?query=room-ideas" onClick={closeMobileMenu}>Room Ideas</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('decor-inspiration') ? 'mobile-active' : ''}`} to="/magazine/?query=decor-inspiration" onClick={closeMobileMenu}>Decor & Inspiration</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('ceiling-designs') ? 'mobile-active' : ''}`} to="/magazine/?query=ceiling-designs" onClick={closeMobileMenu}>Ceiling Designs</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('furniture-ideas') ? 'mobile-active' : ''}`} to="/magazine/?query=furniture-ideas" onClick={closeMobileMenu}>Furniture Ideas</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('home-decor') ? 'mobile-active' : ''}`} to="/magazine/?query=home-decor" onClick={closeMobileMenu}>Home Decor</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('lighting-ideas') ? 'mobile-active' : ''}`} to="/magazine/?query=lighting-ideas" onClick={closeMobileMenu}>Lighting Ideas</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('wall-design-ideas') ? 'mobile-active' : ''}`} to="/magazine/?query=wall-design-ideas" onClick={closeMobileMenu}>Wall Design Ideas</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('expert-advice') ? 'mobile-active' : ''}`} to="/magazine/?query=expert-advice" onClick={closeMobileMenu}>Expert Advice</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('interior-advice') ? 'mobile-active' : ''}`} to="/magazine/?query=interior-advice" onClick={closeMobileMenu}>Interior Advice</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('vastu-tips') ? 'mobile-active' : ''}`} to="/magazine/?query=vastu-tips" onClick={closeMobileMenu}>Vastu Tips</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('home-organisation') ? 'mobile-active' : ''}`} to="/magazine/?query=home-organisation" onClick={closeMobileMenu}>Home Organisation</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('materials-guide') ? 'mobile-active' : ''}`} to="/magazine/?query=materials-guide" onClick={closeMobileMenu}>Materials Guide</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('home-renovation-ideas') ? 'mobile-active' : ''}`} to="/magazine/?query=home-renovation-ideas" onClick={closeMobileMenu}>Home Renovation Ideas</Link></li>
                <li><Link className={`dropdown-item ${isMagazineQueryActive('commercial-interiors') ? 'mobile-active' : ''}`} to="/magazine/?query=commercial-interiors" onClick={closeMobileMenu}>Commercial Interiors</Link></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${isCitiesActive() ? 'mobile-nav-active' : ''}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Cities
              </Link>
              <ul className="dropdown-menu">
                {cities.map((city) => (
                  <li key={city.id}>
                    <span className="dropdown-item">
                      {city.name}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${isFurnitureActive() ? 'mobile-nav-active' : ''}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Furniture
              </Link>
              <ul className="dropdown-menu">
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/sofasAndSofaBed" onClick={closeMobileMenu}>Sofas & Sofa Beds</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/diningTableAndSets" onClick={closeMobileMenu}>Dining Tables & Sets</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/tables" onClick={closeMobileMenu}>Tables</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/secondFront/occasionalSeating" onClick={closeMobileMenu}>Occasional Seating</NavLink></li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'mobile-nav-active' : ''}`} to="/project" onClick={closeMobileMenu}>
                Project
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className={`nav-link dropdown-toggle ${isMoreActive() ? 'mobile-nav-active' : ''}`}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                More
              </Link>
              <ul className="dropdown-menu">
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/refer-a-friend" onClick={closeMobileMenu}>Refer A Friend</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/turnkey-project" onClick={closeMobileMenu}>Turnkey Projects</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/construction-services" onClick={closeMobileMenu}>Construction Services</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/about-us" onClick={closeMobileMenu}>About Us</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/contact-us" onClick={closeMobileMenu}>Contact Us</NavLink></li>
                <li><NavLink className={({ isActive }) => `dropdown-item ${isActive ? 'mobile-active' : ''}`} to="/policies" onClick={closeMobileMenu}>Policies</NavLink></li>
              </ul>
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

export default NavBar;
