import React, { useEffect } from "react";
import AdminNavigation from "./AdminNavigation";
import './css/AdminProfile.css';
import Footer from "./Footer";
const AdminProfile = () => {
    useEffect(() => {
        if(!(localStorage.getItem('Token'))){
            window.alert("Please Login");
            window.location.href='/';
            };
        
        const handleWheelScroll = (e) => {
            e.preventDefault();
            document.querySelector('.adminrow1').scrollLeft += e.deltaY;
        };

        const adminRow = document.querySelector('.adminrow1');
        adminRow.addEventListener('wheel', handleWheelScroll);
        return () => {
            adminRow.removeEventListener('wheel', handleWheelScroll);
        };
    }, []);
    return (
        <>
            <AdminNavigation />
            <div>
                <div className="Admin-Container">
                    <div className="adminrow1">
                        <div className="basecard">
                            <p>New User</p>
                        </div>
                        <div className="basecard">
                            <p>New Claim</p>
                        </div>
                        <div className="basecard">
                            <p>Trending Offers</p>
                        </div>
                        <div className="basecard">
                            <p>Trending Offers</p>
                        </div>
                        <div className="basecard">
                            <p>Trending Offers</p>
                        </div>
                        <div className="basecard">
                            <p>Trending Offers</p>
                        </div>
                        <div className="basecard">
                            <p>Trending Offers</p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default AdminProfile;
