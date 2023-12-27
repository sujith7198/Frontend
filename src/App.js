// App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './Route';
import HOME from './Home';
import SIGNUP from './Signup';
import Admin from './Admin';
import TEST from './Test';
import PRODUCT from './Product';
import { useState } from 'react';

function App() {
  const [entries, setEntries] = useState([]);

  const handleFormSubmit = (data) => {
    // Update the entries state with the new data
    setEntries([...entries, data]);
  };
  return (
    <Router>
      <AuthProvider>
        <div className="app-container">
          <div className="sidebar">
            <ul>
              <li style={{ fontSize: "20px" }}><Link to="/">Home</Link></li>
              <li style={{ fontSize: "20px" }}><Link to="/login">Signup</Link></li>
              <li style={{ fontSize: "20px" }}><Link to="/admin">Account</Link></li>
              <li style={{ fontSize: "20px" }}><Link to="/test">TEST</Link></li>
              <li style={{ fontSize: "20px" }}><Link to="/product">PRODUCT</Link></li>

            </ul>
          </div>
          <div className="content">
          <Routes>
              <Route path="/" element={<HOME />} />
              <Route path="/login" element={<SIGNUP />} />
              <Route
                path="/admin"
                element={<ProtectedRoute element={<Admin />} />}
              />
          <Route
                path="/test"
                element={<ProtectedRoute element={<TEST onSubmit={handleFormSubmit} />} />}
              />
             <Route
                path="/product"
                element={<ProtectedRoute element={<PRODUCT entries={entries} />} />}
              />

              {/* <Route path="/test" element={<TEST />} /> */}
            </Routes>
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
