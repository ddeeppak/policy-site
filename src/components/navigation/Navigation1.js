import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo-removebg.png';
import './navigation1.css';

const Navigation = () => {
    return (
        <div className="navi-containerl">
            <Link to="/">
            <img src={logo} alt="logo" width={'80px'} className="zoom-img" />
            </Link>

            <div className="menu">
                <Link to="/">
                    <button>Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;
