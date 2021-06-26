import React from 'react';
import Posts from './Posts';
import Banner from './Banner';
import "../App.css";

const Home = () => {
    return (
        <div className="row">
            <div className="col-md-4 col-12 menu-container">
                <Banner/>
            </div>
            <div className="col-md-8 col-12 col-md-offset-4 post-container">
                <Posts />
            </div>
        </div>
    );
};

export default Home;