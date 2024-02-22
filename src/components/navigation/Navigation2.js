import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/logo-removebg.png';
import './navigation.css';

const Navigation = () => {
    return (
        <div className="navi-container ">
            <Link to="/">
            <img src={logo} alt="logo" width={'80px'} className="zoom-img" />
            </Link>

            <div className="menu">
                <Link to="/login">
                    <button>Login</button>
                </Link>
                <Link to="/">
                    <button>Sign Up</button>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;
