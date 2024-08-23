import React from 'react';
import { Link } from 'react-router-dom';
import './DashPage.css'

const DashPage = () => {
    return (
        <div className='fcce' style={{ width: '200px', height: '100vh', backgroundColor: '#f0f0f0', padding: '21px' }}>
            <h2>Dashboard 1</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {/* <li><Link to="/">Product</Link></li> */}
                <li><Link to="/Dashboard">Dashboard</Link></li>
                <li><Link to="/Contact">Contact Us</Link></li>
                {/* <li><Link to="/Dashboard">Admin</Link></li> */}
            </ul>
        </div>
    );
};

export default DashPage;
