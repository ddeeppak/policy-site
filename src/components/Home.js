import React from "react";
import './css/home.css';

import poster2 from './poster/1 (2).jpg';
import img6 from './poster/img6.jpg';
import poster5 from './poster/1 (5).jpg';

import Navigation from "./navigation/Navigation2";
import Footer from "./Footer";

const InsuranceBenefits = () => {
  return (
    <div className="benefits">
        <h1 className="mb-5 text-center mt-5 pt-4">Benefits</h1>
      <div className="container">
        <div className="row text-center mainlayout">
          <div className="col-md-6">
            <h2>24/7 Customer Service</h2>
            <p style={{fontWeight:"normal",height:"65px"}}>Experience 24/7 customer service for instant assistance, support, and peace of mind.</p>

          </div>

          <div className="col-md-6">
            <h2>Total Coverage</h2>
            <p style={{fontWeight:"normal",height:"65px"}}>Benefit from comprehensive coverage that provides all-encompassing protection, spanning various risks or events. Ensure you are financially safeguarded against a wide range of potential losses.</p>

          </div>
        </div>
        <div className="row text-center mainlayout mt-2 pb-5">
          <div className="col-md-6">
            <h2>Quick Claims Processing</h2>
            <p style={{fontWeight:"normal",height:"65px"}}>Experience efficient and quick claims processing to ensure timely resolution and reimbursement in case of unexpected events.</p>

          </div>

          <div className="col-md-6">
            <h2>Flexible and Comprehensive Plans</h2>
            <p style={{fontWeight:"normal",height:"65px"}}>Choose from a variety of flexible and comprehensive insurance plans tailored to meet your unique needs and preferences.</p>

          </div>
        </div>
      </div>
    </div>
  );
};


const Home = () => {
    return (
        <>
            {/* Navigation component */}
            <Navigation />

            {/* Hero Section */}
            <div className="layout1">
                <section className="hero-section bg-primary text-light p-2 text-center">
                    <div className="container">
                        <h1 className="display-4 m-0 herosec">Protecting Your Future with SecureInsure</h1>
                        <p className="lead m-0 herosec">Get Peace of Mind with Our Comprehensive Insurance Solutions.</p>
                    </div>
                </section>
            </div>

            {/* Three columns */}
            <div className="container">
                <div className="row text-center mainlayout ">
                    <h1 className="mb-5">Features</h1>
                    <div className="col-lg-4 ">
                        <img src={poster2} width="140" height="140" style={{ borderRadius: "70px" }} />
                        <h2>24/7 Customer Service</h2>
                        <p>24/7 customer service for instant assistance, support, and peace of mind.</p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div>

                    <div className="col-lg-4">
                    <img src={poster5} width="140" height="140" style={{ borderRadius: "70px" }} />
                        <h2>Total Coverage</h2>
                        <p>Comprehensive coverage provides all-encompassing protection, spanning various risks or events, ensuring policyholders are financially safeguarded against a wide range of potential losses.</p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div>

                    <div className="col-lg-4">
                        <img src={img6} width="140" height="140" style={{ borderRadius: "70px" }} />
                        <h2>Network of Hospitals</h2>
                        <p>Policyholders have the flexibility to access medical treatment and make claims at a network of affiliated hospitals, offering choices beyond a single healthcare facility.</p>
                        <p><a className="btn btn-secondary" href="#">View details »</a></p>
                    </div>
                </div>

            </div>
            
            <InsuranceBenefits />

            <div className="layout2">
                <h1>Our Partners</h1>
            </div>
            <Footer />
        </>
    );
}

export default Home;
