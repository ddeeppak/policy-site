import React, { useEffect, useState } from "react";
import AdminNavigator from '../AdminNavigation';
import '../css/ClaimsManagement.css';

const ClaimsManagement = () => {
    const [user, setUser] = useState({});
    const [newStatus, setNewStatus] = useState('');
    const [newAmount, setNewAmount] = useState(0);

    useEffect(() => {
        if (!(localStorage.getItem('Token'))) window.location.href = '/';
        fetchClaimsData();
    }, []); 

    async function fetchClaimsData() {
        try {
            const response = await fetch('http://localhost:5000/Claims',{
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
        table.innerHTML="<tr key='header'><th>Sno</th><th>User ID</th><th>Claims Type</th><th>Amount</th><th>Date</th><th>Status</th><th>Action</th></tr>";

        claims.forEach((claim, index) => {
            const row = table.insertRow();
            const snoCell = row.insertCell(0);
            const userid = row.insertCell(1);
            const typeCell = row.insertCell(2);
            const amountCell = row.insertCell(3);
            const dateCell = row.insertCell(4);
            const statusCell = row.insertCell(5);
            const actionCell = row.insertCell(6);

            snoCell.textContent = index + 1;
            userid.textContent = claim.USERS_ID;
            typeCell.textContent = claim.CLAIMS_TYPE || 'N/A';
            amountCell.textContent = claim.AMOUNT || 'N/A';
            dateCell.textContent = claim.DATE || 'N/A';
            statusCell.textContent = claim.STATUS || 'N/A';

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'DELETE';
            deleteButton.addEventListener('click', () => deleteClaim(claim.ID));
            actionCell.appendChild(deleteButton);

            const updateButton = document.createElement('button');
            updateButton.textContent = 'UPDATE';
            updateButton.addEventListener('click', () => updateClaim(claim.ID));
            actionCell.appendChild(updateButton);
        });
    }

    async function deleteClaim(id){
        try{
            const response = await fetch('http://localhost:5000/Claims',{
                method:'DELETE',
                headers:{
                    'Content-Type':'Application/json',
                    'authorization':localStorage.getItem('Token')
                },
                body:JSON.stringify({"id":id})
            });

            fetchClaimsData();
        } catch (error) {
            console.log(error);
        }
    }

    function closepop() {
        document.getElementById('update-claim').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }

    async function updateClaim(id) {
        document.getElementById('update-claim').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        try{
            const response = await fetch(`http://localhost:5000/Claims/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
            });
            const data = await response.json();
            const claim = data[0];
            console.log(claim);
            document.getElementById('claimsid').innerText =claim.ID;
            document.getElementById('userid').innerText =claim.USERS_ID;
            document.getElementById('policyno').innerText =claim.POLICY_NO;
            document.getElementById("camount").value =claim.AMOUNT;
            document.getElementById('ctype').innerText =claim.CLAIMS_TYPE;
            document.getElementById('status').value = claim.STATUS;
        } catch (error) {
            console.log(error);
        }
    }

    async function cupdate() {
        const cid = parseInt(document.getElementById('userid').innerText);
        const id = parseInt(document.getElementById('claimsid').innerText);
        const status = document.getElementById('status').value;
        const amount = parseInt(document.getElementById('camount').value);
        const type = document.getElementById('ctype').innerText;
        console.log(cid,id,status,amount,type);
        try{
            const response = await fetch('http://localhost:5000/Claims',{
                method:'PATCH',
                headers :{
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
                body:JSON.stringify({
                    id:id,
                    customer_id:cid,
                    type:type,
                    status:status,
                    amount : amount
                })
            });
        } catch (error) {
            console.log(error);
        }
        finally {
            fetchClaimsData();
            closepop();
        }
    }

    const closepopup = () => {
        document.getElementById('update-claim').style.display = 'none';
        document.getElementById('overlay').style.display = 'none'; 
    }

    const openPopup1 = () => {
        document.getElementById('popup').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    };

    const closePopup1 = () => {
        document.getElementById('popup').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    };

    const create =async (event) => {
        event.preventDefault(); // Prevent default form submission
        const type = document.getElementById('type').value;
        const amount = parseInt(document.getElementById('amount').value);
        const customer_id = parseInt(document.getElementById('customerid').value);

        const data = {
            customer_id:customer_id,
            type:type,
            amount:amount
        }

        try {
            const response = await fetch('http://localhost:5000/Claims', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
                body: JSON.stringify(data)
            });
    
        } catch (error) {
            console.error('Error creating claim:', error);
            alert('Failed to create claim. Please check the console for details.');
        }
        fetchClaimsData();
        closePopup1();
    };

    return (
        <>
            <AdminNavigator />
            <div className="mainlayout">
                <div className="sub-three" id="claims">
                    <h3>Claims</h3>
                    <button onClick={openPopup1}>+</button>
                    <div className="data">
                        <table id="claimsTable">
                            <tr>
                                <th>Sno</th>
                                <th>User ID</th>
                                <th>Claims Type</th>
                                <th>Amount</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
            <div className="overlay" id="overlay"></div>
            <div className="popup-container" id="update-claim">
                <label>Customer ID</label>
                <p id="userid"></p><br/>
                <label>ClaimID</label>
                <p id="claimsid"></p><br/>
                <label>policyno</label>
                <p id="policyno">policyno</p><br/>
                <label>Amount :</label>
                <input id="camount" type="number" />
                <p id="ctype">Type</p>
                <select id="status">
                    <option>REJECTED</option>
                    <option>PENDING</option>
                    <option>SETTLED</option>
                    <option>APPROVED</option>
                    <option>WITHDRAWED</option>
                    <option>ERROR</option>
                </select>

                <button onClick={cupdate}>UPDATE</button>
                <button onClick={closepopup}>Cancel</button>
            </div>
            <div className="popup-container" id="popup">
                <form onSubmit={create}>
                    <h2>New Claim</h2>
                    <input type="number" placeholder="Enter Customer Id" id="customerid" required/>
                    <label>Claim Type :&nbsp;&nbsp;</label>
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
                    <br />
                    <br />
                    <label>Amount &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;&nbsp;</label>
                    <input type="number" id="amount" placeholder="above > 100000" required />
                    <br />
                    <br />
                    <button type="submit">Create</button>
                </form>
                
                <button onClick={closePopup1}>Cancel</button>
            </div>
        </>
    );
};

export default ClaimsManagement;
