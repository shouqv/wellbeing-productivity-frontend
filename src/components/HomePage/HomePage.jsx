import React from 'react';
import '../../styles/HomePage.css';
import bg from '../../assets/spark-bg.png';
import { Link } from 'react-router';

function HomePage() {
  return (
    <div className="big-homepage-full-container">
      <div className="homepage-full-container fade-in">
        <h1 className="title">SPARK</h1>
        <p className="desc">Where you can find your inner shine</p>
        <div className="links">
          <Link to="/signup">Sign Up</Link>
          <Link to="/login">Log In</Link>
        </div>
      </div>
      <img src={bg} alt="bg" className="background fade-in-img" />
    </div>
  );
}

export default HomePage;
