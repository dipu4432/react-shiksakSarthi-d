import { useEffect, useState } from "react";
import "./Banner.css";
import { useAuth } from "../designIdeas/context/userContext";
import axios from "axios";
import toast from "react-hot-toast";

const api = import.meta.env.VITE_API_URL;

const HalfOverlayImage = ({ onQuoteClick }) => {
  const [discountData, setDiscountData] = useState(null);
  const [offer, setOffer] = useState("");
  const [validity, setValidity] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const toDateInputValue = (value) => {
    if (!value) return "";
    if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) return "";
    const year = parsed.getFullYear();
    const month = String(parsed.getMonth() + 1).padStart(2, "0");
    const day = String(parsed.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDisplayDate = (value) => {
    if (!value) return "";
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
    const parsed = new Date(`${value}T00:00:00`);
    if (Number.isNaN(parsed.getTime())) return value;
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).format(parsed);
  };

  useEffect(() => {
    const getDiscount = async () => {
      try {
        const response = await axios.get(`${api}/discount/discountdetail`);
        if (response.data.success) {
          const details = response.data.discountDetails;
          setDiscountData(details);
          setOffer(details?.discount || "");
          setValidity(details?.validity || "");
        }
      } catch (error) {
        console.log("error: ", error.response?.data?.message || error.message);
      }
    };

    getDiscount();
  }, []);

  const { user } = useAuth();

  const trimmedOffer = offer.trim();
  const trimmedValidity = validity.trim();
  const hasExisting = Boolean(discountData?._id);
  const updatePayload = {};
  if (trimmedOffer && trimmedOffer !== discountData?.discount) {
    updatePayload.discount = trimmedOffer;
  }
  if (trimmedValidity && trimmedValidity !== discountData?.validity) {
    updatePayload.validity = trimmedValidity;
  }
  const hasUpdateFields = Object.keys(updatePayload).length > 0;

  const handleSubmit = async (event) => {
    if (event?.preventDefault) event.preventDefault();

    if (!hasExisting && (!trimmedOffer || !trimmedValidity)) {
      toast.error("Please fill offer and validity.");
      return;
    }

    if (hasExisting && !hasUpdateFields) {
      toast.error("No changes to save.");
      return;
    }

    try {
      setIsSaving(true);
      if (discountData?._id) {
        const response = await axios.put(
          `${api}/discount/updatediscount/${discountData._id}`,
          updatePayload
        );
        if (response.data.success) {
          setDiscountData(response.data.updatedDiscount);
          toast.success("Discount updated successfully!");
        }
      } else {
        const response = await axios.post(`${api}/discount/creatediscount`, {
          discount: trimmedOffer,
          validity: trimmedValidity,
        });
        if (response.data.success) {
          setDiscountData(response.data.newDiscount);
          toast.success("Discount created successfully!");
        }
      }
    } catch (error) {
      const message = error.response?.data?.message || error.message;
      // console.log("error: ", message);
      toast.error(message || "Something went wrong.");
    } finally {
      setIsSaving(false);
    }
  };

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
            {user ? (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  value={offer}
                  onChange={(e) => setOffer(e.target.value)}
                  placeholder="Flat 10% OFF"
                  disabled={isSaving}
                />
              </form>
            ) : (
              <div className="flat-offer-top">
                {offer || discountData?.discount || "Flat 10% OFF"}
              </div>
            )}
            <div className="flat-offer-ribbon">On Modular Interiors</div>
          </div>

          <span className="offer-stars">✦</span>
        </div>

      <div className="consult-box" onClick={onQuoteClick}>
          Book a FREE quote now
          <img src="/icon-with-hand.ico" className="hand-icon" />
        </div>

        <p className="validity">
          Offer valid until{" "}
          {user ? (
            <form onSubmit={handleSubmit}>
              <input
                type="date"
                value={toDateInputValue(validity)}
                onChange={(e) => setValidity(e.target.value)}
                placeholder="2025-09-30"
                disabled={isSaving}
              />
            </form>
          ) : (
            <b>
              {formatDisplayDate(validity) ||
                formatDisplayDate(discountData?.validity) ||
                "30 Sep 2025"}
            </b>
          )}
        </p>

        {user && (
          <button
            type="button"
            className="discount-save-btn"
            onClick={handleSubmit}
            disabled={isSaving || (!hasExisting && (!trimmedOffer || !trimmedValidity)) || (hasExisting && !hasUpdateFields)}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        )}

      </div>
    </>
  );
};

export default HalfOverlayImage;
