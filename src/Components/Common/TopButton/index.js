import React from "react";
import "./style.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

const TopButton = () => {
  // Get the button
  let mybutton = document.getElementById("top-btn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 500 ||
      document.documentElement.scrollTop > 500
    ) {
      mybutton.style.display = "flex";
    } else {
      mybutton.style.display = "none";
    }
  }

  // When the user clicks on the button, scroll to the top of the document
  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="top-btn" id="top-btn" onClick={() => topFunction()}>
      <ArrowUpwardIcon style={{ color: "var(--blue)" }} />
    </div>
  );
};

export default TopButton;
