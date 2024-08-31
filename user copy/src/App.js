import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './Components/Sidebar'
import Dashboad from './Pages/Dashboad';
// import Contact from './Pages/Contact';
import Form from './Pages/Form';

const App = () => {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '220px', padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboad />} />
            {/* <Route path="/Contact" element={<Contact />} /> */}
            <Route path="/Form" element={<Form />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
