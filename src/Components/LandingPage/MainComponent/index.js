import React from "react";
import "./style.css";
import Button from "../../Common/Button";
import gradient from "../../../assets/gradient.png";
import iphone from "../../../assets/iphone.png";
import { motion } from "framer-motion";

const MainComponent = () => {
  return (
    <div className="main-component">
      <div className="left-section">
        <motion.h1
          className="track-crypto-heading"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Track Crypto
        </motion.h1>
        <motion.h1
          className="real-time-heading"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
        >
          Real Time.
        </motion.h1>
        <motion.p
          className="description"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Track crypto through a public api in real time. Visit the dashboard to
          do so!
        </motion.p>
        <motion.div
          className="flex-buttons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.75 }}
        >
          <Button text={"Dashboard"} />
          <Button text={"Share"} outlined={true} />
        </motion.div>
      </div>
      <div className="right-section">
      <img src={gradient} alt="gradient" className="gradient" />
        <motion.img
          src={iphone}
          alt="iphone"
          className="iphone"
          initial={{ y: -10 }}
          animate={{ y: 10 }}
          transition={{
            type: "smooth",
            repeatType: "mirror",
            duration: 2,
            repeat: Infinity,
          }}
        />
        
      </div>
    </div>
  );
};

export default MainComponent;
