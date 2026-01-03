import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = () => {
    setClickCount(prev => prev + 1);

    // // Redirect exactly at 10 clicks
    // if (newCount === 10) {
    //   navigate("/upload");
    // }
    // return newCount;
  };

  // Navigate when count reaches 10
  useEffect(() => {
    if (clickCount === 10) {
      navigate("/upload");
      setClickCount(0);
    }
  }, [clickCount, navigate]);

  return (
    <div className="bg-dark text-center text-white pb-4 pt-4">© Copyright Helping Hands Technologies. All Rights Reserved
      <button
        type="button"
        onClick={handleClick}
        className={`btn fs-1 p-0 border-0 ${
          clickCount >= 10 ? "text-danger" : "text-secondary"
        }`}
      >
        ♥
      </button>
    </div>
  )
}

export default Footer