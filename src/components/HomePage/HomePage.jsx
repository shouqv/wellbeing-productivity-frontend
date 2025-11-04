import React from 'react';
import { useState } from 'react';
import '../../styles/HomePage.css';
import bg from '../../assets/background.png';
import { Link } from 'react-router';

function HomePage() {
  const [hovered, setHovered] = useState(false);
  const [hoveredLink, setHoveredLink] = useState('');


  return (
    <div className="big-homepage-full-container">
      <div className="homepage-full-container fade-in">
        <h1 className={`title ${hovered ? 'blured-item' : ''}`} >Beam</h1>
        <div className={`desc ${hovered ? 'blured-item' : ''}`}>Your first productivity app that actually cares about your mental health.
          Track your tasks, goals, and emotions, and let Beam guide you through the dark.</div>
        <div className="links">
          <Link className={`${hovered && hoveredLink === 'link2'? 'blured-item':''}`}   onMouseEnter={() => {
            setHovered(true)
            setHoveredLink('link1')
          }}
            onMouseLeave={() => {
              setHovered(false)
              setHoveredLink('')
            }} to="/signup">Sign Up</Link>

          <Link  className={`${hovered && hoveredLink === 'link1'? 'blured-item':''}`} onMouseEnter={() => {
            setHovered(true)
            setHoveredLink('link2')
          }}
            onMouseLeave={() => {
              setHovered(false)
              setHoveredLink('link2')
            }} to="/login">Log In</Link>
        </div>
      </div>
      <img src={bg} alt="bg" className={`background fade-in-img ${hovered ? 'blured-item' : ''}`} />
    </div>
  );
}

export default HomePage;
