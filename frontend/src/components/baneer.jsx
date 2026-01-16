import React from "react";
import "./Banner.css";

const HalfOverlayImage = () => {
  return (
    <>
      <div className="image-wrapper">
        {/* Background Image */}
        <img src="/hero.jpg" alt="Decor Banner" className="banner-img" />


        {/* Mobile fade under image */}
        <div className="mobile-fade"></div>

        {/* Desktop right beige overlay */}
        <div className="half-overlay"></div>

        <p className="tnc-text">*T&Cs: Offer valid on orders above Rs. 5 Lakh.</p>
      </div>

      {/* ONE SINGLE TEXT BLOCK for both desktop + mobile */}
      <div className="banner-text">
        <h2 className="title">
          End-to-End Home Interiors
        </h2>

        <p className="subtitle">
          For Your Taste & Budget
        </p>

        <div className="divider">— Get —</div>

        <div className="flat-offer">
          <span className="offer-stars">✦</span>

          <div className="flat-offer-badge">
            <div className="flat-offer-top">FLAT 25% OFF</div>
            <div className="flat-offer-ribbon">On Modular Interiors</div>
          </div>

          <span className="offer-stars">✦</span>
        </div>

        <div className="consult-box">
          Book A FREE Consultation
          <img src="/icon-with-hand.ico" className="hand-icon" />
        </div>

        <p className="validity">
          Offer valid until <b>31st March, 2026</b>
        </p>
        
      </div>
    </>
  );
};

export default HalfOverlayImage;
