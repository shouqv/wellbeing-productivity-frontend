import React from 'react';
import '../../styles/HomePage.css';
import bg from '../../assets/sparkBackground.png';

import { Link } from 'react-router'


function HomePage() {
    return (
        <div className='homepage-full-container'>
            <div className='big-homepage-full-container'>
                {/* <hr/> */}
                <h1 className="title">Spark</h1>
                <p className="desc">Where you can find your inner shine </p>
                <div className="links">
                    <Link to={'/signup'}>Sign Up</Link>
                    <Link to={'/login'}>Log In</Link>
                </div>

            </div>
            <img src={bg} alt="bg picture" className="background" />
        </div>
    )
}

export default HomePage;
