import React from "react";

import './signup.css';


import Navigation from "./navigation/Navigation1";


const Signup = () =>{


    const sendata = async () => {
        const Name = document.getElementById('NAME').value;
        const Contact = parseInt(document.getElementById('CONTACT').value);
        const mail = document.getElementById('MAIL').value;  // Corrected to get the value
    
        const data = {
            Name: Name,
            Contact: Contact,
            mail: mail
        };
    
        try {
            const response = await fetch("https://policy-api.onrender.com/userentry", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            window.alert("Registration is Successful, Check Your Email");
        } catch (error) {
            console.error(error);
        }
    };
    
    return (
        <>
        <Navigation />
        <div className="layout">
            <form>
            <h3>Fill the Form</h3>
                <label>Name:</label>
                <input type="text" placeholder="Enter Your Legal FullName" id="NAME" required/>
                <label>Phone Number</label>
                <input type="number" maxLength={10} placeholder="Phone Number" id="CONTACT" required/>
                <label>E-mail</label>
                <input type="email" placeholder="E-mail" id="MAIL" required/>
            </form>
            <center><button onClick={sendata}>Submit</button></center>
        </div>
        </>
    );

}

export default Signup ;
