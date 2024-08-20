import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import DashPage from './Dashboard/DashPage';
import Product from './Pages/Product';
import ContactUs from './Data/Contact';
import Dashboard from './Data/Dashboard';
// import Admin from './Pages/Admin';
import Form from './Pages/Form';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        {/* <DashPage /> */}
        <div style={{ marginLeft: '220px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Product />} />
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Form" element={<Form />} />
            <Route path="/DashPage" element={<DashPage />} />
          </Routes>
        </div>
      </div>
      <div >
        <DashPage />
        <div style={{ marginLeft: '220px', padding: '20px' }}>
          <Routes>
            {/* <Route path="/" element={<DashPage />} /> */}
            <Route path="/Contact" element={<ContactUs />} />
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </div>
      </div>

    </Router>
  );
};

export default App;
