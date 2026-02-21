import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../designIdeas/context/userContext";
import {toast} from "react-hot-toast"

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const { setUser} = useAuth();

  const handleClick = () => {
    console.log("count: "+clickCount)
    setClickCount((prev) => prev + 1);
    if(clickCount>=10){
      setUser(true);
      toast.success("You are admin now")
    }
  };

  // Navigate when count reaches 10
  // useEffect(() => {
  //   setIsDisabled(true);
  //   if (clickCount === 10) {
  //     navigate("/upload");
  //     setClickCount(0);
  //   }
  // }, [clickCount, navigate]);

  return (
    <div className="bg-dark text-center text-white pb-4 pt-4">
      <span onClick={(event) => {
        event.preventDefault();
        handleClick();
      }}>

      © Copyright Helping Hands Technologies. All Rights Reserved
      </span>
      {/* <button
        type="button"
        onClick={handleClick}
        className="btn btn-secondary btn-sm ms-3"
      >
        Admin
      </button> */}
    </div>
  );
};

export default Footer;
