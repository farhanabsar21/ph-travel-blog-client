import React from 'react';
import pgLogo from "../assets/logo.png"
import "../App.css"

const Banner = () => {
    return (
        <div className="banner-container d-flex justify-content-center align-items-center">
            <div>
                <img src={pgLogo} alt="pg-logo" className="img-fluid" />
            </div>
        </div>
    );
};

export default Banner;