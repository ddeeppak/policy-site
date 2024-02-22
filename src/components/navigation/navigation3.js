import React from 'react';
import { Link } from 'react-router-dom'; 
import logo from '../images/logo-removebg.png';
import './navigation.css';

const Navigation = () => {
    const logout = ()=> {
        localStorage.removeItem('Token');
        localStorage.removeItem("Name");
    }
    return (
        <div className="navi-container ">
            <Link to="/">
            <img src={logo} alt="logo" width={'80px'} className="zoom-img" />
            </Link>
            <div className="menu">
                <Link to="/">
                    <button>Home</button>
                </Link>
                <Link to="/">
                    <button onClick={logout}>LogOut</button>
                </Link>
            </div>
        </div>
    );
};

export default Navigation;
