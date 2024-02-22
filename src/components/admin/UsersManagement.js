import React, { useEffect } from "react";
import AdminNavigator from '../AdminNavigation';
import '../css/UsersManagement.css';

const UsersManagement = () => {

    useEffect(() => {
        if(!(localStorage.getItem('Token'))) window.location.href='/';
        fetchUsersData();
    }, []); 

    async function updateUser(id) {
        document.getElementById('update-pop').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
        try {
            const response = await fetch('http://localhost:5000/Users/' + id, {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
            });
            const data = await response.json();
            const user = data[0];
            document.getElementById('did').innerText = user.ID;
            document.getElementById('dname').innerText = user.NAME;
            document.getElementById('demail').value = user.E_MAIL;
            document.getElementById('damount').value = user.AMOUNT;

        } catch (error) {
            console.error(error);
        }
    }

    async function update() {
        const id = document.getElementById('did').innerText;
        const name = document.getElementById('dname').innerText;
        const email = document.getElementById('demail').value;
        const amount = parseFloat(document.getElementById('damount').value);
        try {
            const response = await fetch('http://localhost:5000/Users', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
                body: JSON.stringify({
                    id: id,
                    name: name,
                    email: email,
                    age: 23,
                    amount: amount
                })
            });
            fetchUsersData();
            closepop();
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteUser(id) {
        try {
            const response = await fetch('http://localhost:5000/Users', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'Application/json',
                    'authorization': localStorage.getItem('Token')
                },
                body: JSON.stringify({ "id": id })
            });
            fetchUsersData();
        } catch (error) {
            console.er(error);
        }
    }

    async function fetchUsersData() {
        try {
            const response = await fetch('http://localhost:5000/Users', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('Token')
                },
            });
            if (response.status === 402) {
                window.alert("please Login");
            } else {
                const data = await response.json();
                populateUsersTable(data);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    function populateUsersTable(data) {
        const users = data[0];
        const table = document.getElementById('usersTable');
    
        if (table) {
            table.innerHTML = "<tr><th>Sno</th><th>Customer ID</th><th>Name</th><th>Amount</th><th>Policy No.</th><th>No. of Claim</th><th>E-mail</th><th>Action</th></tr>";
    
            users.forEach((user, index) => {
                const row = table.insertRow();
                const snoCell = row.insertCell(0);
                const customerIdCell = row.insertCell(1);
                const nameCell = row.insertCell(2);
                const amountCell = row.insertCell(3);
                const policyNoCell = row.insertCell(4);
                const claimsCell = row.insertCell(5);
                const emailCell = row.insertCell(6);
                const actionCell = row.insertCell(7);
    
                snoCell.textContent = index + 1;
                customerIdCell.textContent = user.ID || 'N/A';
                nameCell.textContent = user.NAME || 'N/A';
                amountCell.textContent = user.AMOUNT || 'N/A';
                policyNoCell.textContent = user.POLICY_NO || 'N/A';
                claimsCell.textContent = user.NO_CLAIMS || 'N/A';
                emailCell.textContent = user.E_MAIL || 'N/A';
    
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'DELETE';
                deleteButton.addEventListener('click', () => deleteUser(user.ID));
                actionCell.appendChild(deleteButton);
    
                const updateButton = document.createElement('button');
                updateButton.textContent = 'UPDATE';
                updateButton.addEventListener('click', () => updateUser(user.ID));
                actionCell.appendChild(updateButton);
            });
        }
    }
    
    
async function createUser() {
    const name = document.getElementById('fullname').value;
    const age = parseInt(document.getElementById('age').value);
    const amount = parseFloat(document.getElementById('amount').value);
    const aadhar = parseInt(document.getElementById('aadhar').value);
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const data = {
        "name": name,
        "age": age,
        "amount": amount,
        "aadhar": aadhar,
        "email": email,
        "password": password
    };
    try {
        const response = await fetch('http://localhost:5000/Users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': localStorage.getItem('Token')
            },
            body: JSON.stringify(data)
        });

    } catch (error) {
        console.error('Error creating user:', error);
        alert('Failed to create user. Please check the console for details.');
    }

    closePopup2();

    fetchUsersData();
}

    function closepop() {
        document.getElementById('update-pop').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
    function closePopup2() {
        document.getElementById('popup-user').style.display = 'none';
        document.getElementById('overlay').style.display = 'none';
    }
    function openPopup2() {
        document.getElementById('popup-user').style.display = 'block';
        document.getElementById('overlay').style.display = 'block';
    }

    return (
        <>
            <AdminNavigator />
            <div className="mainlayout">
                <div className="sub-three" id="users">
                    <h3>Users</h3>
                    <button onClick={() => openPopup2()}>
                        <i class="material-icons">add</i>
                    </button>

                    <div className="data">
                        <table border={1} id="usersTable">
                            <thead>
                                <tr>
                                    <th>Sno</th>
                                    <th>Customer ID</th>
                                    <th>Name</th>
                                    <th>Amount</th>
                                    <th>Policy No.</th>
                                    <th>No. of Claim</th>
                                    <th>E-mail</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="popup-container" id="update-pop">
                <label>ID</label>
                <p id="did"></p><br/>
                <label>Name</label>
                <p id="dname"></p><br/>
                <label>E-mail</label>
                <input type="email" id="demail"/><br/><br/>
                <select id="damount">
                    <optgroup>
                        <option value="100000">1,00,000</option>
                        <option value="200000">2,00,000</option>
                        <option value="500000">5,00,000</option>
                        <option value="1000000">10,00,000</option>
                    </optgroup>
                </select><br/><br/>
                <button onClick={update}>UPDATE</button>
                <button onClick={closepop}>Cancel</button>
            </div>
            <div className="popup-container" id="popup-user">
                <form>
                    <h2>New User</h2>
                    <label>Name</label>
                    <input type="text" placeholder="Full Name" id="fullname" required/>
                    <label>Age</label>
                    <input type="number" id="age"  placeholder="age" required/>
                    <br/><br/>
                    <label>Policy Amount</label>
                    <select id="amount">
                        <optgroup>
                            <option value="100000">1,00,000</option>
                            <option value="200000">2,00,000</option>
                            <option value="500000">5,00,000</option>
                            <option value="1000000">10,00,000</option>
                        </optgroup>
                    </select>
                    <label>Aadhar No.(optional)</label>
                    <input type="number" placeholder="aadhar number" id="aadhar"/>
                    <br/>
                    <br/>
                    <label>E-mail</label>
                    <input type="email" id="email" placeholder="personal mail" required/>
                    <br/><br/>
                    <label>Password</label>
                    <input type="password" id="password" placeholder="password" required/>
                    <br/><br/>
                </form>
                <div style={{display:"flex"}}>
                        <button style={{marginRight: '10px'}} onClick={createUser}>Create</button>
                        <button style={{marginRight: '10px'}} type="reset">Reset</button>
                        <button onClick={closePopup2}>Cancel</button>
                    </div>
            </div>
            <div className="overlay" id="overlay"></div>
        </>
    );
    
}

export default UsersManagement;
