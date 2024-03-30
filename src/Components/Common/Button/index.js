import React from "react";
import "./style.css";

const Button = ({text, onClick,outlined}) => {
    return (
        <div className={outlined ? "outlined-button" : "button"} onClick={()=>onClick()}>{text}</div>
    )
}

export default Button