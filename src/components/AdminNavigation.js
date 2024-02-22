import React from 'react';
import { Link } from 'react-router-dom';
import adminLogo from './images/logo.jpg'; 
import './css/adminNavigation.css'; 

const AdminNavigation = () => {
    const logout = ()=> {
        localStorage.removeItem('Token');
        localStorage.removeItem("Name");
    }
    return (
        <div className="admin-navi-container">
            <Link to="/">
                <img src={adminLogo} alt="admin-logo" width={'80px'} />
            </Link>

            <div className="admin-menu">
            <Link to="/admin/">
                    <button>Dashboard</button>
                </Link>
                <Link to="/admin/manage-users">
                    <button>Manage Users</button>
                </Link>
                <Link to="/admin/manage-claims">
                    <button>Manage Claims</button>
                </Link>
                <Link to="/">
                    <button onClick={logout}>LogOut</button>
                </Link>
            </div>
        </div>
    );
};

export default AdminNavigation;
