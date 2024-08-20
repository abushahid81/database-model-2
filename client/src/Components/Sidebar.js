import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar'

const Sidebar = () => {
    return (
        <div style={{ width: '200px', height: '100vh', backgroundColor: '#f0f0f0', padding: '20px' }}>
            <h2>Product</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                <li><Link to="/">Product</Link></li>
                {/* <li><Link to="/Contact">Contact Us</Link></li> */}
                {/* <li><Link to="/Dashboard">Dashboard</Link></li> */}
                <li><Link to="/Form">Form</Link></li>
                <li><Link to="/DashPage" >Admin</Link></li>
            </ul>
        </div>
    );
};

export default Sidebar;
