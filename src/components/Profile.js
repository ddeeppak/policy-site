import React, { useEffect } from "react";
import Navigation from "./navigation/navigation3";
import './css/Profile.css';
import Footer from "./Footer";

const url="https://policy-api.onrender.com/";
const Profile = () => {
    useEffect(() => {
        if (!localStorage.getItem('Token')) {
            window.alert("Please Login");
            window.location.href = '/';
        }
        fetchClaimsData();
        userdata();
    }, []);

    // Function to open the popup
    const openPopup = () => {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    };

    const closePopup = () => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    };

    
    const createClaim = async (event) => {
        event.preventDefault();
        try {
            const type = document.getElementById('type').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const attachment = document.getElementById('attachment').files[0];
    
            const formData = new FormData();
            formData.append('type', type);
            formData.append('amount', amount);
            formData.append('attachment', attachment);
    
            const response = await fetch(url+'Claims', {
                method: 'POST',
                headers: {
                    'Authorization': localStorage.getItem('Token')
                },
                body: formData
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            fetchClaimsData();
        } catch (error) {
            console.log(error);
        }
        closePopup();
    };
    
    async function fetchClaimsData() {
        try {
            const response = await fetch(url+'UserClaims',{
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
            });
            const data = await response.json();

            if(response.status === 402){
                window.alert("please Login");
                window.location.href = '.';
            }
            populateClaimsTable(data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    
    function populateClaimsTable(claims) {
        const table = document.getElementById('claimsTable');
        table.innerHTML="<tr><th>Sno</th><th>Claims Type</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr>";

        claims.forEach((claim, index) => {
            const row = table.insertRow();
            const snoCell = row.insertCell(0);
            const typeCell = row.insertCell(1);
            const amountCell = row.insertCell(2);
            const dateCell = row.insertCell(3);
            const statusCell = row.insertCell(4);
            const actionCell = row.insertCell(5);

            snoCell.textContent = index + 1;
            typeCell.textContent = claim.CLAIMS_TYPE || 'N/A';
            amountCell.textContent = claim.AMOUNT || 'N/A';
            dateCell.textContent = claim.DATE || 'N/A';
            statusCell.textContent = claim.STATUS || 'N/A';

            if(claim.STATUS==="PENDING")
            {
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'WithDraw';
                deleteButton.addEventListener('click', () => withdraw(claim.ID));
                actionCell.appendChild(deleteButton);

                const updateButton = document.createElement('button');
                updateButton.textContent = 'UPDATE';
                // updateButton.addEventListener('click', () => updateClaim(claim.ID));
                actionCell.appendChild(updateButton);
            }
        });
    }

    async function withdraw(id) {
        try {
            const response = await fetch(url+'Claims/withdraw/'+id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': localStorage.getItem('Token')
                }
            });
            fetchClaimsData();
        } catch (error) {
            console.er(error);
        }
    }

    async function userdata(){
        try {
            const response = await fetch(url+'policyData',{
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
            });
            const data = await response.json();

            if(response.status === 402){
                window.alert("please Login");
                window.location.href = '.';
            }
            populateUserdata(data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function populateUserdata(data){
        const user = document.getElementById('policydata78');
        user.innerHTML=`                            <p><strong>Policy Number:</strong> ${data.policy_number}</p>
        <p><strong>Policy Holder:</strong>${data.policy_holder}</p>
        <p><strong>Insurance Type:</strong> ${data.insurance_type}</p>
        <p><strong>Coverage Amount:</strong> ${data.coverage_amount}</p>
        <p><strong>Policy Start Date:</strong>${dateformat(data.start_date)}</p>
        <p><strong>Policy End Date:</strong> ${dateformat(data.end_date)}</p>`
    }

    function dateformat(dateString)
    {
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(date);
        return formattedDate;
    }

    return (
        <>
            <Navigation />
            <div>
                <center>
                    <div className="Policy-Container">
                        <div>
                            <p className="pts1">Policy Details</p>
                        </div>
                        <div className="policy" id="policydata78">
                            <p><strong>Policy Number:</strong> P123456</p>
                            <p><strong>Policy Holder:</strong> John Doe</p>
                            <p><strong>Insurance Type:</strong> Auto Insurance</p>
                            <p><strong>Coverage Amount:</strong> $50,000</p>
                            <p><strong>Policy Start Date:</strong> January 1, 2024</p>
                            <p><strong>Policy End Date:</strong> December 31, 2024</p>
                        </div>
                    </div>
                    <div className="Claims-Container">
                        <div className="claimmng">
                            <p className="pts1">Claims</p>
                            <button id="addclaim" onClick={openPopup}>ADD</button>
                        </div>

                        <div className="claims">
                            <table id="claimsTable" className="mt-0">
                                {/* <tr>
                                    <th>Sno</th>
                                    <th>User ID</th>
                                    <th>Claims Type</th>
                                    <th>Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr> */}
                            </table>
                        </div>
                    </div>
                    {/* Popup Container */}
                    <div className="popup-container" id="popup">
                        <form onSubmit={createClaim}>
                            <h2>New Claim</h2>
                            <label htmlFor="type">Claim Type:</label>
                            <select id="type" required>
                                <option>Hand Surgery</option>
                                <option>Cosmetic Surgery</option>
                                <option>Lung Resection</option>
                                <option>Hernia Repair</option>
                                <option>Physical Therapy</option>
                                <option>Prescription Medication</option>
                                <option>Dental Procedure</option>
                                <option>Emergency Room Visit</option>
                                <option>Maternity Care</option>
                                <option>Eye Exam</option>
                                <option>Mental Health Counseling</option>
                                <option>Chiropractic Care</option>
                                <option>Diagnostic Imaging</option>
                                <option>Acupuncture</option>
                                <option>Occupational Therapy</option>
                                <option>Substance Abuse Treatment</option>
                                <option>Home Health Care</option>
                                <option>Medical Equipment</option>
                                <option>Speech Therapy</option>
                                <option>Podiatry Services</option>
                                <option>Wellness/Preventive Services</option>
                            </select>
                            <br /><br />
                            <label htmlFor="amount">Amount:</label>
                            <input type="number" id="amount" placeholder="Above $100000" required />
                            <br /><br />
                            <label htmlFor="attachment">Attachment:</label>
                            <input type="file" id="attachment" accept="image/*, .pdf" />
                            <br /><br />
                            <button type="submit">Create</button>
                            <button type="button" onClick={closePopup}>Cancel</button>
                        </form>
                    </div>
                    {/* Overlay */}
                    <div className="overlay" id="overlay" onClick={closePopup}></div>
                </center>
            </div>
            <Footer />
        </>
    );
}

export default Profile;
