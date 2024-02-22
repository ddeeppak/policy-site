import React from 'react';

import logo from './images/logo-removebg.png';
import './css/footer.css';
const Footer = () => {
    return (
        <>
        <footer className="row row-cols-5 py-5 my-5 border-top mb-0">
        <div className="row">
        <div className="col-lg-6">
            </div>
            <div className="col-lg-6">
                <center>
                <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                    <img src={logo} alt="Logo" width="200px" height="200px" style={{scale:"2"}} />
                </a>
                </center>
            </div>
            <div className="col-lg-6">
            </div>
            </div>




            <div className="col"></div>

            <div className="col">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Features</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Pricing</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">FAQs</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">About</a></li>
                </ul>
            </div>

            <div className="col">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Anti-Bribery And Anti-Corruption Policy</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Anti Fraud Policy</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Careers</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Citizens Charter</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Download Forms</a></li>
                </ul>
            </div>

            <div className="col">
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Enquiry of Outstanding Claims for the Current Year</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Equal Opportunity Policy</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Frequently Asked Questions</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Feedback</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Glossary</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Development</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Join Our Team</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">News</a></li>
                </ul>

            </div>

        </footer>
        <center className='border-top'>
        <p class="text-center text-muted footcamp">© 202$ Company, Inc</p>
        </center>
        </>
    );
};

export default Footer;