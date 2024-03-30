import React from "react";
import "./style.css";
import AnchorTemporaryDrawer from "./drawer";
import Button from "../Button";
import {Link} from "react-router-dom";

const Footer = () => {
    return(
        <div className="navbar">
            <h1 className="logo">CryptoTracker<span style={{color: "var(--blue)"}}>.</span></h1>
            <div className="navbar-links">
                <Link to="/"><p className="link">Home</p></Link>
                <Link to="/compare"><p className="link">Compare</p></Link>
                <Link to="/watchlist"><p className="link">Watchlist</p></Link>
                <Link to="/dashboard">
                    <Button text={"Dashboard"} onClick={()=>{console.log("clicked")}}/>
                </Link>
                
                {/* <Button text={"Share"} outlined={true} onClick={()=>{console.log("clicked")}}/> */}
            </div>
            <div className="mobile-drawer">
                <AnchorTemporaryDrawer />
            </div>
        </div>
    )
}

export default Footer