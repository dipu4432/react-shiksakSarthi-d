import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClickCount((prev) => prev + 1);
  };

  // Navigate when count reaches 10
  useEffect(() => {
    setIsDisabled(true);
    if (clickCount === 10) {
      navigate("/upload");
      setClickCount(0);
    }
  }, [clickCount, navigate]);

  return (
    <div className="bg-dark text-center text-white pb-4 pt-4">
      © Copyright Helping Hands Technologies. All Rights Reserved
      <button
        type="button"
        onClick={handleClick}
        class="btn btn-secondary btn-sm ms-3"
      >
        Admin
      </button>
    </div>
  );
};

export default Footer;
