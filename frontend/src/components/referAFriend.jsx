import { FaWhatsapp } from "react-icons/fa";

const ReferAFriend = () => {
  const websiteLink = "https://www.colourskitchengallery.com"; // Your actual website
  const message = `Hey! 👋
Check out this amazing interior design website: ${websiteLink}

You can design your dream home with Colours Kitchen Gallery!`;

  const whatsappShareURL = `https://api.whatsapp.com/send?text=${encodeURIComponent(
    message
  )}`;

  // Inline CSS for this component
  const styles = {
    banner: {
      height: "100vh",
      position: "relative",
      width: "100%",
    },
    bannerImg: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
    overlay: {
      position: "absolute",
      top: 0,
      left: 0,
      color: "white",
      paddingTop: "5rem",
      paddingLeft: "1rem",
    },
    heading: {
      fontWeight: "700",
      fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
      lineHeight: "1.2",
    },
    paragraph: {
      marginTop: "1rem",
      fontSize: "1.2rem",
    },
    whatsappBtn: {
      display: "inline-flex",
      alignItems: "center",
      marginTop: "2rem",
      padding: "0.6rem 1.5rem",
      fontWeight: "600",
      fontSize: "1rem",
      backgroundColor: "#25D366",
      color: "#fff",
      borderRadius: "6px",
      textDecoration: "none",
      transition: "all 0.3s ease",
    },
    whatsappIcon: {
      marginRight: "0.5rem",
      fontSize: "1.2rem",
    },
  };

  return (
    <div style={styles.banner}>
      <img
        src="/bannerdesktop.jpg"
        alt="Decor Banner"
        style={styles.bannerImg}
      />

      <div style={styles.overlay} className="ps-md-4 ps-lg-5">
        <h1 style={styles.heading}>
          Refer your friends and <br />
          unlock rewards over <br />
          Rs.10,000*
        </h1>

        <p style={styles.paragraph}>
          With every friend you refer, your rewards grow bigger
        </p>

        {/* WhatsApp Share Button */}
        <a
          href={whatsappShareURL}
          target="_blank"
          rel="noopener noreferrer"
          style={styles.whatsappBtn}
        >
          <FaWhatsapp style={styles.whatsappIcon} />
          Share on WhatsApp
        </a>
      </div>
    </div>
  );
};

export default ReferAFriend;
