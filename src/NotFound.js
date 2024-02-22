import React from "react";
import { Link } from "react-router-dom";
import "./components/css/NotFound.css"; 
import Navigation from "./components/navigation/Navigation1";

const NotFound = () => {
  return (
    <>
        <Navigation />
      <div className="not-found">
        <p>PAGE NOT FOUND</p>
        <Link to="/">
          <button className="home-button">To Home</button>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
