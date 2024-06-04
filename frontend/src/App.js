// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './All/Homepage';
import AddProduct from './All/Addproduct';
import Authentication from './All/Authentication';
import Dashboard from './All/Dashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Authentication setAuthenticated={setAuthenticated} />} />
          {authenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/addproduct" element={<AddProduct />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
